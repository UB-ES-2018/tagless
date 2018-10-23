var express = require('express');
var router = express.Router();
var ctl_user = require('../controllers/user_controller');


/* POST user login. */
router.post('/login', function (req, res, next) {
    console.log(req.body);

    //Get data from request and log user
    ctl_user.userController_Login(req.body['username'], req.body['password'], function(success) {
        if(success){
            res.send("Logged");
        } else {
            res.send("Wrong password");
        }
    });
});

/* POST user register. */
router.post('/signup', function (req, res, next) {
    //TODO
    //Get data from request and log user
    ctl_user.userController_Signup(req.body['email'], req.body['username'], req.body['password']);

    res.send("Registered");
});


/* GET user singup. */
router.get('/signup', function (req, res, next) {

    res.render('signup');
//TODO
//Get data from request and create user
//res.render('signup');
});

router.put('/profileView/:userId', ctl_user.updateProfile)

router.get('/profileView/:userId', ctl_user.getUserById);


module.exports = router;
