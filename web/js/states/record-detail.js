+(function (app) {
	"use strict";

	app.config([
		"$stateProvider",
		function ($stateProvider) {
			$stateProvider.state("record", {
				url: "/record/:id",
				resolve: {
					recordDetail: [
						"recordsService",
						"$stateParams",
						function (recordsService, $stateParams) {
							return recordsService.getRecord($stateParams.id);
						},
					],
				},
				templateUrl: "partials/record-detail.html",
				controller: [
					"$scope",
					"$rootScope",
					"$state",
					"recordDetail",
					"userService",
					"cartService",
					"$window",
					function (
						$scope,
						$rootScope,
						$state,
						recordDetail,
						userService,
						cartService,
						$window
					) {
						$scope.recordDetail = recordDetail.data;

						$scope.goBack = function () {
							$window.history.back();
						};

						$scope.addToCart = function (id) {
							if ($rootScope.user.signedIn) {
								cartService.addItemToUserCart($scope.recordDetail);
							} else {
								cartService.addItemToAnonymousCart($scope.recordDetail);
							}

							$state.go("order");
						};
					},
				],
			});
		},
	]);
})(angular.module("soulful-shack"));
