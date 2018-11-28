var sequelizeConnection = require("../config/sequelizeConnection");
var sequelize = sequelizeConnection.sequelize;
var threadModel = require('../models/thread');
var DataTypes = require('sequelize/lib/data-types');


exports.findallLikesfromThread = function (thread_id, req, res) {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        sequelize.query(
            'SELECT SUM(vote) as "total", SUM(vote=1) as "upvotes", SUM(vote=-1) as "downvotes", sum(User_vote.user_vote) as "user_vote"' +
            ' FROM Likes ' +
            'left join (' +
            '   SELECT Users.id, vote as "user_vote"' +
            '   FROM Likes ' +
            '   left join Users on Users.id = Likes.userId ' +
            '   WHERE Likes.thread_id = (?) and Users.username = (?)' +
            ') as User_vote on User_vote.id = Likes.userId ' +
            ' WHERE Likes.thread_id = (?)',
            {
                replacements: [thread_id, res.locals.logged_username, thread_id],
                type: sequelize.QueryTypes.SELECT
            })
            .then(result => {
                if (result) {
                    console.log(result);
                    resolve(result[0]);
                }
            }, function (err) {
                reject("Query failed");
            });
    });
};

exports.getMostLikedThreads = function () {

    return new Promise(function (resolve, reject) {
        var sequelize = sequelizeConnection.sequelize;
        var ThreadModel = threadModel(sequelize, DataTypes);

        sequelize.query(
            'SELECT SUM(vote) as total, thread_id ' +
            'FROM tagless.likes ' +
            'GROUP BY thread_id ' +
            'ORDER BY total DESC ' +
            'LIMIT 10;',
            {model: ThreadModel})
            .then(result => {
                if (result) {
                    console.log(result);
                    resolve(result);
                }
            }, function (err) {
                reject("Query failed");
            });
    });
};

exports.addPositiveorNegativeLikes = function (thread_id, username, vote) {

    return new Promise(function (resolve, reject) {
        sequelize.query('INSERT INTO Likes (thread_id, userId, vote, createdAt, updatedAt) VALUES((?), (SELECT id FROM Users WHERE username=(?)), (?), (?), (?)) ON DUPLICATE KEY UPDATE vote=(?), updatedAt=(?)', {
            replacements: [thread_id, username, vote, new Date(), new Date(), vote, new Date()]
        }).spread((results, metadata) => {
            console.log(metadata);
            resolve(results);
        });
    });
};


