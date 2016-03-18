+function (app){
	'use strict';
	app.factory('hotelsService', ['$http', function ($http) {

		function getHotelSummaries(filters) {
			var page = filters.page;
			var minCost = filters.mincost;
			var userRating = filters.userrating;
			var stars = filters.stars;
			var sortby = filters.sortby;
			return $http.get('/api/hotels/' + page + '/' + minCost + '/' + userRating + '/' + stars + '/' + sortby);
		}

		function getDetail(id) {
			return $http.get('/api/hotel/' + id);
		}

		return {
			getHotelSummaries : getHotelSummaries,
			getDetail : getDetail
		};
	}]);
}(angular.module('hotels'));