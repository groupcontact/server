var express = require("express");
var router = express.Router();
var user = require.main.require("./models").user;

function GeneralCallback(res, successFunc, failFunc) {
    this.res = res;
    this.failFunc = failFunc;
    this.successFunc = successFunc;

    this.callback = function(result) {
        if (result === user.ERROR) {
            this.res.json({status: -1, info: "请稍后重试"});
        } else if (result === user.FAILURE) {
            if (typeof(failFunc) === "string") {
                this.res.json({status: 0, info: this.failFunc});
            } else {
                this.failFunc();
            }
        } else {
            this.successFunc(result);
        }
    };
}

// 添加用户
router.post("/", function(req, res) {
    var phone = req.body.phone;
    var password = req.body.password;

    user.exist(phone, password, new GeneralCallback(res, function(rows) {
            res.json({status: 1, id: rows[0].id});
        }, function() {
            user.create(phone, password, new GeneralCallback(res, function(result) {
                    res.json({status: 1: id: result.insertId});
                }, "创建用户失败").callback);
        }).callback);
});

module.exports = router;
