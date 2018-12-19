var sequelizeConnection = require('../config/sequelizeConnection');
var sequelize = sequelizeConnection.sequelize;

var DataTypes = require('sequelize/lib/data-types');
var Sequelize  = require('sequelize');
var elasticUtils = require('../config/elasticsearch/elasticsearchMain');
var comunityModel = require('../models/comunity');
var threadModel = require('../models/thread');

exports.postComunity = function(c_comunityName,c_description) {

    return new Promise(function(resolve,reject) {
        const Comunity_Model = comunityModel(sequelize, DataTypes);
        var success = true;
        
        if(!(c_comunityName.replace(/\s/g, ""))){
            resolve(!success);
        }
        else{
            Comunity_Model.findOne({ where : { comunityName: c_comunityName } })
            .then(comunity =>{
                if(comunity) {
                    console.log("La comunidad ya existe");
                    reject("La comunidad ya existe");
                }
                else{
                    Comunity_Model.create({
                        comunityName: c_comunityName,
                        description: c_description,
                    }).then( comunity_result =>{
                        elasticUtils.addDocument("comunity", comunity_result.dataValues);
                        sitemap.add({url: 'comunity/' + comunity_result.comunityName});
                        sitemap.clearCache();
                        resolve(comunity_result);
                    }, function(err){
                        reject("Mysql error, check your query"+err);
                    });
                }
            },function(err){
                reject("Mysql error, check your query"+err);
            });
        }
    });
};

exports.updateComunity = function(c_comunityName, c_description){

    return new Promise(function(resolve,reject){
        var Comunity_Model = comunityModel(sequelize, DataTypes);

        Comunity_Model.findOne({ where : { comunityName: c_comunityName } })
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

    return new Promise(function(resolve, reject){
        var thread_Model = threadModel(sequelize, DataTypes);
        thread_Model.findAll({ where: { comunityName : c_comunityName } })
            .then(result =>{
                resolve(result);
            }, function(err){
                reject(err);
            });
        });
}

exports.getComunityByName = function(c_comunityName){
    return new Promise(function(resolve,reject){

        var Comunity_Model = comunityModel(sequelize, DataTypes);

        Comunity_Model.findOne({where : { comunityName : c_comunityName}
        }).then( comunity => {
            resolve(comunity);
        }, function(err){
            reject(err);
        });
    });

}