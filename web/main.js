+function() {

	'use strict';

	var app = angular.module('soulful-shack', ['ui.router', 'ngMessages', 'ngAnimate']);

	app.controller('MainCtrl', ['$rootScope', 'userService',
		function($rootScope, userService) {

			userService.getUser().then(function (user) {
				$rootScope.user = user;
			});

			$rootScope.signout = function () {
				userService.signOut();
				$rootScope.user = { signedIn : false };
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

