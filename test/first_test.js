var expect  = require('chai').expect;
var request = require('request');
var ctl_user = require('../controllers/user_controller');




it('Main page status', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Signup de un usuario', function(){
   var results = ctl_user.userController_Signup("arnau@gmail.com", "arnau114", "arnau");
   console.log(results);
   expect(results).to.equal(false);
});