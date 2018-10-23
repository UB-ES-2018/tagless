var sequelizeConnection = require('../config/sequelizeConnection');
var sequelize = sequelizeConnection.sequelize;
var Comment = require('../models/comment');

var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

//Comment Controller

exports.getAllByThreadId = function(threadId){

 return new Promise(function(resolve, reject){
   if (threadId != ""){
     sequelize.query("SELECT * FROM Comments WHERE threadId = " + threadId + " ORDER BY createdAt")
         .then(function(allComments){
           resolve(allComments[0]);
         }, function(err){
           reject("Query failed");
         });
   }else{
     reject("Thread is null");
   }
 });
};

exports.createComment = function(threadId, text, autor, reply){

  return new Promise(function(resolve, reject){
    var CommentModel = Comment(sequelize, DataTypes);

    CommentModel.create({
      body: text,
      threadId: threadId,
      userId: autor,
      replyId: reply,
      edited: false})
        .then(function(data){
              resolve("New Comment created successfully");
            },function(err){
              reject("Error ocurred: "+err);
            }
        );
  });
}