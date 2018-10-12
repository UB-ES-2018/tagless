var sequelizeConnection = require("../config/sequelizeConnection");
var userController = require('./user_controller');



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
    
    userController.getUser("zic", "aa", function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            if (content){
                var sql = "INSERT INTO _thread (userid, title ,text) VALUES (?,?,?)";
                var params = [content,t_title, t_text];
                sequelize.query(sql, params ,function(err, result) {
                    if (err) throw err;
                });
            }
            else{
                console.log("No hay ningun mensaje de este usuario")
            }
        }
    });
    

};

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