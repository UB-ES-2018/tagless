var sequelizeConnection = require('../config/sequelizeConnection');
var Comment = require('../models/comment');
var sequelize = sequelizeConnection.sequelize;

//Comment Controller

exports.getAllByThreadId = function(req, res){
  console.log(req.params.threadId);

  if (res.threadId !== "") {
    sequelize.query("SELECT * FROM Comments WHERE threadId = " + req.params.threadId)
        .then(function (allComments) {
          res.json(allComments[0]);
          res.send();
          res.end();
        }, function (reason) {
          res.writeHead(500, {'Content-Type' : 'application/json'});
          res.send();
          res.end();
        });
  }else{
    res.writeHead(500, {'Content-Type' : 'application/json'});
    res.send();
    res.end();
  }
};