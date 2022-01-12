const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

//

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require("passport")
const fs = require('fs');

//

const flash = require('express-flash');
const session = require('express-session');
const hbs = require('hbs');
const app = express();

//router 
const adminProductRouter = require('./routes/admin/product');
const revenueRouter = require('./routes/admin/revenueReport');

const authRouter = require('./routes/auth/auth')
const index = require('./routes/frontend/index');
const apiProductRoute = require('./api/product');


const { forwardAuthenticated } = require("./middleware/auth")



// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials/frontend')
// hbs.registerPartials(__dirname + '/views/partials/admin')
app.set('view engine', 'hbs');
//app.use(logger('dev'));
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
// app.use(function (req, res, next) {
//   res.locals.session = req.session;
//   next();
// });
// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: "yash is a super star",
//     cookie: { secure: false, maxAge: 14400000 },
//   })
// );

//middleware 
require('./middleware/passport-local')(passport);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

// use router

app.use('/', index);
app.use('/admin', adminProductRouter);
app.use('/auth', authRouter);
app.use('/admin/revenueReport',revenueRouter);
app.use('/api/product', apiProductRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
