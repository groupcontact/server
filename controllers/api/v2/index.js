var express = require("express");
var router = express.Router();

var users = require("./users");
var test = require("./test");

router.use("/users", users);
router.use("/test", test);

router.get("/", function(req, res) {
    res.render('api/v2/index', {title: "群通讯录 - API文档(v2)"});
});

module.exports = router;
