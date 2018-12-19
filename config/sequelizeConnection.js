const Sequelize = require('sequelize');
const settings = require('./config.json');


module.exports.sequelize = new Sequelize(settings.development.database, settings.development.username, settings.development.password, {
    host: settings.development.host,
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});