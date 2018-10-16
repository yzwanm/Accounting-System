var express = require('express');
var router = express.Router();
var dbconnection = require('../dbConnection');

// router.get('/',function (req,res) {
//     var user_name = req.body.user;
//     dbconnection.query("select USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME from profile", function (err, rows) {
//         if(err){
//             res.render("profile",{title:" ",datas:[]});
//         }else {
//             res.render("profile",{title:" ",datas:rows});
//         }
//     });
// // });
// router.get('/', function (req, res, next) {
//     res.render('viewProfile', {title:'viewProfile'});
// });
// router.post('/viewProfile', function (req, res, next) {
//     var user_name = "BobSmith";
//     var sql1 = "select USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME from profile where USER_NAME= ?";
//     var sql2 = "select USER_NAME, PASSWORD from users where USER_NAME= ?";
//     var str= "xxx ";
//     dbconnection.query(sql1, [user_name], function (err, result) {
//         if(err){
//             throw err;
//         }else {
//             var first_name = result[0].FIRST_NAME;
//             var last_name = result[0].LAST_NAME;
//             var birth_day = result[0].BIRTH_DAY;
//             var sex = result[0].SEX;
//             var income = result[0].INCOME
//             str = JSON.stringify(result);
//             res.send('viewProfile', {firstname: first_name});
//         }
//     });
// })

var user_name = "BobSmith";
var sql1 = "select USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME from profile where USER_NAME= ?";
var sql2 = "select USER_NAME, PASSWORD from users where USER_NAME= ?";
var str= "xxx ";

router.get('/', function (req, res) {
    res.render('viewProfile');
    dbconnection.query(sql1, [user_name], function (err, result) {
        if(err){
            throw err;
        }else {
            var first_name = result[0].FIRST_NAME;
            var last_name = result[0].LAST_NAME;
            var birth_day = result[0].BIRTH_DAY;
            var sex = result[0].SEX;
            var income = result[0].INCOME
            str = JSON.stringify(result);
            res.end(str);
        }
    });
});
// router.get('/', function (req, res) {
//     res.render('viewProfile');
// });
// router.post('/javascript/viewProfilefroentend', {firstname: first_name, lastname: last_name, birthday: birth_day, sex: sex, income: income});
// router.get('/viewProfile', function (req, res) {
//     res.send(str);
// });
module.exports = router;