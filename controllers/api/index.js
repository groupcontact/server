var express = require("express");
var router = express.Router();

var v1 = require("./v1");
router.use("/v1", v1);

var v2 = require("./v2");
router.use("/v2", v2);

module.exports = router;
