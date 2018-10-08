var dbconnection = require('../config/dbConnection');

exports.userController_Signup = function(u_email,u_name,u_pass) {

    //create user into database.

    var connection = dbconnection();

    connection.query('USE tagless;');
    var sql = "INSERT INTO _user (email,username,pass) VALUES (?,?,?)";
    var params = [u_email, u_name, u_pass ];
    connection.query(sql, params ,function(err, result) {
        if (err) throw err;
    });
    var userExist = false;
    userController_OnBD('pp@gmail.com', 'jojo',userExist,callback)
    console.log(userExist);
    

};

exports.userController_Login = function(u_name, u_pass) {


};

userController_OnBD =  function(u_email, u_name,userExist,callback){

    var connection = dbconnection();

    connection.query('USE tagless;');
    

    console.log(connection.query('SELECT count(*) AS count FROM _user WHERE (_user.username = (?) OR _user.email = (?))',[u_name,u_email],function (err, result, fields){
        if (err) throw err;
        /*
        if (result[0]['count'] > 0){
            console.log("me rio en tu cara pedro");
            userExist = true;
        }
        */
        callback(null,null,result[0]['count']);
    }));


};