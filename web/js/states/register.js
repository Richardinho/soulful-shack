+(function (app) {
	"use strict";

	app.config([
		"$stateProvider",
		function ($stateProvider) {
			$stateProvider.state("register", {
				url: "/register",
				templateUrl: "partials/register.html",
				controller: [
					"$scope",
					"$http",
					"$rootScope",
					"$state",
					"userService",
					"$stateParams",
					"fileUploadService",
					function (
						$scope,
						$http,
						$rootScope,
						$state,
						userService,
						$stateParams,
						fileUploadService
					) {
						$scope.user = {};

						$scope.uploadAvatar = function () {
							fileUploadService.openFileDialogBox("#upload-avatar");
						};

						$scope.$watch("file", function (newVal, oldVal) {
							$scope.user.avatarFile = newVal;
						});

						$scope.submit = function () {
							userService
								.registerUser($scope.user)
								.then((response) => {
									if (response) {
										$state.go("records.summaries");
									} else {
										console.log("you are not signed in!");
										// todo: After registering should not sign user in, but send an
										// and email in which either there will be a confirmation link
										//  or a password reset link if they are already registered.
									}
								})
								.catch((error) => {
									console.log("error", error);
								});
						};
					},
				],
			});
		},
	]);
})(angular.module("soulful-shack"));
