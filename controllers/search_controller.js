var elasticClient = require('../config/elasticsearch/elasticsearchConnection');



var dataComments = [];
var dataThreadsRaw = [];

module.exports.searchString = function(req, res){
  var phrase = req.query.phrase;
  console.log(phrase);
  /*
   Analyze thread's title and description
   */
  elasticClient.search({
    index: 'thread',
    type: 'thread',
    body: {
      query: {
        multi_match: {
          query: phrase,
          fields: [ 'title', 'description' ]
        }
      }
    }
  }, async function(error, response, status) {
    if (error){
      console.log("\x1b[31m", "[search_controller] | method-> searchString | parameter/s-> " + phrase + " | error-> " + error);
    }else{
      dataThreadsRaw = response.hits.hits;
      console.log("Success query, result->", response);
      analyzeRecursiveComments(phrase, response.hits.hits, res);
    }
  });
};

analyzeCommentsByThread = function(phrase, thread, callback){

  console.log("[analyzeCommentsByThread] ", thread);
  /*
   Analyze comment's body related with each thread
   */
  elasticClient.search({
    index: 'comment',
    type: 'comment',
    body: {
      query: {
        constant_score: {
          filter: {
            bool: {
              must: {
                term: { threadId : thread._id }
              }
            }
          }
        }
      }
    }
  }, function(error, response, status) {
    if(error){
      console.log("error -> ", error);
      callback(null);
    }else{
      elasticClient.search({
        index: 'comment',
        type: 'comment',
        body: {
          query: {
            match: { 'body' : phrase }
          }
      }
      }, function(error, response, status) {
          if (error) {
            callback(null);
          }else{
            console.log("response -> ", response);
            callback([response, thread]);
          }
      });

    }
  });
};


analyzeRecursiveComments = function(phrase, threads, res) {

  if (threads[0] !== undefined) {
    var firstElement = threads[0];
    console.log("current thread ", firstElement);
    threads = threads.splice(1, threads.length - 1);
    analyzeCommentsByThread(phrase, firstElement, function (response) {
      dataComments.push(response);
      analyzeRecursiveComments(phrase, threads, res);
    });
  } else {

    try {
      // dataComments is filled, calculate values
      for (let i = 0; i < dataComments.length; i++) {
        let n = dataComments[i][0].hits.total;
        let sum = 0;
        for (let j = 0; j < n; j++) {
          sum += dataComments[i][0].hits.hits[j]._score;
          console.log("sum = ", sum);
        }
        let value = Math.pow(1 + sum / n, n) + sum * (1 - Math.exp(-n));
        dataComments[i] = {value: value, commentData: dataComments[i][0], threadData: dataComments[i][1]};
      }

      console.log("DATA WITHOUT ORDER ", dataComments);
      // order dataValues DESC and dataComments
      dataComments = dataComments.sort(function (a, b) {
        return a.value - b.value;
      });

      console.log(dataComments[0]);
      var dataThreads = [];
      for (let i = 0; i < dataComments.length; i++) {
        dataThreads.push(dataComments[i].threadData);
      }

      /*
       Manage response using res object
       */
      res.json(dataThreads);
    } catch (ex) {
      console.log("RAW DATA ", dataThreadsRaw);
      if (dataThreadsRaw.length>0){
        res.json(dataThreadsRaw);
      }else {
        res.status(500).send(ex);
      }
    }


  }
};
