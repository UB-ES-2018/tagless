var client = require('./elasticsearchConnection');

/***
 This file will contain just mappings of our entities.
 Automapper function (mapElasticsearch, elasticsearchMain.js) expects that an Entity with custom mapping
 has in this file a function named: get + tableName + Mapping, so for entity comment, its table is Comments,
 so the method should be named as getCommentsMapping.

 If a new mapping realted with new entity is included in this file is necessary:
    1.Create its method: get{NewEntityTable}Mapping.
    2.Include its table name in the maps array
 
 ***/


const maps = ['Comments'];

module.exports.hasMapping = function(tableName) {
  return maps.indexOf(tableName) !== -1; // return true if table has mapping function, false if not
};

/*
 Mapping configuration of comment
 */
module.exports.getCommentsMapping = function() {
  return {
    index: 'comment',
    type: 'comment',
    body: {
      properties: {
        'body': {
          'type': 'text'
        },
        'userId': {
          'type': 'integer'
        }
      }
    }
  }
};