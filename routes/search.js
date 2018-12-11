var express = require('express');
var router  = express.Router();
var ctl_search = require('../controllers/search_controller');


router.get('/thread_title/:phrase', ctl_search.searchString);

module.exports = router;