const express = require('express');
var router = express.Router();
var ctl_comment = require('../controllers/comment_controller');
var ctl_user = require('../controllers/user_controller');
var ctl_thread = require('../controllers/thread_controller');

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

router.get('/users', asyncCheckAPIKey ,function (req, res, next) {
    ctl_user.getUserByAPIKey(req.headers['api-key'])
        .then(function(user){
            if(user){
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


router.get('/user/username/:user',asyncCheckAPIKey, function(req,res,next){
    var username = req.url.substr(req.url.indexOf("/",6)+1,req.url.length);

    var username = req.url.substr(6,req.url.length);
    ctl_user.getUserByUsername(username).then( user =>{
        if(user){
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
            })
        }
        else{
            res.json({
                success: false,
            })
        }
    });

});

router.get('/user/id/:user',asyncCheckAPIKey, function(req,res,next){
    var userid = parseInt(req.url.substr(req.url.indexOf("/",6)+1,req.url.length));

    ctl_user.getUserById(userid).then( user =>{
        if(user){
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
            })
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
        console.log(err);
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
            console.log(err);
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
router.post('/signup', asyncCheckAPIKey, function (req, res, next) {
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
            ctl_thread.postThread(user,req.body['title'],req.body['text'])
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

module.exports = router;