var client = require('./elasticsearchConnection');

client.indices.putMapping({
  index: 'comment',
  type: 'comments',
  body: {
    properties: {
        'body': {
          'type': 'text'
        },
        'userId':{
          'type': 'integer'
        }
    }
  }
}, function(err,resp) {
  if (err) {
    console.log(err);
  }else{
    console.log(resp);
  }
});