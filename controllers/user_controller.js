var dbconnection = require('../config/dbConnection');
var sequelizeConnection = require("../config/sequelizeConnection");
var Sequelize = require('sequelize');

exports.userController_Signup = function (u_email, u_name, u_pass) {

    //create user into database.

    var connection = dbconnection();

    connection.query('USE tagless;');
    var sql = "INSERT INTO _user (email,username,pass) VALUES (?,?,?)";
    var params = [u_email, u_name, u_pass];
    console.log(sql + params);
    connection.query(sql, params, function (err, result) {
        if (err) throw err;
    });


};

exports.userController_Login = function (u_name, u_pass, callback) {
    //retrieve user from database.
    var sequelize = sequelizeConnection.sequelize;
    var real_pass = '';
    var success;
    //todo comprovar que el nom no sigui buit

    if (u_name === '') {
        //todo return nom buit
    }

    var sql = 'SELECT pass FROM Users WHERE Users.username = ?';
    sequelize.query(sql, {replacements: [u_name], type: sequelize.QueryTypes, SELECT}).then(function (err, results) {
        if (err) throw err;
        real_pass = results[0].pass;
        console.log('r_pass: ' + real_pass);

        if (real_pass === u_pass) {
            console.log("Logged");
            success = true;
        }
        else {
            console.log("Wrong password");
            success = false;
        }
        callback(success);
    });
};