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

    /*

    if (req.session.views) {
        req.session.views++;
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
*/

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


/* GET user singup. */
router.get('/signup', function(req, res, next) {

  res.render('signup');
//TODO
//Get data from request and create user
//res.render('signup');
});


module.exports = router;
