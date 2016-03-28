+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){

		$stateProvider

			.state('order', {
				url : '/order',
				templateUrl : 'partials/order.html',
				controller : function ($scope, $state, orderService, cartService, $rootScope) {
					var cart;
					var user = $rootScope.user || {};
					if(user.signedIn) {
						cart = cartService.getUserCart();
					} else {
						cart = cartService.getAnonymousUserCart();
					}
					$scope.products= (cart && cart.products) || [];

					$scope.totalPrice = function () {
						return $scope.products.reduce(function (previous, current){
							return previous + (current.MinCost * current.quantity);
						}, 0);
					}

					$scope.checkout = function () {
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
							//  redirect to sign in page
							$state.go('signin', { nextpage : 'order'});
						}
					}
				}
			})
		}]);

}(angular.module('soulful-shack'));