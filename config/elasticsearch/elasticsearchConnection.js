const elasticsearch = require("elasticsearch");
var client;

client = new elasticsearch.Client({
  host: 'https://l7p5gxx9qv:16wry1z8x2@cedar-916953153.eu-west-1.bonsaisearch.net'
  //:9200
});

module.exports = client;

