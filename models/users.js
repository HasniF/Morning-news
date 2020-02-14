var mongoose = require('mongoose');

// user Schema
var userSchema = mongoose.Schema( {
	name: String,
	email: String,
	password: String,
	salt: String,
	token: String
} );

var UserModel = mongoose.model('users', userSchema); // creates the collection 'movies' dans la bdd 


module.exports = UserModel ;
