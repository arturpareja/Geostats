var searchModule = require('../services/elasticsearch.js');
var queryBuilder = require('../helpers/querybuilder.js');

/* Locality model schema (lat,lon, distance, operation and attribute */
var Locality = function () {
	this.data = {
		lat:  null,
		lon:  null,
		dist: null,
		oper: null,
		attr: null
	};

	/* Locality schema checker (Express-validator functions) */
	this.verify = function (req) {
		req.checkBody("lat","Invalid latitude").isFloat();
		req.checkBody("lon","Invalid longitude").isFloat();
		req.checkBody("radius","Invalid radius").isFloat();
		req.checkBody("measure","Invalid measure").isIn(["m", "km"]);
		req.checkBody("operation","Invalid operation").isIn(["sum", "avg", "percentiles"]); 
		req.checkBody("attribute","Invalid attribute").matches('attribute[1-15]','i'); 
		return this;
	};

	/* Fills Locality properties */
	this.fill = function (req) {
		var info = req.body;
		this.data.lat  = parseFloat(info.lat);
		this.data.lon  = parseFloat(info.lon);
		this.data.dist = info.radius.concat(info.measure);
		this.data.oper = info.operation;
		this.data.attr = info.attribute;
		return this;
	};

	/* Builds a query and performs search applying callback over results */
	this.performOperation = function(callback) {
		var query = queryBuilder.getFindQuery(this);
		searchModule.search(query, callback);	
	};

	/* Getters */
	this.getLatitude = function()  {
		return this.data.lat;
	};

	this.getLongitude = function() {
		return this.data.lon;
	};

	this.getDistance = function()  {
		return this.data.dist;
	};

	this.getOperation = function() {
		return this.data.oper;
	};

	this.getAttribute = function() {
		return this.data.attr;
	};
};

/* Locality Model Factory (with data verification) */
module.exports = function (req) {
	return new Locality().verify(req);	
};