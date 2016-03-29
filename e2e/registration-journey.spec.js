describe('registration journey', function () {

	var RegistrationPage = require("./page-objects/registration-page.js");
	var deleteUser = require('./delete-user');
	var registrationPage;

	var userFirstName = 'Richard';
	var userSecondName = 'Hunter';
	var userPassword = 'password';
	var userAddress1 = '12 Every Lane';
	var userAddress2 = 'Coffee Street';
	var userCity = 'New York';
	var userEmail = 'richghgy@richard.com';
	var userTelephone = '12345';

	beforeEach(function () {
		registrationPage = new RegistrationPage();
		registrationPage.get();
	});
	afterEach(function () {
		deleteUser(userEmail);
	});

	describe('When user fills in registration form', function () {
		it('should register user and sign him in, storing user data in session storage', function () {

			registrationPage.firstName(userFirstName);
			registrationPage.secondName(userSecondName);
			registrationPage.password(userPassword);
			registrationPage.address1(userAddress1);
			registrationPage.address2(userAddress2);
			registrationPage.city(userCity);
			registrationPage.email(userEmail);
			registrationPage.telephone(userTelephone);
      registrationPage.submit();
      browser.waitForAngular();
			browser.executeScript("return window.sessionStorage.getItem('user');").then(function (userString) {

				var user = JSON.parse(userString);

				expect(user.firstName).toBe(userFirstName);
				expect(user.secondName).toBe(userSecondName);
				expect(user.address1).toBe(userAddress1);
				expect(user.address2).toBe(userAddress2);
				expect(user.city).toBe(userCity);
				expect(user.email).toBe(userEmail);
				expect(user.telephone).toBe(userTelephone);
				expect(user.signedIn).toBe(true);
					// todo:  should verify that we return to previous page we were at
			});
		});
	});
});