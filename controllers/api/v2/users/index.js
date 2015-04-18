var express = require("express");
var router = express.Router();
var user = require.main.require("./models").user;
var crypto = require("crypto");

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
            var shasum = crypto.createHash('sha1');
            shasum.update(password);
            if (shasum.digest("hex") === rows[0].password) {
                res.json({status: 1, id: rows[0].id});
            } else {
                res.json({status: -1, info: "密码错误"});
            }
        }, function() {
            user.create(phone, password, new GeneralCallback(res, function(result) {
                    res.json({status: 1, id: result.insertId});
                }, "创建用户失败").callback);
        }).callback);
});

module.exports = router;
