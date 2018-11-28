const fs = require('fs');
const elasticClient = require('./elasticsearchConnection');
const elasticMapping = require('./elasticsearchMappings');
const sequelize = require('../sequelizeConnection');
const sequelizeClient = sequelize.sequelize;
const path = require('path');
const fetch = require("node-fetch");

/***
  This file contains the most useful functions to work with elasticsearch.
 ***/


var bulk = [];

/*
 makebulk: prepare bulk array pushing every document inside to later on be included in
 a specific index.
 */
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

/*
 indexall: after prepare bulk array is needed to follow the next step, use bulk method
 to index every document inserted into bulk array.
 */
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

/*
 make: querying database get every document, calls makebulk and then indexall
 */
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
         bulk = [];
       });
     });
   }catch (error) {
     console.log(error)
   }

}



String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

setUp = function(indexNames, tableNames) {

  for (let i=0; i<indexNames.length; i++) {
    try {
      elasticClient.indices.delete({index: indexNames[i]}, function (err, resp, status) {
        console.log("AFTER DELETE INDEX " + indexNames[i] + " OF TABLE " + tableNames[i]);
        elasticClient.indices.create({index: indexNames[i]}, function(err, resp, status){
          console.log("AFTER CREATE INDEX " + indexNames[i] + " OF TABLE " + tableNames[i]);
          if (elasticMapping.hasMapping(tableNames[i])) {
            // Apply mapping
            elasticClient.indices.putMapping(eval("elasticMapping.get" + tableNames[i] +"Mapping()"),
                function(err, resp) {
                  console.log("AFTER APPLY MAPPING OF " + tableNames[i]);
                  make(indexNames[i], tableNames[i]);
                });
          }else{
            make(indexNames[i], tableNames[i]);
          }
        });
      });
    } catch (err) {
      console.log("Error: " + err);
    }
  }
};

/*
 mapElasticsearch: is the most important function in this file,
 recover every data of our database related with each of our models
 added in /models folder and then calls the other methods to sync
 elasticsearch database with our MySQL database.
 */
module.exports.mapElasticsearch =  function() {
  fs.readdir('../../models/', function(err, files) {
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

/*
  Document expects to be a dictionary that include every
  property of a specific object, example:
  document = {
    id : 1,
    name : Jhon,
    username : Mack,
    }
 */
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

