function RegistrationPage(){

	var firstName = element(by.model('user.firstName'));

	this.get = function () {
		browser.get('http://localhost:5000/register');
	}
	this.firstName = function(firstName) {
		element(by.model('user.firstName')).sendKeys(firstName);
	}
	this.secondName = function(secondName) {
		element(by.model('user.secondName')).sendKeys(secondName);
	}
	this.password = function(password) {
		element(by.model('user.password')).sendKeys(password);
	}
	this.address1 = function(address1){
		element(by.model('user.address1')).sendKeys(address1);
	}
	this.address2 = function(address2){
		element(by.model('user.address2')).sendKeys(address2);
	}
	this.city = function(city){
		element(by.model('user.city')).sendKeys(city);
	}
	this.email = function(email){
		element(by.model('user.email')).sendKeys(email);
	}
	this.telephone = function(telephone){
		element(by.model('user.telephone')).sendKeys(telephone);
	}
	this.submit = function(){
		element(by.id('submit-registration')).click();
	}
}

module.exports = RegistrationPage;