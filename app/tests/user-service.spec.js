describe("user service", function () {
	var userService = require("../user-service");

	describe("retrieveUser()", function () {
		beforeEach(function (done) {
			userService
				.registerUser({
					firstName: "Bob",
					email: "bob@rich.com",
					password: "password2",
				})
				.then(function () {
					done();
				});
		});
		it("should return a registered user", function (done) {
			var email = "bob@rich.com";
			var password = "password2";
			userService.retrieveUser(email, password).then(function (user) {
				done();
				expect(user.firstName).toBe("Bob");
			});
		});
	});
});
