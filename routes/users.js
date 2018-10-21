var express = require('express');
var router = express.Router();
var ctl_user = require('../controllers/user_controller');
var fileUpload = require("express-fileupload");
var path = require('path');
var fs = require('fs');

router.use(fileUpload());

/* POST user login. */
router.post('/login', function (req, res, next) {
  //TODO
  //Get data from request and log user

  console.log(req.body);
  console.log(req.body['username']);
  console.log(req.body['password']);
  res.send("Loged");
});
/* GET user singup. */
router.get('/signup', function (req, res, next) {

  res.render('signup');
  //TODO
  //Get data from request and create user
  //res.render('signup');
});

/* POST user register. */
router.post('/signup', function (req, res, next) {
  //TODO
  //Get data from request and log user
  ctl_user.userController_Signup(req.body['email'], req.body['username'], req.body['password']);

  res.send("Registered");
});

router.get('/:username/', function (req, res, next) {
  res.render('user/user_activity', {
    username: 'Aradan', imageURL: '',
    description: 'Ejemplo de descripcion', 
    posts: [] }
  );
});

router.get('/:username/settings', function (req, res, next) {
  res.render('user/user_activity', {
    username: 'Aradan', imageURL: '',
    description: 'Ejemplo de descripcion', 
    posts: [] }
  );
});

router.put('/profileView/:userId', ctl_user.updateProfile)

router.get('/profileView/:userId', ctl_user.getUserById);


function moveFile(file, somePlace) {
  return new Promise((resolve, reject) => {
    file.mv(somePlace, function (err) {
      if (err) return reject(err);

      resolve();
    });
  });
}

router.post('/:username/settings', function (req, res, next) {
  var username = req.params.username;
  var appDir = path.dirname(require.main.filename);
  
  //TODO
  // Save description on user entity


  if (Object.keys(req.files).length > 0) {
    let filepath = appDir + "/../public/images/users/" + username;
    console.log(filepath);
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
    const fileMovePromise =
      req.files ? moveFile(req.files.image, filepath + '/profile.jpg') : Promise.resolve('No file present');

    fileMovePromise
      .then(() => {

        //TODO: 
        res.render('user/user_activity', {
          username: 'Aradan', imageURL: '', description: 'Ejemplo de descripcion', posts: []
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
  res.render('user/user_activity', {
    username: 'Aradan', imageURL: '', description: 'Ejemplo de descripcion', posts: []
  });
});

module.exports = router;
