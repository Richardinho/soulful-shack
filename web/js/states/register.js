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

					function successHandler() {}
					function errorHandler() {}

					$scope.submit = function () {
						var formData = new FormData();
						formData.append('first-name', $scope.user.firstName);
						formData.append('last-name', $scope.user.secondName);
						formData.append('address1', $scope.user.address1);
						formData.append('address2', $scope.user.address2);
						formData.append('city', $scope.user.city);
						formData.append('telephone', $scope.user.telephone);
						formData.append('email', $scope.user.email);
						formData.append('avatar', $scope.user.avatarFile);
						var options = {
							transformRequest: angular.identity,
							headers: {'Content-Type': undefined}
						};
						$http.post('/api/register', formData, options).then(successHandler, errorHandler);
					};
				}]
			});
	}]);

}(angular.module('soulful-shack'));