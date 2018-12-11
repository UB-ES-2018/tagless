var express = require('express');
var router = express.Router();
var ctl_user = require('../controllers/user_controller');
var fileUpload = require("express-fileupload");
var path = require('path');
var fs = require('fs');

router.use(fileUpload());


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        next();
    }
};

// route for user logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
    }
    res.redirect('/');
});

/* POST user login. */
router.post('/login', sessionChecker, function (req, res, next) {

    //Get data from request and log user
    ctl_user.userController_Login(req.body['username'], req.body['password'],
        function(success) {
            if (success instanceof Error){
                return res.send(success.message);
            }
            if(success){
                req.session.user = req.body['username'];
                res.redirect("/");
            } else {
                res.send("Wrong password");
            }
        });
});

/* GET user singup. */
router.get('/signup', function (req, res, next) {

    res.render('signup');
});

/* POST user register. */
router.post('/signup', function (req, res, next) {
    //TODO
    //Get data from request and log user
    ctl_user.userController_Signup(req.body['email'], req.body['username'], req.body['password'])
        .then(function(success){
            if (success instanceof Error){
                return res.send(success.message); // - WIDGET ERRO AL CREAR -
            }
            if(success){
                res.redirect('/');
            }
        }, function (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        });
});

router.get('/:username/', function (req, res) {
    var username=req.params.username;
    ctl_user.getUserByUsername(username)
        .then(function(user){
            //console.log(user);
            if (!user) return res.status(404).send("User Not found");
            let show_user;
            if (user.privacity === 0) show_user = true;
            else if (user.privacity === 1) show_user = res.locals.is_logged;
            else show_user = res.locals.is_logged && res.locals.logged_username === username;
            if (show_user){
                ctl_user.getCommentedThreadsByUser(user.id).then(function (threads) {
                    return res.render('user/user_activity', {
                        user:user.dataValues,
                        threads: threads
                    });
                }, function (err) {
                    console.log(err);
                    res.status(500).send("Internal server error");
                });
            }else{
                return res.render('user/user_private', {
                    user:user.dataValues
                });
            }
        }, function (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        });

});

router.get('/:username/settings', function (req, res) {
    //process req
    var username = req.params.username;
    if (!res.locals.is_logged || res.locals.logged_username !== username) return res.status(403).send();
    //Implementation
    ctl_user.getUserByUsername(username)
        .then(function(user){
            res.render('user/user_settings', {
                user:user.dataValues
            });
        }, function(err){
            console.log(err);
            res.status(500).send("Internal server error");
        });
});

function moveFile(file, somePlace) {
    return new Promise((resolve, reject) => {
        file.mv(somePlace, function (err) {
            if (err) return reject(err);

            resolve();
        });
    });
}

router.post('/:username/settings', function (req, res, next) {
    //process req
    var username = req.params.username;
    var description = req.body.description;
    var privacity = req.body.privacity;
    var appDir = path.dirname(require.main.filename);

    //Implementation
    ctl_user.getUserByUsername(username)
        .then(function(user){
            ctl_user.updateProfile(user.id, description, null, privacity)
                .then(function(success){
                    console.log("User updated");
                }, function(err){
                    throw err;
                });
        }, function(err){
            throw err;
        });

    try {

        if (Object.keys(req.files).length > 0) {
            let filepath = appDir + "/../public/images/users/" + username;

            

            if (!fs.existsSync(filepath)) {


                fs.mkdirSync(filepath, {recursive: true}, (err) => {
                    if (err) throw err;
                });
            }
            const fileMovePromise =
                req.files ? moveFile(req.files.image, filepath + '/profile.jpg') : Promise.resolve('No file present');

            fileMovePromise
                .then(() => {

                    //TODO:
                    res.redirect("/users/" + username);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        }
    } catch (err){
        res.status(500).send(err);
    }

    res.redirect("/users/"+username);
});

module.exports = router;
