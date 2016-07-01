var express = require ('express');
var registerRouter = express.Router();
var crypto = require('crypto'); 

var User = require('/home/user/intern_project/models/user');

var checkEmail = require('../helpers/checkEmail');

registerRouter.route('/')
	.get(function(req, res){
		res.sendFile('/home/user/intern_project/View/register.html');	
	})
	.post(function(req, res){
		if(req.body.name && req.body.email && req.body.password){
			var query = checkEmail.getQuery(req.body.email);
			console.log(query);
			query.exec(function(err, users){
				if(users){
					console.log("User: " +users);
					res.json({error: "user with this email already exists"});
				}
				else{
					var passhash = crypto.createHmac('sha256', req.body.password).digest('hex');
					var user = new User();
					console.log('created new instance');
					user.name = req.body.name;
					user.email = req.body.email;
					user.encryp_pass = passhash;
					console.log('assigned the variables');
		
					//save it
					user.save(function(err){
						console.log('Entered save function');
						if(err)
							res.send(err);
						res.json([{"error": "false"}, {"email": user.email, "name": user.name, "created_at": user.timestamp, "message": "User registered"}]);
					});
				}

			});
		}
		else
			res.json({error: "Enter all fields"});
		// if(req.body.name && req.body.email && req.body.password){
		// 	checkEmail.getQuery(req.body.email)
		// 		.then(function(result){
		// 			console.log(result);
		// 			var passhash = crypto.createHmac('sha256', req.body.password).digest('hex');
		// 			var user = new User();
		// 			console.log('created new instance');
		// 			user.name = req.body.name;
		// 			user.email = req.body.email;
		// 			user.encryp_pass = passhash;
		// 			console.log('assigned the variables');
		
		// 			//save it
		// 			user.save(function(err){
		// 				console.log('Entered save function');
		// 				if(err)
		// 					res.send(err);
		// 				res.json([{"error": "false"}, {"email": user.email, "name": user.name, "created_at": user.timestamp, "message": "User registered"}]);
		// 			});
		// 		})
		// 		.catch(function(err){
		// 			console.log(err);
		// 			res.json({error: "user with this email already exists"});
		// 		});
		// }else{
		// 	res.json({error: "Enter all fields"});
		// }

	});
				
module.exports = registerRouter;