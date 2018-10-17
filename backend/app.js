var express = require('express');
var body_parser = require('body-parser');
var createAccountRouter = require('./routes/createAccount');
var loginRouter = require('./routes/login');
var viewProfileRouter = require('./routes/viewProfile');
var logger = require('morgan');
var app = express();
var cors = require('cors')

app.use(cors())

app.set('view engine', 'pug');
app.use(body_parser.urlencoded({ extended: false}));
app.use(body_parser.json());
app.use('/',express.static('./public'));
app.use('/javascript',express.static('./public/javascript'));
app.use('/createAccount',createAccountRouter);
app.use('/login',loginRouter);
app.use('/userProfile', viewProfileRouter);

module.exports = app;
