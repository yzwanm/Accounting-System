var mysql = require('mysql');

var dbconnection = mysql.createConnection({
    host: "localhost",
    user: "cs561group",
    password: "Ih34RTAcc0unt1ng",
    database: "app"
});

dbconnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})

module.exports = dbconnection;
