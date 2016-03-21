+function() {

	'use strict';

	var app = angular.module('hotels', ['ui.router']);

	var ratings = [
		[],[{}],[{},{}],[{},{},{}],[{},{},{},{}],[{},{},{},{},{}]
	];

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		// default path
		$urlRouterProvider.otherwise('/hotels/summaries');

		$stateProvider
			.state('signin', {
				url : '/sign-in',
				templateUrl : 'partials/sign-in.html'
			})
			.state('hotelDetail', {
				url : '/hotel/:id',
				resolve : {
					'hotelDetail' : ['hotelsService', '$stateParams', function(hotelsService, $stateParams) {
						return hotelsService.getDetail($stateParams.id);
					}]
				},
				templateUrl : 'partials/hotel-detail.html',
				controller : ['$scope', 'hotelDetail', '$window', function ($scope, hotelDetail, $window){
					$scope.hotel = hotelDetail.data;
					$scope.goBack = function () {
						$window.history.back();
					};
				}]
			})

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
			})
			.state('hotels.summaries', {
				url : '/summaries',
				resolve : {
					/* filters and sort options used by both refinements and pagination */
					refinements : function(serverData, createRefinements) {
						return createRefinements(serverData.data.filterdata, serverData.data.PaginationData.current);;
					}
				},
				views : {

					'menu' : {
						templateUrl : 'partials/refinements.html',
						controller : function ($scope, $state, serverData, refinements) {
							var page = 1;

							$scope.filters = refinements;

							$scope.refresh = function () {
								var filterData = createUrlParamsFromFilters($scope.filters, 1)
								$state.go('hotels.summaries', filterData);
							}
						}
					},
					'pagination' : {
						templateUrl : 'partials/pagination.html',
						controller : ['$scope', 'serverData', '$state', 'refinements', 'createPaginationLinks',
							function($scope, serverData, $state, refinements, createPaginationLinks) {

								$scope.pagination = createPaginationLinks(serverData.data.PaginationData);
								$scope.currentPage = serverData.data.PaginationData.current;
								$scope.totalPages = serverData.data.PaginationData.totalPages;

								$scope.changePage = function(requestedPage, enabled) {
									if(enabled) {
										if(requestedPage == 'prev') {
											requestedPage = parseInt(serverData.data.PaginationData.current, 10) - 1;
										} else if(requestedPage == 'next') {
											requestedPage = parseInt(serverData.data.PaginationData.current, 10) + 1;
										}
										refinements.page = requestedPage;
										$state.go('hotels.summaries', createUrlParamsFromFilters(refinements));
									}
								}
							}]
					},
					'results' : {
						templateUrl : 'partials/hotel-summaries.html',
						controller : function($scope, serverData){
							$scope.hotels = serverData.data.Establishments;
							$scope.getStars = function (rating) {
								return ratings[rating];
							};
						}
					}
				}
			})
	}]);

	/*
		create data object to be used to create query string
	*/
	function createUrlParamsFromFilters(filters, page) {
		var pageNumber;
		if(page) {
			pageNumber = page
		} else {
			pageNumber = filters.page;
		}

		return {
			page       : pageNumber,
			mincost    : filters.mincost.val,
			userrating : filters.userrating.val,
			stars      : filters.stars.val,
			sortby     : filters.sortby
		};
	}


}();

