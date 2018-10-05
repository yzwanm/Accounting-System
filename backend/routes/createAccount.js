var express = require('express');
var router = express.Router();


router.post('/', (req,res) => {
    var user_name = req.body.user;
    var password = req.body.password;
    res.end("done")
});

module.exports = router;
