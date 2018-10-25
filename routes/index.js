var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all threads
  console.log(req.sessionID);
  res.render('index', { title: 'Express', 'threads':[]});
});

module.exports = router;
