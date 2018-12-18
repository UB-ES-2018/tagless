var express = require('express');
var router  = express.Router();
var ctl_thread = require('../controllers/thread_controller');
var ctl_like = require('../controllers/like_controller');
var ctl_like_comments = require('../controllers/Like_comment_controller');
var ctl_community = require('../controllers/comunity_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
    //Get all threads
    var username = req.session.user;
    ctl_thread.getAllThreads(username)
        .then( function (threads){
            res.render('frontpage', { title: 'Express', 'threads':threads});
        });
});


router.post('/community/submit', function(req, res){
    let community_name = req.body.name;
    let community_description = req.body.description;
    ctl_community.postComunity(community_name, community_description)
        .then(function(comunity) {
            res.redirect("/c/" + comunity.comunityName);
        }).catch(function (err) {
        res.redirect("/");
    });
});

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


async function asyncCallToShowMostLikedThreads() {
    var result = await ctl_like.getMostLikedThreads();
    return result;
}

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


module.exports = router;
