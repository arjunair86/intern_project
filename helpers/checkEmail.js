var express = require ('express');
var registerRouter = express.Router();
var crypto = require('crypto'); 

var User = require('/home/user/intern_project/models/user');

var exports = module.exports;


exports.getQuery = function(emailToCheck){
	var query = User.findOne({email: emailToCheck});
	return query;  
}

// exports.getQuery = function(emailToCheck){
// 	return new Promise(function(resolve, reject){
// 		User.findOne({email: emailToCheck}, function(err, user){
// 			if(user)
// 				reject(user);
// 			else
// 				resolve(user);

// 		});
// 	});
// };