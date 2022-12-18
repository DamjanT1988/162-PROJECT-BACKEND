
//require express, create router
var express = require('express');
var router = express.Router();

//require mongoose
var mongoose = require('mongoose');
//connect to JSON file
const conn = mongoose.createConnection('mongodb://localhost/keys');
//mongoose.Promise = global.Promise;

//connect to mongoose database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//open connection to db
db.once('open', function (callback) {
	console.log("Connected to db - key");

	//create a db-scheme
	var keySchema = mongoose.Schema({
		key: String
	},
	{
		timestamps: true
	});

	//create a model
	var Key = mongoose.model('Key', keySchema)


	/********************************************* 
	 * Add new key
	 *********************************************/
	router.post('/', function (req, res, next) {

		Key.find(function (err, keyMongo) {
			if (err) return console.error(err);
			var key = keyMongo;

			//fix the list
			key.push(req.body);
			var jsonObj = JSON.stringify(key);
			res.contentType('application/json');
			res.send(jsonObj);

			//create a new course with body as args
			var newKey = new Key(req.body);

			//save to mongodb
			newKey.save(function (err) {
				if (err) return console.error(err);
			});
		});
	});

	/********************************************* 
	 * Get complete course listing
	 *********************************************/
	router.get('/', function (req, res, next) {
		//read from Mongo database
		Key.find(function (err, keyMongo) {
			if (err) return console.error(err);
			var key = keyMongo;

			var jsonObj = JSON.stringify(key);
			res.contentType('application/json');
			res.send(jsonObj);
		});
	});


	/********************************************* 
	 * Get unique course id
	 *********************************************/
	router.get('/:id', function (req, res, next) {
		//read from Mongo database
		User.find(function (err, productsMongo) {
			if (err) return console.error(err);
			var products = productsMongo;

			//read in mongoDB special id numbers
			var id = req.params.id;
			var ind = -1;

			for (var i = 0; i < products.length; i++) {
				if (products[i]._id == id) ind = i; // Find the array index that holds _id = id   
			}
			res.contentType('application/json');
			res.send(ind >= 0 ? products[ind] : '{}'); // If we find the user id then return the user object otherwise return {}
		});
	});

	/********************************************* 
	 * Delete unique course id
	 *********************************************/
	router.delete('/:id', function (req, res, next) {
		User.find(function (err, productsMongo) {
			if (err) return console.error(err);
			var products = productsMongo;

			var id = req.params.id;
			//console.log(id);
			var del = -1;

			//fix the array list
			for (var i = 0; i < products.length; i++) {
				if (products[i]._id == id) del = i; // Find the array index that holds _id = id    
			}
			if (del >= 0) status = products.splice(del, 1); // Delete element and fix array

			//send back id
			res.contentType('application/json');
			res.send(id);

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


});

module.exports = router;