var express = require('express');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all posts
  res.render('profile', { username: 'Aradan', imageURL: '', description: 'Ejemplo de descripcion', posts: [] })
});

module.exports = router;
