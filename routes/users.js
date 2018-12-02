var express = require('express');
var router = express.Router();
var ctl_user = require('../controllers/user_controller');
var fileUpload = require("express-fileupload");
var path = require('path');
var fs = require('fs');
var device = require('express-device');
var ctl_device = require('../controllers/device_controller');

router.use(fileUpload());


// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        next();
    }
};

// route for user logout
router.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
    }
    res.redirect('/');
});

var deviceChecker = (req,res,next) => {
    var ua = req.headers['user-agent'].toLowerCase();
    //isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(ua);

    //matches[1] contains the value between the first parentheses
    console.log(matches[1]);

    var registered_device = ctl_device.DeviceRegister(matches[1],req.body['username'],req.body['password']);
    if (registered_device) next();
};

/* POST user login. */
router.post('/login', sessionChecker, deviceChecker, function (req, res, next) {
    console.log(req.body);

    //Get data from request and log user
    ctl_user.userController_Login(req.body['username'], req.body['password'],
        function(success) {
            if (success instanceof Error){
                return res.send(success.message);
            }
            if(success){
                req.session.user = req.body['username'];
                res.redirect("/");
            } else {
                res.send("Wrong password");
            }
        });
});

/* GET user singup. */
router.get('/signup', function (req, res, next) {

    res.render('signup');
});

/* POST user register. */
router.post('/signup', function (req, res, next) {
    //TODO
    //Get data from request and log user
    ctl_user.userController_Signup(req.body['email'], req.body['username'], req.body['password'])
        .then(function(success){
            if (success instanceof Error){
                return res.send(success.message); // - WIDGET ERRO AL CREAR -
            }
            if(success){
                res.redirect('/');
            }
        }, function (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        });
});

router.get('/:username/', function (req, res) {
    var username=req.params.username;
    ctl_user.getUserByUsername(username)
        .then(function(user){
            console.log(user);
            if (!user) return res.status(404).send("User Not found");
            let show_user;
            if (user.privacity === 0) show_user = true;
            else if (user.privacity === 1) show_user = res.locals.is_logged;
            else show_user = res.locals.is_logged && res.locals.logged_username === username;
            if (show_user){
                ctl_user.getCommentedThreadsByUser(user.id).then(function (threads) {
                    return res.render('user/user_activity', {
                        user:user.dataValues,
                        threads: threads
                    });
                }, function (err) {
                    console.log(err);
                    res.status(500).send("Internal server error");
                });
            }else{
                return res.render('user/user_private', {
                    user:user.dataValues
                });
            }
        }, function (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        });

});

router.get('/:username/settings', function (req, res) {
    //process req
    var username = req.params.username;
    if (!res.locals.is_logged || res.locals.logged_username !== username) return res.status(403).send();
    //Implementation
    ctl_user.getUserByUsername(username)
        .then(function(user){
            res.render('user/user_settings', {
                user:user.dataValues
            });
        }, function(err){
            console.log(err);
            res.status(500).send("Internal server error");
        });
});

function moveFile(file, somePlace) {
    return new Promise((resolve, reject) => {
        file.mv(somePlace, function (err) {
            if (err) return reject(err);

            resolve();
        });
    });
}

router.post('/:username/settings', function (req, res, next) {
    //process req
    var username = req.params.username;
    var description = req.body.description;
    var privacity = req.body.privacity;
    var appDir = path.dirname(require.main.filename);

    //Implementation
    ctl_user.getUserByUsername(username)
        .then(function(user){
            ctl_user.updateProfile(user.id, description, null, privacity)
                .then(function(success){
                    console.log("User updated");
                }, function(err){
                    throw err;
                });
        }, function(err){
            throw err;
        });

    try {

        if (Object.keys(req.files).length > 0) {
            let filepath = appDir + "/../public/images/users/" + username;
            console.log(filepath);
            if (!fs.existsSync(filepath)) {
                fs.mkdirSync(filepath, {recursive: true}, (err) => {
                    if (err) throw err;
                });
            }
            const fileMovePromise =
                req.files ? moveFile(req.files.image, filepath + '/profile.jpg') : Promise.resolve('No file present');

            fileMovePromise
                .then(() => {

                    //TODO:
                    res.redirect("/users/" + username);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        }
    } catch (err){
        res.status(500).send(err);
    }

    res.redirect("/users/"+username);
});

module.exports = router;
