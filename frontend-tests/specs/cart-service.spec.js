describe('cart-service', function () {

	var cartService;

	beforeEach(module('soulful-shack'));

	describe('When the user tries to add an item into the cart', function () {

		var item = {
			id : 3,
			name : 'my cool record'
		};
		//  item is not in cart
		var cart = {
			products : [ ]
		};
		var spyOnSetItem;
		beforeEach(function () {
			spyOnSetItem = jasmine.createSpy('setItem');

			angular.module('soulful-shack')
				.factory('storageService', function($q) {
					return {
						setItem : spyOnSetItem.and.callFake(function () {

						}),
						removeItem : function (){

						},
						getItem : function (){
							return JSON.stringify(cart);
						}
					};
				});
		});
		beforeEach(inject(function(_cartService_){
			// The injector unwraps the underscores (_) from around the parameter names when matching
			cartService = _cartService_;
		}));
		it('should add the item to the cart', function (){
			var expectedCart = {
				products : [{
					id : 3,
					name : 'my cool record',
					quantity : 1
				}]
			};
			cartService.addItemToUserCart(item);
			expect(spyOnSetItem).toHaveBeenCalledWith('local','usercart', JSON.stringify(expectedCart));
		});
	});
	describe('When the user tries to add an item into the cart that is already there', function () {

		var item = {
			id : 3,
			name : 'my cool record',
			quantity : 1
		};
		//  item IS in cart
		var cart = {
			products : [ item ]
		};
		var spyOnSetItem;
		beforeEach(function () {
			spyOnSetItem = jasmine.createSpy('setItem');

			angular.module('soulful-shack')
				.factory('storageService', function($q) {
					return {
						setItem : spyOnSetItem.and.callFake(function () {
						}),
						removeItem : function (){
						},
						getItem : function (){
							return JSON.stringify(cart);
						}
					};
				});
		});
		beforeEach(inject(function(_cartService_){
			// The injector unwraps the underscores (_) from around the parameter names when matching
			cartService = _cartService_;
		}));
		it('should add the item to the cart and increment the item\'s quantity property by 1', function (){
			var expectedCart = {
				products : [{
					id : 3,
					name : 'my cool record',
					quantity : 2
				}]
			};
			cartService.addItemToUserCart(item);
			expect(spyOnSetItem).toHaveBeenCalledWith('local','usercart', JSON.stringify(expectedCart));
		});
	});
});