var sequelizeConnection = require("../config/sequelizeConnection");
var sequelize = sequelizeConnection.sequelize;
var userController = require('./user_controller');
var threadModel = require('../models/thread');

var DataTypes = require('sequelize/lib/data-types');



exports.thread_getThread = function(t_title,t_text) {

    getAllThreads(function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            console.log(content);
        }
    });
    
    

};

exports.postThread = function(u_username,t_title,t_text) {

    const Thread = threadModel(sequelize, DataTypes);
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
                //With this id, the title and the text we create the model to the database.
                Thread.create({
                    userId : user['id'],
                    userName : user['username'],
                    title: t_title,
                    description: t_text,
                });
                return true;
    xº
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