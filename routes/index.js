var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Migyston API' });
});

//require mongoose
var mongoose = require('mongoose');
//connect to database
//local
mongoose.connect('mongodb://localhost/companydb');
//Atlas server
//mongoose.connect('mongodb+srv://Damjan:Pass@cluster0.ckb7rlx.mongodb.net/test');

//export router
module.exports = router;