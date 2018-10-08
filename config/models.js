var dbconnection = require('./dbConnection');

module.exports = () => {
    var connection = dbconnection();

    connection.query('USE tagless;');

    connection.query('CREATE TABLE IF NOT EXISTS _user( '+
    'userid INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,'+
    'email VARCHAR(50) , '+
    'username VARCHAR(20), '+
    'pass VARCHAR(20))ENGINE=InnoDB DEFAULT CHARSET=utf8;', function(err, result) {
    if (err) throw err
    });

    connection.query('CREATE TABLE IF NOT EXISTS _thread( '+
    'threadid INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,'+
    'userid INT(10) NOT NULL,'+
    'title VARCHAR(50), '+
    'text VARCHAR(200), '+
    'FOREIGN KEY (userid) REFERENCES _user(userid))ENGINE=InnoDB DEFAULT CHARSET=utf8;', function(err, result) {
    if (err) throw err
    });


};
