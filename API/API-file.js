const express = require('express');
var router = express.Router();
var ctl_comment = require('../controllers/comment_controller');
var ctl_user = require('../controllers/user_controller');
var ctl_thread = require('../controllers/thread_controller');
var ctl_likethread = require('../controllers/like_controller');
var ctl_likecomment = require('../controllers/Like_comment_controller');


//Middleware to check API key
async function asyncCheckAPIKey(req,res,next){
    try{
        var result = await ctl_user.getUserByAPIKey(req.headers['api-key'] );
        if (result){
            next();
        }
        else{
            res.send("La API key no es valida");
        }
    }
    catch(err) {
        res.send("La API key no es valida");
    }
}

router.get('/user/username/:user',asyncCheckAPIKey, function(req,res,next){
    var username = req.url.substr((req.url.indexOf("/",6)+1),req.url.length);
    ctl_user.getUserByUsername(username).then( user =>{
        if(user){
            var visible;
            visible = user.apiKey == req.headers['api-key'];
            
            if(visible || (user.privacity == 1 || user.privacity == 0)){
                res.json({
                    apiKey : user.apiKey,
                    id: user.id,
                    username: user.username,
                    password: user.pass,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    privacity: user.privacity,
                    description: user.description,
                    pictureLink: user.pictureLink,
                });
            }
            else{
                res.send("Private User")
            }
        }
        else{
            res.json({
                success: false,
            })
        }
    });

});

router.get('/user/id/:user/activity',asyncCheckAPIKey, function(req,res,next){

    var substruser = req.url.substr((req.url.indexOf("/",6)+1),req.url.length);
    var username = substruser.substr(0,substruser.indexOf("/"));

    console.log(username);

    ctl_user.getCommentedThreadsByUser(username).then(function (threads) {
        return res.json({
            threads: threads
        });
    }, function (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    });
});


router.get('/user/id/:user',asyncCheckAPIKey, function(req,res,next){
    var userid = parseInt(req.url.substr(req.url.indexOf("/",6)+1,req.url.length));

    ctl_user.getUserById(userid).then( user =>{
        if(user){
            var visible;
            visible = user.apiKey == req.headers['api-key'];
            
            if(visible || (user.privacity == 1 || user.privacity == 0)){
                res.json({
                    apiKey : user.apiKey,
                    id: user.id,
                    username: user.username,
                    password: user.pass,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    privacity: user.privacity,
                    description: user.description,
                    pictureLink: user.pictureLink,
                });
            }
            else{
                res.send("Private User")
            }
        }
        else{
            res.json({
                success: false,
            })
        }
    });
});


router.get('/user/username/:user/threads',asyncCheckAPIKey, function(req,res,next){

    var substruser = req.url.substr((req.url.indexOf("/",6)+1),req.url.length);
    var username = substruser.substr(0,substruser.indexOf("/"));
    
    ctl_thread.getUserThreads(username).then(threads => {
        if(threads){
            var list= [];
            for (i in threads){
                var elem = {
                    id: threads[i].id,
                    userId: threads[i].userId,
                    userName: threads[i].userName,
                    title: threads[i].title,
                    description: threads[i].description,
                    createdAt: threads[i].createdAt,
                    updatedAt: threads[i].updatedAt,
                };
                list.push(elem);
            };
            res.json(list);
        }
        else{
            res.json({
                success: false,
            })
        }
    }, function (err) {
        res.status(500).send("Internal server error");
    });
    

});
  

router.get('/threads', asyncCheckAPIKey ,function (req, res, next) {
    ctl_thread.getAllThreads().then(threads => {
            if(threads){
                var list= [];
                for (i in threads){
                    var elem = {
                        id: threads[i].id,
                        userId: threads[i].userId,
                        userName: threads[i].userName,
                        title: threads[i].title,
                        description: threads[i].description,
                        createdAt: threads[i].createdAt,
                        updatedAt: threads[i].updatedAt,
                    };
                    list.push(elem);
                };
                res.json(list);
            }
            else{
                res.json({
                    success: false,
                })
            }
        }, function (err) {
            res.status(500).send("Internal server error");
        });
});


router.get('/thread/:id', asyncCheckAPIKey ,function (req, res, next) {
    var threadId = parseInt(req.url.substr(8,req.url.length));

    ctl_thread.getThreadById(threadId).then(thread => {
            if(thread){
                res.json({
                    id: thread.id,
                    userId: thread.userId,
                    userName: thread.userName,
                    title: thread.title,
                    description: thread.description,
                    createdAt: thread.createdAt,
                    updatedAt: thread.updatedAt,
                });
            }
            else{
                res.json({
                    success: false,
                })
            }
        }, function (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        });
});


router.get('/thread/:id/comments', asyncCheckAPIKey ,function (req, res, next) {
    var threadId = parseInt(req.url.substr(req.url.indexOf("/",1)+1,req.url.indexOf("/",req.url.indexOf("/",1)+1)));
    ctl_comment.getAllByThreadId(threadId).then( comments => {
            if (comments){
                var list= [];
                for (i in comments){
                    var elem = {
                        id: comments[i].id,
                        userId: comments[i].userId,
                        replyId: comments[i].replyId,
                        threadId: comments[i].threadId,
                        body: comments[i].body,
                        edited: comments[i].edited,
                        createdAt: comments[i].createdAt,
                        updatedAt: comments[i].updatedAt,
                    };
                    list.push(elem);
                };
                res.json(list);
            }else{
                res.json({
                    success: false,
                })
            }
        }, function (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        });
});

