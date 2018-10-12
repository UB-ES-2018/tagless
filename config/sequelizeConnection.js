const Sequelize = require('sequelize');

module.exports.sequelize = new Sequelize('tagless', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    logging: function() {},
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});