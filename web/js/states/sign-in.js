+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){

		$stateProvider.state('signin', {
			url : '/sign-in?nextpage',
			templateUrl : 'partials/sign-in.html',
			controller : ['$scope', '$rootScope', '$state', 'userService','cartService', '$stateParams',
				function ( $scope, $rootScope, $state, userService, cartService, $stateParams ) {
					$scope.user = {};
					$scope.signin = function () {
						var username = $scope.user.name;
						var password = $scope.user.password;
						userService.signIn(username, password).then(function (user) {
							$rootScope.user = user;
							if(user.signedIn) {
								var nextPage = $stateParams['nextpage'];
								cartService.writeAnonymousCartItemsToUserCart();
								$state.go(nextPage);
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