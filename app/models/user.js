var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	firstName : {
		type :  String,
		required : true
	},
	secondName : {
		type : String,
		require : true
	},
	address1 : {
		type : String
	},
	address2 : {
		type : String
	},
	city : {
		type : String
	},
	email : {
		type : String,
		required : true
	},
	telephone : {
		type : String
	},
	password : {
		type : String,
		require : true
	},
	email : {
		type : String,
		required : true
	},
	avatarFileName : {
		type : String
	}
});

var UserModel = mongoose.model('User', UserSchema);

UserSchema.pre('save', function (next) {
	UserModel.find({ email : this.email }, (err, docs) => {
		if (!docs.length) {
			next();
		} else {
			console.log('user exists: ', this.email);
			next(new Error("User exists!"));
		}
	});
});


module.exports = UserModel;