var localityModel = require('../models/locality.js');

/*
	Locality Controller:
	- sends form data to locality Model (point, distance, operator, attribute)
	- if data validation was sucessful, controller awaits for model's response
	- results or errors will be displayed on index.ejs view
*/
exports.getResults = function(req, res) {

	// new locality instance and chech errors
	var locality = localityModel(req);
  	var errors   = req.validationErrors();
  	if (errors) {
		res.render('index', { title: 'Geostats', errors: errors});
    	return;
  	} else {

  		// fill locality verified data and perform database operation
  		locality.fill(req);
		locality.performOperation(function(errorMessage, result){

			// error from database operation
			if (errorMessage !== undefined) {
				res.render('index', { title: 'Geostats', dbErr: errorMessage});
				return;
			}
			// get database results 
			var aggs = result.aggregations.result

			// median result has different JSON schema
			var isMedian = locality.getOperation() == "percentiles"
			var value =  isMedian ? aggs.values["50.0"] : aggs.value;

			// display results
			res.render('index', { title: 'Geostats', results: value });
	  	});
	}
};