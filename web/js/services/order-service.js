+(function (app) {
	"use strict";

	app.factory("orderService", [
		"$http",
		function ($http) {
			function submitOrder(order) {
				return $http.post("/api/order", order);
			}

			return {
				submitOrder: submitOrder,
			};
		},
	]);
})(angular.module("soulful-shack"));
