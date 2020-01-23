var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


// Using Node.js `require()`
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/reactchat', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
/**socket */
/** socket */
const app = express();
const http = require("http").Server(app);



//Port from environment variable or default - 4001
const clientPort = 3002;
//database connected
let Chat = require('./models/chatModel');
let connect = require('./models/dbconnect');


//Setting up express and adding socketIo middleware

const connectSocket = http.listen(clientPort);

const io = require('socket.io')(connectSocket);

io.on("connection", socket => {


  // socket post send message
  socket.on('send-message', msg => {

    console.log('');
    console.log('');
    console.log('=========== app send message');
    console.log('');
    console.log('Socket send-message >', msg);
    console.log('');

    // send to ListItem
    io.emit('receive-message', msg);
  });


  // socket post delete message
  socket.on('delete-message', () => {
    console.log('success delete');
    io.emit('receive-dm');
  })



});


/**end */


//Setting express and adding socketIO middleware
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());



//get socket
app.get('/', function(req, res){
    res.sendFile(__dirname + 'http://localhost:3000/index.js');
});

var port = 3000;
console.log("");
console.log('CLIENT PORT render> ', port);
console.log("");


// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next){
    next(createError(404));
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
