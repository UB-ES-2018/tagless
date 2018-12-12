var expect  = require('chai').expect;
var request = require('request');
var ctl_user = require('../controllers/user_controller');
var ctl_thread = require('../controllers/thread_controller');
var ctl_comunity = require('../controllers/comunity_controller');


/*
it('Main page status', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});
*/

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

it('Post nueva comunidad', function(){
    ctl_comunity.postComunity("penepolis", "Muzska is real").then( result =>{
        expect(result).to.equal(true);
    });
});

it('Post nueva comunidad con nombre vacío', function(){
    ctl_comunity.postComunity("", "Muzska is real").then( result =>{
        expect(result).to.equal(false);
    });
});


it('Get de una comunidad existente ', function(){
    ctl_comunity.getComunityByName("penepolis").then( result =>{
        expect(result.description).to.equal("Muzska is real");
    });
});

it('Post de thread con usuario existente en una comunidad existente', function(){
    ctl_user.getUserByUsername("arnau").then( user =>{
        ctl_thread.postThread(user, "test1", "test", "penepolis")
        .then( function(success) {
            expect(success).to.equal(true);
        });
    });
});

it('Post de thread con usuario existente en una comunidad inexistente', function(){
    ctl_user.getUserByUsername("arnau").then( user =>{
        ctl_thread.postThread(user, "test1", "test", "jeajf")
        .then( function(success) {
            expect(success).to.equal(false);
        });
    });
});

it('Post de thread con usuario inexsitente en una comunidad existente', function(){
    ctl_user.getUserByUsername("arnau12").then( user =>{
        ctl_thread.postThread(user, "test1", "test", "penepolis")
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
    .then( success=> {
        expect(success).to.equal(Promise);
    });
});


it('Get de thread por id inexistente', function(){
    ctl_thread.getThreadById(5)
    .then( function(success) {
        expect(success).to.contains(null);
    });
});


it('Get de todos los threads', function(){
    ctl_thread.getAllThreads().then( result => {
        expect(result).to.contains(Promise);
    })
});


it('Get de threads de un user existente', function(){
    ctl_thread.getUserThreads('arnau')
    .then( function(success) {
        expect(success).to.contains(Promise);
    });
});


it('Get de threads de un user inexistente', function(){
    ctl_thread.getUserThreads('fbvjibd')
    .then( success => {
        expect(success).to.throw();
    });
});

it('Get de threads de una comunidad existente', function(){
    ctl_comunity.getComunityThreads('penepolis')
    .then( function(success) {
        expect(success).to.contains(Promise);
    });
});

it('Get de threads de una comunidad inexistente', function(){
    ctl_comunity.getComunityThreads('pepe')
    .then( success=> {
        expect(success).to.be.rejected;
    });
});

it('Update una comunidad existente con otra descripcion', function(){
    ctl_comunity.updateComunity('penepolis', 'IsALie')
    .then(result =>{
        expect(result).to.equal("Comunity: "+'penepolis'+" successfully updated");
    });
});

it('Update el profile de un usuario existente', function(){
    ctl_user.updateProfile('arnau', 'pringao', null, 1)
    .then(result =>{
        expect(result).to.equal("User with ID:"+ 1 +" successfully updated");
    });
});

it('Update el profile de un usuario inexistente', function(){
    ctl_user.updateProfile('Pedro', 'Mola mucho mas que Arnau', null, 1)
    .then(result =>{
        expect(result).to.be.rejected;
    });
});

it('Get usuario existente por id', function(){
    ctl_user.getUserById(1)
    .then(result =>{
        expect(result).to.contain(Promise);
    });
});

it('Get usuario inexistente por id', function(){
    ctl_user.getUserById(6)
    .then(result =>{
        expect(result).to.be.rejected;
    });
});

it('Get usuario existente por apiKey', function(){
    ctl_user.getUserByUsername('arnau')
    .then(user =>{
        ctl_user.getUserByAPIKey(user.apiKey)
        .then(result => {
            expect(result).to.contain(Promise);
        })
    });
});

it('Get usuario inexistente por apiKey', function(){
    ctl_user.getUserByAPIKey('egegsgaf356n')
    .then(result => {
        expect(result).to.be.rejected;
    })
});

