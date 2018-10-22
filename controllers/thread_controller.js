var sequelizeConnection = require("../config/sequelizeConnection");
var userController = require('./user_controller');
var Comment = require('../models/thread');

var DataTypes = require('sequelize/lib/data-types');


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


exports.thread_postThread = function(req,res) {

    //console.log("hola");
    /*
    var sequelize = sequelizeConnection.sequelize;

    const Thread = threadModel(sequelize, DataTypes);

    userController.getUser("zic", "aa", function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            console.log("añadiendo post...");
            if (content){                
                Thread.create({
                    title: req.body.title,
                    description: req.body.text,
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
    */

    //res.send("Posted");
    

}

exports.thread_postThread = function() {

    //export thread from the database.


};

 function getAllThreads(callback){

    var sequelize = sequelizeConnection.sequelize;

    sequelize.query('SELECT title,text FROM _thread ;',function (err, row, fields){
        if (err) throw err;
        var list = [];
        for (i in row){
            list[i] = row[i]['text'];
        }
        callback(null,list);
        
        
    });
    

};