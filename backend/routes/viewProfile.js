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
// });
router.post('/viewProfileExample.html', function (req,res) {
    var user_name = "BobSmith";
    var sql1 = "select USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME from profile where USER_NAME= ?";
    var sql2 = "select USER_NAME, PASSWORD from users where USER_NAME= ?";
    dbconnection.query(sql1, user_name, function (err, result) {
        if(err){
            throw err;
        }else {
            var first_name = result[0].first_name;
            var last_name = result[0].last_name;
            var birth_day = result[0].birth_day;
            var sex = result[0].sex;
            var income = result[0].income;
            res.render('profile', {datas: row, firstname: first_name, lastname: last_name, birthday: birth_day, sex: sex, income: income});
        }
    });


});

module.exports = router;