+function() {

	'use strict';

	var app = angular.module('soulful-shack', ['ui.router']);

	var ratings = [
		[],[{}],[{},{}],[{},{},{}],[{},{},{},{}],[{},{},{},{},{}]
	];

	app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  })

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		// default path
		$urlRouterProvider.otherwise('/hotels/summaries');

		$stateProvider
			.state('signin', {
				url : '/sign-in',
				templateUrl : 'partials/sign-in.html',
				controller : ['$scope', '$state', 'userService','cartService', function ($scope, $state, userService, cartService ) {
					$scope.user = {};
					$scope.signin = function () {
						var username = $scope.user.name;
						var password = $scope.user.password;
						userService.signIn(username, password).then(function (user) {
							if(user.signedIn) {
								cartService.writeAnonymousCartItemsToUserCart();
								$state.go('order');
							} else {
								console.log('you are not registered in our database')
							}
						}, function () {
							console.log('an error occurred');
						});
					}
				}]
			})
			.state('hotelDetail', {
				url : '/hotel/:id',
				resolve : {
					'hotelDetail' : ['hotelsService', '$stateParams', function(hotelsService, $stateParams) {
						return hotelsService.getDetail($stateParams.id);
					}]
				},
				templateUrl : 'partials/hotel-detail.html',
				controller : [
					'$scope',
					'$state',
					'hotelDetail',
					'userService',
					'cartService',
					'$window', function (
						$scope,
						$state,
						hotelDetail,
						userService,
						cartService,
						$window){

					$scope.hotel = hotelDetail.data;
					$scope.goBack = function () {
						$window.history.back();
					};
					$scope.purchase = function(id) {

						userService.getUser().then(function (user) {
							if(user.signedIn){
								cartService.addItemToUserCart($scope.hotel);
								$state.go('order');
							} else {
								cartService.addItemToAnonymousCart($scope.hotel);
								$state.go('signin');
							}
						}, function (error) {
							console.log('error handling', error);
						})

					}
				}]
			})

			.state('order', {
				url : '/order',
				templateUrl : 'partials/order.html',
				resolve : {
					cart: ['$stateParams', 'hotelsService', 'cartService', function ($stateParams, recordsService, cartService){
						var cart = cartService.getUserCart();
						if(cart) {
							return cart;
						} else {
							console.log('you do not have an order')
							return {};
						}

					}]
				},
				controller : function ($scope, cart) {
					$scope.products= cart.products || [];
				}
			})

			.state('confirmation', {
				url : '/confirmation/:id',
				templateUrl : 'partials/confirmation.html',
				controller : function ($scope, cartService) {
					cartService.deleteUserCart();
				}
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

