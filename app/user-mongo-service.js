var UserModel = require('./models/user');

function registerUser(userData, file){
	return new Promise(function(resolve, reject){
		// get file name for uploaded avatar
		if(file && file.filename) {
			userData.avatarFileName = file.filename;
		}
		var user = new UserModel(userData);
		user.save(function(error, user){
			if(error) {
				console.log(error);
				reject('an error occurred');
			} else {
				resolve(user);
			}
		});
	});
}


function retrieveUser(email){
	return new Promise(function(resolve, reject){
		UserModel.find({ email : email }, function (err, user) {
			if(err) {
				reject('user not found');
			} else {
				resolve(user[0]);
			}
		});
	});
}

module.exports.registerUser = registerUser;
module.exports.retrieveUser = retrieveUser;