
//require express, create router
var express = require('express');
var router = express.Router();

//require mongoose
var mongoose = require('mongoose');
//create connect to collection
const conn = mongoose.createConnection('mongodb://localhost/keys');
//mongoose.Promise = global.Promise;

//connect to mongoose database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//open connection to db
db.once('open', function (callback) {
	console.log("Connected to db - keys");

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
	 * Get complete listing
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
	 * Get unique id
	 *********************************************/
	
	router.get('/:id', function (req, res, next) {
		//read from Mongo database
		Key.find(function (err, keyMongo) {
			if (err) return console.error(err);
			var key = keyMongo;

			//read in mongoDB special id numbers
			var id = req.params.id;
			var ind = -1;

			for (var i = 0; i < key.length; i++) {
				//find the array index that holds _id = id
				if (key[i]._id == id) ind = i;    
			}
			res.contentType('application/json');
			//if we find the user id then return the user object otherwise return {}
			res.send(ind >= 0 ? key[ind] : '{}'); 
		});
	});

	/********************************************* 
	 * Update key
	 *********************************************/
	router.put('/:id', function (req, res, next) {
		Key.find(function (err, keyMongo) {
			if (err) return console.error(err);
			var key = keyMongo;
			var id = req.params.id;
			
			var body = req.body;

			//send back key
			res.contentType('application/json');
			res.send(id + " key updated!");

			//remove post in database
			Key.updateOne({ _id: id }, {$set: body}, function (err, result) {
				if (err) {
					console.log(err)
				} else {
					console.log("Result :", result)
				}
			});
		});
	});


	/********************************************* 
	 * Add new key
	 *********************************************/
		router.post('/', function (req, res, next) {

			Key.find(function (err, keyMongo) {
				if (err) return console.error(err);
				var key = keyMongo;
	
				//create a new with body as args
				var newKey = new Key(req.body);
	
				//save to mongodb
				newKey.save(function (err) {
					if (err) return console.error(err);
				});
			});
		});
});

module.exports = router;