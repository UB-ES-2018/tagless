const elasticsearch = require("elasticsearch");
var client;

client = new elasticsearch.Client({
  host: 'localhost:9200'
});

module.exports = client;

