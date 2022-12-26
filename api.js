//require basics
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//publish
const serverless = require('serverless-http');

//router
const router = express.Router();

//
router.get('/', (req, res) => {
  console.log(res)
});

//bind
api.use('/.netlify/functions/api', router)

//declare pathway to file; get files
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var userRouter = require('./routes/users');
var keyRouter = require('./routes/keys');

//creta app
var api = express();

// view engine setup
api.set('views', path.join(__dirname, 'views'));
api.set('view engine', 'pug');

//app use tools
api.use(logger('dev'));
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(cookieParser());
api.use(express.static(path.join(__dirname, 'dist')));

//connect files to pathway
api.use('/', indexRouter);
api.use('/products', productsRouter);
api.use('/users', userRouter);
api.use('/keys', keyRouter);

/*
api.use(
  cors({origin: 'http://127.0.0.1:8080'})
);
*/

//allow call from any website; valid for all pages
api.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Methods", "Content-type");
  //res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  //res.header("Access-Control-Allow-Credentials", "true");
  //res.header("Access-Control-Allow-Headers", "*");
  //res.header("Access-Control-Allow-Methods", "*");
  //res.header("Access-Control-Max-Age", "300");
	next();
});

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

module.exports.handler = serverless(api);

/*
api.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

api.get('/users', cors(), (req, res, next) => {
  res.send("err");
});

api.listen(3001)

*/