var express = require('express');
var router = express.Router();




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

/* POST user login. */
router.post('/signup', function(req, res, next) {
  //TODO
  //Get data from request and log user

  res.send("Registered");
});


module.exports = router;
