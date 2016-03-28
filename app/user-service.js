
var users = [
	{
		email : 'test@test.com',
		password : 'pass',
		firstName : 'tester'
	},
	{
		email : 'rich',
		password : 'rich',
		firstName : 'Richard'
	}
];

function registerUser(userData, file){
	return new Promise(function(resolve, reject){
		// get file name for uploaded avatar
		if(file && file.filename) {
			userData.avatarFileName = file.filename;
		}
		// todo: check if user already exists in database
		if(userExists(userData)) {
			throw {
				message : 'user already exists'
			}
		}
		users.push(userData);
		resolve(userData);
	});
}

//todo: implement
function userExists(data) {
	return false;
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
