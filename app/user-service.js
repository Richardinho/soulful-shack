
var users = [];

function registerUser(userData, file){
	return new Promise(function(resolve, reject){
	console.log('banana', file.filename)
		if(file && file.filename) {
			userData.avatarFileName = file.filename;
		}
		users.push(userData);
		resolve(userData);
	});
}

function retrieveUser(email, password){
	return new Promise(function(resolve, reject){
		var user = users.find(function (user) {
			return (user['email'] == email) && (user['password'] == password);
		});
		if(user) {
			resolve(user);
		} else {
			reject('user not found');
		}
	});
}

module.exports.registerUser = registerUser;
module.exports.retrieveUser = retrieveUser;
