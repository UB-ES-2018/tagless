var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all posts
  console.log(req.sessionID);
  res.render('index', { title: 'Express', 'posts':[]});
});

module.exports = router;
