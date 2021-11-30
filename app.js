const mysql = require('mysql');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fs = require('fs');


var flash = require('express-flash');
var session = require('express-session');
var mysqlConnection  = require('./models/db');
var hbs = require('hbs');
var session = require('express-session');
var index = require('./routes/frontend/index');
var adminProductRouter = require('./routes/admin/product');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// hbs.registerPartials(__dirname + '/views/partials/frontend');
hbs.registerPartials(__dirname + '/views/partials/frontend')
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(__dirname + '/public'));
// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

flash = require('express-flash')
app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret:"yash is a super star",
      cookie: { secure: false, maxAge: 14400000 },
    })
);
app.use(flash());
app.use('/', index);
app.use('/admin',adminProductRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
