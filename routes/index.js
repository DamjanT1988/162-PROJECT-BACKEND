var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

//require mongoose
var mongoose = require('mongoose');
//connect to JSON file
mongoose.connect('mongodb://localhost/companydb');

module.exports = router;