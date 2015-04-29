var express = require("express");
var router = express.Router();

var users = require("./users");
var groups = require("./groups");
var test = require("./test");

router.use("/users", users);
router.use("/groups", groups);
router.use("/test", test);

router.all("/*", function(req, res, next) {
    // if not secure
    if (!req.secure) {
        res.json({ status: -1, info: "请使用Https协议访问API" });
        return;
    }
    next();
});

module.exports = router;
