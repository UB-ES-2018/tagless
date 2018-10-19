var express = require('express');
var router  = express.Router();
var ctl_user = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all posts
	res.render('profile', { username: 'Aradan', imageURL: '', description: 'Ejemplo de descripcion', posts: [] })
});


router.get('/settings', function(req, res, next) {

	res.render('profile_settings', { username: 'Aradan', imageURL: '', description: 'Ejemplo de descripcion', posts: [] })
});

router.post('/settings', function(req, res, next) {

	//hacer los cambios 

	res.render('profile', { username: 'Aradan', imageURL: '', description: 'Ejemplo de descripcion', posts: [] })
});

module.exports = router;
