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
var app = require('../app');
var supertest = require('supertest-session');

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
    var sql = "DELETE FROM record WHERE USER_NAME = ?";
    dbconnection.query(sql, [user_name], function (err, result) {
	if (err) {
	    throw err;
	} 
    });
    var sql = "DELETE FROM expenses WHERE USER_NAME = ?";
    dbconnection.query(sql, [user_name], function (err, result) {
	if (err) {
	    throw err;
	} 
    });
}

//used to create a user during testing
function create_test_user (first_name,last_name,dob,age,sex,income,user,hash,salt) {
    return new Promise( function (resolve,reject) {
	createAccount.insert_user_info(first_name,last_name,dob,age,sex,income,user,hash,salt, function (result) {
	    resolve(result);
	});
    });
}

//function used to login user for testing
function loginUser(session,username,password) {
    return new Promise( function(resolve,reject) {
	// testing login
	loginInfo = {
	    username : username,
	    password : password
	};    
	session
	    .post('/login')
	    .send(loginInfo)
	    .end(function(err, res) {
		if (err) {
		    throw err;
		}
		resolve(session);
	    });
    });
}

//function used to logout user for testing
function logoutUser(session) {
    //session is an instance of supertest-session after login
    return new Promise( function(resolve,reject) {
	session
	    .get('/logout')
	    .end(function(err, res) {
		resolve(res.text);
	    });
    });
};

//function used to query database for testing
function query_database(sql,sqlVars) {
    return new Promise( function(resolve,reject) {
	dbconnection.query(sql,sqlVars,function(err,result) {
	    if (err) {
		throw err;
	    }
	    resolve(result);
	});
    });
}




describe('checking recent entry', function () {
    //user details so that user can be created and logged on
    var userDetails = {user:'Bob',
		       password:'bbb',
		       first_name:'aaa',
		       last_name:'abc',
		       dob: new Date('2015-03-04T08:00:00.000Z'),
		       age:'32',
		       sex:'M',
		       income:322.23};
    var sql = "INSERT INTO expenses(USER_NAME,EXPENSES,CATEGORY) VALUES (?,?,?)";
    it('testing home page recent transactions', function (done) {
        var user1 = 'Bob'
        var exp1  = '100'
        var cat1  = 'food'
        var exp2  = '200'
        var cat2  = 'travel'
        var exp3  = '300'
        var cat3  = 'entertainment'
	delete_user_info(userDetails.user);
        dbconnection.query(sql, [user1,exp1,cat1], function (err, result) {
	    if (err) throw err;
        });
        dbconnection.query(sql, [user1,exp2,cat2], function (err, result) {
	    if (err) throw err;
        });
        dbconnection.query(sql, [user1,exp3,cat3], function (err, result) {
	    if (err) throw err;
        });
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(userDetails.password,salt);
	var supertester = supertest(app);
	var session;  //will hold the supertester with the user session
	create_test_user(userDetails.first_name,userDetails.last_name,userDetails.dob,
			 userDetails.age,userDetails.sex,userDetails.income,userDetails.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,userDetails.user,userDetails.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//adding record through /addRecord route
		return new Promise( function (resolve,reject) {
		    var json1 = {user:userDetails.user,elements:4};
		    session
			.get('/home')
			.send(json1)
			.end(function(err,res) {
			    result = JSON.parse(res.text);
			    assert(result[0].USER_NAME==user1);
			    assert(result[0].EXPENSES==exp1);
			    assert(result[0].CATEGORY==cat1);
			    assert(result[1].USER_NAME==user1);
			    assert(result[1].EXPENSES==exp2);
			    assert(result[1].CATEGORY==cat2);
			    assert(result[2].USER_NAME==user1);
			    assert(result[2].EXPENSES==exp3);
			    assert(result[2].CATEGORY==cat3);
			    resolve();
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(userDetails.user);
		done();
	    })
	    .catch( err => {
		delete_user_info(userDetails.user);
		throw err;
		assert(false);
		done();
	    });	
    });
});




   
			   
			
		



