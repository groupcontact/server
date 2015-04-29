var express = require("express");
var router = express.Router();

router.all("/*", function(req, res, next) {
    // if not secure
    if (req.secure) {
        next();
    } else {
        res.json({ status: -1, info: "请使用https协议访问API" });
    }
});

var users = require("./users");
var groups = require("./groups");
var test = require("./test");

router.use("/users", users);
router.use("/groups", groups);
router.use("/test", test);

module.exports = router;
