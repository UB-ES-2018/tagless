var sequelizeConnection = require("../config/sequelizeConnection");
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

exports.postThread = function(t_title,t_text) {

    var sequelize = sequelizeConnection.sequelize;

    const Thread = threadModel(sequelize, DataTypes);
    //We look for the user id with the fetUser method just with the user name
    //yeh... we have to change it.
    userController.getUser("zic", function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            if (content){
                //With this id, the title and the text we create the model to the database.
                Thread.create({
                    userId: content,
                    title: t_title,
                    description: t_text,
                });
            }
            else{
                console.log("No hay ningun mensaje de este usuario")
            }
        }
    });

};

exports.getAllByThread = function(threadId){

    var sequelize = sequelizeConnection.sequelize;

    return new Promise(function(resolve, reject){
        if (threadId != ""){
          sequelize.query("SELECT * FROM Threads")
              .then(function(allThreads){
                console.log(allThreads);
                resolve();
              }, function(err){
                reject("Query failed");
              });
        }else{
          reject("Thread is null");
        }
    });
    

};