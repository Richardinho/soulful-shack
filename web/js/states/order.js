+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){

		$stateProvider

			.state('order', {
				url : '/order',
				templateUrl : 'partials/order.html',
				resolve : {
					user : function (userService) {
						return userService.getUser();
					}
				},
				controller : function ($scope, $state, orderService, cartService, user) {
					var cart;
					if(user.signedIn) {
						cart = cartService.getUserCart();
					} else {
						cart = cartService.getAnonymousUserCart();
					}
					$scope.products= (cart && cart.products) || [];

					$scope.placeOrder = function () {
						if(user.signedIn) {
							orderService.submitOrder($scope.products).then(function(response){
								if(response.data.success) {
									cartService.deleteUserCart();
									console.log('order has been made')
									$state.go('confirmation');
								} else {
									console.log('order failed for some reason')
								}
							}, function (error) {
								console.log('error', error)
							})
						} else {
							console.log('you are not signed in');
						}
					}
				}
			})
		}]);

}(angular.module('soulful-shack'));