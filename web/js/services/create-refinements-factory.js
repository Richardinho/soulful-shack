+(function (app) {
	"use strict";

	/*
	 *  creates object for populating filters. The idea is that this will be populated from
	 *  data returned from the server on each request
	 */

	app.factory("createRefinements", [
		function () {
			return function (data, page) {
				return {
					mincost: {
						val: Number(data.minCost),
					},
					userrating: {
						val: Number(data.userRating),
					},
					stars: {
						val: data.stars,
					},
					sortby: data.sortby,
					page: page,
				};
			};
		},
	]);
})(angular.module("soulful-shack"));
