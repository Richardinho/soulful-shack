+function() {

	'use strict';

	var app = angular.module('soulful-shack', ['ui.router']);

	app.controller('MainCtrl', ['$scope', 'userService', function($scope, userService) {
		var user = userService.getUser().then(function (user) {
			$scope.signedIn = user.signedIn;
		}, function () {
			$scope.loggedIn = false;
		});
	}])

	app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  })

	app.config(['$urlRouterProvider', function($urlRouterProvider){
		// default path
		$urlRouterProvider.otherwise('/hotels/summaries');
	}]);

}();

