var mongoose = require('mongoose');

// user Schema
var wishlistSchema = mongoose.Schema({
	id : Number,
	image : String,
	titre : String,
	description : String,
	contenu : String,
});

var userSchema = mongoose.Schema( {
	name: String,
	langue : String,
	email: String,
	password: String,
	salt: String,
	token: String,
	wishlist : [wishlistSchema],
});

var UserModel = mongoose.model('users', userSchema); // creates the collection 'movies' dans la bdd 


module.exports = UserModel ;
