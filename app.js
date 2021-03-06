var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var chatRequestRouter = require('./routes/chatRequestRouter')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRequestRouter)

// Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/klanik_academy_messaging_web';
mongoose.connect(
  mongoDB, 
  {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
  }, 
  (err) => { 
    if (err) throw err; 
    console.log('MongoDB connection established')
  }
);

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
