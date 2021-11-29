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

// app.engine( 'hbs', hbs( { 
//   extname: 'hbs', 
//   defaultLayout: 'main', 
//   layoutsDir: __dirname + '/views/layouts/',
//   partialsDir: __dirname + '/views/partials/'
// } ) );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// hbs.registerPartial('mySideBar', fs.readFileSync(__dirname + '/views/partials/admin/sideBar.hbs', 'utf8'));
// hbs.registerPartial('myNav', fs.readFileSync(__dirname + '/views/partials/admin/nav.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/views/partials/frontend');
// hbs.registerPartial('mySideBar', fs.readFileSync(__dirname + '/views/partials/admin/sideBar.hbs', 'utf8'));
// hbs.registerPartial('myNav', fs.readFileSync(__dirname + '/views/partials/admin/nav.hbs', 'utf8'));

app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(path.join(__dirname, '/public/')));
// app.use(express.static('upload'));


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
