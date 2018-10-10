var request = require('request');
var assert = require('assert');
var expect = require('chai').expect;
var server = require('../index');

describe('testing connectivity', function () {
    it('http://localhost:3000 should return 200', function (done) {
	request.get('http://localhost:3000', function (err, res, body){
	    assert(res.statusCode == 200);
	    done();
	});
    });
    it('http://localhost:3000/javascript/accApp.js should return 200', function (done) {
	request.get('http://localhost:3000', function (err, res, body){
	    assert(res.statusCode == 200);
	    done();
	});
    });
    it('http://localhost:3000/createAccount should return 200', function (done) {
	request.post('http://localhost:3000/createAccount', {json:{}}, function (err, res, body){
	    assert(res.statusCode == 200);
	    done();
	});
    });
});

//describe('testing inputs', function () {
//    it('testing create Account with {user:aaa,password:bbb,name:aaa}', function(done) {
//	request.post('http://localhost:3000/createAccount', {json:{user:'aab',password:'bbb',first_name:'aaa'}}, function (err, res, body){
//	    assert(body === "success");
//	    done();
//	});
//    });
//});


