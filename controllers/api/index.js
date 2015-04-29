var express = require("express");
var router = express.Router();

var v1 = require("./v1");
router.use("/v1", v1);

var v2 = require("./v2");
router.use("/v2", v2);

var v3 = require("./v3");
router.use("/v3", v3);

module.exports = router;
