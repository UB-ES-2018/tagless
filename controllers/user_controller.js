var dbconnection = require('../config/dbConnection');

exports.userController_Signup = function(u_email,u_name,u_pass) {

    //create user into database.

    var connection = dbconnection();

    connection.query('USE tagless;');
    var sql = "INSERT INTO _user (email,username,pass) VALUES (?,?,?)";
    var params = [u_email, u_name, u_pass ];
    console.log(sql + params);
    connection.query(sql, params ,function(err, result) {
        if (err) throw err;
    });


};

exports.userController_Login = function(u_name, u_pass) {
    //retrieve user from database.

    var connection = dbconnection();
    var real_pass = '';

    connection.query('USE tagless;');
    var sql = 'SELECT pass FROM _user WHERE username = ?';
    var query = connection.query(sql, [u_name], function (err, results) {
        if (err) throw err;
        console.log('res: ' + results);
        real_pass = results[0].pass;
        console.log('r_pass: ' + real_pass);
    });
    console.log('query: ' + query.sql);

    //
    // if (real_pass === u_pass) {
    //     console.log("Logged");
    // }
    // else console.log("La contrasenya no és la correcta.");
    // console.log(query._results);
};