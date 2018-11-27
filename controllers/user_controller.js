var sequelizeConnection = require("../config/sequelizeConnection");
var Sequelize = require('sequelize');
var userModel = require('../models/user');
var Comment = require('../models/comment');
var Thread = require('../models/thread');
var DataTypes = require('sequelize/lib/data-types');
const bcrypt = require('bcrypt');
var hat = require('hat');

exports.userController_Signup = function (u_email, u_name, u_pass) {

    return new Promise(function(resolve,reject){
        var sequelize = sequelizeConnection.sequelize;
        const saltRounds = 10;
        var UserModel = userModel(sequelize, DataTypes);
        var success = true;

        UserModel.findOne({ where : { username: u_name, email:u_email } })
            .then(function(user){
                if(user) {
                    console.log("El usuario ya esta en la lista");
                    resolve(!success);
                }
                else {
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(u_pass, salt, function (err, hash) {
                            //Generamos API key:
                            var apikey = hat();
                            UserModel.create({
                                email: u_email,
                                username: u_name,
                                pass: hash,
                                apiKey: apikey,
                                privacity : 0,
                            });

                        });
                    });

                    resolve(success);
                }
            },function(err){
                reject("Mysql error, check your query"+err);
            });
    });
};


exports.userController_Login = function (u_name, u_pass, callback) {
    //retrieve user from database.
    var sequelize = sequelizeConnection.sequelize;
    var real_pass = '';
    var success = true;

    var sql = 'SELECT pass FROM Users WHERE (Users.username = (?))';
    sequelize.query(sql, {replacements: [u_name], type: sequelize.QueryTypes.SELECT})
        .then(results => {
            console.log(results);
            if (results.length == 0) throw new Error("User not foud");
            real_pass = results[0].pass;
            bcrypt.compare(u_pass, real_pass, function (err, res) {
                if (err) {
                    console.log("error");
                    throw err;
                }
                if (!res) success=false;

                callback(success);
            });
        }).catch(function(err){
        callback(err);
    });
};

exports.getUser = function (u_name, callback) {

    var sequelize = sequelizeConnection.sequelize;

    sequelize.query('SELECT id FROM Users WHERE (Users.username = (?))',
        {replacements: [u_name], type: sequelize.QueryTypes.SELECT})
        .then(result => {

            if (result[0]['id']){
                callback(null,result[0]['id']);

            }
            else{
                callback(null,null);
            }
        });
};

exports.updateProfile = function(userId, description, pictureLink, privacity){

    return new Promise(function(resolve,reject){
        var sequelize = sequelizeConnection.sequelize;
        var UserModel = userModel(sequelize, DataTypes);

        UserModel.find({ where : { id: userId } })
            .then(function(user){
                user.updateAttributes({
                    pictureLink: pictureLink,
                    description: description,
                    privacity: privacity
                });
                resolve("User with ID:"+userId+" successfully updated");
            },function(err){
                reject("Problem ocurred: "+err);
            });
    });
};

exports.getUserById = function (userId) {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        var UserModel = userModel(sequelize, DataTypes);

        UserModel.find({where: {id: userId}})
            .then(function (user) {
                resolve(user);
            }, function (err) {
                console.log("Error ocurred: " + err);
                reject(err);
            })
    });
};

exports.getUserByUsername = function (u_username) {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        var UserModel = userModel(sequelize, DataTypes);

        UserModel.find({where: {username: u_username}})
            .then(function (user) {
                resolve(user);
            }, function (err) {
                console.log("Error ocurred: " + err);
                reject(err);
            })
    });
};


function selectUniqueThreads(threads) {
    results = [];
    for (var i = 0; i < threads.length; i++) {
        if (!results.includes(threads[i])) {
            results.push(threads[i]);
        }
        if (results.length === 5) {
            break;
        }
    }
    return results;
}

exports.getCommentedThreadsByUser = function (userId) {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        var CommentModel = Comment(sequelize, DataTypes);
        var ThreadModel = Thread(sequelize, DataTypes);

        if (typeof userId !== 'undefined') {
            CommentModel.findAll(
                {
                    where: {
                        userId: userId
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }
            ).then(function (data) {
                data = data.map(com => com.get('threadId'));
                data = selectUniqueThreads(data);
                ThreadModel.findAll({
                    where: {
                        id: data
                    }
                }).then((results) =>
                    resolve(results)
                );
            }, function (err) {
                reject(err);
            });

        } else {
            reject("userId is null");
        }
    });
};
exports.getUserByAPIKey = function(u_APIKey){
    
    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        var UserModel = userModel(sequelize, DataTypes);

        UserModel.findOne({where: {apiKey: u_APIKey}})
            .then(function (user) {
                resolve(user);
            }, function (err) {
                console.log("Error ocurred: " + err);
                reject(err);
            })
    });

};

