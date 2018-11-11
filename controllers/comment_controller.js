var sequelizeConnection = require('../config/sequelizeConnection');
var sequelize = sequelizeConnection.sequelize;
var Comment = require('../models/comment');
var User = require('../models/user');

var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

//Comment Controller

exports.getAllByThreadId = function(threadId){

 return new Promise(function(resolve, reject){
   var UserModel = User(sequelize, DataTypes);
   var CommentModel = Comment(sequelize, DataTypes);

   if (threadId != ""){

     UserModel.hasMany(CommentModel, {foreignKey: "userId"});
     CommentModel.belongsTo(UserModel, {foreignKey: "userId"});

     CommentModel.findAll({ where: {}, include: [UserModel] })
         .then(function(data){
           console.log("Legth of data retrieved = " + data.length);
           for (var i=0; i<data.length; i++){
             console.log("data ["+i+"] = " + data[i].dataValues.User.username);
           }
           resolve(data);
         }, function(err){
           reject(err);
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