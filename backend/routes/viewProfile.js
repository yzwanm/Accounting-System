var express = require('express');
var router = express.Router();
var dbconnection = require('../dbConnection');

var user_name;
async function get_user_profile(user_name,callback){
    var sql1 = "select profile.*, user.PASSWORD from profile,user where profile.USER_NAME= ?";

    let promises = [];
    promises[0] = new Promise(function (resolve,reject){
        dbconnection.query(sql1,[user_name],function(error,result){
            if (error){
                console.log("error message:",error);
            }
            jsond = JSON.stringify(result);
            resolve(jsond);
        });

    });
    var res = await promises[0];
    callback(res);
}

router.get('/', function (req, res) {
    this.user_name = req.session.user;
    get_user_profile(this.user_name,function (result) {
        res.send(result);
    });

});

router.post('/',function(req,res){

    var key = req.body.key;
    var value = req.body.value;
    var first_name = 'FIRST_NAME';
    var last_name = 'LAST_NAME';
    var age = 'AGE';
    var sex = 'SEX';
    var income = 'INCOME';
    var dob = 'BIRTH_DAY'

    key_list = [first_name,last_name,age,sex,income,dob];
    if(key_list.contains(key)==false)
    {
        console.log('error');
        res.end("ERROR");
    }


    if (key == dob)
    {
        if (value === '' || value == null) {
            value = null
        } else {
            value = new Date(value);
        }
    }
    console.log(this.user_name);
    update_user(key,value,this.user_name,function (result){
        res.end(result)
    });


})

function update_user (key,value,username,callback)
{
    dbconnection.query('SELECT * FROM profile WHERE USER_NAME = ?', [username],function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
        } else {
            if (results.length > 0) {
                sql = 'UPDATE profile SET ' +key +' = ? WHERE USER_NAME = ?';
                dbconnection.query(sql, [value,username], function (error, results, fields) {
                    if (error) {
                        console.log("error", error);
                    }
                    else
                    {
                        callback("SAVED");
                    }
                });
            }
        }
    });
}

Array.prototype.contains = function ( needle ) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}

module.exports = router;
