var elasticsearch = require('elasticsearch');

// Elasticsearch client 
var client = elasticsearch.Client({
  hosts: [
    'localhost:9200'
  ]
});

/* Elasticsearch document search function*/
module.exports.search = function(query, callback) {

  // Search query Promise then callback(error,response)
  client.search(query).then(function (resp) {
    callback(undefined,resp);
  }, function (err) {
    callback(err.message, null)
  });
}