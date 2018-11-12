var express = require('express');
var router = express.Router();
var ctl_thread = require('../controllers/thread_controller');
var ctl_like = require('../controllers/like_controller');


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

async function asyncCallPostLike( req,res) {
    console.log('calling for likes ');
    var result = await ctl_like.findallLikesfromThread(3);

    console.log("resultado del async",result.id);
    if (result){
        res.redirect('/');
    }
    else{
        res.send("El mensaje no es valido");
    }
    // expected output: 'resolved'
}

async function asyncCallLike( req,res) {
    console.log('calling for adding or substracting ');
    var result = await ctl_like.addPositiveorNegativeLikes(4,2,-1);

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
    asyncCallLike(req,res);
    asyncCallPostLike(req,res);

  }
  else{
    res.send("No estas logueado, logueate");

  }

});

router.get('/:thread_id/comments/', function(req, res, next) {
  //process req
  var threadId = req.params.thread_id;

  ctl_thread.getThreadById(threadId)
    .then(function(thread){

      console.log(thread);

      res.render('thread', { title: thread['title'], text: thread['description'], username: thread['userName'], date: thread['updatedAt'], 
        comments:[]});

    });

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
