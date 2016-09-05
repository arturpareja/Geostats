/* 
	Parametric Elasticsearch query (Locality schema)
	- Needs index and type to be created previously
	- Sets geo_distance from center location and 
	- Aggregates function (sum, avg, percentiles) on selected attribute
	- size: 0 => response w/o list of documents (only aggregation results)
 */
exports.getFindQuery = function(locality) {
	var query = {
	    index: 'geostore',
	    type: 'locality',
	    body: {
	    	size : 0, 
	        query: {
		        filtered : {
		            query : {
		                match_all : {}
		            },
		            filter : {
		                geo_distance : {
		                    distance : locality.getDistance(),
		                    location : {
		                        lat : locality.getLatitude(),
		                        lon : locality.getLongitude()
		                    }
		                }
		            }
		        }
	        },
	        aggs : {
	        	result : { 
	          		[locality.getOperation()] : { 
	          			field : locality.getAttribute() 
	          		} 
	          	}
	        }
	    }
	}
	
  	return query;
};