+(function (app) {
	"use strict";

	app.config([
		"$stateProvider",
		function ($stateProvider) {
			$stateProvider.state("profile", {
				url: "/profile",
				templateUrl: "partials/profile.html",
				controller: [
					"$scope",
					"$rootScope",
					function ($scope, $rootScope) {
						$scope.user = $rootScope.user;
					},
				],
			});
		},
	]);
})(angular.module("soulful-shack"));
