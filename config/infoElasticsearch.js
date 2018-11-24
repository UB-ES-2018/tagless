var client = require('./elasticsearchConnection');

client.cluster.health({}, function(err,resp,status) {
  console.log("-- Client Health --", resp);
});

client.count({index: 'comment', type: 'comments'}, function(err,resp,status) {
  console.log('comments', resp);
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