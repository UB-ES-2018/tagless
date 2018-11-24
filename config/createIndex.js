var client = require('./elasticsearchConnection');

client.indices.create({
  index: 'comment'
}, function(err,resp,status){
  if(err) {
    console.log(err);
  }
  else{
    console.log("create", resp);
  }
});

client.indices.create({
  index: 'like'
}, function(err,resp,status){
  if(err) {
    console.log(err);
  }
  else{
    console.log("create", resp);
  }
});

client.indices.create({
  index: 'like_comments'
}, function(err,resp,status){
  if(err) {
    console.log(err);
  }
  else{
    console.log("create", resp);
  }
});

client.indices.create({
  index: 'thread'
}, function(err,resp,status){
  if(err) {
    console.log(err);
  }
  else{
    console.log("create", resp);
  }
});

client.indices.create({
  index: 'user'
}, function(err,resp,status){
  if(err) {
    console.log(err);
  }
  else{
    console.log("create", resp);
  }
});