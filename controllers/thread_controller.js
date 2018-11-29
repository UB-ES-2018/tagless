var sequelizeConnection = require("../config/sequelizeConnection");
var sequelize = sequelizeConnection.sequelize;
var userController = require('./user_controller');
var threadModel = require('../models/thread');
var likeModel = require('../models/like');
var DataTypes = require('sequelize/lib/data-types');


exports.postThread = function(user,t_title,t_text) {

    return new Promise(function(resolve,reject) {
        const Thread = threadModel(sequelize, DataTypes);
        const Like = likeModel(sequelize, DataTypes);
        var success = true;
        if (user){
            //Check if the content or the title of the thread are not empty
            if(!((t_title.replace(/\s/g, "")) && (t_text.replace(/\s/g, "")))){
                resolve(!success);
            }
            else {
                userController.getUserByUsername(user['username'])
                    .then(function(user){
                        //With this id, the title and the text we create the model to the database.
                        Thread.create({
                            userId : user['id'],
                            userName : user['username'],
                            title: t_title,
                            description: t_text,
                        }).then( threadCreated => {
                            Like.create({
                                userId: threadCreated.userId,
                                thread_id: threadCreated.id,
                                vote: 1,
                            });
                        });
                        resolve(success);
                    }, function(err){
                        resolve(!success);
                    });
            }
        }
        else{
            resolve(!success);
        }
    });
};


exports.getAllThreads = function(){

    return new Promise(function(resolve, reject){

        sequelize.query("SELECT * FROM Threads")
            .then(function(allThreads){

            resolve(allThreads[0]);  
            }, function(err){
            reject("Query failed");
            });
    });
    
};


exports.getThreadById = function(threadId){

    return new Promise(function(resolve, reject){
        var sequelize = sequelizeConnection.sequelize;
        var ThreadModel = threadModel(sequelize, DataTypes);

        ThreadModel.findOne({where : {id : threadId} })
            .then(function(thread){
                resolve(thread);
            }, function(err){
                console.log("Error ocurred: "+err);
                reject(err);
            })
  });
};


exports.getUserThreads = function(u_username){
    return new Promise(function(resolve, reject){
        var Threads = threadModel(sequelize, DataTypes);
        Threads.findAll({where : {username : u_username},
            order: [ [ 'updatedAt', 'DESC' ]] })
        .then(result => {
            var i = 0;
            var list = [];
            while(i < 5 && i< result.length){
                list.push(result[i]);
                i++;
            }
            resolve(list);
        });
    });
};