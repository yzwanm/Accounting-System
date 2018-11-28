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
			console.log (res.body)
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

describe('Testing view profile details', function(){
    //user details so that user can be created and logged on
    var json = {user:'Bob',
		       password:'bbb',
		       first_name:'aaa',
		       last_name:'abc',
		       dob: new Date('2015-03-04T08:00:00.000Z'),
		       age:'32',
		       sex:'M',
		       income:322.23};
    it('Testing view profile',function (done) {
	delete_user_info(json.user);
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
		//saving supertester with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//getting user info through /viewProfile by GET request
		return new Promise( function (resolve,reject) {
		    session
			.get('/viewProfile')
			.end(function(err,res) {
				result = JSON.parse(res.text);
				console.log('print')
				console.log(result[0].USER_NAME)
			    assert(result[0].USER_NAME == json.user);
			    assert(result[0].FIRST_NAME == json.first_name);
			    assert(result[0].LAST_NAME == json.last_name);
			    assert(result[0].AGE == json.age);
			    assert(result[0].SEX == json.sex);
			    assert(result[0].INCOME == json.income);
			    resolve();
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		delete_user_info(json.user);
		throw err;
		assert(false);
		done();
	    });	
    });
});

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
	delete_user_info(json.user);
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
		//saving supertester with session
		session = loginSession;
		
		return;
	    })
	    .then ( () => {
		//changing user info through /viewProfile by POST request
		return new Promise( function (resolve,reject) {
		    var json1 = {user:'DBTESTUSER',
				 key:'LAST_NAME',
				 value:'shsh',
				};
		    session
			.post('/viewProfile')
			.send(json1)
			.end(function(err,res) {
			    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
			    dbconnection.query(sql, [json1.user], function (err, result) {
				if (err) throw err;
				assert(result[0].user_exists == 1);
				var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				dbconnection.query(sql2, [json1.user], function (err, result) {
					if (err) throw err;
					console.log (result[0].USER_NAME)
					console.log ('last name')
				    assert(result[0].USER_NAME === json1.user);
				    assert(result[0].LAST_NAME === json1.value);
				    assert(res.text=='SAVED');
				    resolve();
				});
				
			    });
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		delete_user_info(json.user);
		throw err;
		assert(false);
		done();
	    });
    });
    
    it('testing first name change', function (done) {
	delete_user_info(json.user);
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
		//saving supertester with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//changing user info through /viewProfile by POST request
		return new Promise( function (resolve,reject) {
		    var json1 = {user:'DBTESTUSER',
				 key:'FIRST_NAME',
				 value:'shsh',
				};
		    session
			.post('/viewProfile')
			.send(json1)
			.end(function(err,res) {
			    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
			    dbconnection.query(sql, [json1.user], function (err, result) {
				if (err) throw err;
				assert(result[0].user_exists == 1);
				var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				dbconnection.query(sql2, [json1.user], function (err, result) {
				    if (err) throw err;
				    assert(result[0].USER_NAME === json1.user);
				    assert(result[0].FIRST_NAME === json1.value);
				    assert(res.text=='SAVED');
				    resolve();
				});
				
			    });
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		delete_user_info(json.user);
		throw err;
		assert(false);
		done();
	    });
    });
    
    it('testing date of birth change', function (done) {
	delete_user_info(json.user);
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
		//saving supertester with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//changing user info through /viewProfile by POST request
		return new Promise( function (resolve,reject) {
		    var json1 = {user:'DBTESTUSER',
				 key:'BIRTH_DAY',
				 value: new Date('2000-03-04T08:00:00.000Z'),
				};
		    session
			.post('/viewProfile')
			.send(json1)
			.end(function(err,res) {
			    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
			    dbconnection.query(sql, [json1.user], function (err, result) {
				if (err) throw err;
				assert(result[0].user_exists == 1);
				var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				dbconnection.query(sql2, [json1.user], function (err, result) {
				    if (err) throw err;
				    assert(result[0].USER_NAME === json1.user);
				    assert(result[0].BIRTH_DAY.toString() === json1.value.toString());
				    assert(res.text=='SAVED');
				    resolve();
				});
				
			    });
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		delete_user_info(json.user);
		throw err;
		assert(false);
		done();
	    });
    });
    
    it('testing age change', function (done) {
	delete_user_info(json.user);
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
		//saving supertester with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//changing user info through /viewProfile by POST request
		return new Promise( function (resolve,reject) {
		    var json1 = {user:'DBTESTUSER',
				 key:'AGE',
				 value: 33
				};
		    session
			.post('/viewProfile')
			.send(json1)
			.end(function(err,res) {
			    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
			    dbconnection.query(sql, [json1.user], function (err, result) {
				if (err) throw err;
				assert(result[0].user_exists == 1);
				var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				dbconnection.query(sql2, [json1.user], function (err, result) {
				    if (err) throw err;
				    assert(result[0].USER_NAME === json1.user);
				    assert(result[0].AGE == json1.value);
				    assert(res.text=='SAVED');
				    resolve();
				});
				
			    });
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		delete_user_info(json.user);
		throw err;
		assert(false);
		done();
	    });
    });

    it('testing sex change', function (done) {
	delete_user_info(json.user);
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
		//saving supertester with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//changing user info through /viewProfile by POST request
		return new Promise( function (resolve,reject) {
		    var json1 = {user:'DBTESTUSER',
				 key:'SEX',
				 value:'M'
				};
		    session
			.post('/viewProfile')
			.send(json1)
			.end(function(err,res) {
			    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
			    dbconnection.query(sql, [json1.user], function (err, result) {
				if (err) throw err;
				assert(result[0].user_exists == 1);
				var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				dbconnection.query(sql2, [json1.user], function (err, result) {
				    if (err) throw err;
				    assert(result[0].USER_NAME === json1.user);
				    assert(result[0].SEX === json1.value);
				    assert(res.text=='SAVED');
				    resolve();
				});
				
			    });
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		delete_user_info(json.user);
		throw err;
		assert(false);
		done();
	    });
    });
    
    it('testing income change', function (done) {
	delete_user_info(json.user);
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
		//saving supertester with session
		session = loginSession;
		return;
	    })
	    .then ( () => {
		//changing user info through /viewProfile by POST request
		return new Promise( function (resolve,reject) {
		    var json1 = {user:'DBTESTUSER',
				 key:'INCOME',
				 value:2224
				};
		    session
			.post('/viewProfile')
			.send(json1)
			.end(function(err,res) {
			    var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
			    dbconnection.query(sql, [json1.user], function (err, result) {
				if (err) throw err;
				assert(result[0].user_exists == 1);
				var sql2 = "SELECT * FROM profile WHERE (USER_NAME = ?)";
				dbconnection.query(sql2, [json1.user], function (err, result) {
				    if (err) throw err;
				    assert(result[0].USER_NAME === json1.user);
				    assert(result[0].INCOME == json1.value);
				    assert(res.text=='SAVED');
				    resolve();
				});
				
			    });
			})
		})
	    })
	    .then ( () => {
		return logoutUser(session);
	    })
	    .then( result => {
		assert(result == "SUCCESS_LOGOUT");
		delete_user_info(json.user);
		done();
	    })
	    .catch( err => {
		delete_user_info(json.user);
		throw err;
		assert(false);
		done();
	    });
	}); 
	
	
	it('testing successful password change', function (done) {  
        var json1 = {user:'MY_DBTESTUSER',
        password:'bbb',
        };
        delete_user_info (json1.user)
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(json1.password,salt);

        var sql = "INSERT INTO user (USER_NAME,PASSWORD,SALT) VALUES (?,?,?)";
        dbconnection.query(sql, [json1.user,hash,salt], function (err, result) {
        if (err) {
            console.log(err);
            callback("ERR_CREATING_DUMMY_USER");
         } else {
            var json2 = {user:json1.user,
                key: 'PASSWORD',
                old_password:'bbb',
                new_password: 'aaa'
                };
            request.post('http://localhost:3000/viewProfile', {json:json2}, function (err, res, body){
                var sql = "SELECT * FROM user WHERE USER_NAME = ?";
                dbconnection.query(sql, [json2.user], function (err, result) {
                if (err) throw err;
                    var hash = bcrypt.hashSync(json2.new_password,result[0].SALT);
                    assert(hash=== result[0].PASSWORD);
                    assert(res.body=='SUCCESS');
                    done();
                    });
                });
            }
            
        });
    });

    it('testing unsuccessful password change', function (done) {    
        var json1 = {user:'MY_DBTESTUSER',
        password:'bbb',
        };
        delete_user_info (json1.user)
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(json1.password,salt);

        var sql = "INSERT INTO user (USER_NAME,PASSWORD,SALT) VALUES (?,?,?)";
        dbconnection.query(sql, [json1.user,hash,salt], function (err, result) {
        if (err) {
            console.log(err);
            callback("ERR_CREATING_DUMMY_USER");
         } else {
            var json2 = {user:json1.user,
                key: 'PASSWORD',
                old_password:'incorrect_password',
                new_password: 'aaa'
                };
            request.post('http://localhost:3000/viewProfile', {json:json2}, function (err, res, body){
                    assert(res.body=='INVALID_OLD_PASSWORD');
                    done();     
                });
            }
            
        });
    });

});