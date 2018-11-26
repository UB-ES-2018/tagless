const express = require('express');
const app = express();
var router = express.Router();
var ctl_comment = require('../controllers/comment_controller');
var ctl_thread = require('../controllers/thread_controller');
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



router.get('/user/:user',asyncCheckAPIKey, function(req,res,next){

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
            var userid = parseInt(username);
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
        }
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


/*
    var request = require("request");

    var options = { method: 'POST',
      url: 'http://localhost:3000/API/signup',
      headers:
       { 'cache-control': 'no-cache',
         'Content-Type': 'application/x-www-form-urlencoded',
         'api-key': 'fb8268a9e97502ce0c10024cf6e3136f' },
      form:
       { username: 'xxx',
         password: 'xxx',
         email: 'xxxx' } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });
 */

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
router.post('/createThread', ayncCheckAPIKey, function (req, res, next) {

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


module.exports = router;