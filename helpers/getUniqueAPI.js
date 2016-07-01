var express = require ('express');
var registerRouter = express.Router();
var crypto = require('crypto'); 
var hat = require('hat');


var User = require('/home/user/intern_project/models/user');

var exports = module.exports;

var flag = 1;

exports.getUniqueAPI = function(email){
	var salt = crypto.randomBytes(256).toString('base64');
	return crypto.createHmac('sha256', email).update(salt).digest('hex');
}