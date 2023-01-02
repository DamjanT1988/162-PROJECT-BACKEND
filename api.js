//require basics
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//declare pathway to file; get files
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var userRouter = require('./routes/users');
var keyRouter = require('./routes/keys');

//creta app
var api = express();

api.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

//view engine setup
api.set('views', path.join(__dirname, 'views'));
api.set('view engine', 'pug');

//app use tools
api.use(logger('dev'));
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(cookieParser());
api.use(express.static(path.join(__dirname, 'public')));

//connect files to pathway
api.use('/', indexRouter);
api.use('/products', productsRouter);
api.use('/users', userRouter);
api.use('/keys', keyRouter);

// catch 404 and forward to error handler
api.use(function(req, res, next) {
  next(createError(404));
});

// error handler
api.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.api.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//export
module.exports = api;