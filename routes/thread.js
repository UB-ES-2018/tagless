var express = require('express');
var router = express.Router();
var ctl_thread = require('../controllers/thread_controller');


/* POST Create a thread */
router.post('/submit', function(req, res, next) {
  console.log(req.body);

  ctl_thread.postThread(req.body['title'],req.body['text']);

  res.send("Thread created");
});

router.get('/:thread_id/comments/', function(req, res, next) {
  //process req
  var threadId = req.params.threadId;
  

  //TODO
  //Find the thread with the id and return the thread and its comments

  //Implementation
  /*comment_ctl.getAllByThreadId(threadId)
      .then(function(comments){
        console.log(comments);
        res.render('thread', { title: 'Express', 'comments':[comments]});
      }, function(err){
        console.log(err);
        res.status(500).send(err);
      })*/

  res.render('thread', { title: 'Express', 'comments':[]});

});
/* POST Create a comment */
router.post('/:thread_id/comment/submit', function(req, res, next) {
  //process req
  var threadId = req.params.threadId;
  var text = req.body.text;
  var autor = req.body.autor;
  var reply = req.body.reply;

  //TODO
  //Find the thread with the id and return the thread and its comments

  //Implementation
  /*comment_ctl.createComment(threadId, text, autor, reply)
      .then(function(success){
        res.status(200).send(success);
      }, function(err){
        res.status(500).send(err);
      })*/

  res.send("Commented");
});

module.exports = router;
