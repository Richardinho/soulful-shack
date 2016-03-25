+function (app) {

	'use strict';

	var ANONYMOUS_CART = 'anonymouscart';
	var USER_CART = 'usercart';

//todo: work out exact business rules for dealing with carts
	app.factory('cartService', [function () {

		//  public
		function addItemToUserCart(product) {
			_addItemToCart(product, USER_CART, window.localStorage);
		}

		function addItemToAnonymousCart(product) {
			_addItemToCart(product, ANONYMOUS_CART, window.sessionStorage);
		}

		function writeAnonymousCartItemsToUserCart() {
      var userCart = _getUserCart();
      var anonymousCart = _getAnonymousUserCart();
      userCart.products = userCart.products.concat(anonymousCart.products);
      window.localStorage.setItem(USER_CART, JSON.stringify(userCart));
      _deleteAnonymousCart();
    }

		function deleteUserCart() {
			window.localStorage.removeItem(USER_CART);
		}

		function _deleteAnonymousCart() {
			window.sessionStorage.removeItem(ANONYMOUS_CART);
		}

		//  private

		function _getUserCart() {
			return _getOrCreateCart(USER_CART, window.localStorage);
		}

		function _getAnonymousUserCart() {
			return _getOrCreateCart(ANONYMOUS_CART, window.sessionStorage);
		}

		function _getOrCreateCart(cartidentifier, storage) {
			var cart;
			var cartString = storage.getItem(cartidentifier);
			if(cartString){
				try {
					cart = JSON.parse(cartString);
				} catch (e) {
					cart = { products : []};
				}
			} else {
				cart = { products : []};
			}
			storage.setItem(cartidentifier, JSON.stringify(cart));
			return cart;

		}

		function _addItemToCart(product, storageKey, storage){
			var cart;
			var cartItem = _createCartItem(product);
			var cartString = storage.getItem(storageKey);
			if(cartString) {
				try {
					cart = JSON.parse(cartString);
					cart.products.push(cartItem);
				} catch(e) {
					cart = {
						products : [cartItem]
					}
				}
			} else {
				cart = {
					products : [cartItem]
				}
			}
			storage.setItem(storageKey, JSON.stringify(cart));
		}

		function _createCartItem(product) {
			return product;
		}

		return {
			getUserCart : _getUserCart,
			getAnonymousUserCart : _getAnonymousUserCart,
			addItemToUserCart : addItemToUserCart,
			addItemToAnonymousCart : addItemToAnonymousCart,
			writeAnonymousCartItemsToUserCart : writeAnonymousCartItemsToUserCart,
			deleteUserCart : deleteUserCart
		};
	}]);

}(angular.module('soulful-shack'));