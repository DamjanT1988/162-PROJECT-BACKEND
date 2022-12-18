
//require express, create router
var express = require('express');
var router = express.Router();

//require mongoose
var mongoose = require('mongoose');
//create connect to collection
const conn = mongoose.createConnection('mongodb://localhost/products');

//connect to mongoose database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//open connection to db
db.once('open', function (callback) {
	console.log("Connected to db - products");

	//create a db-scheme
	var productSchema = mongoose.Schema({
		product_title: String,
		ean_number: String,
		product_description: String,
		amount_storage: Number,
		price: Number,
		expiration_date: String,
	},
	{
		timestamps: true
	});

	//create a model
	var Product = mongoose.model('Product', productSchema)
  
  /********************************************* 
   * Add new product
   *********************************************/
  router.post('/', function (req, res, next) {
    Product.find(function (err, productsMongo) {
      if (err) return console.error(err);
      var products = productsMongo;
  
      products.push(req.body);
      var jsonObj = JSON.stringify(products);
      res.contentType('application/json');
      res.send(jsonObj);
  
      var product = new Product(req.body);
  
      product.save(function (err) {
        if (err) return console.error(err);
      });
    });
  });


	/********************************************* 
	 * Get complete listing
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
	 * Get unique id
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
				//find the array index that holds _id = id
				if (products[i]._id == id) ind = i;    
			}
			res.contentType('application/json');
			//if we find the user id then return the user object otherwise return {}
			res.send(ind >= 0 ? products[ind] : '{}'); 
		});
	});

	/********************************************* 
	 * Update product
	 *********************************************/
		router.put('/:id', function (req, res, next) {
			Product.find(function (err, keyMongo) {
				if (err) return console.error(err);
				//var key = keyMongo;
				var id = req.params.id;
				var body = req.body;
	
				//send back
				res.contentType('application/json');
				res.send(id + " product updated!");
	
				//update post in database
				Product.updateOne({ _id: id }, {$set: body}, function (err, result) {
					if (err) {
						console.log(err)
					} else {
						console.log("Result :", result)
					}
				});
			});
		});

	/********************************************* 
	 * Delete unique object
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
				//find the array index that holds _id = id
				if (products[i]._id == id) del = i;     
			}
			//delete element and fix array
			if (del >= 0) status = products.splice(del, 1); 

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
	 * Add new product
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

			//create a new with body as args
			var product = new Product(req.body);

			//save to mongodb
			product.save(function (err) {
				if (err) return console.error(err);
			});
		});
	});


});


module.exports = router;