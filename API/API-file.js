const express = require('express');
const app = express();
var router = express.Router();
var ctl_comments = require('../controllers/comment_controller');
var ctl_user = require('../controllers/user_controller');
var ctl_thread = require('../controllers/thread_controller');
//Middleware to check API key
async function ayncCheckAPIKey(req,res,next){
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


router.get('/user', ayncCheckAPIKey ,function (req, res, next) {
    ctl_user.getUserByAPIKey(req.headers['api-key'] )
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
router.post('/signup', ayncCheckAPIKey, function (req, res, next) {
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