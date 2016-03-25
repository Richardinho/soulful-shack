+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){

		$stateProvider
			.state('hotels', {
				url : '/hotels?page&mincost&stars&userrating&sortby',
				abstract : true,
				templateUrl : 'partials/hotels.html',
				resolve : {
					'serverData' : ['hotelsService', '$stateParams', function(hotelsService, $stateParams) {
						/*
							default values for parameters in case a user leaves them out are hard coded here.
						*/
						var refinements =  {
							page       : $stateParams.page || 1,
							mincost    : $stateParams.mincost || 5,
							stars      : $stateParams.stars || 4,
							userrating : $stateParams.userrating || 3,
							sortby     : $stateParams.sortby || 'distance'
						};

						return hotelsService.getHotelSummaries(refinements);
					}]
				}
			});
	}]);

}(angular.module('soulful-shack'));