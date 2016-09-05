var express = require('express');
var router = express.Router();

var searchModule = require('../services/elasticsearch.js');
var localityController = require('../controllers/locality.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Geostats' });
});

/* POST search form results */
router.post('/search-results', localityController.getResults);

module.exports = router;