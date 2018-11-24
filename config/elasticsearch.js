const fs = require('fs');
const elasticClient = require('./elasticsearchConnection');
const sequelize = require('./sequelizeConnection');
const sequelizeClient = sequelize.sequelize;
const path = require('path');

elasticClient.cluster.health({}, function(err,resp,status) {
  console.log("-- Client Health --", resp);
});

//****************BULK*********************************


var bulk = [];


var makebulk = async function(indexName, tableName, entityList, callback){

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

async function make(indexNames, tableNames) {
   var data = [];
   for (let i=0; i<tableNames.length; i++){
     try{
       // Getting all data from our Database
       let dataModel = await sequelizeClient.query("SELECT * FROM " + tableNames[i]);
       console.log("------------" + tableNames[i] + "---------------");
       console.log(dataModel[0]);
       console.log("index Names ", indexNames[i]);

       // Make bulk
       makebulk(indexNames[i], tableNames[i], dataModel[0], function(response) {
         console.log("Bulk content prepared");
         indexall(indexNames[i], response, function(response) {
           console.log(response);
         });
       });
     }catch (error) {
       console.log(error)
     }
   }
}


//***********************BULK***********************************

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports.mapElasticsearch = function() {
  fs.readdir('../models/', function(err, files) {
    if (err) {
      console.log(err);
    }
    else{
      // Manage mapping of each entity in models
      var indexNames = [];
      for (var i=0; i<files.length; i++){
        files[i] = path.parse(files[i]).name;
        indexNames.push(files[i]);
        files[i] = files[i].capitalize();
        // Pluralize name to get Table Name
        if (files[i].charAt((files[i].length-1)) !== 's'){
          files[i] = files[i] + 's';
        }
      }
      console.log(files);
      console.log(indexNames);

      make(indexNames, files);
    }
  });
};



this.mapElasticsearch();