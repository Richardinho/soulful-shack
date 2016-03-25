+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){

		$stateProvider
			.state('hotelDetail', {
				url : '/hotel/:id',
				resolve : {
					'hotelDetail' : ['hotelsService', '$stateParams', function(hotelsService, $stateParams) {
						return hotelsService.getDetail($stateParams.id);
					}]
				},
				templateUrl : 'partials/hotel-detail.html',
				controller : ['$scope','$state','hotelDetail','userService','cartService','$window', function (
						$scope,$state,hotelDetail,userService,cartService,$window){

					$scope.hotel = hotelDetail.data;
					$scope.goBack = function () {
						$window.history.back();
					};

					$scope.addToCart = function(id) {

						userService.getUser().then(function (user) {
							if(user.signedIn){
								cartService.addItemToUserCart($scope.hotel);
							} else {
								cartService.addItemToAnonymousCart($scope.hotel);
							}
						}, function (error) {
							console.log('error handling', error);
						});
						$state.go('order');
					}
				}]
			});
		}]);
}(angular.module('soulful-shack'));