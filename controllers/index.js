var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
    res.render('index', {title: "群通讯录"});
});

module.exports = router;
