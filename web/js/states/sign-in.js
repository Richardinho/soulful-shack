+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){


		$stateProvider.state('signin', {
			url : '/sign-in?nextpage',
			templateUrl : 'partials/sign-in.html',
			controller : ['$scope', '$rootScope', '$state', 'userService','cartService', '$stateParams',
				function ( $scope, $rootScope, $state, userService, cartService, $stateParams ) {
					$scope.user = {};
					$scope.signin = function (form) {
						var email = $scope.user.email;
						var password = $scope.user.password;
						userService.signIn(email, password).then(function (user) {
							form.$setPristine();
							form.$setUntouched();
							if(user) {
								var nextPage = $stateParams['nextpage'];
								cartService.writeAnonymousCartItemsToUserCart();
								$state.go(nextPage);
							} else {
								$scope.showErrorMessage = true;
							}
						});
					}
				}]
			});
	}]);

}(angular.module('soulful-shack'));