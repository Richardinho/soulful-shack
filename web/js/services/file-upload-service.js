+function (app) {

	'use strict';

	app.factory('fileUploadService', [function (storageService) {

		function openFileDialogBox(selector) {
			var fileInput = document.querySelector(selector);
			fileInput.click();
		}

		return {
			openFileDialogBox : openFileDialogBox
		};
	}]);

}(angular.module('soulful-shack'));