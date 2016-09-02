var elasticsearch = require('elasticsearch');

var client = elasticsearch.Client({
  hosts: [
    'localhost:9200'
  ]
});

module.exports.search = function(searchData, callback) {
  client.search({
    index: 'geostore',
    type: 'locality',
    body: {
        query: {
        filtered : {
            query : {
                match_all : {}
            },
            filter : {
                geo_distance : {
                    distance : "20km",
                    location : {
                        lat : 40.6449886220001,
                        lon : -3.15660641799991
                    }
                }
            }
        }
        },
        aggs : {
          result : { sum : { field : "attribute1" } }
        }
    }
  }).then(function (resp) {
    callback(resp.aggregations.result);
  }, function (err) {
      callback(err.message)
      console.log(err.message);
  });
}