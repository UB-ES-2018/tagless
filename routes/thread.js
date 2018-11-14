var express = require('express');
var router = express.Router();
var comment_ctl = require('../controllers/comment_controller');
var ctl_thread = require('../controllers/thread_controller');
var ctl_like = require('../controllers/like_controller');
var ctl_like_c = require('../controllers/Like_comment_controller');



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

async function asyncCallPostLike(thread_id, req,res) {
    console.log('calling for likes ');
    var result = await ctl_like.findallLikesfromThread(thread_id);

    console.log("resultado del async",result.id);
    if (result){
        res.redirect('/');
    }
    else{
        res.send("El mensaje no es valido");
    }
    // expected output: 'resolved'
}

async function asyncCallLike(thread_id, username, vote, req,res) {
    console.log('calling for adding or substracting ');
    var result = await ctl_like.addPositiveorNegativeLikes(thread_id, username, vote);

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

async function asyncGetThreadById(req, res, next){

    var threadId = req.params.thread_id;
    var thread = await ctl_thread.getThreadById(threadId);
    thread.karma = await ctl_like.findallLikesfromThread(threadId);

            
    var comments = await comment_ctl.getAllByThreadId(threadId);
    for(i in comments){
        
        var votos = await ctl_like_c.findallLikesfromComment(comments[i]['id']);
        if(!votos){
            votos=0;
        }
        console.log("PROMISE: ",votos);
        comments[i].karma=votos
        console.log(comments[i]);

  }

    res.render('thread', {thread, 'comments': comments});
}

router.get('/:thread_id/comments', function(req, res, next) {
    //process req
    asyncGetThreadById(req, res, next);
    

});

/* POST Create a comment */
router.post('/:thread_id/comment/submit', function (req, res, next) {
    //process req
    var threadId = req.params.thread_id;
    var text = req.body.text;
    var autor = req.session.user;
    var reply = req.body.reply;

    //Implementation
    if (autor !== undefined) {
        comment_ctl.createComment(threadId, text, autor, reply)
            .then(function (success) {
                res.redirect('/thread/'+threadId+'/comments');
            }, function (err) {
                res.status(500).send(err);
            });
    } else {
        res.status(403).send("¡WARNING! Sign in to continue");
    }
});

module.exports = router;
