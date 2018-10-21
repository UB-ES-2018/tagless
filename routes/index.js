var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all posts
  res.render('index', { title: 'Express', 'threads':[]});
});

module.exports = router;
