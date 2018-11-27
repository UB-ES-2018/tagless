var expect  = require('chai').expect;
var request = require('request');
var ctl_user = require('../controllers/user_controller');



it('Main page status', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('Signup de un usuario NUEVO', function(){
    ctl_user.userController_Signup("arnau@gmail.com", "arnau", "arnau")
        .then( function(success) {
            expect(success).to.equal(true);
    });
});

it('Signup de un usuario EXISTENTE', function(){
    ctl_user.userController_Signup("arnau@gmail.com", "arnau114", "arnau")
        .then( function(success) {
            expect(success).to.equal(false);
        });
});

