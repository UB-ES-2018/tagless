var express = require('express');
var router  = express.Router();
var mysql   = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all posts
  res.render('index', { title: 'Express', 'posts':[]});
});

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'tagless'
});

connection.connect();
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
connection.end();

module.exports = router;
