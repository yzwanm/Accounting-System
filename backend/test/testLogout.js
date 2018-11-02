var request = require('request');
var assert = require('assert');
var expect = require('chai').expect;
var server = require('../index');
var dbconnection = require('../dbConnection');
var createAccount = require('../routes/createAccount');
var login = require('../routes/login');
var bcrypt = require('bcrypt')
var PassThrough = require('stream').PassThrough;
var mime = require('mime-types');
var http = require('http');
var fs = require("fs");
var should = require('should');


//used to delete a user added during testing
function delete_user_info (user_name) {
    var sql = "DELETE FROM profile WHERE USER_NAME = ?";
    dbconnection.query(sql, [user_name], function (err, result) {
	if (err) {
	    throw err;
	} 
    });
    var sql = "DELETE FROM user WHERE USER_NAME = ?";
    dbconnection.query(sql, [user_name], function (err, result) {
	if (err) {
	    throw err;
	} 
    });
}

//function used to login user for testing
function loginUser(session,username,password,callback) {
    // testing login
    loginInfo = {
	username : username,
	password : password
    };    
    session
	.post('/login')
	.send(loginInfo)
	.end(function(err, res) {
	    callback(session);
	});
}

describe('testing logout backend functions', function () {
    var json = {user:'DBTESTUSER',
		password:'bbb',
		first_name:'aaa',
		last_name:'abc',
		dob: new Date('2015-03-04T08:00:00.000Z'),
		age:'32',
		sex:'M',
		income:322.23};

    it('testing /logout route signs out user and returns SUCCESS_LOGOUT', function (done) {
	var app = require('../app');
	var chai = require('chai');
	var supertest = require('supertest-session');
	
	delete_user_info(json.user);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	// inserting the user info before testing
	createAccount.insert_user_info(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt, function (result) {
	    assert(result == "SUCCESS");
	    session = supertest(app);
	    // testing login
	    loginUser(session,json.user,json.password,  function (userSession) {
		userSession
		    .get('/logout')
		    .end(function(err, res) {
			assert(res.text == "SUCCESS_LOGOUT");
			done();
		    });
	    });
	});	
    });
    it('testing /logout route returns SUCCESS_NO_SESSION when user is not logged in', function (done) {
	var app = require('../app');
	var chai = require('chai');
	var supertest = require('supertest-session');
	
	delete_user_info(json.user);
	session = supertest(app);
	// testing login
	session
	    .get('/logout')
	    .end(function(err, res) {
		assert(res.text == "SUCCESS_NO_SESSION");
		done();
	    });
    });
});
