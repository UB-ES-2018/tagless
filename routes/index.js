var express = require('express');
var router  = express.Router();
var ctl_thread = require('../controllers/thread_controller');
var ctl_like = require('../controllers/like_controller');
var ctl_like_comments = require('../controllers/Like_comment_controller');


async function asyncCallPostLikeDislike(thread_id, username, vote, req,res) {
  console.log('calling');
  var result = await ctl_like.addPositiveorNegativeLikes(thread_id, username, vote);
  if (result){
    res.redirect('/');
  }
  else{
    res.send("Error en el like/dislike a un thread");
  }
  // expected output: 'resolved'
}

async function asyncCallCommentLikeDislike(comment_id, username, vote, req, res) {
    var result = await ctl_like_comments.addPositiveorNegativeLikesComments(comment_id, username, vote);
    if (result){
        res.redirect('/');
    }
    else{
        res.send("Error en el like/dislike a un commentario");
    }
    // expected output: 'resolved'
}


/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all threads

  ctl_thread.getAllThreads()
    .then(function(allThreads){
      showList= [];
      for(i in allThreads){
        threadList ={"id": allThreads[i]['id'],
        "text":allThreads[i]['description'],
        "date":allThreads[i]['updatedAt'],
        "title":allThreads[i]['title'],
        "username":allThreads[i]['userName']};
        
        showList.push(threadList);
      }
      console.log(showList);
      res.render('index', { title: 'Express', 'threads':showList});
    });
});

async function asyncCallALLlike(thread_id,req,res) {
    var result = await ctl_like.findallLikesfromThread(thread_id,req,res);
    if (result){
        res.redirect('/');
    }
    else{
        res.send("Error en el like/dislike a un commentario");
    }
    // expected output: 'resolved'
}

async function asyncCallALLlikeComment(thread_id,req,res) {
    var result = await ctl_like.findallLikesfromComment(thread_id,req,res);
    if (result){
        res.redirect('/');
    }
    else{
        res.send("Error en el like/dislike a un commentario");
    }
    // expected output: 'resolved'
}

router.post('/api/vote/thread', function(req, res, next) {

  var thread_id = req.body.id;
  var vote = req.body.val;
  var username = req.session.user;

  if (username){
    asyncCallPostLikeDislike(thread_id, username, vote, req, res);
  }else{
    res.send("No estas logueado, logueate");

  }
});

router.post('/vote/comment', function(req,res,next){

    var comment_id = req.body.id;
    var vote = req.body.val;
    var username = req.session.user;

    if (username) {
        asyncCallCommentLikeDislike(comment_id, username, vote, req,res);
    }else {
        res.send("No estas logueado, hazlo porfavor.");
    }
});


module.exports = router;
