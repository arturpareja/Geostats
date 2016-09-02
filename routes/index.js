var express = require('express');
var router = express.Router();

var searchModule = require('../services/elasticsearch.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Geostats' });
});

router.post('/search-results', function(req, res) {
  searchModule.search(req.body, function(data) {
    res.render('index', { title: 'Geostats', results: data });
  });
});

module.exports = router;