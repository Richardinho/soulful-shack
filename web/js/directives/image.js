+function (app) {

	'use strict';

	app.directive('avatarImage', [function () {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {

				scope.$watch('avatarFile', function () {
					if(scope.avatarFile instanceof File) {
						var img = document.createElement("img");
						img.style.width = '100%';
						img.style.verticalAlign = 'middle';
						img.file = scope.avatarFile;
						element[0].style.marginBottom = '12px';
						element.empty();
						element.append(img);

						var reader = new FileReader();
						reader.onload = (function(aImg) {
							return function(e) {
								aImg.src = e.target.result;
							};
						})(img);
						reader.readAsDataURL(scope.avatarFile);
					}
				});
			}
		};
	}]);

}(angular.module('soulful-shack'));