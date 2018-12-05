var sequelizeConnection = require('../config/sequelizeConnection');
var sequelize = sequelizeConnection.sequelize;
var deviceModel = require('../models/device');
var User = require('../models/user');
const bcrypt = require('bcrypt');

var DataTypes = require('sequelize/lib/data-types');
var Sequelize = require('sequelize');

exports.DeviceRegister = function (device_name,username,password,ip_) {

    return new Promise(function(resolve,reject) {
        var sequelize = sequelizeConnection.sequelize;
        var Device = deviceModel(sequelize, DataTypes);
        var UserModel = User(sequelize, DataTypes);
        var success = true;

        console.log(username);
        UserModel.findOne({ where : { username : username } })
            .then(function(user) {
                bcrypt.compare(password, user['pass'], function (err, res) {
                    if (err) {
                        console.log("error");
                        throw err;
                    }
                    if (!res) {
                        if (device_name !== null) {
                            Device.create({
                                title: device_name,
                                username: username,
                                success: 0,
                                ipadress:ip_,
                            });
                            resolve(success);
                        }
                    }else if (device_name !== null) {
                        Device.create({
                            title:device_name,
                            username: username,
                            success: 1,
                            ipadress:ip_,
                        });
                        resolve(success);
                    }
                });
            });
    });
};

exports.DevicesfromUser = function(username) {

    return new Promise(function(resolve,reject) {
        var sequelize = sequelizeConnection.sequelize;
        var Device = deviceModel(sequelize, DataTypes);

        Device.findAll({ where : { username: username } })
            .then(function(data) {

                var contenido =  [];

                for (i in data){
                    contenido.push([data[i]['id'],data[i]['title'],data[i]['success'],data[i]['ipadress'],data[i]['username'],data[i]['createdAt']]);
                }
                console.log(contenido);
                resolve(contenido);
            }, function(err) {
                reject(err);
            });
    });
};
