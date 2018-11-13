var sequelizeConnection = require("../config/sequelizeConnection");
var sequelize = sequelizeConnection.sequelize;

exports.findallLikesfromComment = function(comment_id) {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        sequelize.query('SELECT SUM(vote) FROM Like_comments WHERE (Like_comments.comment_id = (?))', {
            replacements: [comment_id],
            type: sequelize.QueryTypes.SELECT
        })
            .then(result => {
                if (result) {
                    resolve(result[0]['SUM(vote)']);
                }
            });
    });
};

exports.addPositiveorNegativeLikesComments = function(comment_id, username, vote) {

    return new Promise( function (resolve, reject) {
        sequelize.query('INSERT INTO Like_comments (comment_id, userId, vote, createdAt, updatedAt) VALUES((?), (SELECT id FROM Users WHERE username=(?)), (?), (?), (?)) ON DUPLICATE KEY UPDATE vote=(?), updatedAt=(?)',{
            replacements: [comment_id, username, vote, new Date(), new Date(), vote, new Date()]
        }).spread((results, metadata) => {
            console.log(metadata);
            resolve(results);
        });
    });

};