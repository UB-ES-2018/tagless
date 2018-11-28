var client = require('./elasticsearchConnection');

/***
  This file has the purpose of show information related with elasticsearch database.
  Just run your elasticsearch and come to here to execute: $>node elasticsearchInformation
 ***/


/*
  Executing health command allow us to visualize a simple status easy to
  understand without enter to much deep.
 */
client.cluster.health({}, function(err,resp,status) {
  console.log("-- Client Health --", resp);
});


/*
  Here we can visualize simple counts about each index, so if we expect the addition
  or deletion of one or more documents we can ensure ourself check this update.

  [Aggregate more counts if it is needed, later on it will be generalized to show every index
  generated automatically using mapElasticsearch method (look elasticsearchMain.js file).]
 */
client.count({index: 'comment', type: 'comment'}, function(err,resp,status) {
  console.log('comments', resp);
});

client.count({index: 'like', type: 'like'}, function(err,resp,status) {
  console.log('likes', resp);
});

client.count({index: 'like_comments', type: 'like_comments'}, function(err,resp,status) {
  console.log('like_comments', resp);
});

client.count({index: 'thread', type: 'thread'}, function(err,resp,status) {
  console.log('threads', resp);
});

client.count({index: 'user', type: 'user'}, function(err,resp,status) {
  console.log('users', resp);
});

/*
  Here we can visualize mappings related with each index.

  [Aggregate more getMappings if it is needed, later on it will be generalized to show every index
   generated automatically using mapElasticsearch method (look elasticsearchMain.js file.]
 */
client.indices.getMapping({
      index: 'comment',
      type: 'comment',
    },
    function (error,response) {
      if (error){
        console.log(error.message);
      }
      else {
        console.log('Mappings:\n',response.comment.mappings.comment.properties);
      }
});