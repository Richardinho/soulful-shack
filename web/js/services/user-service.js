+function (app) {

	'use strict';

	var users = {
		'richard' : 'password',
		'john' : 'password2'
	};

	app.factory('userService', ['$http', '$q', function ($http, $q) {

		var user = {};

		function getUser() {
			var deferred = $q.defer();
			user.signedIn = true; //  should look in localstorage for token
			deferred.resolve(user);
			return deferred.promise;
		}

		function signIn(name, password ) {
			var deferred = $q.defer();
			if(users[name] && password === users[name]) {
				deferred.resolve({
					name : name,
					signedIn : true
				})
			} else {
				deferred.resolve({
					name : null,
					signedIn : false
				});
			}
			return deferred.promise;
		}
		return {
			getUser : getUser,
			signIn : signIn
		};

	}]);

}(angular.module('soulful-shack'));