const express = require('express');
const app = express();
var router = express.Router();
var ctl_comments = require('../controllers/comment_controller');
var ctl_user = require('../controllers/user_controller');

//Middleware to check API key
async function ayncCheckAPIKey(req,res,next){
    await ctl_user.getUserByAPIKey(req.headers['api-key'] );
    if (result){
        next();
    }else{
        res.send("La API key no es valida");
    }
}
router.get('/users', ayncCheckAPIKey ,function (req, res, next) {
    res.send("JAJA");
});



module.exports = router;