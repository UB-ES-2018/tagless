var sequelizeConnection = require('../config/sequelizeConnection');
var sequelize = sequelizeConnection.sequelize;
var Comment = require('../models/comment');

var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

//Comment Controller

exports.getAllByThreadId = function(req, res){
  console.log(req.params.threadId);

  if (res.threadId !== "") {
    sequelize.query("SELECT * FROM Comments WHERE threadId = " + req.params.threadId + " ORDER BY createdAt")
        .then(function (allComments) {
          res.json(allComments[0]);
        }, function (reason) {
          res.writeHead(500, {'Content-Type' : 'application/json'});
          res.send();
          res.end();
        });
  }else{
    res.writeHead(500, {'Content-Type' : 'application/json'});
    res.send();
    res.end();
  }
};

exports.createComment = function(req, res){

  var CommentModel = Comment(sequelize, DataTypes);

  CommentModel.create({
    body: req.body.text,
    threadId: req.params.threadId,
    userId: req.body.autor,
    replyId: req.body.reply,
    edited: false})
      .then(function(data){
        res.status(200).send();
      },function(reason){
        res.status(500).send();
      }
  );
}