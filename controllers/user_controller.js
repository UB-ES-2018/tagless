var sequelizeConnection = require("../config/sequelizeConnection");

exports.userController_Signup = function(u_email,u_name,u_pass) {

    //create user into database.

    var sequelize = sequelizeConnection.sequelize;

    const User = sequelize.define('User',{
        userId : sequelize.INTEGER, 
        email: sequelize.STRING,
        username: sequelize.STRING,
        pass: sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
    })
    /*
    console.log("hasta aquí he llegado");
    userController_OnBD(u_email, u_name,function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            console.log(content);
            if (content == true){
                console.log("El usuario ya esta en la lista");
            }
            else{
                User.create({
                    email : u_email,
                    username : u_name,
                    pass : u_pass,
                });
            }
        }
    });
    */
    

};

exports.userController_Login = function(u_name, u_pass) {


};

function userController_OnBD(u_email, u_name, callback){

    var sequelize = sequelizeConnection.sequelize;
    

    sequelize.query('SELECT count(*) AS count FROM Users WHERE (Users.username = (?) OR Users.email = (?))',[u_name,u_email],function (err, result, fields){
        if(u_emsil=result0) {
            
        }
        if (err) throw err;
        
        callback(null,result[0]['count']>0);
    });


};

exports.getUser = function(u_name,u_pass,callback){
    
    var sequelize = sequelizeConnection.sequelize;

    sequelize.query('SELECT id FROM Users WHERE (Users.username = (?) OR Users.pass = (?))',[u_name,u_pass],function (err, result, fields){
        if (err) throw err;


        if (result[0]['userid']){
            callback(null,result[0]['userid']);
        }
        else{
            callback(null,null);
        }
    });
}