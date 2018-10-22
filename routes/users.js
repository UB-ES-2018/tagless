var express = require('express');
var router = express.Router();
var ctl_user = require('../controllers/user_controller');


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
router.post('/signup', ctl_user.userController_Signup);


/* GET user singup. */
router.get('/signup', function(req, res, next) {

  res.render('signup');
//TODO
//Get data from request and create user
//res.render('signup');
});

router.put('/profileView/:userId', ctl_user.updateProfile);

router.get('/profileView/:userId', ctl_user.getUserById);


module.exports = router;
