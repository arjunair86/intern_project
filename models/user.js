var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crypto = require('crypto'); 

var userSchema = new Schema({
	name: String,
	email: String,
	encryp_pass: String,
	key: String,
	},
	{
		timestamps: { createdAt: 'created-at' }
	});

module.exports = mongoose.model('User', userSchema);

var User = mongoose.model('User', userSchema);

hash = function(password){
	return crypto.createHmac('sha256', password).digest('hex');
}

module.exports.addUser = function(name, email, password){
	var user = new User();
	user.name = name;
	user.email = email;
	user.encryp_pass = hash(password);

	user.save()
}