
//require express, create router
var express = require('express');
var router = express.Router();

//require mongoose
var mongoose = require('mongoose');
//create connect to collection
const conn = mongoose.createConnection('mongodb://localhost/users');
//mongoose.Promise = global.Promise;

//connect to mongoose database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//open connection to db
db.once('open', function (callback) {
	console.log("Connected to db - users");

	//create a db-scheme
	var userSchema = mongoose.Schema({
		name: String,
		email: String,
		password: String,
	},
	{
		timestamps: true
	});

	//create a model
	var User = mongoose.model('User', userSchema)


	/********************************************* 
	 * Get complete listing
	 *********************************************/
	router.get('/', function (req, res, next) {
		//read from Mongo database
		User.find(function (err, productsMongo) {
			if (err) return console.error(err);
			var products = productsMongo;

			var jsonObj = JSON.stringify(products);
			res.contentType('application/json');
			res.send(jsonObj);
		});
	});

	/********************************************* 
	 * Update password
	 *********************************************/
		router.put('/:id', function (req, res, next) {
			User.find(function (err, userMongo) {
				if (err) return console.error(err);
				
				var id = req.params.id;
				var body = req.body;
	
				//send back key
				res.contentType('application/json');
				res.send(id + " password updated!");
	
				var id = req.params.id;
				User.updateOne({ _id: id }, {$set: body}, function (err, result) {
					if (err) {
						console.log(err)
					} else {
						console.log("Result :", result)
					}
				});
			});
		});

	/********************************************* 
	 * Delete unique user
	 *********************************************/
		router.delete('/:id', function (req, res, next) {
			User.find(function (err, userMongo) {
				if (err) return console.error(err);
				var user = userMongo;
	
				var id = req.params.id;
				var del = -1;
	
				//fix the array list
				for (var i = 0; i < user.length; i++) {
					//find the array index that holds _id = id
					if (user[i]._id == id) del = i;     
				}
				//delete element and fix array
				if (del >= 0) status = user.splice(del, 1); 
	
				//send back id
				res.contentType('application/json');
				res.send(id + " user deleted");
	
				//remove post in database
				User.deleteOne({ _id: id }, function (err, result) {
					if (err) {
						console.log(err)
					} else {
						console.log("Result :", result)
					}
				});
			});
		});

	/********************************************* 
	 * Add new user
	 *********************************************/
	router.post('/', function (req, res, next) {

		User.find(function (err, userMongo) {
			if (err) return console.error(err);
			var user = userMongo;

			//fix the list
			user.push(req.body);
			var jsonObj = JSON.stringify(user);
			res.contentType('application/json');
			res.send(jsonObj);

			//create a new with body as args
			var newUser = new User(req.body);

			//save to mongodb
			newUser.save(function (err) {
				if (err) return console.error(err);
			});
		});
	});

});

module.exports = router;