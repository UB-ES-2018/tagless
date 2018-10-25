var sequelizeConnection = require("../config/sequelizeConnection");
var Sequelize = require('sequelize');
var userModel = require('../models/user');
var DataTypes = require('sequelize/lib/data-types');
const bcrypt = require('bcrypt');


exports.userController_Signup = function(req,res) {

    var sequelize = sequelizeConnection.sequelize;
    
    const User = userModel(sequelize, DataTypes);
    const saltRounds = 10;

    console.log("hasta aquí he llegado");
    userController_OnBD(req.body['email'], req.body['username'],function(err, content) {
        if (err) {
            return next("Mysql error, check your query");
        } else {
            console.log(content);
            if (content == true){
                console.log("El usuario ya esta en la lista");
            }
            else{
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(req.body['password'], salt, function(err, hash) {
                        User.create({
                            email : req.body['email'],
                            username : req.body['username'],
                            pass : hash,
                        });
                    });
                });

                res.send("Registered");
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

exports.getUser = function(u_name,callback){
    
    var sequelize = sequelizeConnection.sequelize;

    sequelize.query('SELECT id FROM Users WHERE (Users.username = (?))',
     { replacements: [u_name], type: sequelize.QueryTypes.SELECT })
    .then(result => {

        if (result[0]['id']){
            callback(null,result[0]['id']);
        }
        else{
            callback(null,null);
        }
    }
    );
}

exports.updateProfile = function(req, res){

  var sequelize = sequelizeConnection.sequelize;

  var UserModel = User(sequelize, DataTypes);

  UserModel.find({ where : { id: req.params.userId } })
      .then(function(user){
          if (user){
              user.updateAttributes({
                pictureLink: req.body.pictureLink,
                description: req.body.description
              })
              res.status(200).send();
          }else{
              console.log("User not found");
              res.status(500).send("User not found");
          }
        })
}

exports.getUserById = function(req, res){

    var sequelize = sequelizeConnection.sequelize;

    var UserModel = User(sequelize, DataTypes);

    UserModel.find({ where : { id: req.params.userId } })
        .then(function(user){
            if (user){
                console.log("User found");
                console.log(user.dataValues);
                res.json(user.dataValues);
            }else{
                console.log("User not founded");
                res.status(500).send("User not found");
            }
        })
}