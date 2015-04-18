var express = require("express");
var router = express.Router();
var user = require.main.require("./models").user;
var crypto = require("crypto");

// 通用的回调函数
function GeneralCallback(res, successFunc, failFunc) {
    this.res = res;
    this.failFunc = failFunc;
    this.successFunc = successFunc;

    this.callback = function(result) {
        if (result === user.ERROR) {
            res.json({status: -1, info: "请稍后重试"});
        } else if (result === user.FAILURE) {
            if (typeof(failFunc) === "string") {
                res.json({status: 0, info: failFunc});
            } else {
                failFunc();
            }
        } else {
            if (successFunc) {
                successFunc(result);
            } else {
                res.json({status: 1});
            }
        }
    };
}

// 朋友列表
router.get("/:id/friends", function(req, res) {

});

// 添加朋友
router.post("/:id/friends", function(req, res) {

});

// 删除朋友
router.delete("/:id/friends", function(req, res) {

});

// 群组列表
router.get("/:id/groups", function(req, res) {

});

// 加入群组
router.post("/:id/groups", function(req, res) {

});

// 退出群组
router.delete("/:id/groups", function(req, res) {

});

// 用户信息
router.get("/:id", function(req, res) {
    var uid = req.param("id");
    var name = req.query.name;
});

// 更新用户信息
router.put("/:id", function(req, res) {
    var uid = req.params.id;
    var phone = req.body.phone;
    var name = req.body.name;
    var ext = req.body.ext;
    var password = req.body.password;

    // 实际调用更新操作
    var update = function() {
        user.update(uid, name, phone, ext, new GeneralCallback(res, null,
            "设置用户信息失败").callback);
    };

    // 权限验证
    user.auth(uid, password, new GeneralCallback(res, function(rows) {
        update();
    }, "无权限").callback);
});

// 添加用户
router.post("/", function(req, res) {
    var phone = req.body.phone;
    var password = req.body.password;

    user.exist(phone, new GeneralCallback(res, function(rows) {
            var shasum = crypto.createHash('sha1');
            shasum.update(password);
            if (shasum.digest("hex") === rows[0].password) {
                res.json({status: 2, id: rows[0].id});
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
