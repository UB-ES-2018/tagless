var express = require('express');
var router  = express.Router();
var ctl_thread = require('../controllers/thread_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Get all threads
  console.log(req.sessionID);

  ctl_thread.getAllThreads()
    .then(function(allThreads){
      showList= [];
      for(i in allThreads){
        threadList ={"id": allThreads[i]['id'],
        "text":allThreads[i]['description'],
        "date":allThreads[i]['updatedAt'],
        "title":allThreads[i]['title'],
        "username":allThreads[i]['userName']};
        
        showList.push(threadList);
      }

      res.render('index', { title: 'Express', 'threads':showList});

    });


});

module.exports = router;
