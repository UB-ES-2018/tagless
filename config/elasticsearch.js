const fs = require('fs');
const elasticClient = require('./elasticsearchConnection');
const sequelize = require('./sequelizeConnection');
const sequelizeClient = sequelize.sequelize;
const path = require('path');
const fetch = require("node-fetch");

elasticClient.cluster.health({}, function(err,resp,status) {
  console.log("-- Client Health --", resp);
});

//****************BULK*********************************


var bulk = [];


var makebulk = async function(indexName, tableName, entityList, callback){
  console.log("MAKEBULK OF " + tableName);

  var description = await sequelizeClient.queryInterface.describeTable(tableName);
  var attributes = Object.keys(description);

  for (let current in entityList){

    var properties = {};
    for (let i=0; i<attributes.length; i++) {
      properties[attributes[i]] = entityList[current][attributes[i]];
    }

    bulk.push(
        { index: {_index: indexName, _type: indexName, _id: entityList[current].id } },
        properties
    );
  }
  callback(bulk);
};

var indexall = function(indexName, madebulk, callback) {
  elasticClient.bulk({
    maxRetries: 5,
    index: indexName,
    type: indexName,
    body: madebulk
  },function(err,resp,status) {
    if (err) {
      console.log(err);
    }
    else {
      callback(resp.items);
    }
  });
};

async function make(indexName, tableName) {

   try{
     // Getting all data from our Database
     let dataModel = await sequelizeClient.query("SELECT * FROM " + tableName);
     console.log("------------" + tableName + "---------------");
     console.log(dataModel[0]);
     console.log("index Names ", indexName);

     // Make bulk
     makebulk(indexName, tableName, dataModel[0], function(response) {
       console.log("Bulk content prepared");
       indexall(indexName, response, function(resp) {
         console.log("AFTER INDEXALL", resp);
       });
     });
   }catch (error) {
     console.log(error)
   }

}


//***********************BULK***********************************

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

setUp = function(indexNames, tableNames) {

  for (let i=0; i<indexNames.length; i++) {
    try {
      elasticClient.indices.delete({index: indexNames[i]}, function (err, resp, status) {
        console.log("AFTER DELETE INDEX " + indexNames[i] + " OF TABLE " + tableNames[i]);
        elasticClient.indices.create({index: indexNames[i]}, function(err, resp, status){
          console.log("AFTER CREATE INDEX" + indexNames[i] + " OF TABLE " + tableNames[i]);
          make(indexNames[i], tableNames[i]);
        });
      });
    } catch (err) {
      console.log("Error: " + err);
    }
  }
};

module.exports.mapElasticsearch =  function() {
  fs.readdir('../models/', function(err, files) {
    if (err) {
      console.log(err);
    }
    else {
      // Manage mapping of each entity in models
      var indexNames = [];
      for (var i = 0; i < files.length; i++) {
        files[i] = path.parse(files[i]).name;
        indexNames.push(files[i]);
        files[i] = files[i].capitalize();
        // Pluralize name to get Table Name
        if (files[i].charAt((files[i].length - 1)) !== 's') {
          files[i] = files[i] + 's';
        }
      }
      console.log(files);
      console.log(indexNames);

      setUp(indexNames, files);
    }
  });
};

module.exports.addDocument = function(indexName, document) {
    elasticClient.index({
    index: indexName,
    id: document.id,
    type: indexName,
    body: document,
  }, function (err, resp, status) {
    console.log(resp);
  });
};

module.exports.delDocument = function(indexName, id) {
  elasticClient.delete({
    index: indexName,
    id: id,
    type: indexName
  }, function (err, resp, status) {
    console.log(resp);
  });
};

this.mapElasticsearch();
