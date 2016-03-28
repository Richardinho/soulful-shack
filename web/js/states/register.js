+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){

		$stateProvider.state('register', {
			url : '/register',
			templateUrl : 'partials/register.html',
			controller : ['$scope', '$http','$rootScope', '$state', 'userService', '$stateParams', 'fileUploadService',
				function ( $scope, $http, $rootScope, $state, userService, $stateParams, fileUploadService ) {

					$scope.user = {};

					$scope.uploadAvatar = function () {
						fileUploadService.openFileDialogBox('#upload-avatar');
					};

					$scope.$watch('file', function (newVal, oldVal) {
						$scope.user.avatarFile = newVal;
					});

					$scope.submit = function () {
						userService.registerUser($scope.user)
							.then(function () {
									$state.go('records.summaries');
								}).catch(function () {
									console.log('error');
								});
					};
				}]
			});
	}]);

}(angular.module('soulful-shack'));