+function (app) {

	'use strict';

	app.factory('fileUploadService', ['$q', function ($q) {

		function openFileDialogBox(selector) {
			var fileInput = document.querySelector(selector);
			fileInput.click();
		}

		//todo: check that file is an image
		function isImage(object){
			return object instanceof File;
		}

		function getDataURL (file) {
			var deferred = $q.defer();
			var reader = new FileReader();

			reader.onload = function(e) {
				deferred.resolve(e.target.result);
			}

			reader.readAsDataURL(file);

			return deferred.promise;
		}

		return {
			openFileDialogBox : openFileDialogBox,
			getDataURL : getDataURL,
			isImage : isImage
		};
	}]);

}(angular.module('soulful-shack'));