router.get('/thread/:id/likes', asyncCheckAPIKey ,function (req, res, next) {
    var threadId = parseInt(req.url.substr(req.url.indexOf("/",1)+1,req.url.indexOf("/",req.url.indexOf("/",1)+1)));
    ctl_likethread.findallLikesfromThread(threadId)
        .then(function(success) {
            if (success){
                res.json({
                    success:true,
                    num_likes: success,
                })
            }else{
                res.json({
                    success: false,
                })
            }
        });
});

router.get('/thread/:id/comments/:comment', asyncCheckAPIKey ,function (req, res, next) {
    var threadId = parseInt(req.url.substr(req.url.indexOf("/",1)+1,req.url.indexOf("/",req.url.indexOf("/",1)+1)));
    var commentId = req.url.substr(req.url.indexOf("/",1)+12,req.url.length);

    ctl_likecomment.findallLikesfromComment(commentId)
        .then(function(likes) {
            ctl_comment.searchComment(threadId,commentId)
                .then( function (data) {
                    if (data == "no comments" ) {
                        res.json({
                            success: false,
                        });
                    }else {
                        res.json({
                            success:true,
                            id:data['id'],
                            content: data['body'],
                            createdAt: data['createdAt'],
                            updatedAt: data['updatedAt'],
                            threadId: data['threadId'],
                            userId: data['userId'],
                            num_likes: likes,
                        })
                    }
                });
         });
});

/* As headers we have:
 * api-key : "Api key provided in the profile"
 * Content-Type : application/x-www-form-urlencoded
 *
 * As x-www-form-urlencoded data we have 3 keys:
 * username
 * email
 * password
 *
 * Return: True (if signed up) False (user already signed up)
 */
router.post('/signup', function (req, res, next) {
    ctl_user.userController_Signup(req.body['email'], req.body['username'], req.body['password'])
        .then(function(success){
            if(success){
                res.json({
                    success: true,
                })
            }else {
                res.json({
                    success: false,
                })
            }
        }, function (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        });
});

/* As headers we have:
 * api-key : "Api key provided in the profile"
 * Content-Type : application/x-www-form-urlencoded
 *
 * As x-www-form-urlencoded data we have 2 keys:
 * title
 * text
 *
 * Return: True (if thread created) False (can not create thread)
 */
router.post('/createThread', asyncCheckAPIKey, function (req, res, next) {
    ctl_user.getUserByAPIKey(req.headers['api-key'])
        .then(function(user) {
            ctl_thread.postThread(user,req.body['title'],req.body['text'],null)
                .then(function(success){
                    if(success){
                        res.json({
                            success: true,
                        })
                    }else {
                        res.json({
                            success: false,
                        })
                    }
                }, function (err) {
                    console.log(err);
                    res.status(500).send("Internal server error");
                });
        });
});

/* As headers we have:
 * api-key : "Api key provided in the profile"
 * Content-Type : application/x-www-form-urlencoded
 *
 * As x-www-form-urlencoded data we have 2 keys:
 * threadId
 * text
 *
 * Return: True (if comment created) False (can not create comment)
 */
router.post('/createCommentInThread', asyncCheckAPIKey, function (req, res, next) {

    ctl_user.getUserByAPIKey(req.headers['api-key'])
        .then(function(user) {
            ctl_comment.createComment(req.body['threadId'], req.body['text'], user['username'] ,0)
                .then(function(success){
                    res.status(200).send(success).json({
                        success: true,
                    });
                }, function(err){
                    res.status(500).send(err).json({
                        success: false,
                    });
                });
        });
});

/* As headers we have:
 * api-key : "Api key provided in the profile"
 * Content-Type : application/x-www-form-urlencoded
 *
 * As x-www-form-urlencoded data we have 2 keys:
 * username
 * password
 *
 * Return: True (if comment created) False (can not create comment)
 */
router.post('/login', function (req, res, next) {

    ctl_user.userController_Login(req.body['username'], req.body['password'],
        function(success) {
            if (success instanceof Error){
                return res.send(success.message);
            }
            if(success){
                req.session.user = req.body['username'];
                res.json({
                    success: true,
                });
            } else {
                res.json({
                    success: false,
                });
            }
        });
});

/* As headers we have:
 * api-key : "Api key provided in the profile"
 * Content-Type : application/x-www-form-urlencoded
 *
 * As x-www-form-urlencoded data we have 3 keys:
 * description
 * picturelink
 * privacity
 *
 * Return: True (if profile updated) False (can not update profile)
 */
router.post('/updateProfile', asyncCheckAPIKey, function (req, res, next) {

    ctl_user.getUserByAPIKey(req.headers['api-key'])
        .then(function(user) {
            ctl_user.updateProfile(user['id'], req.body['description'], req.body['pictureLink'], req.body['privacity'])
                .then(function(success){
                    res.status(200).send(success).json({
                        success: true,
                    });
                }, function(err){
                    res.status(500).send(err).json({
                        success: false,
                    });
                });
        });
});

module.exports = router;