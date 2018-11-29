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

router.post('/', upload.single('picture'), (req,res) => {
    if (req.session && req.session.user) {
	var user_name = req.session.user;
	var file = req.file;
	console.log("AAAAUSER: " + user_name);
	console.log("file: " + file);
	add_photo(user_name,file,function(result) {
	    console.log("RESULT " + result);
		res.send(result);
	});
    } else {
	res.send("NOT_LOGGED_IN");
    }
});

module.exports = router;
