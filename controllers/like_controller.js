var sequelizeConnection = require("../config/sequelizeConnection");
var sequelize = sequelizeConnection.sequelize;

exports.findallLikesfromThread = function(thread_id) {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        sequelize.query('SELECT SUM(vote) FROM Likes WHERE (Likes.thread_id = (?))', {
            replacements: [thread_id],
            type: sequelize.QueryTypes.SELECT
        })
            .then(result => {
                if (result) {
                    resolve(result[0]['SUM(vote)']);
                }
            },function(err){
                reject("Query failed");
            });
    });
};

exports.addPositiveorNegativeLikes = function(thread_id, username, vote) {

    return new Promise( function (resolve, reject) {
        sequelize.query('INSERT INTO Likes (thread_id, userId, vote, createdAt, updatedAt) VALUES((?), (SELECT id FROM Users WHERE username=(?)), (?), (?), (?)) ON DUPLICATE KEY UPDATE vote=(?), updatedAt=(?)',{
            replacements: [thread_id, username, vote, new Date(), new Date(), vote, new Date()]
        }).spread((results, metadata) => {
                console.log(metadata);
                resolve(results);
            });
    });
};


