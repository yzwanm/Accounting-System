var express = require('express');
var body_parser = require('body-parser');
var createAccountRouter = require('./routes/createAccount');
var logger = require('morgan');
var app = express();

app.use(body_parser.urlencoded({ extended: false}));
app.use(body_parser.json());
app.use('/',express.static('./public'));
app.use('/javascript',express.static('./public/javascript'));
app.use('/createAccount',createAccountRouter);

module.exports = app;
