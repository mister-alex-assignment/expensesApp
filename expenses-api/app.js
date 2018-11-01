var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var expressValidator = require('express-validator');

var indexRouter = require('./routes/v1/index');
var currenciesRouter = require('./routes/v1/currenciesRoutes');
var expenseTypesRouter = require('./routes/v1/expenseTypesRoutes');
var expensesRouter = require('./routes/v1/expensesRoutes');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/', indexRouter);
app.use('/v1/currencies', currenciesRouter);
app.use('/v1/expenseTypes', expenseTypesRouter);
app.use('/v1/expenses', expensesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
