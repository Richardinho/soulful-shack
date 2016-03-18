
/*
	contains data pertaining to filters.
	including value of filter and allowable range
	The values are the same as those selected by user unless these fall outside of the allowable min max range.
*/
function Metadata(data, minCost, userRating, stars, sortby){
	this.minCost = minCost;
	this.userRating = userRating;
	this.stars = stars;
	this.sortby = sortby;
}

module.exports = Metadata;