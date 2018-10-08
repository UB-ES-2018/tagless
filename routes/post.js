
var express = require('express');
var router = express.Router();
var ctl_thread = require('../controllers/thread_controller');

/* POST Create a post */
router.post('/submit', function(req, res, next) {


  console.log(req.body['text']);
  ctl_thread.thread_getThread(req.body['title'],req.body['text'])

  //Get a request and create a post
  //Requires to be login
  res.send("Posted");
});

router.get('/:post_id/comments/', function(req, res, next) {
  var post_id = req.params.post_id; 


  //TODO
  //Find the post with the id and return the post and its comments
  ctl_thread.thread_postThread(function(err, content) {
    if (err) {
        return next("Mysql error, check your query");
    } else {
        res.render('post', { title: 'Express', 'comments': content });
    }

});
/* POST Create a comment */
router.post('/:post_id/comment/submit', function(req, res, next) {
  var post_id = request.params.post_id;
  //TODO
  //Find the post with the id and return the post and its comments
  res.send("Commented");
});

module.exports = router;
