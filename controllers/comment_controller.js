var sequelizeConnection = require('../config/sequelizeConnection');
var sequelize = sequelizeConnection.sequelize;
var Comment = require('../models/comment');
var User = require('../models/user');
var elasticUtils = require('../config/elasticsearch/elasticsearchMain');
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

     CommentModel.findAll({ where: { threadId : threadId }, include: [UserModel] })
         .then(function(data){
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
    var UserModel = User(sequelize, DataTypes);
    var success = true;

    UserModel.findOne({ where : { username : autor } })
        .then(function(user){
            if ( (threadId || text || autor || reply) == null) {
                resolve(!success);
            }else {
                CommentModel.create({
                    body: text,
                    threadId: threadId,
                    userId: user.id,
                    replyId: reply,
                    edited: false
                })
                    .then(function(data){
                            elasticUtils.addDocument("comment", data.dataValues);
                            resolve(success);
                        },function(err){
                            reject("Error ocurred: "+err);
                        }
                    );

                }
            }, function(err){
                reject("Error ocurred: "+err);
            });
    });
};

exports.searchComment = function(threadId,commentId){

    return new Promise(function(resolve, reject){
        var UserModel = User(sequelize, DataTypes);
        var CommentModel = Comment(sequelize, DataTypes);

        if (threadId != ""){

            UserModel.hasMany(CommentModel, {foreignKey: "userId"});
            CommentModel.belongsTo(UserModel, {foreignKey: "userId"});

            CommentModel.findOne({ where: { threadId : threadId, id:commentId}, include: [UserModel] })
                .then(function(data){
                    if(data === null) {
                        resolve("no comments");
                    }else {
                        resolve(data);
                    }
                }, function(err){
                    reject(err);
                });

        }else{
            reject("Thread is null");
        }
    });
};