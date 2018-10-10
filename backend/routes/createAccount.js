var dbconnection = require('../dbConnection');
var bcrypt = require('bcrypt')
var express = require('express');
var router = express.Router();

async function insert_user_info (first_name,last_name,dob,age,sex,income,user_name,hash,salt,callback) {
    let promises = [];
    if (dob === "") {
	dob = null;
    }

    promises[0] = new Promise(function (resolve,reject) {
	var sql = "INSERT INTO profile(USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME) VALUES (?,?,?,?,?,?,?)";
	dbconnection.query(sql, [user_name,first_name,last_name,dob,age,sex,income], function (err, result) {
	    if (err) {
		throw err;
		reject("ERR_DB_PROFILE_INSERT");
	    } else {
		//console.log("added USER_NAME "+user_name+" to profile");
		resolve("SUCCESS");
	    }
	});
    });

    promises[1] = new Promise(function (resolve,reject) {
	var sql = "INSERT INTO user(USER_NAME,PASSWORD,SALT) VALUES (?,?,?)";
	dbconnection.query(sql, [user_name,hash,salt], function (err, result) {
	    if (err) {
		throw err;
		reject("ERR_DB_USER_INSERT");
	    } else {
		//console.log("added USER_NAME "+user_name+" to users");
		resolve("SUCCESS");
	    }
	});
    });

    var promise_returns = await Promise.all(promises);
    if (promise_returns[0] === "ERR_DB_PROFILE_INSERT") {
	callback("ERR_DB_PROFILE_INSERT");
    } else if (promise_returns[1] === "ERR_DB_USER_INSERT") {
	callback("ERR_DB_USER_INSERT");
    } else {
	callback("SUCCESS");
    }
}

async function check_for_user (user_name,callback) {
    let promises = [];
    promises[0] = new Promise(function (resolve,reject) {
	var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	dbconnection.query(sql, [user_name], function (err, result) {
	    //console.log("user exits: " + result[0].user_exists);
	    if (err) {
		throw err;
		reject("ERR_DB_CHECK_PROFILE");
	    } else if (result[0].user_exists == 1) {
		resolve("USER_EXISTS");
	    } else {
		resolve("NO_USER");
	    }
	});
    });
    
    promises[1] = new Promise(function (resolve,reject) {
	var sql = "SELECT count(*) AS user_exists FROM user WHERE (USER_NAME = ?)";
	dbconnection.query(sql, [user_name], function (err, result) {
	    //console.log("user exits: " + result[0].user_exists);
	    if (err) {
		throw err;
		reject("ERR_DB_CHECK_PROFILE");
	    } else if (result[0].user_exists == 1) {
		resolve("USER_EXISTS");
	    } else {
		resolve("NO_USER");
	    }
	});
    });
    var promise_returns = await Promise.all(promises);
    if (promise_returns[0] === "USER_EXISTS" || promise_returns[1] === "USER_EXISTS") {
	callback("USER_EXISTS");
    } else {
	callback("NO_USER");
    }
}

async function add_user(first_name,last_name,dob,age,sex,income,user_name,hash,salt,callback) {
    var promise = new Promise(function (resolve,reject) {
	check_for_user(user_name,(result) => {
	    resolve(result);
	});
    });
    var user_status = await promise;
    if (user_status === "NO_USER") {
	insert_user_info(first_name,last_name,dob,age,sex,income,user_name,hash,salt, function (result) {
	    callback(result);
	});
    } else {
	callback("ERR_USER_EXISTS");
    }
}

router.post('/', (req,res) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var age = req.body.age;
    var sex = req.body.sex;
    var income = req.body.income;
    var dob;
    if (req.body.dob === '' || req.body.dob == null) {
	dob = null
    } else {
	dob = new Date(req.body.dob);
    }
    var user_name = req.body.user;
    var password = req.body.password;
    //console.log("First Name = " + first_name);
    //console.log("Last Name = " + last_name);
    //console.log("Age = " + age);
    //console.log("Sex = " + sex);
    //console.log("Date = " + dob);
    //console.log("income = " + income);
    //console.log("username:" + user_name);
    //console.log("password:" + password);    

    if (user_name === "" || user_name == null) {
	res.end("ERR_NO_USER");
    } else if (password === "" || password == null) {
	res.end("ERR_NO_PASS");
    } else if (first_name === "" || first_name == null) {
	res.end("ERR_NO_FNAME");
    } else {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password,salt);
	add_user(first_name,last_name,dob,age,sex,income,user_name,hash,salt, function (result) {
	    res.end(result);
	});
    }
});

router.insert_user_info = insert_user_info;
router.check_for_user = check_for_user;
router.add_user = add_user;
module.exports = router;
