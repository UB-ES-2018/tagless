var sequelizeConnection = require("../config/sequelizeConnection");
var Sequelize = require('sequelize');

exports.userController_Signup = function(u_email,u_name,u_pass) {

    //create user into database.

    var sequelize = sequelizeConnection.sequelize;
    
    const User = sequelize.define('User',{
        userId : Sequelize.INTEGER, 
        email: Sequelize.STRING,
        username: Sequelize.STRING,
        pass: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });

    
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
    

};

exports.userController_Login = function(u_name, u_pass) {


};

function userController_OnBD(u_email, u_name, callback){

    var sequelize = sequelizeConnection.sequelize;
    


    sequelize.query('SELECT count(*) AS count FROM Users WHERE (Users.username = (?) OR Users.email = (?))',
    { replacements: [u_name,u_email], type: sequelize.QueryTypes.SELECT })
    .then(result => {
        callback(null,result[0]['count'] > 0);
      }
    );

};

exports.getUser = function(u_name,u_pass,callback){
    
    var sequelize = sequelizeConnection.sequelize;

    sequelize.query('SELECT id FROM Users WHERE (Users.username = (?) OR Users.pass = (?))',
     { replacements: [u_name,u_pass], type: sequelize.QueryTypes.SELECT })
    .then(result => {

        if (result[0]['id']){
            callback(null,result[0]['id']);

        }
        else{
            callback(null,null);
        }
    }
    );
};