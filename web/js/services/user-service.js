+function (app) {

	'use strict';

	var users = {
		'richard' : 'password',
		'john' : 'password2'
	};



	app.factory('userService', ['$http', '$q', function ($http, $q) {

		var user = {};
		var anonymousUser = {
			name : 'anonymous',
			signedIn : false
		};

		function getUser() {
			var deferred = $q.defer();
			var userString = window.sessionStorage.getItem('user');
			try  {
				var user = JSON.parse(userString);
				if(user) {
					deferred.resolve(user);
				} else {
					deferred.resolve(anonymousUser);
				}
			} catch(e) {
				deferred.resolve(anonymousUser);
			}
			return deferred.promise;
		}

		function signIn(name, password ) {
			var user;
			var deferred = $q.defer();
			if(users[name] && password === users[name]) {
				user = {
					name : name,
					signedIn : true
				}
			} else {
				user = anonymousUser;
			}
			deferred.resolve(user);
			window.sessionStorage.setItem('user', JSON.stringify(user));
			return deferred.promise;
		}

		function signOut() {
			window.sessionStorage.removeItem('user');
		}
		return {
			getUser : getUser,
			signIn : signIn,
			signOut : signOut
		};

	}]);

}(angular.module('soulful-shack'));