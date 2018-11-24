const express = require('express');
const app = express();
var router = express.Router();
var ctl_comments = require('../controllers/comment_controller');
var ctl_user = require('../controllers/user_controller');


function checkAPIKey(req,res,next){
    var countAPIKey = ctl_user.countAPIKey(req.session.APIKey);

    if (countAPIKey == 1){
        next();
    }else{
        res.send("La API key no es valida");
    }


}
router.get('/:username/', checkAPIKey ,function (req, res, next) {

});



module.exports = router;