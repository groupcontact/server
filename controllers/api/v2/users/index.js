var express = require("express");
var router = express.Router();
var user = require.main.require("./models").user;
var cb = require.main.require("./lib/cb");
var config = require.main.require("./lib/config");
var aes = require.main.require("./lib/aes");

var GeneralCallback = cb.GeneralCallback;
var ListResultCallback = cb.ListResultCallback;

// 查询用户信息
router.get("/:id", function(req, res) {
    var uid = req.params.id;
    var key = req.query.key;

    if (key === undefined) {
        key = config.DEFAULT_KEY;
    }

    user.get(uid, new ListResultCallback(res, key).callback);
});

// 更新用户信息
router.put("/:id", function(req, res) {
    var uid = req.params.id;
    var phone = req.body.phone;
    var name = req.body.name;
    var ext = req.body.ext;
    var password = req.body.password;

    password = aes.decrypt(password, config.DEFAULT_KEY);

    // 权限验证
    user.auth(uid, password, new GeneralCallback(res, function(rows) {
        user.update(uid, name, phone, ext, new GeneralCallback(res, null,
            "设置用户信息失败").callback);
    }, "无权限").callback);
});

// 添加用户
router.post("/", function(req, res) {
    var phone = req.body.phone;
    var password = req.body.password;

    password = aes.decrypt(password, config.DEFAULT_KEY);

    user.exist(phone, password, new GeneralCallback(res, function(rows) {
            // 姓名字段不为空
            if (rows[0].name) {
                res.json({status: 2, id: rows[0].id});
            } else {
                // 姓名字段为空
                res.json({status: 1, id: rows[0].id});
            }
        }, function() {
            user.create(phone, password, new GeneralCallback(res, function(result) {
                    res.json({status: 1, id: result.insertId});
                }, "创建用户失败").callback);
        }).callback);
});

// 设置新密码
router.put("/:id/password", function(req, res) {
    var uid = req.params.id;
    var oldpass = req.body.password;
    var newpass = req.body.newpassword;

    oldpass = aes.decrypt(oldpass, config.DEFAULT_KEY);
    newpass = aes.decrypt(newpass, config.DEFAULT_KEY);

    user.setPassword(uid, oldpass, newpass, new GeneralCallback(res, null, "设置密码失败").callback);
});

// 群组列表
router.get("/:id/groups", function(req, res) {
    var id = req.params.id;
    var key = req.query.key;

    if (key === undefined) {
        key = config.DEFAULT_KEY;
    }

    user.group.list(id, new ListResultCallback(res, key).callback);
});

// 加入群组
router.post("/:id/groups", function(req, res) {
    var uid = req.params.id;
    var password = req.body.password;
    var gid = req.body.gid;
    var accessToken = req.body.accessToken;

    password = aes.decrypt(password, config.DEFAULT_KEY);
    accessToken = aes.decrypt(accessToken, config.DEFAULT_KEY);

    user.auth(uid, password, new GeneralCallback(res, function(rows) {
        user.group.auth(gid, accessToken, new GeneralCallback(res, function(rows) {
            user.group.join(uid, gid, new GeneralCallback(res, null, "加入群组失败").callback);
        }, "访问密码错误").callback);
    }, "无权限").callback);
});

// 退出群组
router.delete("/:id/groups", function(req, res) {
    var uid = req.params.id;
    var password = req.query.password;
    var gid = req.query.gid;
    var accessToken = req.query.accessToken;

    password = aes.decrypt(password, config.DEFAULT_KEY);
    accessToken = aes.decrypt(accessToken, config.DEFAULT_KEY);

    user.auth(uid, password, new GeneralCallback(res, function(rows) {
        user.group.auth(gid, accessToken, new GeneralCallback(res, function(rows) {
            user.group.leave(uid, gid, new GeneralCallback(res, null, "退出群组失败").callback);
        }, "访问密码错误").callback);
    }, "无权限").callback);
});


// 朋友列表
router.get("/:id/friends", function(req, res) {
    var id = req.params.id;
    var key = req.query.key;

    if (key === undefined) {
        key = config.DEFAULT_KEY;
    }

    user.friend.list(id, new ListResultCallback(res, key).callback);
});

// 添加朋友
router.post("/:id/friends", function(req, res) {
    var uid = req.params.id;
    var password = req.body.password;
    var name = req.body.name;
    var phone = req.body.phone;

    password = aes.decrypt(password, config.DEFAULT_KEY);

    user.auth(uid, password, new GeneralCallback(res, function(rows) {
        user.friend.auth(name, phone, new GeneralCallback(res, function(rows) {
            user.friend.add(uid, rows[0].id, new GeneralCallback(res, null, "添加好友失败").callback);
        }, "对方用户不存在").callback);
    }, "无权限").callback);
});

// 删除朋友
router.delete("/:id/friends", function(req, res) {
    var uid = req.params.id;
    var password = req.query.password;
    var fid = req.query.fid;

    password = aes.decrypt(password, config.DEFAULT_KEY);

    user.auth(uid, password, new GeneralCallback(res, function(rows) {
        user.friend.delete(uid, fid, new GeneralCallback(res, null, "删除好友失败").callback);
    }, "无权限").callback);
});

module.exports = router;
