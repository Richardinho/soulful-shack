+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){

		$stateProvider.state('signin', {
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
							//todo : should return back into previous flow
							$state.go('order');
						} else {
							console.log('you are not registered in our database')
						}
					}, function () {
						console.log('an error occurred');
					});
				}
			}]
		});

	}]);

}(angular.module('soulful-shack'));