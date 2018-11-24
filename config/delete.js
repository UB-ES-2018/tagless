var client = require('./elasticsearchConnection');

client.indices.delete({index: 'comment'}, function(err,resp,status) {
  console.log("delete", resp);
});

client.indices.delete({index: 'like'}, function(err,resp,status) {
  console.log("delete", resp);
});

client.indices.delete({index: 'like_comments'}, function(err,resp,status) {
  console.log("delete", resp);
});

client.indices.delete({index: 'thread'}, function(err,resp,status) {
  console.log("delete", resp);
});

client.indices.delete({index: 'user'}, function(err,resp,status) {
  console.log("delete", resp);
});