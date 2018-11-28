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


//used to delete a user during testing
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
		delete_user_info(user_name);
		resolve(res.text);
	    });
    });
};

function add_test_record (user_name,parent_category,category,comment,money,date) {
    return new Promise( function(resolve,reject) {
	addRecord.getCategoryId(parent_category)
  	    .then( parentId => {
		//the id of type is the parentId of category
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then( categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
		parentId = categoryInfo.PARENT_ID;
		return addRecord.addRecord(user_name,category,categoryId,parentId,comment,money,date,parent_category);
	    })
	    .then( status => {
		if (status == "SUCCESS") {
		    resolve("SUCCESS");
		} else {
		    reject(status);
		}
	    });
    });
}

function add_array_test_records(test_record_array) {
    return new Promise( async function(resolve,reject) {
	var promises = [];
	for (i = 0; i < test_record_array.length; i++) {
	    promises[i] = add_test_record(test_record_array[i][0],test_record_array[i][1],test_record_array[i][2],test_record_array[i][3],test_record_array[i][4],test_record_array[i][5]);
	}
	await Promise.all(promises);
	resolve("SUCCESS");
    });
}


describe('testing /deleteProfile backend', function () {
    var json = {user:'DBTESTUSER',
		password:'bbb',
		first_name:'aaa',
		last_name:'abc',
		dob: new Date('2015-03-04T08:00:00.000Z'),
		date: new Date('2015-03-04T08:00:00.000Z'),
		age:'32',
		sex:'M',
		income:322.23};

    it('testing /delete profile removes data from user, profile, and records tables', function(done) {
	delete_user_info(json.user);
	var test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
				 [json.user,'cost','food','comment2',244,'2018-04-11'],
				 [json.user,'income','salary','comment3',255,'2018-04-11'],
				 [json.user,'cost','food','comment4',266,'2018-04-12'],
				 [json.user,'cost','food','comment5',277,'2018-04-12'],
				 [json.user,'income','salary','comment6',288,'2018-04-12'],
				 [json.user,'cost','other','comment7',200,'2018-04-13'],
				 [json.user,'cost','other','comment8',300,'2018-04-13'],
				 [json.user,'income','other','comment9',400,'2018-04-13'],
				 [json.user,'income','other','comment10',500,'2018-04-14'],
				 [json.user,'cost','food','comment11',600,'2018-04-14'],
				 [json.user,'cost','other','comment12',220,'2018-04-16'],
				 [json.user,'cost','other','comment13',320,'2018-04-16'],
				 [json.user,'income','other','comment14',420,'2018-04-16'],
				 [json.user,'income','other','comment15',520,'2018-04-16'],
				 [json.user,'cost','food','comment16',620,'2018-04-17'],
				 [json.user,'cost','food','comment17',632,'2018-04-17'],
				 [json.user,'cost','food','comment18',320,'2018-04-17'],
				 [json.user,'cost','food','comment19',320,'2018-04-22'],
				 [json.user,'cost','food','comment20',320,'2018-04-22']];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //to hold a copy of the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		//logging in
		assert(creationStatus == "SUCCESS");
		return loginUser(supertester,json.user,json.password);
	    })	
	    .then ( (loginSession) => {
		//saving supertester with session and adding records
		session = loginSession;
		return add_array_test_records(test_record_array);
	    })
	    .then( () => {
		return new Promise( function(resolve,reject) {
		    var sql = "select * from user where USER_NAME = ?";
		    dbconnection.query(sql, [json.user], function (err, result) {
			if (err) {
			    throw err;
			}
			assert(result.length == 1);
			resolve();
		    });

		});
	    })
	    .then( () => {
		return new Promise( function(resolve,reject) {
		    var sql = "select * from profile where USER_NAME = ?";
		    dbconnection.query(sql, [json.user], function (err, result) {
			if (err) {
			    throw err;
			}
			assert(result.length == 1);
			resolve();
		    });

		});
	    })
	    .then( () => {
		return new Promise( function(resolve,reject) {
		    var sql = "select * from record where USER_NAME = ?";
		    dbconnection.query(sql, [json.user], function (err, result) {
			if (err) {
			    throw err;
			}
			assert(result.length == test_record_array.length);
			resolve();
		    });

		});
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.get('/deleteProfile')
			.end(function(err,res) {
			    assert(res.text == "SUCCESS");
			    resolve();
			});
		});
	    })
	    .then( () => {
		return new Promise( function(resolve,reject) {
		    var sql = "select * from user where USER_NAME = ?";
		    dbconnection.query(sql, [json.user], function (err, result) {
			if (err) {
			    throw err;
			}
			assert(result.length == 0);
			resolve();
		    });

		});
	    })
	    .then( () => {
		return new Promise( function(resolve,reject) {
		    var sql = "select * from profile where USER_NAME = ?";
		    dbconnection.query(sql, [json.user], function (err, result) {
			if (err) {
			    throw err;
			}
			assert(result.length == 0);
			resolve();
		    });

		});
	    })
	    .then( () => {
		return new Promise( function(resolve,reject) {
		    var sql = "select * from record where USER_NAME = ?";
		    dbconnection.query(sql, [json.user], function (err, result) {
			if (err) {
			    throw err;
			}
			assert(result.length == 0);
			resolve();
		    });

		});
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    });
    });

    it('testing /deleteProfile returns NOT_LOGGED_IN when user is not logged in', function(done) {
	delete_user_info(json.user);
		var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		//logging in
		assert(creationStatus == "SUCCESS");
		return new Promise( function (resolve,reject) {
		    supertester
			.get('/deleteProfile')
			.end(function(err,res) {
			    assert(res.text == "NOT_LOGGED_IN");
			    resolve();
			});
		});
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    });
    });

});
