+function (app) {

	'use strict';

	var anonymousUser = {
		signedIn : false
	};

	app.factory('userService', ['$http', '$q','$rootScope', function ($http, $q, $rootScope) {

		function loadUser() {
			var userString = window.sessionStorage.getItem('user');
			try  {
				var user = JSON.parse(userString);
				if(user) {
					$rootScope.user = user;
				} else {
					$rootScope.user = anonymousUser;
				}
			} catch(e) {
				console.log('parse error');
			}
		}

		function registerUser(user){
			var formData = new FormData();

			formData.append('firstName', user.firstName);
			formData.append('secondName', user.secondName);
			formData.append('address1', user.address1);
			formData.append('address2', user.address2);
			formData.append('city', user.city);
			formData.append('email', user.email);
			formData.append('password', user.password);
			formData.append('telephone', user.telephone);
			formData.append('avatar', user.avatarFile);

			var options = {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			};

			return $http.post('/api/register', formData, options).then(function (response) {
				var _user = response.data.user;

				if (_user) {
					_user.signedIn = true;

					$rootScope.user = _user;

	        window.sessionStorage.setItem('user', JSON.stringify(_user));

					return _user;
				} else {
					console.log('a problem resulted')
					return false;
				}
			}).catch(function () {
				console.log('error occurred')
			});
		}

		/*
		 *  connect to server and check if email and password
		 *  combination represent a registered user.
		 *  If so, return him, otherwise return false and allow calling code to deal with this.
		 */

		function signIn(email, password ) {
			// remove any existing user data
			signOut();

			return $http.post('/api/signin', {
				email : email,
				password : password
			}).then(function (response) {
				var data = response.data;
				if(!!data.success) {
					var _user = response.data.user;
					_user.signedIn = true;
					$rootScope.user = _user;
					window.sessionStorage.setItem('user', JSON.stringify(_user));
					return _user;
				} else {
					console.log('problem on server', data.message);
					return false;
				}
			}).catch(function(){
				console.log('error');
				return false;
			});
		}

		function signOut() {
			$rootScope.user = anonymousUser;
			window.sessionStorage.removeItem('user');
		}

		return {
			loadUser : loadUser,
			registerUser : registerUser,
			signIn : signIn,
			signOut : signOut
		};
	}]);

}(angular.module('soulful-shack'));
