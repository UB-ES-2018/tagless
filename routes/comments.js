
const express = require('express');
const app = express();
var router = express.Router();
var comment_ctl = require('../controllers/comment_controller');

//Comment routes


router.get('/:threadId/all', function(req,res,next){

  //process req
  var threadId = req.params.threadId;

  comment_ctl.getAllByThreadId(threadId)
      .then(function(comments){
        res.json(comments);
      }, function(err){
        console.log(err);
        res.status(500).send(err);
      })
});

router.post('/:threadId', function(req,res,next){
  //process req
  var threadId = req.params.threadId;
  var text = req.body.text;
  var autor = req.body.autor;
  var reply = req.body.reply;


  comment_ctl.createComment(threadId, text, autor, reply)
      .then(function(success){
        res.status(200).send(success);
      }, function(err){
        res.status(500).send(err);
      })
});

module.exports = router;