
var express = require('express');
var router = express.Router();
var thread_ctl = require('../controllers/thread_controller');


/* POST Create a post */
router.post('/submit', thread_ctl.postThread);

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
