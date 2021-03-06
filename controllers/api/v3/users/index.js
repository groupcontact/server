var express = require("express");
var router = express.Router();
var user = require.main.require("./models").user;
var cb = require.main.require("./lib/cb-ios");
var config = require.main.require("./lib/config");
var aes = require.main.require("./lib/aes-ios");
var check = require.main.require("./lib/check").check;

var GeneralCallback = cb.GeneralCallback;
var ListResultCallback = cb.ListResultCallback;

// 查询用户信息
router.get("/:id", function(req, res) {
    var uid = req.params.id;

    var msg = check({uid: uid});
    if (msg) {
        res.json(aes.encrypt("[]", config.DEFAULT_KEY));
        return;
    }

    user.get(uid, new ListResultCallback(res, config.DEFAULT_KEY).callback);
});

// 更新用户信息
router.put("/:id", function(req, res) {
    var uid = req.params.id;
    var phone = req.body.phone;
    var name = req.body.name;
    var ext = req.body.ext;
    var password = req.body.password;

    password = aes.decrypt(password, config.DEFAULT_KEY);

    var msg = check({
        uid: uid,
        phone: phone,
        userName: name,
        userExt: ext,
        password: password
    });
    if (msg) {
        res.json({status: -1, info: msg});
        return;
    }

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

    var msg = check({
        phone: phone,
        password: password
    });
    if (msg) {
        res.json({status: -1, info: msg});
        return;
    }

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

    var msg = check({
        uid: uid,
        password: oldpass,
        password: newpass
    });
    if (msg) {
        res.json({status: -1, info: msg});
        return;
    }

    user.setPassword(uid, oldpass, newpass, new GeneralCallback(res, null, "设置密码失败").callback);
});

// 群组列表
router.get("/:id/groups", function(req, res) {
    var id = req.params.id;

    var msg = check({
        uid: id
    });
    if (msg) {
        res.json(aes.encrypt("[]", config.DEFAULT_KEY));
        return;
    }

    user.group.list(id, new ListResultCallback(res, config.DEFAULT_KEY).callback);
});

// 加入群组
router.post("/:id/groups", function(req, res) {
    var uid = req.params.id;
    var password = req.body.password;
    var gid = req.body.gid;
    var accessToken = req.body.accessToken;

    password = aes.decrypt(password, config.DEFAULT_KEY);
    accessToken = aes.decrypt(accessToken, config.DEFAULT_KEY);

    var msg = check({
        uid: uid,
        password: password,
        gid: gid,
        accessToken: accessToken
    });
    if (msg) {
        res.json({status: -1, info: msg});
        return;
    }

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

    password = aes.decrypt(password, config.DEFAULT_KEY);

    var msg = check({
        uid: uid,
        password: password,
        gid: gid
    });
    if (msg) {
        res.json({status: -1, info: msg});
        return;
    }

    user.auth(uid, password, new GeneralCallback(res, function(rows) {
        user.group.leave(uid, gid, new GeneralCallback(res, null, "退出群组失败").callback);
    }, "无权限").callback);
});


// 朋友列表
router.get("/:id/friends", function(req, res) {
    var id = req.params.id;

    var msg = check({
        uid: id
    });
    if (msg) {
        res.json(aes.encrypt("[]", config.DEFAULT_KEY));
        return;
    }

    user.friend.list(id, new ListResultCallback(res, config.DEFAULT_KEY).callback);
});

// 用拼音分隔好了的朋友列表
router.get("/:id/friends2", function(req, res) {
    var id = req.params.id;

    var msg = check({
        uid: id
    });
    if (msg) {
        res.json(aes.encrypt("[]", config.DEFAULT_KEY));
        return;
    }

    user.friend.list(id, new ListResultCallback(res, config.DEFAULT_KEY, true).callback);
});

// 添加朋友
router.post("/:id/friends", function(req, res) {
    var uid = req.params.id;
    var password = req.body.password;
    var name = req.body.name;
    var phone = req.body.phone;

    password = aes.decrypt(password, config.DEFAULT_KEY);

    var msg = check({
        uid: uid,
        password: password,
        userName: name,
        phone: phone
    });
    if (msg) {
        res.json({status: -1, info: msg});
        return;
    }

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

    var msg = check({
        uid: uid,
        password: password,
        fid: fid
    });
    if (msg) {
        res.json({status: -1, info: msg});
        return;
    }

    user.auth(uid, password, new GeneralCallback(res, function(rows) {
        user.friend.delete(uid, fid, new GeneralCallback(res, null, "删除好友失败").callback);
    }, "无权限").callback);
});

module.exports = router;
