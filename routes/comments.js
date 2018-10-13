
var express = require('express');
var router = express.Router();
var comment_ctl = require('../controllers/comment_controller');

//Comment routes

/*
 GET AllCommentByThread
 */
router.get('/Comments/:threadId/All', comment_ctl.getAllByThreadId(req,res));