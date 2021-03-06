describe('sign in journey', function () {

	//  hardcoded in database

	var REGISTERED_USER_EMAIL = 'test@test.com';
	var REGISTERED_USER_PASSWORD = 'password';
	var REGISTERED_USER_FIRST_NAME = 'tester';

	var NON_REGISTERED_USER_EMAIL = 'non-existent-user';
	var NON_REGISTERED_USER_PASSWORD = 'pass';

	beforeEach(function () {
		browser.get('http://localhost:5000/sign-in?nextpage=records.summaries');
	});

	describe('When a user is NOT registered', function () {
		describe('..and she attempts to sign in', function () {
			it('should display error message', function () {
				var email = element(by.model('user.email'));
				var password = element(by.model('user.password'));
				var submitButton = element(by.id('sign-in-submit'));

				email.sendKeys(NON_REGISTERED_USER_EMAIL);
				password.sendKeys(NON_REGISTERED_USER_PASSWORD);

				submitButton.click();

				var errorMessage = element(by.id('sign-in-flash-message'));

				expect(errorMessage.getText()).toEqual('You could not be found in our database');

				browser.executeScript("return window.sessionStorage.getItem('user');").then(function (user) {
					expect(user).toBeFalsy();
				});
			});
		});
	});

	describe('when a user IS registered', function () {
		describe('..and she attempts to sign in', function () {
			it('should sign her in and navigate to main search page', function () {
				var email = element(by.model('user.email'));
				var password = element(by.model('user.password'));
				var submitButton = element(by.id('sign-in-submit'));

				email.sendKeys(REGISTERED_USER_EMAIL);
				password.sendKeys(REGISTERED_USER_PASSWORD);

				submitButton.click();

				// verify that we are on the main results page
				expect(browser.getCurrentUrl()).toContain('/records/summaries');
				// and that the welcome salutation contains the users firstName
				expect(element(by.css('[data-test=index-welcome-text]')).getText()).toBe(REGISTERED_USER_FIRST_NAME);

				browser.executeScript("return window.sessionStorage.getItem('user');").then(function (user) {
					var user = JSON.parse(user);
					expect(user.signedIn).toBe(true);
				});
			});
		});
	});

});