var express = require ('express');
var userRouter = express.Router();
var test = require('./loginRouter');
var User = require('/home/user/intern_project/models/user');


userRouter.get('/', function(req, res){
		res.header('Content-Type', 'text/html');
		res.sendFile('/home/user/intern_project/View/users.html');
	});

userRouter.get('/all', function(req, res){
	User.find({}, {'_id':0 , 'name':1}, function(err, users){
			if(err)
				res.send(err);
			var onlyNames = '' ;
			for (user of users)
				onlyNames = onlyNames +'<br>'+ user.name ;
			res.send(onlyNames);
		});
});

userRouter.get('/:userid', function(req, res){
		
	});


module.exports = userRouter