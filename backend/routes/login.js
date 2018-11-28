var dbconnection = require('../dbConnection');
var bcrypt = require('bcrypt')
var express = require('express');
var router = express.Router();



async function check_for_user (user_name,callback) {
    let promises = [];
    promises[0] = new Promise(function (resolve,reject) {
	var sql = "SELECT count(*) AS user_exists FROM profile WHERE (USER_NAME = ?)";
	dbconnection.query(sql, [user_name], function (err, result) {
	    //console.log("user exits: " + result[0].user_exists);
	    if (err) {
		console.log(err);
		callback("ERR_DB_CHECK_PROFILE");
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
		console.log(err);
		callback("ERR_DB_CHECK_USER");
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

async function check_password(user_name,password,callback) {
    var check_user_promise = new Promise(function (resolve,reject) {
	check_for_user(user_name, function (result) {
	    if (result === "USER_EXISTS") {
		resolve("USER_EXISTS");
	    } else if (result === "NO_USER") {
		callback("FAILED");
	    } else {
		console.log(result);
		callback(result);
	    }
	});
    });
    await check_user_promise;

    var sql = "SELECT * FROM user WHERE USER_NAME = ?";
    dbconnection.query(sql,[user_name], function (err, result) {
	if (err) {
	    console.log(err);
	    callback("ERR_DB_USER_GET");
	} else {
	    var hash = bcrypt.hashSync(password,result[0].SALT);
	    if (hash === result[0].PASSWORD) {
		callback("SUCCESS");
	    } else {
		callback("FAILED");
	    }
	}
    });
}

router.post('/', function (req,res) {
    var user_name = req.body.username;
    var password = req.body.password;

    check_password(user_name,password, function (result) {
	if (result == "SUCCESS") {
		req.session.user = user_name;
		console.log (user_name)
	    res.end(result);
	} else {
	    res.end("FAILED");
	}
    });
});


router.check_password = check_password;
router.check_for_user = check_for_user;
module.exports = router;
