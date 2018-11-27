var expect  = require('chai').expect;
var request = require('request');
var ctl_user = require('../controllers/user_controller');
var ctl_thread = require('../controllers/thread_controller');



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
    ctl_user.userController_Signup("arnau@gmail.com", "arnau", "arnau")
        .then( function(success) {
            expect(success).to.equal(false);
        });
});

it('Post de thread con usuario EXISTENTE', function(){
    ctl_user.getUserByUsername("arnau").then( user =>{
        ctl_thread.postThread(user, "test1", "test")
        .then( function(success) {
            expect(success).to.equal(true);
        });
    });
    
});

it('Post de thread con usuario INEXISTENTE', function(){
    ctl_user.getUserByUsername("arnau12").then( user =>{
        ctl_thread.postThread(user, "test1", "test")
        .then( function(success) {
            expect(success).to.equal(false);
        });
    });
});

it('Post de thread con usuario existente vacío', function(){
    ctl_user.getUserByUsername("arnau").then( user =>{
        ctl_thread.postThread(user, "", "")
        .then( function(success) {
            expect(success).to.equal(false);
        });
    });
});

it('Get de thread por id', function(){
    ctl_thread.getThreadById(1)
    .then( function(success) {
        expect(success).to.equal(true);
    });
});

it('Get de thread por id inexistente', function(){
    ctl_thread.getThreadById(5)
    .then( function(success) {
        expect(success).to.contains(Promise);
    });
});

it('Get de todos los threads', function(){
    ctl_thread.getThreadById(5)
    .then( function(success) {
        expect(success).to.contains(Promise);
    });
});

