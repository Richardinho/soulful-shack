+function (app) {
	'use strict';

	var ANONYMOUS_CART = 'anonymouscart';
	var USER_CART = 'usercart';

  //todo: work out exact business rules for dealing with carts
	app.factory('cartService', ['storageService', function (storageService) {

		//  public
		function addItemToUserCart(product) {
			_addItemToCart(product, USER_CART, 'local');
		}

		function addItemToAnonymousCart(product) {
			_addItemToCart(product, ANONYMOUS_CART, 'session');
		}

		function writeAnonymousCartItemsToUserCart() {
			var userCart = _getUserCart();
			var anonymousCart = _getAnonymousUserCart();

			var anonymousCartProducts = anonymousCart.products;
			//  important to remove duplicates and simply increment quantity in target product
			anonymousCartProducts.forEach(function (product) {
				var userCartProduct = getProductFromCart(userCart, product);

				if(userCartProduct) {
					userCartProduct.quantity = userCartProduct.quantity + product.quantity;
				} else {
					userCart.products.push(product);
				}
			});

			storageService.setItem('local', USER_CART, JSON.stringify(userCart));
			_deleteAnonymousCart();
		}

		function deleteUserCart() {
			storageService.removeItem('local', USER_CART);
		}

		function _deleteAnonymousCart() {
			storageService.removeItem('session', ANONYMOUS_CART);
		}

		//  private

		function _getUserCart() {
			return _getOrCreateCart(USER_CART, 'local');
		}

		function _getAnonymousUserCart() {
			return _getOrCreateCart(ANONYMOUS_CART, 'session');
		}

		function _getOrCreateCart(cartidentifier, storageType) {
			var cart;
			var cartString = storageService.getItem(storageType, cartidentifier);
			if(cartString){
				try {
					cart = JSON.parse(cartString);
				} catch (e) {
					cart = { products : []};
					storageService.setItem(storageType, cartidentifier, JSON.stringify(cart));
				}
			} else {
				cart = { products : []};
				storageService.setItem(storageType, cartidentifier, JSON.stringify(cart));
			}

			return cart;
		}

		function getProductFromCart(cart, product) {
			return cart.products.find(function(item){
				return product.id == item.id;
			})
		}

		function _addItemToCart(product, storageKey, storageType){
			var cart;
			var cartItem = _createCartItem(product);
			var cartString = storageService.getItem(storageType, storageKey);

			if(cartString) {
				try {
					cart = JSON.parse(cartString);

					var existingProduct = getProductFromCart(cart, product);
					if(existingProduct) {
						existingProduct.quantity++;
					} else {
						cartItem.quantity = 1;
						cart.products.push(cartItem);
					}

				} catch(e) {
					cartItem.quantity = 1;
					cart = {
						products : [cartItem]
					}
				}
			} else {
				cartItem.quantity = 1;
				cart = {
					products : [cartItem]
				}
			}

			storageService.setItem(storageType, storageKey, JSON.stringify(cart));
		}

		function _createCartItem(product) {
			return product;
		}

		return {
			addItemToUserCart : addItemToUserCart,
			getUserCart : _getUserCart,
			getAnonymousUserCart : _getAnonymousUserCart,
			addItemToAnonymousCart : addItemToAnonymousCart,
			writeAnonymousCartItemsToUserCart : writeAnonymousCartItemsToUserCart,
			deleteUserCart : deleteUserCart
		};
	}]);

}(angular.module('soulful-shack'));
