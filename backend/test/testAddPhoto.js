var request = require('request');
var assert = require('assert');
var expect = require('chai').expect;
var server = require('../index');
var dbconnection = require('../dbConnection');
var createAccount = require('../routes/createAccount');
var viewByDate = require('../routes/viewByDate');
var login = require('../routes/login');
var addRecord = require('../routes/addRecord');
var getChartData = require('../routes/getChartData');
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
		console.log("LOGIN: " + res.text);
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

function removePhoto(filepath) {
    fs.unlink(filepath, function(err) {
	if(err && err.code == 'ENOENT') {
	    //console.log(filepath + "doesn't exist");
	} else if (err) {
	    console.log("Error occurred while trying to remove file");
	} else {
	    //console.log("removed");
	}
    });
}


describe('testing addPhoto backend', function() {
    var json = {user:'DBTESTUSER8',
		password:'bbb',
		first_name:'aaa',
		last_name:'abc',
		dob: new Date('2015-03-04T08:00:00.000Z'),
		date: new Date('2015-03-04T08:00:00.000Z'),
		age:'32',
		sex:'M',
		income:322.23};
    it('testing /addPhoto will store a photo of the user', function(done) {
	delete_user_info(json.user);
	var request = supertest('localhost:3000');
	var uploadPath = __dirname + "/../public/profileImages/" + json.user + ".jpeg";
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //to hold a copy of the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session
		session = loginSession;
		return new Promise (function (resolve,reject) {
		    fs.unlink(uploadPath, function(err) {
			assert(err == null || err.code == 'ENOENT');
			console.log(err);
			resolve();
		    });
		});
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.post('/addPhoto')
			.attach('picture',  __dirname + "/testPhotos/testPhoto.png")
			.end(function(err,res) {
			    assert(fs.existsSync(uploadPath) == true);
			    resolve();
			});
			    
		});
	    })
	    .then ( () => {
		console.log("HERE");
		return logoutUser(session);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
		done();
	    });
    });

    
});
