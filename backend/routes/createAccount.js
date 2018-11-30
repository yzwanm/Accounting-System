var dbconnection = require('../dbConnection');
var fs = require('fs')
var bcrypt = require('bcrypt')
var express = require('express');
var router = express.Router();
var sharp = require('sharp');
var multer = require("multer");
var path = require("path");
var upload = multer({ storage: multer.memoryStorage(), limits: {fileSize: 10 * 1000 * 1000}});

//profile photos will be stored here
var image_path = "public/profileImages/";

async function default_user_category(user_name){
	var sql = "SELECT * FROM UserCategory where USER_NAME = ?";
	return new Promise(function (resolve, reject) {
		dbconnection.query(sql, [user_name], function (err,result) {
			if (err) {
				reject("ERR_DB_GET_USER_CATEGORY");
			} else if (result.length == 0){
				var sql = "INSERT INTO UserCategory(USER_NAME,U_CATEGORYS) VALUES (?,'3,4,5,6,7,8,9,10,11,12,13,14')";
					dbconnection.query(sql, [user_name], function (err) {
                        if (err) {
                            reject("ERR_DB_INSERT_USER_CATEGORY");
                        } else {
                            resolve("SUCCESS");
                        }
                    })
			}
				else {
					reject("ERR_USER_CATEGORY_EXISTS");
				}
		})
    })
}
async function insert_user_info (first_name,last_name,dob,age,sex,income,user_name,hash,salt,callback) {
    let promises = [];
    if (dob === "") {
	dob = null;
    }

    promises[0] = new Promise(function (resolve,reject) {
	var sql = "INSERT INTO profile(USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME) VALUES (?,?,?,?,?,?,?)";
	dbconnection.query(sql, [user_name,first_name,last_name,dob,age,sex,income], function (err, result) {
	    if (err) {
		console.log(err);
		//throw err
		callback("ERR_DB_PROFILE_INSERT");
		//callback("ERR_DB_PROFILE_INSERT");
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
		console.log(err);
		callback("ERR_DB_USER_INSERT");
		//callback("ERR_DB_USER_INSERT");
	    } else {
		//console.log("added USER_NAME "+user_name+" to users");
		resolve("SUCCESS");
	    }
	});
    });
    await Promise.all(promises);
    callback("SUCCESS");
}

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

function check_mime_type (mimetype) {
    if (mimetype === "image/jpeg" || mimetype === "image/png" || mimetype === "image/gif") {
	return true;
    } else {
	return false;
    }
}

async function add_photo(user_name,file,callback) {
    //console.log("picture name = " + file.originalname);
    //console.log("file data = " + file.size);
    //console.log("file data = " + file.mimetype);
    //console.log("file data = " + file.encoding);
    var image_name = file.originalname;
    var image = file.buffer;
    if (check_mime_type(file.mimetype)) {
	var new_img_name = image_path + user_name + ".jpeg";
	sharp(file.buffer).toFile(new_img_name)
	    .then(callback("SAVED"))
	    .catch(function (err) {
		console.log(err);
		callback("ERR_UPLOAD");
	    });
    } else {
	callback("ERR_FILETYPE");
    }
}

async function add_user(first_name,last_name,dob,age,sex,income,user_name,hash,salt,file,callback) {
    //checking for the user
    var check_user_promise = new Promise(function (resolve,reject) {
	check_for_user(user_name,(result) => {
	    if (result === "NO_USER") {
		resolve(result);
	    } else if (result === "USER_EXISTS") {
		callback("ERR_USER_EXISTS");
	    } else {
		callback(result);
	    }
	});
    });
    await check_user_promise;

    //uploading a photo.
    var upload_promise = new Promise(function (resolve,reject) {
	if (file) {
	    add_photo(user_name,file,function(result) {
		if (result === "SAVED") {
		    resolve(result);
		} else {
		    callback(result);
		}
	    });
	} else {
	    resolve();
	}
    });
    await upload_promise;

    insert_user_info(first_name,last_name,dob,age,sex,income,user_name,hash,salt, function (result) {
	callback(result);
    });
}

router.post('/', upload.single('picture'), (req,res) => {
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
    //console.log(req.body);
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
        default_user_category(user_name);
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password,salt);
        add_user(first_name,last_name,dob,age,sex,income,user_name,hash,salt, req.file,function (result) {
        	res.end(result);
        });
    }
});

router.get('/', (req,res) => {
    res.render('createAccount');
});


router.add_photo = add_photo;
router.check_mime_type = check_mime_type;
router.insert_user_info = insert_user_info;
router.check_for_user = check_for_user;
router.add_user = add_user;
module.exports = router;
