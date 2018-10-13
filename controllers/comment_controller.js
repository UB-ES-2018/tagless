var sequelizeConnection = require('../config/sequelizeConnection');
var Comment = require('../models/comment');
var sequelize = sequelizeConnection.sequelize;

//Comment Controller

exports.getAllByThreadId = function(req, res){
};