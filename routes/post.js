var express = require('express');
var router = express.Router();
var Tittle_post;
var Text_post;

/* POST Create a post */
router.post('/submit', function(req, res, next) {
  //Get a request and create a post
  //Requires to be logged
  Tittle_post = req.body['title'];
  Text_post   = req.body['text']
  console.log(Tittle_post,Text_post);


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
