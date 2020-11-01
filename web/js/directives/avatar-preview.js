+function (app) {

	'use strict';

	app.directive('avatarPreview', ['fileUploadService', function (fileUploadService) {

		return {
			restrict: 'A',
			scope : {
				imagefile : '='
			},
			link: function(scope, element, attrs) {
				scope.$watch('imagefile', function () {
					if (fileUploadService.isImage(scope.imagefile)) {
						var img = document.createElement("img");

						img.style.width = '100%';
						img.style.verticalAlign = 'middle';
						img.file = scope.imagefile;

						element[0].style.marginBottom = '12px';
						element.empty();
						element.append(img);

						fileUploadService
              .getDataURL(scope.imagefile)
              .then(function (dataUrl) {
                  img.src = dataUrl;
                }).catch(function () {
                  console.log('an error occurred')
                });
					}
				});
			}
		};
	}]);

}(angular.module('soulful-shack'));
