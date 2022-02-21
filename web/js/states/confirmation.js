+(function (app) {
	"use strict";

	app.config([
		"$stateProvider",
		function ($stateProvider) {
			$stateProvider.state("confirmation", {
				url: "/confirmation",
				templateUrl: "partials/confirmation.html",
			});
		},
	]);
})(angular.module("soulful-shack"));
