var dbconnection = require('../dbConnection');
var bcrypt = require('bcrypt')
var express = require('express');
var router = express.Router();

function getCategoryId(category) {
    var sql = "SELECT * FROM category WHERE PARENT_ID = 0 and category=?";
    return new Promise( function (resolve,reject) {
	dbconnection.query(sql,[category],function(err,result) {
	    if (err) {
		console.log(err);
		reject("ERR_DB_GET_CATEGORY_TYPE")
	    } else if (result.length == 0) {
		reject("ERR_DB_BAD_CATEGORY_TYPE");
	    } else {
		resolve(result[0].CATEGORY_ID);
	    }
	});
    });
}

function getCategoryInfo (category,parentId) {
    var sql = "SELECT * FROM category WHERE PARENT_ID = ? and category = ?";
    return new Promise( function (resolve,reject) {
	dbconnection.query(sql,[parentId,category],function(err,result) {
	    if (err) {
		console.log(err);
		reject("ERR_DB_GET_CATEGORY")
	    } else if (result.length == 0) {
		reject("ERR_DB_BAD_CATEGORY");
	    } else {
		resolve(result[0]);
	    }
	});
    });
}

function addRecord(user_name,category,categoryId,parentId,comment,money,date) {
    var sql = "INSERT INTO record(USER_NAME,CATEGORY_ID,CATEGORY,PARENT_ID,COMMENT,MONEY,DATE) VALUES (?,?,?,?,?,?,?)";
    console.log(sql);
    return new Promise( function (resolve,reject) {
	dbconnection.query(sql,[user_name,categoryId,category,parentId,comment,money,date],function(err) {
	    if (err) {
		console.log(err);
		reject("ERR_DB_INSERT_RECORD")
	    } else {
		resolve("SUCCESS");
	    }
	});
    });
}

function addExpenditure(user_name,money,category,date) {
    var sql = "INSERT INTO expenses(USER_NAME, EXPENSES, CATEGORY, DATE) VALUES (?,?,?,?)";
    console.log(sql);
    return new Promise( function (resolve,reject) {
	dbconnection.query(sql,[user_name,money,category,date],function(err) {
	    if (err) {
		//console.log(err);
		reject("ERR_DB_INSERT_EXPENDITURE");
	    } else {
		resolve("SUCCESS");
	    }
	});
    });
}

router.post('/', function (req,res) {
	console.log(req.body.date);
    var type = req.body.type; //can be "income" or "cost"
	console.log(type);
    var category = req.body.category;
    console.log(category);
    var date;
    if (req.body.date === '' || req.body.date == null) {
	date = null
    } else {
	date = new Date(req.body.date);
    }
    var money = req.body.money;
    var comment = req.body.comment;
    if (!(req.session && req.session.user)) {
	//user not logged in
	res.end("NOT_LOGGED_IN");
    } else if (!(req.body.category) || req.body.category == '') {
	res.end("NO_CATEGORY");
    } else if (!(req.body.type) || req.body.type == '') {
	res.end("NO_TYPE");
    } else if (!(date)) {
	res.end("NO_DATE");
    } else {
	var user_name = req.session.user;  //get username from session
	getCategoryId(type)
  	    .then( parentId => {
		//the id of type is the parentId of category
		return getCategoryInfo(category,parentId);
	    })
	    .then( categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
		parentId = categoryInfo.PARENT_ID;
		return addRecord(user_name,category,categoryId,parentId,comment,money,date);
	    })
	    .then( status => {
		if (status == "SUCCESS" && type == "cost") {
		    addExpenditure(user_name,money,category,date)
			.then( status => {
			    res.send(status);
			})
			.catch( err => {
			    res.end(err);
			});
		} else {
		    res.end(status);
		}
	    })
	    .catch(err => {
		res.end(err);
	    });
    }
});


router.getCategoryId = getCategoryId;
router.getCategoryInfo = getCategoryInfo;
router.addRecord = addRecord;
router.addExpenditure = addExpenditure;
module.exports = router;
