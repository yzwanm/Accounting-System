var express = require('express');
var dbconnection = require('../dbConnection');
var addRecord = require('./addRecord');
var router = express.Router();

function get_date_sql (dateStart,dateEnd) {
    var dateArr = [];
    if (dateStart == "all" && dateEnd == "all") {
	return [dateArr, ""];
    } else if (dateEnd == "all") {
	dateArr = [dateStart];
	return [dateArr, " and (DATE(DATE)) >= cast(? as DATE)"];
    } else if (dateStart == "all") {
	dateArr = [dateEnd];
	return [dateArr, " and (DATE(DATE)) <= cast(? as DATE)"];
    } else {
	dateArr = [dateStart,dateEnd];
	return [dateArr, " and (DATE(DATE)) between cast(? as DATE) and cast(? as DATE)"];
    }
}

async function get_transactions(user_name,type,category,dateStart,dateEnd,callback) {
    var dateInfo = get_date_sql(dateStart,dateEnd);
    dateArr = dateInfo[0];
    dateSql = dateInfo[1];
    if (type == "all" && category == "all") {
	new Promise(function (resolve,reject) {
	    var sqlInputs = [user_name].concat(dateArr);
	    var sql1 = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME) = (?)"
		+ dateSql;
            dbconnection.query(sql1, sqlInputs, function (error, results) {
		if (error) {
		    console.log(error);
		    reject("ERR_SELECT_RECORDS");
		}
		jsond = JSON.parse(JSON.stringify(results));
		resolve(jsond);
	    });
	}).then( res => {
	    callback(res);
	}).catch(err => {
	    callback(JSON.parse(JSON.stringify({error: err})));
	});
    } else if (type != "all" && category == "all") {
	addRecord.getCategoryId(type)
	    .then( parentId => {
		return new Promise(function (resolve,reject) {
		    var sqlInputs = [user_name,parentId].concat(dateArr);
		    var sql1 = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID) = (?,?)"
			+ dateSql;
		    dbconnection.query(sql1, sqlInputs, function (error, results) {
			if (error) {
			    console.log(error);
			    reject("ERR_SELECT_RECORDS");
			}
			jsond = JSON.parse(JSON.stringify(results));
			resolve(jsond);
		    });
		});
	    })
	    .then( res => {
		callback(res)
	    })
	    .catch( err => {
		callback(JSON.parse(JSON.stringify({error: err})));
	    });
    } else {
	addRecord.getCategoryId(type)
  	    .then( parentId => {
		//the id of type is the parentId of category
		return addRecord.getCategoryInfo(category,parentId);
	    })
	    .then( categoryInfo => {
		categoryId = categoryInfo.CATEGORY_ID;
		parentId = categoryInfo.PARENT_ID;
		return new Promise(function (resolve,reject) {
		    var sqlInputs = [user_name,parentId,categoryId].concat(dateArr);
		    var sql1 = "select RECORD_ID,USER_NAME,CATEGORY,MONEY,MONEY as EXPENSES,DATE,Date_format(DATE, '%Y-%m-%d') as FDATE, COMMENT from record where (USER_NAME,PARENT_ID,CATEGORY_ID) = (?,?,?)"
			+ dateSql;
		    dbconnection.query(sql1, sqlInputs, function (error, results) {
			if (error) {
			    console.log(error);
			    reject("ERR_SELECT_RECORDS");
			}
			jsond = JSON.parse(JSON.stringify(results));
			resolve(jsond);
		    });
		});		
	    })
	    .then( res => {
		callback(res)
	    })
	    .catch( err => {
		callback(JSON.parse(JSON.stringify({error: err})));
	    });
    }
}

/* GET transactions by category and date. */
router.get('/:type/:category/:date/', function(req, res) {
    if (req.session && req.session.user) {
	var user_name = req.session.user;
	var parent_category = req.params.type;
	var category = req.params.category;
	var date = req.params.date;
	get_transactions(user_name,parent_category,category,date,date,function(result){
            res.send(result);
	});
    } else {
	res.send(JSON.parse(JSON.stringify({error: "NOT_LOGGED_IN"})));
    }
});

router.get_transactions = get_transactions;
module.exports = router;
