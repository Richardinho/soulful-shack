+(function (app) {
	"use strict";

	app.directive("fileModel", [
		function () {
			return {
				restrict: "A",
				link: function (scope, element, attrs) {
					element.bind("change", function () {
						scope.$apply(function () {
							scope.file = element[0].files[0];
						});
					});
				},
			};
		},
	]);
})(angular.module("soulful-shack"));
