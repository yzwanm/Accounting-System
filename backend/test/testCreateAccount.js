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
    var json = {user:'DBTESTUSER',
		       password:'bbb',
		       first_name:'aaa',
		       last_name:'abc',
		       dob: new Date('2015-03-04T08:00:00.000Z'),
		       age:'32',
		       sex:'M',
		       income:322.23};

    it('testing if insert_user_info() adds user information to the database', function (done) {
	delete_user_info(json.user);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	createAccount.insert_user_info(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt, function (result) {
	    assert(result == "SUCCESS");
	    //testing that user is added to profile
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 1);
		//testing that user is added to user table
		var sql2 = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].user_exists == 1);
		    done();
		});
	    });
	});
    });

    it('testing that check_for_user() can check if a user is found in the database', function(done) {
	delete_user_info(json.user);
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(json.password,salt);
	var res = new PassThrough();
	createAccount.insert_user_info(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt, function (result) {
	    assert(result == "SUCCESS");
	    createAccount.check_for_user(json.user,(result) => {
		assert(result === "USER_EXISTS");
		done();
	    });
	});
    });

    it('testing that check_for_user() can check if a user is NOT found in the database', function(done) {
	delete_user_info(json.user);
	createAccount.check_for_user(json.user,(result) => {
	    assert(result === "NO_USER");
	    done();
	});
    });

    it('testing that add_user() will add a user to the database', function(done) {
	//var test_json = JSON.parse(JSON.stringify(json));
	//test_json.user = "BOB"
	delete_user_info(json.user);
	createAccount.check_for_user(json.user, function (result) {
	    assert(result === "NO_USER");  
	    var salt = bcrypt.genSaltSync(10);
	    var hash = bcrypt.hashSync(json.password,salt);
	    var file;
	    createAccount.add_user(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt,file,function(result) {
		assert(result == "SUCCESS");
		createAccount.check_for_user(json.user, function (result) {
		    assert(result === "USER_EXISTS");  
		    done();
		});
	    });
	});
    });

    it('testing that add_user() will return ERR_USER_EXISTS if a that user_name is already in the database', function(done) {
	delete_user_info(json.user);
	createAccount.check_for_user(json.user, function (result) {
	    assert(result === "NO_USER");  
	    var salt = bcrypt.genSaltSync(10);
	    var hash = bcrypt.hashSync(json.password,salt);
	    var file;
	    createAccount.add_user(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt,file,function(result) {
		assert(result == "SUCCESS");
		createAccount.check_for_user(json.user, function (result) {
		    assert(result === "USER_EXISTS");
		    createAccount.add_user(json.first_name,json.last_name,json.dob,json.age,json.sex,json.income,json.user,hash,salt,file,function(result) {
			assert(result == "ERR_USER_EXISTS");
			done();
		    });
		});
	    });
	});
    }); 
    
    it('testing loading data to profile table through /createAccount Route', function (done) {
	//deleting old account
	delete_user_info(json.user);
	//testing the createAccount route
	request.post('http://localhost:3000/createAccount', {json:json}, function (err, res, body){
	    //testing if the a new user has been added to profile in the database.
	    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	    dbconnection.query(sql, [json.user], function (err, result) {
		if (err) throw err;
		assert(result[0].user_exists == 1);
		//testing that profile was loaded properly into database
		var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
		dbconnection.query(sql2, [json.user], function (err, result) {
		    if (err) throw err;
		    assert(result[0].USER_NAME === json.user);
		    assert(result[0].FIRST_NAME === json.first_name);
		    assert(result[0].LAST_NAME === json.last_name);
		    assert(result[0].BIRTH_DAY.toString() === json.dob.toString());
		    assert(result[0].AGE == json.age);
		    assert(result[0].SEX === json.sex);
		    assert(result[0].INCOME == json.income);
		    done();
		});
	    });
	});
    });

    
    it('testing bcrypt is being used to hash passwords', function(done) {
	var sql = "SELECT * FROM user WHERE (USER_NAME = ?)";
	dbconnection.query(sql, [json.user], function (err, result) {
	    if (err) throw err;
	    assert(result[0].USER_NAME === json.user);
	    var hash = bcrypt.hashSync(json.password,result[0].SALT);
	    assert(result[0].PASSWORD === hash);
	    done();
	});
    });

    it('testing /createAccount returns ERR_NO_USER if user_name is null', function(done) {
	delete_user_info(json.user);
	var test_json = JSON.parse(JSON.stringify(json));
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
		    delete_user_info(json.user);
		    done();
		});
	    });
	});
    });

    it('testing /createAccount returns ERR_NO_USER if user_name is empty', function(done) {
	delete_user_info(json.user);
	var test_json = JSON.parse(JSON.stringify(json));
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
		    delete_user_info(json.user);
		    done();
		});
	    });
	});
    });

    it('testing /createAccount returns ERR_NO_PASS if password is null', function(done) {
	delete_user_info(json.user);
	var test_json = JSON.parse(JSON.stringify(json));
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
		    delete_user_info(json.user);
		    done();
		});
	    });
	});
    });

    it('testing /createAccount returns ERR_NO_PASS if password is empty', function(done) {
	delete_user_info(json.user);
	var test_json = JSON.parse(JSON.stringify(json));
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
		    delete_user_info(json.user);
		    done();
		});
	    });
	});
    });
    
    it('testing /createAccount returns ERR_NO_FNAME if password is null', function(done) {
	delete_user_info(json.user);
	var test_json = JSON.parse(JSON.stringify(json));
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
		    delete_user_info(json.user);
		    done();
		});
	    });
	});
    });
    
    it('testing /createAccount returns ERR_NO_FNAME if password is empty', function(done) {
	delete_user_info(json.user);
	var test_json = JSON.parse(JSON.stringify(json));
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
		    delete_user_info(json.user);
		    done();
		});
	    });
	});
    });
    
    it('testing /createAccount returns SUCCESS with user_name,password, and first_name', function(done) {
	delete_user_info(json.user);
	var test_json = {
	    user: json.user,
	    password: json.password,
	    first_name: json.first_name};
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
		    delete_user_info(json.user);
		    done();
		});
	    });
	});
    });
    it('testing check_mime_type().',function(done) {
	assert(createAccount.check_mime_type("image/jpeg") == true);
	assert(createAccount.check_mime_type("image/png") == true);
	assert(createAccount.check_mime_type("image/gif") == true);
	assert(createAccount.check_mime_type("image/potato") == false);
	assert(createAccount.check_mime_type("") == false);
	assert(createAccount.check_mime_type() == false);
	done();
    });

    it('testing add_photo() to check that photo is added', function (done) {
	var file = {};
	file.originalname = "testPhoto.png";
	var image_name = __dirname + "/testPhotos/testPhoto.png";	
	file.mimetype = mime.lookup(image_name);	
	file.buffer = fs.readFileSync(image_name);
	var uploadPath = __dirname + "/../public/profileImages/" + json.user + ".jpeg";
	//removing the folder and cheking error status to see if it was
	//either not there to begin with or removed.
	fs.unlink(uploadPath, function(err) {
	    assert(err == null || err.code == 'ENOENT');
	});
	createAccount.add_photo(json.user,file,function (result) {
	    assert(result == "SAVED");
	    done();
	});
    });

    it('testing loading image through /createAccount Route', function (done) {
	delete_user_info(json.user);
	var request = supertest('localhost:3000');
	var uploadPath = __dirname + "/../public/profileImages/" + json.user + ".jpeg";
	//removing the folder and cheking error status to see if it was
	//either not there to begin with or removed.
	fs.unlink(uploadPath, function(err) {
	    assert(err == null || err.code == 'ENOENT');
	});
	request.post('/createAccount')
	    .set('Content-Type', 'multipart/form-data')
	    .field('user','DBTESTUSER1')
	    .field('password','bbb')
	    .field('first_name','aaa')
	    .attach('picture',  __dirname + "/testPhotos/testPhoto.png")
	    .end(function(err, res) {
		assert(fs.existsSync(uploadPath) == true);
		done();
	    });
    });  
 
});

