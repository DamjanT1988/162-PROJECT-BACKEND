//require express, create router
var express = require('express');
var router = express.Router();

//require mongoose
var mongoose = require('mongoose');
//connect to JSON file
mongoose.connect('mongodb://localhost/products');
mongoose.Promise = global.Promise;

//connect to mongoose database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//open connection to db
db.once('open', function (callback) {
	console.log("Connected to db");

	//create a db-scheme
	var productSchema = mongoose.Schema({
		product_title: String,
		ean_numer: String,
		product_description: String,
		amount_storage: String,
		price: String,
		expiration_date: String,
		//created_at: Timestamp
	});

	//create a model
	var Product = mongoose.model('Product', productSchema)

	/********************************************* 
	 * Get complete course listing
	 *********************************************/
	router.get('/', function (req, res, next) {
		//read from Mongo database
		Product.find(function (err, productsMongo) {
			if (err) return console.error(err);
			var products = productsMongo;

			var jsonObj = JSON.stringify(products);
			res.contentType('application/json');
			res.send(jsonObj);
		});
	});


	/********************************************* 
	 * Get unique course id
	 *********************************************/
	router.get('/:id', function (req, res, next) {
		//read from Mongo database
		Product.find(function (err, productsMongo) {
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
		Product.find(function (err, productsMongo) {
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
			Product.deleteOne({ _id: id }, function (err, result) {
				if (err) {
					console.log(err)
				} else {
					console.log("Result :", result)
				}
			});
		});
	});

	/********************************************* 
	 * Add new course
	 *********************************************/
	router.post('/', function (req, res, next) {

		Product.find(function (err, productsMongo) {
			if (err) return console.error(err);
			var products = productsMongo;

			//fix the list
			products.push(req.body);
			var jsonObj = JSON.stringify(products);
			res.contentType('application/json');
			res.send(jsonObj);

			//create a new course with body as args
			var product = new Product(req.body);

			//save to mongodb
			product.save(function (err) {
				if (err) return console.error(err);
			});
		});
	});


});

module.exports = router;