var sequelizeConnection = require("../config/sequelizeConnection");
var sequelize = sequelizeConnection.sequelize;

exports.findallLikesfromComment = function(comment_id, req, res) {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        sequelize.query('SELECT SUM(vote) as "total", SUM(vote=1) as "upvotes", SUM(vote=-1) as "downvotes", sum(User_vote.user_vote) as "user_vote"' +
            ' FROM Like_comments ' +
            'left join (' +
            '   SELECT Users.id, vote as "user_vote"' +
            '   FROM Like_comments ' +
            '   left join Users on Users.id = Like_comments.userId ' +
            '   WHERE Like_comments.comment_id = (?) and Users.username = (?)' +
            ') as User_vote on User_vote.id = Like_comments.userId ' +
            ' WHERE Like_comments.comment_id = (?)', {
            replacements: [comment_id, res.locals.logged_username, comment_id],
            type: sequelize.QueryTypes.SELECT
        })
            .then(result => {
                if (result) {
                    resolve(result[0]);
                }
            }, function(err){
            reject("Query failed");
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