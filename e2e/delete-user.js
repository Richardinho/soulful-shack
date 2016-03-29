var config = require('../test-config');
var mongoose = require('mongoose');
var UserModel = require('../app/models/user');

function deleteUser(email){

	mongoose.connect(config.database);

	return UserModel.findOneAndRemove({ email : email }, function(err, user){
		console.log('removed user from database', user.email)
	});
}
module.exports = deleteUser;