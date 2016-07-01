var express = require ('express');
var loginRouter = express.Router();
var crypto = require('crypto'); 
var hat = require('hat');

var User = require('/home/user/intern_project/models/user');

var getUniqueAPI = require('../helpers/getUniqueAPI');

loginRouter.route('/')
	.get(function(req, res, next){
		res.header('Content-Type', 'text/html');
		res.sendFile('/home/user/intern_project/View/login.html');	
	})
	.post(function(req, res){
		if(req.body.email){
			var passhash = crypto.createHmac('sha256', req.body.password).digest('hex');
			console.log('Password hashed');
			User.findOne({'email': req.body.email}, function(err, user){
				console.log('inside function');
				if(err){
					console.log(err);
				}
				if(user != null){
					if(user.encryp_pass === passhash){
						debugger;
						var genKey = getUniqueAPI.getUniqueAPI(user.email);
						User.update({email: user.email}, {$set: {key: genKey}}, function(err, numAffected){
							if(!err)
								res.json({result_code: 200, result_title: "success", result_string: "Success", key: genKey});
						});
					}
					else
						res.json({result_code: 300, result_title: "failed", result_string: "Login failed"});
				}
				else
					res.json({result_code: 404, result_title: "failed", result_string: "No such user"});
			});
		}
		else
			res.json({error: "Enter all fields"});
});

module.exports.r = loginRouter;
