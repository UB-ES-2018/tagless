var elasticClient = require('../config/elasticsearch/elasticsearchConnection');

module.exports.searchString = function(phrase){
  elasticClient.search({
    index: 'thread',
    type: 'thread',
    body: {
      query: {
        match: { 'title': phrase }
      }
    }
  }, function(error, response, status) {
    if (error){
      console.log("\x1b[31m", "[search_controller] | method-> searchString | parameter/s-> " + phrase + " | error-> " + error);
    }else{
      console.log("Success query, result->", response.hits.hits);
    }
  });
};

this.searchString("metas vocablos");