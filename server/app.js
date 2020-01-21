var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Using Node.js `require()`
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/reactchat', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
var app = express();

let Chat = require('./models/chatModel');
let connect = require('./models/dbconnect');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
module.exports = app;
