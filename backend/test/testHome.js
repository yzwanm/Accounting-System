var request = require('request');
var assert = require('assert');
var expect = require('chai').expect;
var server = require('../index');
var dbconnection = require('../dbConnection');
var createAccount = require('../routes/createAccount');
var bcrypt = require('bcrypt')
var PassThrough = require('stream').PassThrough;
var mime = require('mime-types');
var http = require('http');
var fs = require("fs");
var should = require('should');
var supertest = require('supertest');

describe('checking recent entry', function () {
	var sql = "INSERT INTO expenses(USER_NAME,EXPENSES,CATEGORY) VALUES (?,?,?)";
	it('testing home page recent transactions', function (done) {
        var user1 = 'Bob'
        var exp1  = '100'
        var cat1  = 'food'
        var exp2  = '200'
        var cat2  = 'travel'
        var exp3  = '300'
        var cat3  = 'entertainment'	
        dbconnection.query(sql, [user1,exp1,cat1], function (err, result) {
            if (err) throw err;
        });
        dbconnection.query(sql, [user1,exp2,cat2], function (err, result) {
            if (err) throw err;
        });
        dbconnection.query(sql, [user1,exp3,cat3], function (err, result) {
            if (err) throw err;
        });
        var json1 = {user:'Bob',elements:4};
        request.get('http://localhost:3000/home', {json:json1}, function (err, res, body){
            assert(res.body[0].USER_NAME==user1);
            assert(res.body[0].EXPENSES==exp1);
            assert(res.body[0].CATEGORY==cat1);
            assert(res.body[1].USER_NAME==user1);
            assert(res.body[1].EXPENSES==exp2);
            assert(res.body[1].CATEGORY==cat2);
            assert(res.body[2].USER_NAME==user1);
            assert(res.body[2].EXPENSES==exp3);
            assert(res.body[2].CATEGORY==cat3);
        });

        done();
    });

    // it('testing home page with no transactions', function (done) {
    //     sq = "DELETE FROM expenses";
    //     dbconnection.query(sq, [], function (err, result) {
    //         if (err) throw err;
    //     });
      
    //     var json1 = {user:'Bob',elements:4};
    //     request.get('http://localhost:3000/home', {json:json1}, function (err, res, body){
    //         assert(res.body==[]);
    //     });

    //     done();
    // });


});



   
			   
			
		



