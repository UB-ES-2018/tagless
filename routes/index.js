var express = require('express');
var router  = express.Router();
var ctl_thread = require('../controllers/thread_controller');
var ctl_like = require('../controllers/like_controller');
var ctl_like_comments = require('../controllers/Like_comment_controller');


async function asyncCallPostLikeDislike(thread_id, username, vote, req,res) {
  console.log('calling');
  var result = await ctl_like.addPositiveorNegativeLikes(thread_id, username, vote);
  if (result){
      var karma = await asyncCallALLlike(thread_id,req,res);
      res.status(200).send(karma);
  }
  else{
    res.status(400).send("Error en el like/dislike a un thread");
  }
  // expected output: 'resolved'
}

async function asyncCallCommentLikeDislike(comment_id, username, vote, req, res) {
    var result = await ctl_like_comments.addPositiveorNegativeLikesComments(comment_id, username, vote);
    if (result){
        var karma = await asyncCallALLlikeComment(comment_id,req,res);
        res.status(200).send(karma);
    }
    else{
        res.status(400).send("Error en el like/dislike a un commentario");
    }
    // expected output: 'resolved'
}

async function asyncCallToShowAllThreads(req,res,next) {

  var allThreads = await ctl_thread.getAllThreads()
  console.log("ALLTHREADS: ",allThreads);
  showList= [];
  
  for(i in allThreads){
        
    var karma = await asyncCallALLlike(allThreads[i]['id'],req,res);
    if(!karma){
      karma=0;
    }
    threadList ={"id": allThreads[i]['id'],
      "text":allThreads[i]['description'],
      "date":allThreads[i]['updatedAt'],
      "title":allThreads[i]['title'],
      "username":allThreads[i]['userName'],
      "karma": karma
    };
    console.log("PROMISE: ",karma);
    showList.push(threadList);

  }
  console.log(showList);
  res.render('index', { title: 'Express', 'threads':showList});
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all threads
  asyncCallToShowAllThreads(req, res, next);
});

async function asyncCallALLlike(thread_id,req,res) {
    var result = await ctl_like.findallLikesfromThread(thread_id,req,res);
    return result;
    // expected output: 'resolved'
}

async function asyncCallALLlikeComment(comment_id,req,res) {
    var result = await ctl_like_comments.findallLikesfromComment(comment_id,req,res);
    return result;
    // expected output: 'resolved'
}

router.post('/api/vote/thread', function(req, res, next) {

  var thread_id = req.body.id;
  var vote = req.body.val;
  var username = req.session.user;

    if (username) {
        asyncCallPostLikeDislike(thread_id, username, vote, req,res);
    }else {
        res.send("No estas logueado, hazlo porfavor.");
    }
});

router.post('/api/vote/comment', function(req,res,next){

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
