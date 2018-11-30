var express = require('express');
var dbconnection = require('../dbConnection');
var addRecord = require('./addRecord');
var viewByDate = require('./viewByDate');
var router = express.Router();

function check_date_format(date) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (date == 'all') {
	return true;
    } else if (date.match(regEx)) {
	return true;
    }
    return false;
}

function get_category_mappings(callback) {
    var sql = "select * from category";
    dbconnection.query(sql, function (error, results) {
	if (error) {
	    console.log(error);
	    throw error;
	}
	var categoryMappings = {};
	for (var i = 0; i < results.length; i++) {
	    categoryMappings[results[i].CATEGORY_ID] = {
		category: results[i].CATEGORY,
		parentId: results[i].PARENT_ID
	    };
	};
	categoryMappings[0] = {};
	categoryMappings[0]['category'] = 'all';
	categoryMappings[0]['parentId'] = 0;
	for (var k in categoryMappings) {
	    categoryMappings[k]['parentCategory'] = categoryMappings[categoryMappings[k]['parentId']]['category'];
	}
	callback(categoryMappings);
    });
}

function get_date_range(user_name,startDate,endDate,callback) {
    var newStart;
    var newEnd;
    new Promise(function (resolve,reject) {
	//changing startdate to first date in database if it is set to all
	if (startDate == "all") {
	    var sql = "select Date_format(DATE, '%Y-%m-%d') as FDATE from record where (USER_NAME) = (?) ORDER BY DATE ASC LIMIT 1";
	    dbconnection.query(sql, [user_name], function (error, results) {
		if (error) {
		    console.log(error);
		    throw error;
		}
		if (results[0]) {
		    //console.log(results[0].FDATE);
		    newStart = results[0].FDATE;
		} else {
		    currDate = new Date(new Date().toISOString().slice(0,10));
		    newStart = new Date(currDate.setDate(currDate.getDate() - 6)).toISOString().slice(0,10);
		}
		resolve();
	    });
	} else {
	    newStart = startDate;
	    resolve();
	}
    }).then( () => {
	//changing endDate to todays date
	return new Promise(function (resolve,reject) {
	    if (endDate == "all") {
		newEnd = new Date().toISOString().slice(0,10);
		resolve();
	    } else {
		newEnd = endDate;
		resolve();
	    }
	});
    }).then( () => {
	callback(newStart,newEnd);
    }).catch( err => {
	throw err;
    });
}

function get_daily_totals(user_name,startDate,endDate,callback) {
    var newStart;
    var newEnd;
    var cMap;
    var dMap;
    var chartData = [];
    new Promise(function (resolve,reject) {
	    get_category_mappings( function (result) {
		//console.log(result);
		resolve(JSON.parse(JSON.stringify(result)));
	    });
    }).then ( categoryMappings => {
	cMap = categoryMappings;
	new Promise(function (resolve,reject) {
	    get_date_range(user_name,startDate,endDate, function (start,end) {
		newStart = start;
		newEnd = end;
		if (new Date(newEnd) < new Date(newStart)) {
		    callback({error: "DATES_MIXED_UP"});
		}
		dMap = {};
		for (var i = 0, dt = new Date(newStart); dt <= new Date(newEnd); i++, dt.setDate(dt.getDate() + 1)){
		    dMap[dt.toISOString().slice(0,10)] = i;  //needed to get to position of array later 
		    chartData[i] = {};
		    chartData[i]['income'] = {}
		    chartData[i]['cost'] = {}
		    chartData[i]['date'] = dt.toISOString().slice(0,10);
		    chartData[i]['total'] = 0;
		    chartData[i]['income']['total'] = 0;
		    chartData[i]['cost']['total'] = 0;
		    for (var k in categoryMappings) {
			if (cMap[k]['parentCategory'] != 'all') {
			    var parentCategory = cMap[k]['parentCategory'];
			    var category = cMap[k]['category'];
			    chartData[i][parentCategory][category] = 0;
			}
		    }
		}
		//console.log(chartData);
		resolve();
	    });
	});
    }).then( () => {
	return new Promise( function (resolve,reject) {
	    viewByDate.get_transactions(user_name,'all','all',startDate,endDate,function (result) {
		if (result.error) {
		    reject(result);
		}
		resolve(result);
	    });
	});
    }).then( result => {
	for (i = 0; i < result.length; i++) {
	    var date = result[i].FDATE;
	    var money = parseFloat(result[i].MONEY);
	    var category = cMap[result[i].CATEGORY_ID]['category'];
	    var type = cMap[result[i].CATEGORY_ID]['parentCategory'];
	    var j = dMap[date];
	    chartData[j]['total'] += money;
	    if (type == 'cost') {
		//cost is recored as a negative value but we'll return it as positive here
		chartData[j][type]['total'] -= money;
		chartData[j][type][category] -= money;
	    } else {
		chartData[j][type]['total'] += money;
		chartData[j][type][category] += money;
	    }
	}
	//console.log(chartData);
	callback(chartData);
    }).catch( err => {
	throw err;
    });
}

/* handle GET Request for daily totals between 6 days prior to endDate and endDate. */
router.get('/:endDate', function(req, res) {
    var user_name = req.session.user;
    var endDate = req.params.endDate;
    if (!(check_date_format(req.params.endDate))) {
	res.send({error: "BAD_DATE_FORMAT"});
    } else if (req.session && req.session.user) {
	var date = new Date(new Date(endDate).toISOString().slice(0,10));
	var startDate = new Date(date.setDate(date.getDate() - 6)).toISOString().slice(0,10);
	get_daily_totals(user_name,startDate,endDate, function(result) {
	    //var dailyExpenditures = [];
	    var dailyExpenditures = {};
	    for (var i = 0 ; i < result.length; i++) {
		//dailyExpenditures[i] = {};
		//dailyExpenditures[i]['date'] = result[i]['date'];
		//dailyExpenditures[i]['total'] = result[i]['cost']['total'];
		dailyExpenditures[result[i]['date']] = result[i]['cost']['total'];
	    }
            res.send(dailyExpenditures);
	});
    } else {
	res.send(JSON.parse(JSON.stringify({error: "NOT_LOGGED_IN"})));
    }
});


/* handle GET Request for daily totals between startDate and endDate. */
router.get('/:startDate/:endDate', function(req, res) {
    if (!(check_date_format(req.params.startDate)) || !(check_date_format(req.params.endDate))) {
	res.send(JSON.parse(JSON.stringify({error: "BAD_DATE_FORMAT"})));
    } else if (req.session && req.session.user) {
    	var user_name = req.session.user;
	var startDate = req.params.startDate;
	var endDate = req.params.endDate;	
	get_daily_totals(user_name,startDate,endDate,function(result){
	    //var dailyExpenditures = [];
	    var dailyExpenditures = {};
	    for (var i = 0 ; i < result.length; i++) {
		//dailyExpenditures[i] = {};
		//dailyExpenditures[i]['date'] = result[i]['date'];
		//dailyExpenditures[i]['total'] = result[i]['cost']['total'];
		dailyExpenditures[result[i]['date']] = result[i]['cost']['total'];
	    }
            res.send(dailyExpenditures);
	});
    } else {
	res.send(JSON.parse(JSON.stringify({error: "NOT_LOGGED_IN"})));
    }
});

router.check_date_format = check_date_format;
router.get_date_range = get_date_range;
router.get_daily_totals = get_daily_totals;
module.exports = router;
