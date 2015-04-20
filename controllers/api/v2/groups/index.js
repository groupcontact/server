var express = require("express");
var router = express.Router();
var group = require.main.require("./models").group;
var cb = require.main.require("./lib/cb");
var config = require.main.require("./lib/config");

var GeneralCallback = cb.GeneralCallback;
var ListResultCallback = cb.ListResultCallback;

// 搜索群组
router.get("/", function(req, res) {
    var name = req.query.name;
    var key = req.query.key;

    if (key === undefined) {
        key = config.DEFAULT_KEY;
    }

    group.query(name, new ListResultCallback(res, key).callback);
});

router.get("/:id", function(req, res) {

});

// 列举群组内的成员
router.get("/:id/members", function(req, res) {
    var id = req.params.id;
    var key = req.query.key;

    if (key === undefined) {
        key = config.DEFAULT_KEY;
    }

    group.member.list(id, new ListResultCallback(res, key).callback);
});

module.exports = router;
