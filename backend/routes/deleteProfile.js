var dbconnection = require('../dbConnection');
var express = require('express');
var router = express.Router();

async function delete_profile(user_name,callback) {
    let promises = [];
    promises[0] = new Promise(function (resolve,reject) {
	var sql = "DELETE FROM profile WHERE USER_NAME = ?";
	dbconnection.query(sql, [user_name], function (err, result) {
	    if (err) {
		throw err;
		reject(err);
	    }
	    resolve();
	});
    });
    promises[1] = new Promise(function (resolve,reject) {
	var sql = "DELETE FROM user WHERE USER_NAME = ?";
	dbconnection.query(sql, [user_name], function (err, result) {
	    if (err) {
		throw err;
		reject(err);
	    }
	    resolve();
	});
    });
    promises[2] = new Promise(function (resolve,reject) {
	var sql = "DELETE FROM record WHERE USER_NAME = ?";
	dbconnection.query(sql, [user_name], function (err, result) {
	    if (err) {
		throw err;
		reject(err);
	    }
	    resolve();
	});
    });
    promises[3] = new Promise(function (resolve,reject) {
	var sql = "DELETE FROM expenses WHERE USER_NAME = ?";
	dbconnection.query(sql, [user_name], function (err, result) {
	    if (err) {
		throw err;
		reject(err);
	    }
	    resolve();
	});
    });
    await Promise.all(promises);
    callback("SUCCESS");
}

router.get('/', (req,res) => {
    if (req.session && req.session.user) {
	var user_name = req.session.user;
	delete_profile(user_name, function(result) {
	    req.session.destroy( function (err) {
		if (err) {
		    console.log(err);
		    res.end("FAILED");
		}
		res.send(result);
	    });
	});
    } else {
	res.send("NOT_LOGGED_IN");
    }
});

module.exports = router;
