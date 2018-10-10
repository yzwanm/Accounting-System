var express = require('express');
var router = express.Router();
var dbconnection = require('../dbConnection');

router.get('/',function (req,res) {
    var user_name = req.body.user;
    dbconnection.query("select USER_NAME,FIRST_NAME,LAST_NAME,BIRTH_DAY, AGE, SEX, INCOME from profile", function (err, rows) {
        if(err){
            res.render("profile",{title:" ",datas:[]});
        }else {
            res.render("profile",{title:" ",datas:rows});
        }
    });
});
router.post('/', (req,res) => {

});

module.exports = router;