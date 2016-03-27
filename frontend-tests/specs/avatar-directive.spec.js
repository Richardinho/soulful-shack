describe('avatar preview directive', function () {

	var $compile, $rootScope, spyOnGetDataUrl,  spyOnIsImage, element;

	beforeEach(module('soulful-shack'));

	var imageFile = {
		image : true
	}
	var nonImageFile = {
		image : false
	}

	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(inject(function (fileUploadService, $q) {
		spyOnGetDataUrl = spyOn(fileUploadService, 'getDataURL');
		spyOnIsImage = spyOn(fileUploadService, 'isImage');
		spyOnGetDataUrl.and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve('stub-data-url');
			return deferred.promise;
		});
		spyOnIsImage.and.callFake(function (file) {
      return file.image;
    });
	}));

	describe('when scope.user.avatarFile is NOT an image', function () {
		beforeEach(function () {
			$rootScope.user = { avatarFile : nonImageFile};
			element = $compile("<div avatar-preview imagefile='user.avatarFile'></div>")($rootScope);
			$rootScope.$digest();
		});
		it('should NOT populate element with an image', function() {
			var image = element.find('img');
			expect(image.length).toBe(0);
		});
	});
	describe('when scope.user.avatarFile is an image', function () {
		beforeEach(function () {
			$rootScope.user = { avatarFile : imageFile};
			element = $compile("<div avatar-preview imagefile='user.avatarFile'></div>")($rootScope);
      $rootScope.$digest();
		});
		it('should populate element with an image', function() {
			var image = element.find('img');
			expect(image.length).toBe(1);
			expect(image[0].src).toContain('stub-data-url');
		});
	});
});