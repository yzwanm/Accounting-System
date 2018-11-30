var dbconnection = require('../dbConnection');
var express = require('express');
var router = express.Router();

function addExpenseCategory(category,icon) {
    var sql='SELECT * FROM category where category=? and icon=? and PARENT_ID=2';
    return new Promise( function (resolve,reject) {
        dbconnection.query(sql, [category,icon], function (err, result) {
            if (err) {
                reject("ERR_DB_GET_CATEGORY");
            } else if (result.length == 0) {
                var sql = 'INSERT INTO category (CATEGORY, PARENT_ID,ICON) VALUES (?,2,?)';
                return new Promise(function (resolve, reject) {
                    dbconnection.query(sql, [category,icon], function (err, result) {
                        if (err) {
                            reject("ERR_DB_INSERT_CATEGORY");
                        } else {
                            resolve("SUCCESS");
                        }
                    });
                });
            } else {
                reject("ERR_CATEGORY_EXIST");
            }
        });
    });
}
function addIncomeCategory(category, icon) {
    var sql='SELECT * FROM category where category=? and icon=? and PARENT_ID=1';
    return new Promise( function (resolve,reject) {
        dbconnection.query(sql, [category,icon], function (err, result) {
            if (err) {
                reject("ERR_DB_GET_CATEGORY");
            } else if (result.length == 0) {
                var sql = 'INSERT INTO category (CATEGORY, PARENT_ID,ICON) VALUES (?,1,?)';
                return new Promise(function (resolve, reject) {
                    dbconnection.query(sql, [category,icon], function (err, result) {
                        if (err) {
                            reject("ERR_DB_INSERT_CATEGORY");
                        } else {
                            resolve("SUCCESS");
                        }
                    });
                });
            } else {
                reject("ERR_CATEGORY_EXIST");
            }
        });
    });
}
function addUserCategory(username,categoryid) {
    var sql = "UPDATE UserCategory SET U_CATEGORYS= CONCAT(U_CATEGORYS,',',?) WHERE USER_NAME=? and locate(?,U_CATEGORYS)=0";
    return new Promise(function (resolve,reject) {
        dbconnection.query(sql, [categoryid,username,categoryid], function (err) {
            console.log(categoryid);
            console.log(sql);
            if (err) {
                reject("ERR_DB_UPDATE_USER_CATEGORY");
            } else {
                resolve("SUCCESS");
            }
        });
    });
}

function getCategoryId() {
    // var sql = "SELECT * FROM category WHERE PARENT_ID = 2 and CATEGORY=?";
    var sql = "SELECT count(*) as COUNT FROM category";
    return new Promise( function (resolve,reject) {
        dbconnection.query(sql,function(err,result) {
            if (err) {
                //console.log(err);
                reject("ERR_DB_GET_CATEGORY_TYPE")
            } else {
                resolve(result[0].COUNT+1);
            }
        });
    });
}

function getUserExpenseCategory(username) {
    var sql = "SELECT CATEGORY,ICON FROM category c WHERE PARENT_ID=2 AND (select FIND_IN_SET(c.CATEGORY_ID,u.U_CATEGORYS) FROM UserCategory u WHERE u.USER_NAME=?)";
    return new Promise(function (resolve,reject) {
        dbconnection.query(sql, [username], function (err,result) {
            if (err) {
                reject("ERR_DB_GET_USER_CATEGORYS");
            } else {
                resolve(result);
            }
        })

    })
}
function getUserIncomeCategory(username) {
    var sql = "SELECT CATEGORY,ICON FROM category c WHERE PARENT_ID=1 AND (select FIND_IN_SET(c.CATEGORY_ID,u.U_CATEGORYS) FROM UserCategory u WHERE u.USER_NAME=?)";
    return new Promise(function (resolve,reject) {
        dbconnection.query(sql, [username], function (err,result) {
            if (err) {
                reject("ERR_DB_GET_USER_CATEGORYS");
            } else {
                resolve(result);
            }
        })

    })

}
router.post('/', function (req,res) {
    var category = req.body.name;
    var icon = req.body.icon;
    var type = req.body.type;
    if (!(req.session && req.session.user)) {
        //user not logged in
        res.end("NOT_LOGGED_IN");
    } else if (!(req.body.name) || req.body.name == '') {
        res.end("NO_CATEGORY");
    } else if (!(req.body.type) || req.body.type == '') {
        res.end("NO_TYPE");
    } else {
        var username = req.session.user;
        if (type == "cost"){
            addExpenseCategory(category,icon);
            // .then( status => {
            //     if (status == "SUCCESS") {
            getCategoryId(category)
                .then( result => {
                    var categoryID = result;
                    console.log(categoryID);
                    return addUserCategory(username,categoryID);
                })
                .then( status => {
                    res.send(status);
                })
                .catch(err => {
                    res.end(err);
                });
            //     } else {
            //         res.end(status);
            //     }
            // })
            // .catch(err => {
            //     res.end(err);
            // });
        } else if (type == "income"){
            addIncomeCategory(category,icon);
            // .then( status => {
            //     if (status == "SUCCESS") {
            getCategoryId(category)
                .then( result => {
                    var categoryID = result;
                    console.log(categoryID);
                    return addUserCategory(username,categoryID);
                })
                .then( status => {
                    res.send(status);
                })
                .catch(err => {
                    res.end(err);
                });
            //     } else {
            //         res.end(status);
            //     }
            // })
            // .catch(err => {
            //     res.end(err);
            // });
        }

    }
});
router.get('/?',function (req,res) {
    if(req.session && req.session.user) {
        this.user_name = req.session.user;
        var url = require('url');
        var params = url.parse(req.url, true).query;
        var type = params.type;
        console.log("-----");
        console.log(type);
        console.log("-----");
        if (type == "cost"){
            getUserExpenseCategory(this.user_name)
                .then(data => {
                    console.log(JSON.stringify(data));
                    res.send(data);
                })
                .catch(err => {
                    res.end(err);
                });
        } else if(type == "income"){
            getUserIncomeCategory(this.user_name)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.end(err);
                })
        }

    }
    else {
        res.end("NOT_LOGGED_IN");
    }
})
router.getCategoryId = getCategoryId;
router.addUserCategory = addUserCategory;
router.addExpenseCategory = addExpenseCategory;
router.getUserExpenseCategory = getUserExpenseCategory;
module.exports = router;
