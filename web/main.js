+function() {

	'use strict';

	var app = angular.module('soulful-shack', ['ui.router', 'ngMessages', 'ngAnimate']);


	app.controller('MainCtrl', ['$rootScope', 'userService','$scope', '$state',
		function($rootScope, userService, $scope, $state) {
			//  runs on page load,
			//  simply populates root scope with user from storage
			userService.loadUser();

			$rootScope.signout = function () {
				userService.signOut();
				$state.go('records.summaries');
			}
	}])

	app.config(function($locationProvider) {
		$locationProvider.html5Mode(true);
	})

	app.config(['$urlRouterProvider', function($urlRouterProvider){
		// default path
		$urlRouterProvider.otherwise('/records/summaries');
	}]);

}();

