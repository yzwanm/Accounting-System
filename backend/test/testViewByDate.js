var request = require('request');
var assert = require('assert');
var expect = require('chai').expect;
var server = require('../index');
var dbconnection = require('../dbConnection');
var createAccount = require('../routes/createAccount');
var viewByDate = require('../routes/viewByDate');
var login = require('../routes/login');
var addRecord = require('../routes/addRecord');
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

function compareResults(results,sqlResults) {
    return new Promise(function (resolve,reject) {
	assert(results.length == sqlResults.length);
	for (var i = 0; i < results.length; i++){
	    assert(results[i].RECORD_ID == sqlResults[i].RECORD_ID);
	    assert(results[i].USER_NAME == sqlResults[i].USER_NAME);
	    assert(results[i].CATEGORY == sqlResults[i].CATEGORY);
	    assert(results[i].MONEY == sqlResults[i].MONEY);
	    assert(results[i].FDATE == sqlResults[i].FDATE);
	    assert(results[i].COMMENT == sqlResults[i].COMMENT);
	}
	resolve();
    });
}


describe('testing viewByDate backend functions', function () {
    var json = {user:'DBTESTUSER',
		password:'bbb',
		first_name:'aaa',
		last_name:'abc',
		dob: new Date('2015-03-04T08:00:00.000Z'),
		date: new Date('2015-03-04T08:00:00.000Z'),
		age:'32',
		sex:'M',
		income:322.23};

    it('testing get_transactions() obtains correct records when type=all category=all startDate=all endDate=all', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
			     [json.user,'cost','food','comment2',244,'2018-04-11'],
			     [json.user,'income','salary','comment3',255,'2018-04-11'],
			     [json.user,'cost','food','comment4',266,'2018-04-12'],
			     [json.user,'cost','food','comment5',277,'2018-04-12'],
			     [json.user,'income','salary','comment6',288,'2018-04-12'],
			     [json.user,'cost','other','comment7',200,'2018-04-13'],
			     [json.user,'cost','other','comment8',300,'2018-04-13'],
			     [json.user,'income','other','comment9',400,'2018-04-13'],
			     [json.user,'income','other','comment10',500,'2018-04-14'],
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"all","all","all","all", function (funcResult) {
			//console.log(funcResult);
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME) = (?)";
			dbconnection.query(sql, [json.user], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    //console.log(sqlResult);
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });
    it('testing get_transactions() obtains correct records when type=cost category=all startDate=all endDate=all', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
			     [json.user,'cost','food','comment2',244,'2018-04-11'],
			     [json.user,'income','salary','comment3',255,'2018-04-11'],
			     [json.user,'cost','food','comment4',266,'2018-04-12'],
			     [json.user,'cost','food','comment5',277,'2018-04-12'],
			     [json.user,'income','salary','comment6',288,'2018-04-12'],
			     [json.user,'cost','other','comment7',200,'2018-04-13'],
			     [json.user,'cost','other','comment8',300,'2018-04-13'],
			     [json.user,'income','other','comment9',400,'2018-04-13'],
			     [json.user,'income','other','comment10',500,'2018-04-14'],
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"cost","all","all","all", function (funcResult) {
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID) = (?,?)";
			dbconnection.query(sql, [json.user,2], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing get_transactions() obtains correct records when type=income category=all startDate=all endDate=all', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
			     [json.user,'cost','food','comment2',244,'2018-04-11'],
			     [json.user,'income','salary','comment3',255,'2018-04-11'],
			     [json.user,'cost','food','comment4',266,'2018-04-12'],
			     [json.user,'cost','food','comment5',277,'2018-04-12'],
			     [json.user,'income','salary','comment6',288,'2018-04-12'],
			     [json.user,'cost','other','comment7',200,'2018-04-13'],
			     [json.user,'cost','other','comment8',300,'2018-04-13'],
			     [json.user,'income','other','comment9',400,'2018-04-13'],
			     [json.user,'income','other','comment10',500,'2018-04-14'],
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"income","all","all","all", function (funcResult) {
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID) = (?,?)";
			dbconnection.query(sql, [json.user,1], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing get_transactions() obtains correct records when type=cost category=food startDate=all endDate=all', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
			     [json.user,'cost','food','comment2',244,'2018-04-11'],
			     [json.user,'income','salary','comment3',255,'2018-04-11'],
			     [json.user,'cost','food','comment4',266,'2018-04-12'],
			     [json.user,'cost','food','comment5',277,'2018-04-12'],
			     [json.user,'income','salary','comment6',288,'2018-04-12'],
			     [json.user,'cost','other','comment7',200,'2018-04-13'],
			     [json.user,'cost','other','comment8',300,'2018-04-13'],
			     [json.user,'income','other','comment9',400,'2018-04-13'],
			     [json.user,'income','other','comment10',500,'2018-04-14'],
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"cost","food","all","all", function (funcResult) {
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID,CATEGORY_ID) = (?,?,?)";
			dbconnection.query(sql, [json.user,2,7], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing get_transactions() obtains correct records when type=income category=salary startDate=all endDate=all', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
			     [json.user,'cost','food','comment2',244,'2018-04-11'],
			     [json.user,'income','salary','comment3',255,'2018-04-11'],
			     [json.user,'cost','food','comment4',266,'2018-04-12'],
			     [json.user,'cost','food','comment5',277,'2018-04-12'],
			     [json.user,'income','salary','comment6',288,'2018-04-12'],
			     [json.user,'cost','other','comment7',200,'2018-04-13'],
			     [json.user,'cost','other','comment8',300,'2018-04-13'],
			     [json.user,'income','other','comment9',400,'2018-04-13'],
			     [json.user,'income','other','comment10',500,'2018-04-14'],
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"income","salary","all","all", function (funcResult) {
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID,CATEGORY_ID) = (?,?,?)";
			dbconnection.query(sql, [json.user,1,3], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });
    it('testing get_transactions() obtains correct records when type=all category=all startDate=2018-04-12 endDate=all', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
			     [json.user,'cost','food','comment2',244,'2018-04-11'],
			     [json.user,'income','salary','comment3',255,'2018-04-11'],
			     [json.user,'cost','food','comment4',266,'2018-04-12'],
			     [json.user,'cost','food','comment5',277,'2018-04-12'],
			     [json.user,'income','salary','comment6',288,'2018-04-12'],
			     [json.user,'cost','other','comment7',200,'2018-04-13'],
			     [json.user,'cost','other','comment8',300,'2018-04-13'],
			     [json.user,'income','other','comment9',400,'2018-04-13'],
			     [json.user,'income','other','comment10',500,'2018-04-14'],
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"all","all","2018-04-12","all", function (funcResult) {
			//console.log(funcResult);
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME) = (?)"
			    + " and (DATE(DATE)) >= cast(? as DATE)";
			dbconnection.query(sql, [json.user,'2018-04-12'], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    //console.log(sqlResult);
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });
    it('testing get_transactions() obtains correct records when type=all category=all startDate=all endDate=2018-04-12', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
			     [json.user,'cost','food','comment2',244,'2018-04-11'],
			     [json.user,'income','salary','comment3',255,'2018-04-11'],
			     [json.user,'cost','food','comment4',266,'2018-04-12'],
			     [json.user,'cost','food','comment5',277,'2018-04-12'],
			     [json.user,'income','salary','comment6',288,'2018-04-12'],
			     [json.user,'cost','other','comment7',200,'2018-04-13'],
			     [json.user,'cost','other','comment8',300,'2018-04-13'],
			     [json.user,'income','other','comment9',400,'2018-04-13'],
			     [json.user,'income','other','comment10',500,'2018-04-14'],
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"all","all","all","2018-04-12", function (funcResult) {
			//console.log(funcResult);
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME) = (?)"
			    + " and (DATE(DATE)) <= cast(? as DATE)";
			dbconnection.query(sql, [json.user,'2018-04-12'], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    //console.log(sqlResult);
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });


    it('testing get_transactions() obtains correct records when type=all category=all startDate=2018-04-11 endDate=2018-04-12', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
			     [json.user,'cost','food','comment2',244,'2018-04-11'],
			     [json.user,'income','salary','comment3',255,'2018-04-11'],
			     [json.user,'cost','food','comment4',266,'2018-04-12'],
			     [json.user,'cost','food','comment5',277,'2018-04-12'],
			     [json.user,'income','salary','comment6',288,'2018-04-12'],
			     [json.user,'cost','other','comment7',200,'2018-04-13'],
			     [json.user,'cost','other','comment8',300,'2018-04-13'],
			     [json.user,'income','other','comment9',400,'2018-04-13'],
			     [json.user,'income','other','comment10',500,'2018-04-14'],
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"all","all","2018-04-11","2018-04-12", function (funcResult) {
			//console.log(funcResult);
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME) = (?)"
			    + " and (DATE(DATE)) BETWEEN cast(? as DATE) and cast(? as DATE)";
			dbconnection.query(sql, [json.user,'2018-04-11','2018-04-12'], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    //console.log(sqlResult);
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing get_transactions() obtains correct records when type=cost category=food startDate=2018-04-11 endDate=2018-04-12', function(done) {
	test_record_array = [[json.user,'cost','food','comment1',233,'2018-04-11'],
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
			    ];
	delete_user_info(json.user)
	add_array_test_records(test_record_array)
	    .then( res => {
		assert(res == "SUCCESS");
		return new Promise(function (resolve,reject) {		
		    viewByDate.get_transactions(json.user,"cost","food","2018-04-11","2018-04-12", function (funcResult) {
			//console.log(funcResult);
			var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID,CATEGORY_ID) = (?,?,?)"
			    + " and (DATE(DATE)) BETWEEN cast(? as DATE) and cast(? as DATE)";
			dbconnection.query(sql, [json.user,2,7,'2018-04-11','2018-04-12'], function (error, result) {
			    if (error) {
				reject(error);
			    }
			    var sqlResult = JSON.parse(JSON.stringify(result));
			    //console.log(sqlResult);
			    resolve([funcResult,sqlResult]);
			});
		    });
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing route /viewByDate/all/all/all', function (done) {
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
			    ];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //will hold the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session and adding records
		session = loginSession;
		return add_array_test_records(test_record_array);
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.get('/viewByDate/all/all/all')
			.end(function(err,res) {
			    var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME) = (?)";
			    dbconnection.query(sql, [json.user], function (error, result) {
				if (error) {
				    reject(error);
				}
				var sqlResult = JSON.parse(JSON.stringify(result));
				//console.log(sqlResult);
				resolve([res.body,sqlResult]);
			    });
			    
			});
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });


    it('testing route /viewByDate/cost/all/all', function (done) {
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
			    ];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //will hold the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session and adding records
		session = loginSession;
		return add_array_test_records(test_record_array);
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.get('/viewByDate/cost/all/all')
			.end(function(err,res) {
			    var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID) = (?,?)";
			    dbconnection.query(sql, [json.user,2], function (error, result) {
				if (error) {
				    reject(error);
				}
				var sqlResult = JSON.parse(JSON.stringify(result));
				//console.log(sqlResult);
				resolve([res.body,sqlResult]);
			    });
			    
			});
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing route /viewByDate/income/all/all', function (done) {
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
			    ];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //will hold the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session and adding records
		session = loginSession;
		return add_array_test_records(test_record_array);
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.get('/viewByDate/income/all/all')
			.end(function(err,res) {
			    var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID) = (?,?)";
			    dbconnection.query(sql, [json.user,1], function (error, result) {
				if (error) {
				    reject(error);
				}
				var sqlResult = JSON.parse(JSON.stringify(result));
				//console.log(sqlResult);
				resolve([res.body,sqlResult]);
			    });
			    
			});
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing route /viewByDate/cost/other/all', function (done) {
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
			    ];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //will hold the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session and adding records
		session = loginSession;
		return add_array_test_records(test_record_array);
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.get('/viewByDate/cost/other/all')
			.end(function(err,res) {
			    var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID,CATEGORY_ID) = (?,?,?)";
			    dbconnection.query(sql, [json.user,2,15], function (error, result) {
				if (error) {
				    reject(error);
				}
				var sqlResult = JSON.parse(JSON.stringify(result));
				//console.log(sqlResult);
				resolve([res.body,sqlResult]);
			    });
			    
			});
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing route /viewByDate/cost/food/2018-04-12', function (done) {
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
			    ];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //will hold the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session and adding records
		session = loginSession;
		return add_array_test_records(test_record_array);
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.get('/viewByDate/cost/food/2018-04-12')
			.end(function(err,res) {
			    var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID,CATEGORY_ID) = (?,?,?)" +
				" and (DATE(DATE)) = cast(? as DATE)";
			    dbconnection.query(sql, [json.user,2,7,'2018-04-12'], function (error, result) {
				if (error) {
				    reject(error);
				}
				var sqlResult = JSON.parse(JSON.stringify(result));
				//console.log(sqlResult);
				resolve([res.body,sqlResult]);
			    });
			    
			});
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

    it('testing route /viewByDate/income/all/2018-04-11', function (done) {
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
			    ];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //will hold the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session and adding records
		session = loginSession;
		return add_array_test_records(test_record_array);
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.get('/viewByDate/income/all/2018-04-11')
			.end(function(err,res) {
			    var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID) = (?,?)" +
				" and (DATE(DATE)) = cast(? as DATE)";
			    dbconnection.query(sql, [json.user,1,'2018-04-11'], function (error, result) {
				if (error) {
				    reject(error);
				}
				var sqlResult = JSON.parse(JSON.stringify(result));
				//console.log(sqlResult);
				resolve([res.body,sqlResult]);
			    });
			    
			});
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });


    it('testing route /viewByDate/all/all/2018-04-11', function (done) {
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
			    ];
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var supertester = supertest(app);
	var session;  //will hold the supertester with the user session
	create_test_user(json.first_name,json.last_name,json.dob,
			 json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertester with session and adding records
		session = loginSession;
		return add_array_test_records(test_record_array);
	    })
	    .then ( () => {
		return new Promise( function (resolve,reject) {
		    session
			.get('/viewByDate/all/all/2018-04-11')
			.end(function(err,res) {
			    var sql = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME) = (?)" +
				" and (DATE(DATE)) = cast(? as DATE)";
			    dbconnection.query(sql, [json.user,'2018-04-11'], function (error, result) {
				if (error) {
				    reject(error);
				}
				var sqlResult = JSON.parse(JSON.stringify(result));
				//console.log(sqlResult);
				resolve([res.body,sqlResult]);
			    });
			    
			});
		});
	    })
	    .then( result => {
		funcResult = result[0];
		sqlResult = result[1];
		return compareResults(funcResult,sqlResult);
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( () => {
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		console.log(err);
	    });
    });

});
