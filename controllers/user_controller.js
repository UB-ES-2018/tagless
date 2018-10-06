var dbconnection = require('../config/dbConnection');

exports.userController_Signup = function(u_email,u_name,u_pass) {

    //create user into database.

        var connection = dbconnection();

        connection.query('USE tagless;');

        connection.query('INSERT INTO _user(email, username, pass) VALUES  ( '+ u_email +' , ' + u_name + ' , ' + u_pass + ' );', function(err, result) {
            if (err) throw err;
        });

};

exports.userController_Login = function(u_name, u_pass) {


};