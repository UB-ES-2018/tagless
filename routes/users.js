var express = require('express');
var router = express.Router();
var ctl_user = require('../controllers/user_controller');


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/login'); // POR PONER ALGO, DEBERIA IR A TU DASHBOARD
    } else {
        next();
    }
};

// route for Home-Page
router.get('/', sessionChecker, (req, res) => {
    res.redirect('/');
});

/* POST user register. */
router.post('/signup', ctl_user.userController_Signup);

/* GET user singup. */
router.get('/signup', function(req, res, next) {

    res.render('signup');
});
/*
// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/login');
    }
});
*/
// route for user logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

/* POST user login. */
router.post('/login', function(req, res, next) {
  //TODO
  //Get data from request and log user

  console.log(req.body);
  console.log(req.body['username']);
  console.log(req.body['password']);
  res.send("Loged");
});

/* POST user login. */
router.post('/login', function(req, res, next) {
  //TODO
  //Get data from request and log user
  res.send("Loged");
});



router.put('/profileView/:userId', ctl_user.updateProfile);

router.get('/profileView/:userId', ctl_user.getUserById);


module.exports = router;
