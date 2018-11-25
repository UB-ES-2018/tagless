var client = require('./elasticsearchConnection');

client.cluster.health({}, function(err,resp,status) {
  console.log("-- Client Health --", resp);
});

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

client.indices.getMapping({
      index: 'comment',
      type: 'comments',
    },
    function (error,response) {
      if (error){
        console.log(error.message);
      }
      else {
        console.log('Mappings:\n',response.comment.mappings.comments.properties);
      }
});