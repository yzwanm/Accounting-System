var dbconnection = require('../dbConnection');
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

router.get('/', function (req,res) {
    var loggedIn = false;
    if (req.session && req.session.user) {
	loggedIn = true;
    }
    req.session.destroy( function (err) {
	if (err) {
	    console.log(err);
	    res.end("FAILED");
	}
	if (loggedIn) {
        console.log("log out");
        res.end("SUCCESS_LOGOUT");
	} else {
		console.log("no session");
        res.end("SUCCESS_NO_SESSION");
	}
	res.end();
    });
});

module.exports = router;
