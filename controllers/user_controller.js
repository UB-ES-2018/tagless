var dbconnection = require('../config/dbConnection');

exports.userController_Signup = function(u_email,u_name,u_pass) {

    //create user into database.

    var connection = dbconnection();

    connection.query('USE tagless;');
    

    userController_OnBD(u_email, u_name,function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            if (content){
                console.log("El usuario ya está dentro");
            }
            else{
                var sql = "INSERT INTO _user (email,username,pass) VALUES (?,?,?)";
                var params = [u_email, u_name, u_pass ];
                connection.query(sql, params ,function(err, result) {
                    if (err) throw err;
                });
            }
        }
    });
    

};

exports.userController_Login = function(u_name, u_pass) {


};

userController_OnBD =  function(u_email, u_name,callback){

    var connection = dbconnection();

    connection.query('USE tagless;');
    

    connection.query('SELECT count(*) AS count FROM _user WHERE (_user.username = (?) OR _user.email = (?))',[u_name,u_email],function (err, result, fields){
        if (err) throw err;
        /*
        if (result[0]['count'] > 0){
            console.log("me rio en tu cara pedro");
            userExist = true;
        }
        */
        callback(null,result[0]['count']>0);
    });


};