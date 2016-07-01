var express = require ('express');
var passRouter = express.Router();
var crypto = require('crypto'); 

var User = require('/home/user/intern_project/models/user');

var checkEmail = require('../helpers/checkEmail');

passRouter.route('/')
	.get(function(req, res){
		res.header('Content-Type', 'text/html');
		res.sendFile('/home/user/intern_project/View/changepass.html')
	})
	.post(function(req, res){
		var email = req.body.email;
		var oldpass = req.body.oldpass;
		var newpass = req.body.newpass;
		var cnewpass = req.body.cnewpass;

		if(email && oldpass && newpass && cnewpass){
			var query = checkEmail.getQuery(email);

			query.exec(function(err, user){
				var oldpasshash = crypto.createHmac('sha256', oldpass).digest('hex');
				if(user && user.encryp_pass === oldpasshash){
					if(newpass === cnewpass){
						var passhash = crypto.createHmac('sha256', newpass).digest('hex');
						user.encryp_pass = passhash;

						user.save(function(err){
							if(err)
								res.send(err);
							res.json({result_code: 200, result_title: "Success", result_string: "Your password has been successfully updated"});
						});
					}
					else{
						res.json([{"error": "true"}, {"message": "Passwords dont't match"}]);
					}
				}
				else{
					res.json([{"error": "true"}, {"message": "No such user exists"}]);
				}
			});
		}
		else{
			res.json({error: "Enter all fields"});
		}
	});

	module.exports = passRouter;