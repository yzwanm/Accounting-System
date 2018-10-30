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
var supertest = require('supertest');

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

describe('testing login backend functions', function () {
    var json = {user:'DBTESTUSER',
		password:'bbb',
		first_name:'aaa',
		last_name:'abc',
		dob: new Date('2015-03-04T08:00:00.000Z'),
		age:'32',
		sex:'M',
		income:322.23};

    it('testing that check_for_user() can check if a user is found in the database', function(done) {
	delete_user_info(json.user);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	createAccount.insert_user_info(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt, function (result) {
	    assert(result == "SUCCESS");
	    login.check_for_user(json.user,(result) => {
		assert(result === "USER_EXISTS");
		done();
	    });
	});
    });

    it('testing that check_for_user() can check if a user is NOT found in the database', function(done) {
	delete_user_info(json.user);
	login.check_for_user(json.user,(result) => {
	    assert(result === "NO_USER");
	    done();
	});
    });

    it('testing check_password() returns SUCCESS when password is correct', function(done) {
	delete_user_info(json.user);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	createAccount.insert_user_info(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt, function (result) {
	    assert(result == "SUCCESS");
	    login.check_password(json.user,json.password,function (result) {
		assert(result == "SUCCESS");
		done();
	    });
	});
    });

    it('testing check_password() returns FAILED when password is incorrect', function(done) {
	delete_user_info(json.user);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var wrong_password = "potato"
	createAccount.insert_user_info(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt, function (result) {
	    assert(result == "SUCCESS");
	    login.check_password(json.user,wrong_password,function (result) {
		assert(result == "FAILED");
		done();
	    });
	});
    });

    it('testing check_password() returns FAILED when username does not exist', function(done) {
	delete_user_info(json.user);
	login.check_password(json.user,json.password,function (result) {
	    assert(result == "FAILED");
	    done();
	});
    });


});
