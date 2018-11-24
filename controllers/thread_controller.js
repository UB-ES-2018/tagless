var sequelizeConnection = require("../config/sequelizeConnection");
var sequelize = sequelizeConnection.sequelize;
var userController = require('./user_controller');
var threadModel = require('../models/thread');
var likeModel = require('../models/like');

var DataTypes = require('sequelize/lib/data-types');

exports.postThread = function(u_username,t_title,t_text) {

    const Thread = threadModel(sequelize, DataTypes);
    const Like = likeModel(sequelize, DataTypes);
    //We look for the user id with the fetUser method just with the user name
    //yeh... we have to change it.

    //Check if the content or the title of the thread are not empty
    if(!((t_title.replace(/\s/g, "")) && (t_text.replace(/\s/g, "")))){
        return false;
    }
    else{
        //Get the user of the username loged and post in his name. (if it is loged)
        return userController.getUserByUsername(u_username)
            .then(function(user){
                var threadId;
                //With this id, the title and the text we create the model to the database.
                Thread.create({
                    userId : user['id'],
                    userName : user['username'],
                    title: t_title,
                    description: t_text,
                }).then(thread => {
                    console.log("Thread created and added to sitexml");
                    sitemap.add({url: 'thread/' + thread.id + '/comments'});
                    sitemap.clearCache();
                    return thread;
                }).then( threadCreated => {
                    Like.create({
                        userId: threadCreated.userId,
                        thread_id: threadCreated.id,
                        vote: 1,
                    });
                });
                return true;
            }, function(err){
                return false;
        });

    }
    

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

        ThreadModel.find({where : {id : threadId} })
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
            var list = []
            while(i < 5 && i< result){
                list.push(result[i]);
            }
            resolve(list);

        });

    });
}