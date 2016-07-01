var express = require ('express');
var path = require('path');
var fs = require ('fs');
var bodyParser = require('body-parser');
var router = express.Router();
var port = process.env.PORT || 3000;


var app = express();

var data = '';

app.use(bodyParser.urlencoded({ extended :true }));



////////*************USER LOGIN AND REGISTER***************/////////////
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testdb');
console.log('Connected to database');


app.use('/login', require('./controllers/loginRouter').r);
app.use('/logout', require('./controllers/logoutRouter'));
app.use('/register', require('./controllers/registerRouter'))
app.use('/users', require('./controllers/userRouter'));
app.use('/changepass', require('./controllers/passRouter'));

////////**********************END**************************////////////////
app.listen(port);
console.log("\nServer listening to port "+ port);