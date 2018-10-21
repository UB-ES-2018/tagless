var express = require('express');
var router = express.Router();


/* POST Create a thread */
router.post('/submit', function(req, res, next) {
  console.log(req.body);
  //Get a request and create a thread
  //Requires to be login
  res.send("Thread created");
});

router.get('/:thread_id/comments/', function(req, res, next) {
  var thread_id = req.params.thread_id;

  //TODO
  //Find the thread with the id and return the thread and its comments
  res.render('thread', { title: 'Express', 'comments':[]});
});
/* POST Create a comment */
router.post('/:thread_id/comment/submit', function(req, res, next) {
  var thread_id = request.params.thread_id;
  //TODO
  //Find the thread with the id and return the thread and its comments
  res.send("Commented");
});

module.exports = router;
