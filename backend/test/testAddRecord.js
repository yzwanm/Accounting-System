var request = require('request');
var assert = require('assert');
var expect = require('chai').expect;
var server = require('../index');
var dbconnection = require('../dbConnection');
var createAccount = require('../routes/createAccount');
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



describe('testing addRecord (income and cost) backend functions', function () {
    var json = {user:'DBTESTUSER',
		password:'bbb',
		first_name:'aaa',
		last_name:'abc',
		dob: new Date('2015-03-04T08:00:00.000Z'),
		date: new Date('2015-03-04T08:00:00.000Z'),
		age:'32',
		sex:'M',
		income:322.23};

    it('testing getCategoryId() returns id of the parent category income', function (done) {
	addRecord.getCategoryId('income')
	    .then ( categoryId => {
		var sql = "SELECT * FROM category WHERE CATEGORY_ID = ?";
		dbconnection.query(sql,[categoryId],function(err,result) {
		    if (err) {
			throw err;
		    }
		    assert(result[0].CATEGORY == 'income');
		    done();
		});
	    }).catch (err => {
		throw err;
		done();
	    });
    });
    it('testing getCategoryId() returns id of the parent category cost', function (done) {
	addRecord.getCategoryId('cost')
	    .then ( categoryId => {
		var sql = "SELECT * FROM category WHERE CATEGORY_ID = ?";
		dbconnection.query(sql,[categoryId],function(err,result) {
		    if (err) {
			throw err;
		    }
		    assert(result[0].CATEGORY == 'cost');
		    done();
		});
	    }).catch (err => {
		throw err;
		done();
	    });
    });
    it('testing getCategoryId() returns ERR_DB_BAD_CATEGORY_TYPE when presented with bad input', function (done) {
	addRecord.getCategoryId('cos')
	    .then ( categoryId => {
		assert(false);
	    }).catch (err => {
		assert(err ==  'ERR_DB_BAD_CATEGORY_TYPE');
		done();
	    });
    });
    it('testing getCategoryInfo returns correct results for salary', function (done) {
	parent_category = 'income';
	category = 'salary';
	var parent_id;
	addRecord.getCategoryId(parent_category)
	    .then(parentId => {
		parent_id = parentId;
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then(categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
				var sql = "SELECT * FROM category WHERE CATEGORY_ID = ?";
		dbconnection.query(sql,[categoryId],function(err,result) {
		    if (err) {
			throw err;
		    }
		    assert(result[0].CATEGORY == category);
		    assert(result[0].PARENT_ID == parent_id);
		    done();
		});
	    })
	    .catch( err => {
		throw err;
		done();
	    });
    });
    it('testing getCategoryInfo returns correct results for food', function (done) {
	parent_category = 'cost';
	category = 'food';
	var parent_id;
	addRecord.getCategoryId(parent_category)
	    .then(parentId => {
		parent_id = parentId;
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then(categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
				var sql = "SELECT * FROM category WHERE CATEGORY_ID = ?";
		dbconnection.query(sql,[categoryId],function(err,result) {
		    if (err) {
			throw err;
		    }
		    assert(result[0].CATEGORY == category);
		    assert(result[0].PARENT_ID == parent_id);
		    done();
		});
	    })
	    .catch( err => {
		throw err;
		done();
	    });
    });
    it('testing getCategoryInfo returns correct results for other income', function (done) {
	parent_category = 'income';
	category = 'other';
	var parent_id;
	addRecord.getCategoryId(parent_category)
	    .then(parentId => {
		parent_id = parentId;
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then(categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
				var sql = "SELECT * FROM category WHERE CATEGORY_ID = ?";
		dbconnection.query(sql,[categoryId],function(err,result) {
		    if (err) {
			throw err;
		    }
		    assert(result[0].CATEGORY == category);
		    assert(result[0].PARENT_ID == parent_id);
		    done();
		});
	    })
	    .catch( err => {
		throw err;
		done();
	    });
    });
    it('testing getCategoryInfo returns correct results for other cost', function (done) {
	parent_category = 'cost';
	category = 'other';
	var parent_id;
	addRecord.getCategoryId(parent_category)
	    .then(parentId => {
		parent_id = parentId;
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then(categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
				var sql = "SELECT * FROM category WHERE CATEGORY_ID = ?";
		dbconnection.query(sql,[categoryId],function(err,result) {
		    if (err) {
			throw err;
		    }
		    assert(result[0].CATEGORY == category);
		    assert(result[0].PARENT_ID == parent_id);
		    done();
		});
	    })
	    .catch( err => {
		throw err;
		done();
	    });
    });
    it('testing getCategoryInfo throws ERR_DB_BAD_CATEGORY for category=salary, parentCategory=cost', function (done) {
	parent_category = 'cost';
	category = 'salary';
	var parent_id;
	addRecord.getCategoryId(parent_category)
	    .then(parentId => {
		parent_id = parentId;
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then(categoryInfo => {
		assert(false);
		done();
	    })
	    .catch( err => {
		assert(err == "ERR_DB_BAD_CATEGORY")
		done();
	    });
    });
    it('testing getCategoryInfo throws ERR_DB_BAD_CATEGORY for category=blablabla, parentCategory=cost', function (done) {
	parent_category = 'cost';
	category = 'blablabla';
	var parent_id;
	addRecord.getCategoryId(parent_category)
	    .then(parentId => {
		parent_id = parentId;
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then(categoryInfo => {
		assert(false);
		done();
	    })
	    .catch( err => {
		assert(err == "ERR_DB_BAD_CATEGORY")
		done();
	    });
    });
    it('testing addRecord correctly adds a record into database', function (done) {
	parent_category = 'cost';
	category = 'food';
	date = new Date(json.date);
	user_name = json.user;
	comment = "stuff";
	money = 777.78;
	var categoryId;
	var parentId;
	delete_user_info(user_name);
	addRecord.getCategoryId(parent_category)
  	    .then( parentId => {
		//the id of type is the parentId of category
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then( categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
		parentId = categoryInfo.PARENT_ID;
		return addRecord.addRecord(user_name,category,categoryId,parentId,comment,money,date);
	    })
	    .then( status => {
		assert(status == "SUCCESS");
		var sql = "SELECT * FROM record WHERE USER_NAME = ?;"
		dbconnection.query(sql,[user_name],function(err,result) {
		    if (err) {
			delete_user_info(user_name);
			throw err;
		    }
		    assert(result[0].CATEGORY_ID == categoryId);
		    assert(result[0].PARENT_ID == parentId);
		    assert(result[0].CATEGORY == category);
		    assert(result[0].USER_NAME == user_name);
		    assert(result[0].COMMENT == comment);
		    assert(result[0].MONEY == money);
		    assert(result[0].DATE == date.toString());
		    delete_user_info(user_name);
		    done();
		});
	    })
	    .catch( err => {
		delete_user_info(user_name);
		done();
	    });
    });
    it('testing addRecord throws ERR_DB_INSERT_RECORD when date is null', function (done) {
	parent_category = 'cost';
	category = 'food';
	date = null;
	user_name = json.user;
	comment = "stuff";
	money = 777.78;
	var categoryId;
	var parentId;
	delete_user_info(user_name);
	addRecord.getCategoryId(parent_category)
  	    .then( parentId => {
		//the id of type is the parentId of category
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then( categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
		parentId = categoryInfo.PARENT_ID;
		return addRecord.addRecord(user_name,category,categoryId,parentId,comment,money,date);
	    })
	    .then( status => {
		assert(false);
		done();
	    })
	    .catch( err => {
		assert(err == "ERR_DB_INSERT_RECORD");
		delete_user_info(user_name);
		done();
	    });
    });
    it('testing addExpenditure correctly adds a record into database', function (done) {
	category = 'other';
	date = new Date(json.date);
	user_name = json.user;
	money = 987.78;
	delete_user_info(user_name);
	addRecord.addExpenditure(user_name,money,category,date)
	    .then( status => {
		assert(status == "SUCCESS");
		var sql = "SELECT * FROM expenses WHERE USER_NAME = ?;";
		dbconnection.query(sql,[user_name],function(err,result) {
		    if (err) {
			delete_user_info(user_name);
			throw err;
		    }
		    assert(result[0].CATEGORY == category);
		    assert(result[0].EXPENSES == money);
		    delete_user_info(user_name);
		    done();
		});
	    })
	    .catch( err => {
		delete_user_info(user_name);
		done();
	    });
    });
    it('testing addExpenditure throws ERR_DB_INSERT_EXPENDITURE when user_name is null', function (done) {
	category = 'other';
	date = new Date(json.date);
	user_name = null;
	money = 987.78;
	delete_user_info(user_name);
	addRecord.addExpenditure(user_name,money,category,date)
	    .then( status => {
		assert(false);
		done();
	    })
	    .catch( err => {
		delete_user_info(user_name);
		assert(err == "ERR_DB_INSERT_EXPENDITURE");
		done();
	    });
    });
    it('testing that a cost record can be added through /addRecord route', function (done) {
	var parent_id;
	var category_id;
	parent_category = 'cost';
	category = 'food';
	date = new Date(json.date);
	comment = "stuff";
	money = 777.78;
	user_name = json.user;
	recordInfo = {
	    type:parent_category,
	    category :category,
	    date : date,
	    money : money,
	    comment : comment,
	};
	delete_user_info(user_name);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	supertester = supertest(app);
	var session;
	//creating account so test may be performed
	create_test_user(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertest with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//adding record through /addRecord route
		return new Promise( function (resolve,reject) {
		    session
			.post('/addRecord')
			.send(recordInfo)
			.end(function(err,res) {
			    assert(res.text == "SUCCESS");
			    resolve();
			})
		})
	    })
	    .then( () => {
		//retrieving category_id and parent_id from category table
		var sql = "SELECT * FROM category WHERE CATEGORY = ?;";
		var sqlVars = [category];
		return query_database(sql,sqlVars);
	    })
	    .then( (result) => {
		parent_id = result[0].PARENT_ID;
		category_id = result[0].CATEGORY_ID;
		return;
	    })
	    .then( () => {
		var sql = "SELECT * FROM record WHERE USER_NAME = ?;"
		var sqlVars = [user_name];
		return query_database(sql,sqlVars);
	    })
	    .then( (result) => {
		//testing that record was added
		assert(result[0].CATEGORY_ID == category_id);
		assert(result[0].PARENT_ID == parent_id);
		assert(result[0].CATEGORY == category);
		assert(result[0].MONEY == money);
		assert(result[0].DATE == date.toString());
		return;
	    })
	    .then( () => {
		var sql = "SELECT * FROM expenses WHERE USER_NAME = ?;"
		var sqlVars = [user_name];
		return query_database(sql,sqlVars);
	    })
	    .then( (result) => {
		//testing that expense was added
		assert(result[0].CATEGORY == category);
		assert(result[0].EXPENSES == money);
		assert(result[0].DATE == date.toString());
		return;
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {	
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(user_name);
		done();
	    })
	    .catch( err => {
		delete_user_info(user_name);
		throw err;
		assert(false);
		done();
	    });
    });
    it('testing that an income record can be added through /addRecord route', function (done) {
	var parent_id;
	var category_id;
	parent_category = 'income';
	category = 'other';
	date = new Date(json.date);
	comment = "stuff";
	money = 777.78;
	user_name = json.user;
	recordInfo = {
	    type:parent_category,
	    category :category,
	    date : date,
	    money : money,
	    comment : comment,
	};
	delete_user_info(user_name);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	supertester = supertest(app);
	var session;
	//creating account so test may be performed
	create_test_user(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertest with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//adding record through /addRecord route
		return new Promise( function (resolve,reject) {
		    session
			.post('/addRecord')
			.send(recordInfo)
			.end(function(err,res) {
			    assert(res.text == "SUCCESS");
			    resolve();
			})
		})
	    })
	    .then( () => {
		//retrieving category_id and parent_id from category table
		var sql = "SELECT * FROM category WHERE CATEGORY = ?;";
		var sqlVars = [category];
		return query_database(sql,sqlVars);
	    })
	    .then( (result) => {
		parent_id = result[0].PARENT_ID;
		category_id = result[0].CATEGORY_ID;
		return;
	    })
	    .then( () => {
		var sql = "SELECT * FROM record WHERE USER_NAME = ?;"
		var sqlVars = [user_name];
		return query_database(sql,sqlVars);
	    })
	    .then( (result) => {
		//testing that record was added
		assert(result[0].CATEGORY_ID == category_id);
		assert(result[0].PARENT_ID == parent_id);
		assert(result[0].CATEGORY == category);
		assert(result[0].MONEY == money);
		assert(result[0].DATE == date.toString());
		return;
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {	
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(user_name);
		done();
	    })
	    .catch( err => {
		delete_user_info(user_name);
		throw err;
		assert(false);
		done();
	    });
    });
    it('testing that /addRecord route returns NOT_LOGGED_IN when user is not logged in', function (done) {
	parent_category = 'income';
	category = 'other';
	date = new Date(json.date);
	comment = "stuff";
	money = 777.78;
	user_name = json.user;
	recordInfo = {
	    type:parent_category,
	    category :category,
	    date : date,
	    money : money,
	    comment : comment,
	};
	delete_user_info(user_name);
	supertester = supertest(app);
	supertester
	    .post('/addRecord')
	    .send(recordInfo)
	    .end(function(err,res) {
		assert(res.text == "NOT_LOGGED_IN");
		done();
	    });
    });
    it('testing that /addRecord route returns NO_CATEGORY when a category is not entered', function (done) {
	var parent_id;
	var category_id;
	parent_category = 'income';
	var category;  // = 'other';
	date = new Date(json.date);
	comment = "stuff";
	money = 777.78;
	user_name = json.user;
	recordInfo = {
	    type:parent_category,
	    category :category,
	    date : date,
	    money : money,
	    comment : comment,
	};
	delete_user_info(user_name);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	supertester = supertest(app);
	var session;
	//creating account so test may be performed
	create_test_user(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertest with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//adding record through /addRecord route
		return new Promise( function (resolve,reject) {
		    session
			.post('/addRecord')
			.send(recordInfo)
			.end(function(err,res) {
			    assert(res.text == "NO_CATEGORY");
			    resolve();
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {	
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(user_name);
		done();
	    })
	    .catch( err => {
		delete_user_info(user_name);
		throw err;
		assert(false);
		done();
	    });
    });
    it('testing that /addRecord route returns NO_TYPE when either income or cost is not entered', function (done) {
	var parent_id;
	var category_id;
	var parent_category; //= 'income';
	var category = 'other';
	date = new Date(json.date);
	comment = "stuff";
	money = 777.78;
	user_name = json.user;
	recordInfo = {
	    type:parent_category,
	    category :category,
	    date : date,
	    money : money,
	    comment : comment,
	};
	delete_user_info(user_name);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	supertester = supertest(app);
	var session;
	//creating account so test may be performed
	create_test_user(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertest with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//adding record through /addRecord route
		return new Promise( function (resolve,reject) {
		    session
			.post('/addRecord')
			.send(recordInfo)
			.end(function(err,res) {
			    assert(res.text == "NO_TYPE");
			    resolve();
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {	
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(user_name);
		done();
	    })
	    .catch( err => {
		delete_user_info(user_name);
		throw err;
		assert(false);
		done();
	    });
    });
    it('testing that /addRecord route returns NO_DATE when date is not entered', function (done) {
	var parent_id;
	var category_id;
	var parent_category = 'income';
	var category = 'other';
	var date; 
	comment = "stuff";
	money = 777.78;
	user_name = json.user;
	recordInfo = {
	    type:parent_category,
	    category :category,
	    date : date,
	    money : money,
	    comment : comment,
	};
	delete_user_info(user_name);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	supertester = supertest(app);
	var session;
	//creating account so test may be performed
	create_test_user(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt)
	    .then( (creationStatus) => {
		assert(creationStatus == "SUCCESS");
		//logging in
		return loginUser(supertester,json.user,json.password);
	    })
	    .then ( (loginSession) => {
		//saving supertest with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//adding record through /addRecord route
		return new Promise( function (resolve,reject) {
		    session
			.post('/addRecord')
			.send(recordInfo)
			.end(function(err,res) {
			    assert(res.text == "NO_DATE");
			    resolve();
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {	
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(user_name);
		done();
	    })
	    .catch( err => {
		delete_user_info(user_name);
		throw err;
		assert(false);
		done();
	    });
    });
    
});
