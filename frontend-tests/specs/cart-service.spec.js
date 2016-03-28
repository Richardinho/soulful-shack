describe('cart-service', function () {

	var cartService, spyOnSetItem;

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
	describe('writeAnonymousCartItemsToUserCart()', function () {
		var anonymousCart, userCart;
		describe('when the same item exists in both user and anonymous carts', function (){
			beforeEach(function () {
				spyOnSetItem = jasmine.createSpy('setItem');
				anonymousCart = {
					products : [{
						name : 'alpha',
						id : 1,
						quantity : 1
					},{
						name : 'gamma',
						id : 4,
						quantity : 1
					}]
				};
				userCart = {
					products : [{
						name : 'alpha',
						id : 1,
						quantity : 1
					},{
						name : 'beta',
						id : 2,
						quantity : 3
					}]
				};
				angular.module('soulful-shack')
					.factory('storageService', function($q) {
						return {
							setItem : spyOnSetItem,
							removeItem : function () {},
							getItem : function (type, key){
								if(key === 'anonymouscart') {
									return JSON.stringify(anonymousCart);
								} else if(key === 'usercart') {
									return JSON.stringify(userCart);
								}
							}
						};
					});
			});
			beforeEach(inject(function(_cartService_){
				// The injector unwraps the underscores (_) from around the parameter names when matching
				cartService = _cartService_;
			}));
			it('should combine carts together, removing duplicates and incrementing quantities', function () {
				var expectedCombinedCart = {
					products : [{
						name : 'alpha',
						id : 1,
						quantity : 2
					},{
						name : 'beta',
						id : 2,
						quantity : 3
					},{
						name : 'gamma',
						id : 4,
						quantity : 1
					}]
				};

				cartService.writeAnonymousCartItemsToUserCart();
				var result = JSON.parse(spyOnSetItem.calls.argsFor(0)[2]);

				var expectedCombinedCartProducts = expectedCombinedCart.products.sort(sortFunction);
				var resultProducts = result.products.sort(sortFunction);

				expect(resultProducts).toEqual(expectedCombinedCartProducts)

				function sortFunction(a, b) {
					return parseInt(a.id, 10) - parseInt(b.id, 10);
				}
			});
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