var express = require('express');
var router = express.Router();
var ctl_user = require('../controllers/user_controller');

/* GET user singup. */
router.get('/signup', function(req, res, next) {

        res.render('signup');
    //TODO
    //Get data from request and create user
    //res.render('signup');
});

/* POST user login. */
router.post('/login', function(req, res, next) {
  //TODO
  //Get data from request and log user

  console.log(req.body);
  console.log(req.body['username']);
  console.log(req.body['password']);
  res.send("Loged");
});

/* POST user login. */
router.post('/login', function(req, res, next) {
  //TODO
  //Get data from request and log user
  res.send("Loged");
});

/* POST user register. */
router.post('/signup', function(req, res, next) {
  //TODO
  //Get data from request and log user
  ctl_user.userController_Signup(req.body['email'],req.body['username'], req.body['password']);

  res.send("Registered");
});


module.exports = router;
