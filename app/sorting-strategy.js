
var sortFunctions = {
	mincost : function (hotelA, hotelB) {
		var a = parseFloat(hotelA.MinCost);
		var b = parseFloat(hotelB.MinCost);
		return compare(a, b);
	},
	distance : function (hotelA, hotelB) {
		var a = parseFloat(hotelA.Distance);
		var b = parseFloat(hotelB.Distance);
		return compare(a, b);
	},
	userrating : function (hotelA, hotelB) {
		var a = parseFloat(hotelA.UserRating);
		var b = parseFloat(hotelB.UserRating);
		return compare(b, a);
	},
	stars : function (hotelA, hotelB) {
		var a = parseInt(hotelA.Stars, 10);
		var b = parseInt(hotelB.Stars, 10);
		return compare(b, a);
	}
};

function compare(a, b) {
	if(a == b) return 0;
	if(a < b) return -1;
	return 1;
}

module.exports = function (sortby) {
	return sortFunctions[sortby];
}