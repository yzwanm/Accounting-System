var createError = require('http-errors');
var express = require('express');
var path = require('path');
var body_parser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var session = require('express-session');
var MemoryStore = require('memorystore')(session);
var cors = require('cors');
var uuidv4 = require('uuid/v4');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var createAccountRouter = require('./routes/createAccount');
var loginRouter = require('./routes/login');
var viewProfileRouter = require('./routes/viewProfile');
var homeRouter = require('./routes/home');
var viewByDateRouter = require('./routes/viewByDate');
var addRecordRouter = require('./routes/addRecord');
var getChartDataRouter = require('./routes/getChartData');
var deleteProfileRouter = require('./routes/deleteProfile');

var app = express();

app.use(cookieParser("fF4S35DG5"));
app.use(session(
    {genid: function(req) {
	return uuidv4(); // use UUIDs for session IDs
    },
    store: new MemoryStore({
	checkPeriod: 86400000
    }),
    secret: "fF4S35DG5",
    resave:false,
    saveUninitialized:true}));
app.use(cors({credentials: true,
	      origin: 'http://localhost:8100'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(body_parser.urlencoded({ extended: false}));
app.use(body_parser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/createAccount',createAccountRouter);
app.use('/viewProfile', viewProfileRouter);
app.use('/home', homeRouter);
app.use('/viewByDate', viewByDateRouter);
app.use('/addRecord',addRecordRouter);
app.use('/chartData',getChartDataRouter);
app.use('/deleteProfile',deleteProfileRouter);

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
