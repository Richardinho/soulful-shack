+(function (app) {
	"use strict";

	app.factory("recordsService", [
		"$http",
		function ($http) {
			function getRecordSummaries(filters) {
				var page = filters.page;
				var minCost = filters.mincost;
				var userRating = filters.userrating;
				var stars = filters.stars;
				var sortby = filters.sortby;

				// TODO: should use query parameters instead of this format
				return $http.get(
					"/api/records/" +
						page +
						"/" +
						minCost +
						"/" +
						userRating +
						"/" +
						stars +
						"/" +
						sortby
				);
			}

			function getRecord(id) {
				return $http.get("/api/record/" + id);
			}

			return {
				getRecordSummaries: getRecordSummaries,
				getRecord: getRecord,
			};
		},
	]);
})(angular.module("soulful-shack"));
