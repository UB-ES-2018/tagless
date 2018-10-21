var express = require('express');
var router  = express.Router();
var ctl_user = require('../controllers/user_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
	//Get all posts
	console.log("get profile");

	res.render('profile', { username: 'Usuario', imageURL: '', description: 'Ejemplo de descripcion', posts: [] })
});


router.get('/settings', function(req, res, next) {

	console.log("get settings");

	res.render('profile_settings', { username: 'Usuario', imageURL: '', description: 'Ejemplo de descripcion', posts: [] })
});

router.post('/', function(req, res, next) {

	//hacer los cambios 
	console.log("post settings");

	res.render('profile', { username: 'Usuario', imageURL: '', description: 'Ejemplo de descripcion', posts: [] })
});

module.exports = router;
