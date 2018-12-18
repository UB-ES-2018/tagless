const elasticsearch = require("elasticsearch");
var client;

client = new elasticsearch.Client({
  host: 'cedar-916953153.eu-west-1.bonsaisearch.net'
  //:9200
});

module.exports = client;

