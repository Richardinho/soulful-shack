+function (app) {

	'use strict';

	app.config(['$stateProvider', function($stateProvider){

		$stateProvider.state('register', {
			url : '/register',
			templateUrl : 'partials/register.html',
			controller : ['$scope', '$rootScope', '$state', 'userService', '$stateParams', 'fileUploadService',
				function ( $scope, $rootScope, $state, userService, $stateParams, fileUploadService ) {
					$scope.uploadAvatar = function () {
						fileUploadService.openFileDialogBox('#upload-avatar');
					};
					$scope.$watch('file', function (newVal, oldVal) {
						$scope.avatarFile = newVal;
					});
				}]
			});
	}]);

}(angular.module('soulful-shack'));