var sequelizeConnection = require('../config/sequelizeConnection');
var sequelize = sequelizeConnection.sequelize;

var DataTypes = require('sequelize/lib/data-types');
var Sequelize  = require('sequelize');

var comunityModel = require('../models/comunity');
var threadModel = require('../models/thread');

exports.postComunity = function(c_comunityName,c_description) {

    return new Promise(function(resolve,reject) {
        const Comunity_Model = comunityModel(sequelize, DataTypes);
        var success = true;
        
        Comunity_Model.findOne({ where : { comunityName: c_comunityName } }).then(comunity =>{

            if(comunity) {
                console.log("La comunidad ya existe");
                resolve(!success);
            }
            else{
                Comunity_Model.create({
                    comunityName: c_comunityName,
                    description: c_description,
                }).then( comunity_result =>{
                    sitemap.add({url: 'comunity/' + comunity_result.comunityName});
                    sitemap.clearCache();
                });
                resolve(success);
            }
        },function(err){
            reject("Mysql error, check your query"+err);
        });
    });
};

exports.updateComunity = function(c_comunityName, c_description){

    return new Promise(function(resolve,reject){
        var Comunity_Model = comunityModel(sequelize, DataTypes);

        Comunity_Model.find({ where : { comunityName: c_comunityName } })
            .then(comunity => {
                comunity.updateAttributes({
                    description: c_description
                });
                resolve("Comunity: "+c_comunityName+" successfully updated");
            },function(err){
                reject("Problem ocurred: "+err);
            });
    });
};

exports.getComunityThreads = function(c_comunityName){

     UserModel.hasMany(CommentModel, {foreignKey: "comunity"});
     CommentModel.belongsTo(UserModel, {foreignKey: "comunityName"});


     CommentModel.findAll({ where: { threadId : threadId }, include: [UserModel] })
         .then(function(data){
           resolve(data);
         }, function(err){
           reject(err);
         });
}