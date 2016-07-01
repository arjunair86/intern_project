var express = require ('express');
var logoutRouter = express.Router();
var crypto = require('crypto');

var User = require('/home/user/intern_project/models/user');

logoutRouter.route('/')
	.get(function(req, res){
		res.header('Content-Type', 'text/html');
		res.sendFile('/home/user/intern_project/View/logout.html');
	})
	.post(function(req, res){
		
	})

module.exports = logoutRouter;