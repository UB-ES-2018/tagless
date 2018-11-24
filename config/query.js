var client = require('./elasticsearchConnection');
var comment = require("../models/comment");
var DataTypes = require('sequelize/lib/data-types');
var sequelize = require('./sequelizeConnection');
var Sequelize = require('sequelize');

var sequelizeClient = sequelize.sequelize;

client.search({
  index: 'comment',
  type: 'comments',
  body: {
    query: {
      match: { 'body' : 'Center' }
    },
  }
}, function(error, response, status) {
  if (error) {
    console.log('search error: '+error);
  }
  else {
    var ModelComment = comment(sequelizeClient, DataTypes);
    console.log(ModelComment.valueOf().toString());

    sequelizeClient.queryInterface.describeTable("Comments")
        .then(function(result) {
          console.log(result.toString());
          console.log(Object.keys(result));
        });
    console.log('---Response---');
    console.log('Total hits: ', response.hits.total);
    console.log('---Hits---');
    response.hits.hits.forEach(function(hit) {
      console.log(hit);
    });
  }
});