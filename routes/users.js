var express = require('express');
var router = express.Router();

/* POST user login. */
router.post('/login', function(req, res, next) {
  //TODO
  //Get data from request and log user
  res.send("Loged");
});

/* POST user login. */
router.post('/signup', function(req, res, next) {
  //TODO
  //Get data from request and log user
  res.send("Registered");
});

/* GET user singup. */
router.get('/signup', function(req, res, next) {
  //TODO
  //Get data from request and create user
  res.render('signup');
});


module.exports = router;
