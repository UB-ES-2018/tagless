var express = require('express');
var router = express.Router();
const dbConnection = require('../config/dbConnection');


module.exports = app => {

  const connection = dbConnection();


    /* GET user singup. */
    app.get('/signup', function(req, res, next) {

      connection.query('SELECT * FROM tagless', (err, result)=> {
        res.render('signup',)
      })
        //TODO
        //Get data from request and create user
        //res.render('signup');
    });




};

/* POST user login. */
router.post('/login', function(req, res, next) {
  //TODO
  //Get data from request and log user
  res.send("Loged");
});

/* POST user login. */
router.post('/signup', function(req, res, next) {
  //TODO
  //Get data from request and log user





  res.send("Registered");
});


//module.exports = router;
