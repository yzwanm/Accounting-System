var dbconnection = require('./dbConnection');

var table_name1 = "profile";
var sql1 = "CREATE TABLE profile (USER_NAME VARCHAR(20) NOT NULL UNIQUE, FIRST_NAME VARCHAR(20) NOT NULL, LAST_NAME VARCHAR(20),AGE INT, BIRTH_DAY DATE, SEX VARCHAR(20), INCOME FLOAT)";
var table_name2 = "user";
var sql2 = "CREATE TABLE user (USER_NAME VARCHAR(20) NOT NULL UNIQUE, PASSWORD CHAR(60), SALT CHAR(29))";


function replace_table(table_name,sql) {
    return new Promise(function(resolve,reject) {
	//checking if table exists
	var sql_test = "SELECT count(*) AS table_exists FROM information_schema.TABLES WHERE (TABLE_SCHEMA = 'app') AND (TABLE_NAME = '"+table_name+"')";  //checks if table exists
	dbconnection.query(sql_test, function (err, result) {
	    if (err) throw err;
	    table_exists = result[0].table_exists;
	    if (table_exists) {
		console.log(table_name + " exists")
		//dropping table if it already exists
		var sql_drop = "DROP TABLE " + table_name;
		dbconnection.query(sql_drop, function(err,result) {
		    if (err) throw err;
		    console.log("dropped " + table_name);
		    //adding table back to database
		    dbconnection.query(sql,function(err,result) {
			if (err) throw err;
			console.log("added " + table_name);
			resolve();
		    });	    
		});
	    } else {
		//adding table to database
		dbconnection.query(sql,function(err,result) {
		    if (err) throw err;
		    console.log("added " + table_name);
		    resolve();
		});
	    }
	});
    });
}

async function replace_all_tables() {
    let promises = []; 
    promises[0] = replace_table(table_name1,sql1);
    promises[1] = replace_table(table_name2,sql2);
    await Promise.all(promises);
    dbconnection.end();
}

replace_all_tables();

