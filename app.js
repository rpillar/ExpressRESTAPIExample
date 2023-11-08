//const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Validator, ValidationError }  = require("express-json-validator-middleware")

const indexRouter = require('./routes/index');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// Schema validation middleware
const validationErrorMiddleware = (error, request, response, next) => {
	if (response.headersSent) {
		return next(error);
	}

	const isValidationError = error instanceof ValidationError;
	if (!isValidationError) {
		return next(error);
	}

	response.status(400).json({
		errors: error.validationErrors,
	});

  response.send();
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);

app.use(validationErrorMiddleware);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next( res.status(404).send({message: "NotFound"}))
});

module.exports = app;
