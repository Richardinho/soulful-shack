
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
