+function (app) {

	'use strict';


	app.factory('storageService', [function () {

		var LOCAL = 'local';
		var SESSION = 'session';

		var ls = window.localStorage;
		var sess = window.sessionStorage;

		return {
			setItem : function (type, key, value) {
				if(type === LOCAL) {
					ls.setItem(key, value);
				} else if(type === SESSION) {
					sess.setItem(key, value);
				} else {
					throw {
						message : 'storage type not supported'
					}
				}
			},
			getItem : function (type, key) {
				if(type === LOCAL) {
					return ls.getItem(key);
				} else if(type === SESSION) {
					return sess.getItem(key);
				} else {
					throw {
						message : 'storage type not supported'
					}
				}
			},
			removeItem : function(type, key) {
				if(type === LOCAL) {
					ls.removeItem(key);
				} else if(type === SESSION) {
					sess.removeItem(key);
				} else {
					throw {
						message : 'storage type not supported'
					}
				}
			},
			clear: function(type, key) {
				if(type === LOCAL) {
					ls.clear();
				} else if(type === SESSION) {
					sess.clear();
				} else {
					throw {
						message : 'storage type not supported'
					}
				}
			},
			getLength : function(type) {
				if(type === LOCAL) {
					return ls.length;
				} else if(type === SESSION) {
					return sess.length;
				} else {
					throw {
						message : 'storage type not supported'
					}
				}
			}
		};
	}]);

}(angular.module('soulful-shack'));