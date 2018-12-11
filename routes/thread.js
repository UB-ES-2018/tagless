var express = require('express');
var router = express.Router();
var comment_ctl = require('../controllers/comment_controller');
var ctl_thread = require('../controllers/thread_controller');
var ctl_community = require('../controllers/comunity_controller');
var ctl_like = require('../controllers/like_controller');
var ctl_like_c = require('../controllers/Like_comment_controller');
var ctl_user = require('../controllers/user_controller');

router.get('/:community_name', function(req, res, next) {
    let  c_name = req.params.community_name;
    console.log(c_name);
    var username = req.session.user;
    ctl_thread.getAllThreads(username, c_name)
        .then(function(threads){
            console.log("CNAME => " + c_name);
            res.render("page", {threads: threads, community:c_name});
        }).catch(function (err) {
            res.status(404).send("Community not found");
    });
});

router.get('/:community_name/:thread_id/comments', function(req, res, next) {
    //process req
    asyncGetThreadById(req, res, next);
});

/* POST Create a thread */
router.post('/:community_name/thread/submit', function(req, res, next) {

    userLogedName = req.session.user;

    ctl_user.getUserByUsername(userLogedName)
        .then( user =>{
            if(user){
                asyncCallPostThread(user,req,res);
            }
            else{
                res.send("Debes loguearte primero");
            }
        });
});

/* POST Create a comment */
router.post('/:community_name/:thread_id/comments/submit', function (req, res, next) {
    //process req
    let  c_name = req.params.community_name;
    var threadId = req.params.thread_id;
    var text = req.body.text;
    var autor = req.session.user;
    var reply = req.body.reply;

    //Implementation
    if (autor !== undefined) {
        comment_ctl.createComment(threadId, text, autor, reply)
            .then(function (success) {
                res.redirect('/c/'+c_name+'/'+threadId+'/comments');
            }, function (err) {
                res.status(500).send(err);
            });
    } else {
        res.status(403).send("¡WARNING! Sign in to continue");
    }
});


async function asyncCallPostThread(user, req,res) {
    let  c_name = req.params.community_name;
  //Hay que cambiarlo
  var result = await ctl_thread.postThread(user,req.body['title'],req.body['text'],c_name);

  console.log("resultado del async",result.id);
  if (result){
    res.redirect('/c/'+c_name);
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


async function asyncGetThreadById(req, res, next){

    var threadId = req.params.thread_id;
    var c_name = req.params.community_name;
    var thread = await ctl_thread.getThreadById(threadId);
    thread.karma = await ctl_like.findallLikesfromThread(threadId, req, res);

    var comments = await comment_ctl.getAllByThreadId(threadId);
    for(i in comments){
        
        var votos = await ctl_like_c.findallLikesfromComment(comments[i]['id'], req, res);
        if(!votos){
            votos=0;
        }
        comments[i].karma=votos;
  }
    console.log(thread);
    res.render('thread', {thread, 'comments': comments, 'community':c_name});
}


module.exports = router;
