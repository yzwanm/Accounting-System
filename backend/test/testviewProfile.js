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
describe('testing edit profile details', function () {
	var json = {user:'DBTESTUSER',
		password:'bbb',
		first_name:'aaa',
		last_name:'abc',
		dob: new Date('2015-03-04T08:00:00.000Z'),
		age:'60',
		sex:'F',
		income:322.23};

	it('testing last name change', function (done) {	
		delete_user_info (json.user)
		var sql = "INSERT INTO profile(USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME) VALUES (?,?,?,?,?,?,?)";
		dbconnection.query(sql, [json.user,json.first_name,json.last_name,json.dob,json.age,json.sex,json.income], function (err, result) {
 		if (err) {
			console.log(err);
			//throw err
			callback("ERR_DB_PROFILE_INSERT");
			//callback("ERR_DB_PROFILE_INSERT");
		 } else {
			var json1 = {user:'DBTESTUSER',
			key:'LAST_NAME',
			value:'shsh',
			};
			
			 request.post('http://localhost:3000/viewProfile', {json:json1}, function (err, res, body){
	
				 var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql, [json1.user], function (err, result) {
				 if (err) throw err;
				 assert(result[0].user_exists == 1);
		
				 var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql2, [json1.user], function (err, result) {
					 if (err) throw err;
					 assert(result[0].USER_NAME === json1.user);
					 assert(result[0].LAST_NAME === json1.value);
					 assert(res.body=='SAVED');
					 done();
				 	});
			 
			 	});
			 });
			}
		});
	});

	it('testing first name change', function (done) {	
		delete_user_info (json.user)
		var sql = "INSERT INTO profile(USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME) VALUES (?,?,?,?,?,?,?)";
		dbconnection.query(sql, [json.user,json.first_name,json.last_name,json.dob,json.age,json.sex,json.income], function (err, result) {
 		if (err) {
			console.log(err);
			//throw err
			callback("ERR_DB_PROFILE_INSERT");
			//callback("ERR_DB_PROFILE_INSERT");
		 } else {
			var json1 = {user:'DBTESTUSER',
			key:'FIRST_NAME',
			value:'shsh',
			};
			
			 request.post('http://localhost:3000/viewProfile', {json:json1}, function (err, res, body){
				 //testing if the a new user has been added to profile in the database.
				 var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql, [json1.user], function (err, result) {
				 if (err) throw err;
				 assert(result[0].user_exists == 1);
				 //testing that profile was loaded properly into database
				 var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql2, [json1.user], function (err, result) {
					 if (err) throw err;
					 assert(result[0].USER_NAME === json1.user);
					 assert(result[0].FIRST_NAME === json1.value);
					 assert(res.body=='SAVED');
					 done();
				 	});
			 
			 	});
			 });
			}
		});
	});

	it('testing date of birth change', function (done) {	
		delete_user_info (json.user)
		var sql = "INSERT INTO profile(USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME) VALUES (?,?,?,?,?,?,?)";
		dbconnection.query(sql, [json.user,json.first_name,json.last_name,json.dob,json.age,json.sex,json.income], function (err, result) {
 		if (err) {
			console.log(err);
			//throw err
			callback("ERR_DB_PROFILE_INSERT");
			//callback("ERR_DB_PROFILE_INSERT");
		 } else {
			var json1 = {user:'DBTESTUSER',
				key:'BIRTH_DAY',
				value: new Date('2000-03-04T08:00:00.000Z'),
				};
			
			 request.post('http://localhost:3000/viewProfile', {json:json1}, function (err, res, body){
				 //testing if the a new user has been added to profile in the database.
				 var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql, [json1.user], function (err, result) {
				 if (err) throw err;
				 assert(result[0].user_exists == 1);
				 //testing that profile was loaded properly into database
				 var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql2, [json1.user], function (err, result) {
					 if (err) throw err;
					 assert(result[0].USER_NAME === json1.user);
					 assert(result[0].BIRTH_DAY.toString() === json1.value.toString());
					 assert(res.body=='SAVED');
					 done();
				 	});
			 
			 	});
			 });
			}
		});
	});

	it('testing age change', function (done) {	
		delete_user_info (json.user)
		var sql = "INSERT INTO profile(USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME) VALUES (?,?,?,?,?,?,?)";
		dbconnection.query(sql, [json.user,json.first_name,json.last_name,json.dob,json.age,json.sex,json.income], function (err, result) {
 		if (err) {
			console.log(err);
			//throw err
			callback("ERR_DB_PROFILE_INSERT");
			//callback("ERR_DB_PROFILE_INSERT");
		 } else {
			var json1 = {user:'DBTESTUSER',
				key:'AGE',
				value: 33
				};
			
			 request.post('http://localhost:3000/viewProfile', {json:json1}, function (err, res, body){
				 //testing if the a new user has been added to profile in the database.
				 var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql, [json1.user], function (err, result) {
				 if (err) throw err;
				 assert(result[0].user_exists == 1);
				 //testing that profile was loaded properly into database
				 var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql2, [json1.user], function (err, result) {
					 if (err) throw err;
					 assert(result[0].USER_NAME === json1.user);
					 assert(result[0].AGE == json1.value);
					 assert(res.body=='SAVED');
					 done();
				 	});
			 
			 	});
			 });
			}
		});
	});

	it('testing sex change', function (done) {	
		delete_user_info (json.user)
		var sql = "INSERT INTO profile(USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME) VALUES (?,?,?,?,?,?,?)";
		dbconnection.query(sql, [json.user,json.first_name,json.last_name,json.dob,json.age,json.sex,json.income], function (err, result) {
 		if (err) {
			console.log(err);
			//throw err
			callback("ERR_DB_PROFILE_INSERT");
			//callback("ERR_DB_PROFILE_INSERT");
		 } else {
			var json1 = {user:'DBTESTUSER',
				key:'SEX',
				value:'M'
			};
			
			 request.post('http://localhost:3000/viewProfile', {json:json1}, function (err, res, body){
				 //testing if the a new user has been added to profile in the database.
				 var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql, [json1.user], function (err, result) {
				 if (err) throw err;
				 assert(result[0].user_exists == 1);
				 //testing that profile was loaded properly into database
				 var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql2, [json1.user], function (err, result) {
					 if (err) throw err;
					 assert(result[0].USER_NAME === json1.user);
					 assert(result[0].SEX === json1.value);
					 assert(res.body=='SAVED');
					 done();
				 	});
			 
			 	});
			 });
			}
		});
	});

	it('testing income change', function (done) {	
		delete_user_info (json.user)
		var sql = "INSERT INTO profile(USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME) VALUES (?,?,?,?,?,?,?)";
		dbconnection.query(sql, [json.user,json.first_name,json.last_name,json.dob,json.age,json.sex,json.income], function (err, result) {
 		if (err) {
			console.log(err);
			//throw err
			callback("ERR_DB_PROFILE_INSERT");
			//callback("ERR_DB_PROFILE_INSERT");
		 } else {
			var json1 = {user:'DBTESTUSER',
				key:'INCOME',
				value:2224
			};
			
			 request.post('http://localhost:3000/viewProfile', {json:json1}, function (err, res, body){
				 //testing if the a new user has been added to profile in the database.
				 var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql, [json1.user], function (err, result) {
				 if (err) throw err;
				 assert(result[0].user_exists == 1);
				 //testing that profile was loaded properly into database
				 var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				 dbconnection.query(sql2, [json1.user], function (err, result) {
					 if (err) throw err;
					 assert(result[0].USER_NAME === json1.user);
					 assert(result[0].INCOME == json1.value);
					 assert(res.body=='SAVED');
					 done();
				 	});
			 
			 	});
			 });
			}
		});
	});

});
   
			   
			
		



