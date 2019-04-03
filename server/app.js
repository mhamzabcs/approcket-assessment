const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressValidator = require('express-validator')
const cors = require('cors')
const mongoose = require('mongoose');


const io = require('socket.io')();


// io.on('connection', (client) => {
//    client.on('subscribeToTimer', (interval) => {
//      console.log('client is subscribing to timer with interval ', interval);
//      setInterval(() => {
//        client.emit('timer', new Date());
//      }, interval);
//    });
//  });

const port = 8000;
io.listen(port);
console.log('listening on port ', port);


const options = {
   useNewUrlParser: true
}
mongoose.connect('mongodb://localhost/test', options, function (err) {
   if (err) throw err;
   console.log('Successfully connected');
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);
mongoose.plugin(schema => {
   schema.set('timestamps', true);
});
mongoose.plugin(require('mongoose-autopopulate'));

//var indexRouter = require('./src/routes/index');
//var usersRouter = require('./src/routes/users');

const passport = require('passport');
require('./src/security/passport')(passport);

var app = express();

app.use(function(req,res, next){
	req.io = io;
	next();
});


app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator())
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./src/routes')(app, passport);

module.exports = app;