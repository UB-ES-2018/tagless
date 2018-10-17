
var express = require('express');
var router = express.Router();

/* POST Create a post */
router.post('/submit', function(req, res, next) {
  console.log(req.body);
  //Get a request and create a post
  //Requires to be login
  res.send("Posted");
});

router.get('/:post_id/comments/', function(req, res, next) {
  var post_id = req.params.post_id;

  //TODO
  //Find the post with the id and return the post and its comments
  res.render('post', { title: 'Express', 'comments':[]});
});
/* POST Create a comment */
router.post('/:post_id/comment/submit', function(req, res, next) {
  var post_id = request.params.post_id;
  //TODO
  //Find the post with the id and return the post and its comments
  res.send("Commented");
});

module.exports = router;
