var sequelizeConnection = require("../config/sequelizeConnection");
var userController = require('./user_controller');
var Comment = require('../models/thread');

var DataTypes = require('sequelize/lib/data-types');
var threadModel = require('../models/thread');


exports.thread_getThread = function(t_title,t_text) {

    //create thread into database.

    var sequelize = sequelizeConnection.sequelize; //instance to query



    
    getAllThreads(function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            console.log(content);
        }
    });
    

};


exports.postThread = function(req,res) {

    var sequelize = sequelizeConnection.sequelize;

    const Thread = threadModel(sequelize, DataTypes);

    userController.getUser("zic",function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            console.log("añadiendo post...");
            if (content){                
                Thread.create({
                    title: req.body['title'],
                    description: req.body['description'],
                    id_user : content,

                });

                res.send("Posted");
                console.log("post añadido...");
            }
            else{
                console.log("No hay ningun mensaje de este usuario")
            }
        }
    });
    

}

 function getAllThreads(req,res){

    var sequelize = sequelizeConnection.sequelize;

    sequelize.query('SELECT title,description FROM Threads ;',function (err, row, fields){
        if (err) throw err;
        else{
            console.log(row[0]['title']);
        }
        
        
    });
    

};