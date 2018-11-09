var express = require('express');
var dbconnection = require('../dbConnection');
var router = express.Router();

async function get_recent_transactions(user_name,elements,callback) {
    console.log('request received');
    console.log(user_name);
    console.log(elements);
    var sql1 = "select *, Date_format(DATE, '%y-%m-%d') as FDATE from expenses where USER_NAME= ?";
    let promises = [];
    promises[0] = new Promise(function (resolve,reject) {
        dbconnection.query(sql1, [user_name], function (error, results) {
            if (error) {
              console.log("error ocurred", error);
            }
            jsond = JSON.parse(JSON.stringify(results));
            console.log(jsond);

                        //   res.render('Home', {title:'Home', home:jsond});
            resolve(jsond);
          });

    });
    var res = await promises[0];
    callback(res)
}



/* GET recent transactions listing. */
router.get('/', function(req, res) {
    // if(req.session.user){
    var user_name = req.session.user;
    // }
    var elements = req.body.elements;
    get_recent_transactions(user_name,elements,function(result){
        res.send(result);
    });

});

module.exports = router;
