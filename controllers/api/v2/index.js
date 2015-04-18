var express = require("express");
var router = express.Router();

var users = require("./users");
var test = require("./test");

router.use("/users", users);
router.use("/test", test);

module.exports = router;
