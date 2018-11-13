var sequelizeConnection = require("../config/sequelizeConnection");
var sequelize = sequelizeConnection.sequelize;
var userController = require('./user_controller');
var threadModel = require('../models/thread');
var likeModel = require('../models/like');

var DataTypes = require('sequelize/lib/data-types');


exports.findallLikesfromThread = function(thread_id) {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;

        console.log("FUCK IT");
        sequelize.query('SELECT SUM(vote) FROM Likes WHERE (Likes.thread_id = (?))', {
            replacements: [thread_id],
            type: sequelize.QueryTypes.SELECT
        })
            .then(result => {
                if (result) {
                    console.log("LOOOOOK AAAAAAT MEEEEEEEEEEEEEEEEEEEEEEE" ,result);
                    resolve(result);
                }
            });
    });
};


exports.addPositiveorNegativeLikes = function(thread_id, username, vote) {

    //Aqui siempre creamos
    console.log("THREEEEEEEEEEEEAD ID",thread_id);
    return new Promise( function (resolve, reject) {
        const Like = likeModel(sequelize, DataTypes);
       console.log("IM DOING THINGS like create an id");
       //Si no llega la id del thread hacer un query para buscarlo
        //Si no llega la id de user, hacer query para buscarlo
        //Si llegan id de user i id del thread, es muy sencillo ya que simplemente se crea el like en BD.

        // INSERT la nueva linea, y si ya existe UPDATE de value
        sequelize.query('INSERT INTO Likes (thread_id, userId, vote, createdAt, updatedAt) VALUES((?), (SELECT id FROM Users WHERE username=(?)), (?), (?), (?)) ON DUPLICATE KEY UPDATE vote=(?), updatedAt=(?)',{
        //sequelize.query('SELECT * FROM Likes WHERE (Likes.thread_id = (?) AND Likes.userId = (?))', {
            replacements: [thread_id, username, vote, new Date(), new Date(), vote, new Date()]
            //type: sequelize.QueryTypes.SELECT
            // results estara vacio (es un insert o update), y metadata tendra el numero de filas tocadas
        }).spread((results, metadata) => {
                console.log(metadata);
                /*
                if (result[0]){
                    console.log("ADDING NEW LIKEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
                    Like.create({
                        userId: user_id,
                        thread_id: thread_id,
                        vote: vote,
                    });
                    resolve(Like);
                }
                else {
                    console.log("LIKE EXISTED")
                    //MUST REMOVE OR SOMETHING
                }
                */
            });
    });
};


