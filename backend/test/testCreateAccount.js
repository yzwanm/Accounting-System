var request = require('request');
var assert = require('assert');
var expect = require('chai').expect;
var server = require('../index');
var dbconnection = require('../dbConnection');
var createAccount = require('../routes/createAccount');
var bcrypt = require('bcrypt')
var PassThrough = require('stream').PassThrough;
var http = require('http');

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


describe('testing inputs to createAccount backend functions', function () {
    var json_string = {user:'DBTESTUSER',
		       password:'bbb',
		       first_name:'aaa',
		       last_name:'abc',
		       dob: new Date('2015-03-04T08:00:00.000Z'),
		       age:'32',
		       sex:'M',
		       income:322.23};

    it('testing if insert_user_info() adds user information to the database', function (done) {
	delete_user_info(json_string.user);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json_string.password,salt);
	createAccount.insert_user_info(json_string.first_name,json_string.last_name,json_string.dob,json_string.age,json_string.sex,json_string.income,json_string.user,hash,salt, function (result) {
	    assert(result == "SUCCESS");
	    //testing that user is added to profile
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [json_string.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 1);
		//testing that user is added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [json_string.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 1);
		    done();
		});
	    });
	});
    });

    it('testing that check_for_user() can check if a user is found in the database', function(done) {
	delete_user_info(json_string.user);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json_string.password,salt);
	var res = new PassThrough();
	createAccount.insert_user_info(json_string.first_name,json_string.last_name,json_string.dob,json_string.age,json_string.sex,json_string.income,json_string.user,hash,salt, function (result) {
	    assert(result == "SUCCESS");
	    createAccount.check_for_user(json_string.user,(result) => {
		assert(result === "USER_EXISTS");
		done();
	    });
	});
    });

    it('testing that check_for_user() can check if a user is NOT found in the database', function(done) {
	delete_user_info(json_string.user);
	createAccount.check_for_user(json_string.user,(result) => {
	    assert(result === "NO_USER");
	    done();
	});
    });

    it('testing that add_user() will add a user to the database', function(done) {
	//var test_json = JSON.parse(JSON.stringify(json_string));
	//test_json.user = "BOB"
	delete_user_info(json_string.user);
	createAccount.check_for_user(json_string.user, function (result) {
	    assert(result === "NO_USER");  
	    var salt = bcrypt.genSaltSync(10);
	    var hash = bcrypt.hashSync(json_string.password,salt);
	    createAccount.add_user(json_string.first_name,json_string.last_name,json_string.dob,json_string.age,json_string.sex,json_string.income,json_string.user,hash,salt,function(result) {
		assert(result == "SUCCESS");
		createAccount.check_for_user(json_string.user, function (result) {
		    assert(result === "USER_EXISTS");  
		    done();
		});
	    });
	});
    });

    it('testing that add_user() will return ERR_USER_EXISTS if a that user_name is already in the database', function(done) {
	delete_user_info(json_string.user);
	createAccount.check_for_user(json_string.user, function (result) {
	    assert(result === "NO_USER");  
	    var salt = bcrypt.genSaltSync(10);
	    var hash = bcrypt.hashSync(json_string.password,salt);
	    createAccount.add_user(json_string.first_name,json_string.last_name,json_string.dob,json_string.age,json_string.sex,json_string.income,json_string.user,hash,salt,function(result) {
		assert(result == "SUCCESS");
		createAccount.check_for_user(json_string.user, function (result) {
		    assert(result === "USER_EXISTS");
		    createAccount.add_user(json_string.first_name,json_string.last_name,json_string.dob,json_string.age,json_string.sex,json_string.income,json_string.user,hash,salt,function(result) {
			assert(result == "ERR_USER_EXISTS");
			done();
		    });
		});
	    });
	});
    }); 
    
    it('testing loading data to profile table through /createAccount Route', function (done) {
	//deleting old account
	delete_user_info(json_string.user);
	//testing the createAccount route
	request.post('http://localhost:3000/createAccount', {json:json_string}, function (err, res, body){
	    //testing if the a new user has been added to profile in the database.
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [json_string.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 1);
		//testing that profile was loaded properly into database
		var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [json_string.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].USER_NAME === json_string.user);
		    assert(result[0].FIRST_NAME === json_string.first_name);
		    assert(result[0].LAST_NAME === json_string.last_name);
		    assert(result[0].BIRTH_DAY.toString() === json_string.dob.toString());
		    assert(result[0].AGE == json_string.age);
		    assert(result[0].SEX === json_string.sex);
		    assert(result[0].INCOME == json_string.income);
		    done();
		});
	    });
	});
    });
 
    it('testing loading data to user table through /createAccount route', function(done) {
	//testing if the a new user has been added to profile in the database.
	var sql = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
	dbconnection.query(sql, [json_string.user], function (err, result) {
	    if (err) throw err;
	    //user is the only field in here other than password and salt
	    //the hash and salt are tested in the next unit test.
	    assert(result[0].user_exists == 1);  
	    done();
	});
    });

    it('testing bcrypt is being used to hash passwords', function(done) {
	var sql = "SELECT * FROM user WHERE (USER_NAME = ?)";
	dbconnection.query(sql, [json_string.user], function (err, result) {
	    if (err) throw err;
	    assert(result[0].USER_NAME === json_string.user);
	    var hash = bcrypt.hashSync(json_string.password,result[0].SALT);
	    assert(result[0].PASSWORD === hash);
	    done();
	});
    });

    it('testing /createAccount returns ERR_NO_USER if user_name is null', function(done) {
	delete_user_info(json_string.user);
	var test_json = JSON.parse(JSON.stringify(json_string));
	test_json.user = null;
	request.post('http://localhost:3000/createAccount', {json:test_json}, function (err, res, body){
	    assert(body === "ERR_NO_USER");
	    //testing that user is not added to profile table
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [test_json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 0);
		//testing that user is not added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [test_json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 0);
		    delete_user_info(json_string.user);
		    done();
		});
	    });
	});
    });

    it('testing /createAccount returns ERR_NO_USER if user_name is empty', function(done) {
	delete_user_info(json_string.user);
	var test_json = JSON.parse(JSON.stringify(json_string));
	test_json.user = "";
	request.post('http://localhost:3000/createAccount', {json:test_json}, function (err, res, body){
	    assert(body === "ERR_NO_USER");
	    //testing that user is not added to profile table
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [test_json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 0);
		//testing that user is not added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [test_json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 0);
		    delete_user_info(json_string.user);
		    done();
		});
	    });
	});
    });

    it('testing /createAccount returns ERR_NO_PASS if password is null', function(done) {
	delete_user_info(json_string.user);
	var test_json = JSON.parse(JSON.stringify(json_string));
	test_json.password = null;
	request.post('http://localhost:3000/createAccount', {json:test_json}, function (err, res, body){
	    assert(body === "ERR_NO_PASS");
	    //testing that user is not added to profile table
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [test_json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 0);
		//testing that user is not added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [test_json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 0);
		    delete_user_info(json_string.user);
		    done();
		});
	    });
	});
    });

    it('testing /createAccount returns ERR_NO_PASS if password is empty', function(done) {
	delete_user_info(json_string.user);
	var test_json = JSON.parse(JSON.stringify(json_string));
	test_json.password = "";
	request.post('http://localhost:3000/createAccount', {json:test_json}, function (err, res, body){
	    assert(body === "ERR_NO_PASS");
	    //testing that user is not added to profile table
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [test_json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 0);
		//testing that user is not added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [test_json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 0);
		    delete_user_info(json_string.user);
		    done();
		});
	    });
	});
    });
    
    it('testing /createAccount returns ERR_NO_FNAME if password is null', function(done) {
	delete_user_info(json_string.user);
	var test_json = JSON.parse(JSON.stringify(json_string));
	test_json.first_name = null;
	request.post('http://localhost:3000/createAccount', {json:test_json}, function (err, res, body){
	    assert(body === "ERR_NO_FNAME");
	    //testing that user is not added to profile table
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [test_json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 0);
		//testing that user is not added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [test_json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 0);
		    delete_user_info(json_string.user);
		    done();
		});
	    });
	});
    });
    
    it('testing /createAccount returns ERR_NO_FNAME if password is empty', function(done) {
	delete_user_info(json_string.user);
	var test_json = JSON.parse(JSON.stringify(json_string));
	test_json.first_name = "";
	request.post('http://localhost:3000/createAccount', {json:test_json}, function (err, res, body){
	    assert(body === "ERR_NO_FNAME");
	    //testing that user is not added to profile table
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [test_json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 0);
		//testing that user is not added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [test_json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 0);
		    delete_user_info(json_string.user);
		    done();
		});
	    });
	});
    });
    
    it('testing /createAccount returns SUCCESS with user_name,password, and first_name', function(done) {
	delete_user_info(json_string.user);
	var test_json = {
	    user: json_string.user,
	    password: json_string.password,
	    first_name: json_string.first_name};
	request.post('http://localhost:3000/createAccount', {json:test_json}, function (err, res, body){
	    assert(body === "SUCCESS");
	    //testing that user is added to profile table
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [test_json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 1);
		//testing that user is added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [test_json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 1);
		    delete_user_info(json_string.user);
		    done();
		});
	    });
	});
    });
});

