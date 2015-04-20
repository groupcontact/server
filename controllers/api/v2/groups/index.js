var express = require("express");
var router = express.Router();
var group = require.main.require("./models").group;
var cb = require.main.require("./lib/cb");
var config = require.main.require("./lib/config");

var GeneralCallback = cb.GeneralCallback;
var ListResultCallback = cb.ListResultCallback;

router.get("/:id", function(req, res) {

});

router.get("/:id/members", function(req, res) {
    var id = req.params.id;
    var key = req.query.key;

    if (key === undefined) {
        key = config.DEFAULT_KEY;
    }

    group.member.list(id, new ListResultCallback(res, key).callback);
});

module.exports = router;
