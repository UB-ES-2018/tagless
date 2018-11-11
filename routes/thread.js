var express = require('express');
var router = express.Router();
var ctl_thread = require('../controllers/thread_controller');


async function asyncCallPostThread(userLogedName, req,res) {
  console.log('calling');
  var result = await ctl_thread.postThread(userLogedName,req.body['title'],req.body['text']);

  console.log("resultado del async",result.id);
  if (result){
    res.redirect('/');
  }
  else{
    res.send("El mensaje no es valido");
  }
  // expected output: 'resolved'
}

/* POST Create a thread */
router.post('/submit', function(req, res, next) {

  userLogedName = req.session.user;
  if (userLogedName){
    asyncCallPostThread(userLogedName,req,res);
  }
  else{
    res.send("No estas logueado, logueate");

  }

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
