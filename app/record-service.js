var fs = require('fs');
var _ = require('underscore');
var filename = './app/data/stub-data.json';

var sortingStrategy = require('./sorting-strategy');
var config = require('./config');
var Metadata = require('./metadata');

var pagination = require('./pagination');

var resultsPerPage = config.resultsPerPage;

module.exports.getRecordSummaries = function (page, minCost, userRating, stars, sortby) {
	return getRecordData().then(function (data) {
		var metadata = new Metadata(data.Establishments, minCost, userRating, stars, sortby);
		var filteredRecords = applyFilters(data.Establishments, minCost, userRating, stars);
		filteredRecords.sort(sortingStrategy(sortby));
		var hotels = getPage(filteredRecords, page);
		var establishments =  _.map(hotels, function(item) {
			return {
				"Name" : item.Name,
				"Stars" : item.Stars,
				"ThumbnailUrl" : item.ThumbnailUrl,
				"id" : item.id,
				"label" : item.label,
				"year" : item.year,
				"minCost" : item.MinCost,
				"userRating" : item.UserRating,
				"Distance" : item.Distance,
				"catalogNumber" : item.catalogNumber,
				"artist" : item.artist
			};
		});

		return {
			"Establishments" : establishments,
			"PaginationData" : pagination.createPaginationObject(filteredRecords.length, page, 5 ),
			"filterdata" : metadata
		};

	}, function (err) {
		console.log('some error handling', err)
	});
};

module.exports.getRecord = function (id) {
	return getRecordData().then(function(data){
		var record = _.find(data.Establishments, function(record) {
			return record.id == id;
		});
		if(record) return record;
		throw {
			message : 'record does not exist'
		};
	});
}


function getPage(records, page) {
	var pageNumber = parseInt(page, 10) || 1;
	var offset = ((pageNumber - 1) * resultsPerPage);
	var sliced = records.slice(offset, offset + resultsPerPage);
	return sliced;
}

function applyFilters(records, minCost, userRating, stars) {
	var result =  _.chain(records)
		.filter(filterByMinCost(minCost))
		.filter(filterByUserRating(userRating))
		.filter(filterByStarRating(stars))
		.value();
		return result;
}

/* return results with min cost greater than a given value */
function filterByMinCost(minCost) {
	return function(record) {
		return parseFloat(record.MinCost, 10) >=  parseFloat(minCost, 10);
	};
}

/* return results which have a user rating higher than a given value */
function filterByUserRating(userRating) {
	return function(record) {
		return parseFloat(record.UserRating, 10) >= parseFloat(userRating, 10);
	};
}

/* return results with stars greater than a given value */
function filterByStarRating(stars) {
	return function(record) {
		return parseFloat(record.Stars, 10) >=  parseFloat(stars, 10);
	};
}

function getRecordData() {
	return new Promise(function(resolve, reject){
		fs.readFile(filename, function (err, data) {
			if(err) {
			console.log('apple', err)
				reject(err);
			} else {
				try {
					var json = JSON.parse(data);
					resolve(json);
				} catch(exception) {
					console.log('exception')
					reject(exception);
				}
			}
		});
	});
}