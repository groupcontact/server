var express = require("express");
var router = express.Router();
var group = require.main.require("./models").group;
var user = require.main.require("./models").user;
var cb = require.main.require("./lib/cb-ios");
var aes = require.main.require("./lib/aes-ios");
var config = require.main.require("./lib/config");
var check = require.main.require("./lib/check").check;

var GeneralCallback = cb.GeneralCallback;
var ListResultCallback = cb.ListResultCallback;

// 搜索群组
router.get("/", function(req, res) {
    var name = req.query.name;

    var msg = check({groupName: name});
    if (msg) {
        res.json(aes.encrypt("[]", config.DEFAULT_KEY));
        return;
    }

    group.query(name, new ListResultCallback(res, config.DEFAULT_KEY).callback);
});

// 创建群组
router.post("/", function(req, res) {
    var name = req.body.name;
    var desc = req.body.desc;
    var accessToken = req.body.accessToken;
    var modifyToken = req.body.modifyToken;
    var uid = req.body.uid;
    var password = req.body.password;

    accessToken = aes.decrypt(accessToken, config.DEFAULT_KEY);
    modifyToken = aes.decrypt(modifyToken, config.DEFAULT_KEY);
    password = aes.decrypt(password, config.DEFAULT_KEY);

    var msg = check({
        groupName: name,
        desc: desc,
        accessToken: accessToken,
        modifyToken: modifyToken,
        uid: uid,
        password: password
    });
    if (msg) {
        res.json({status: -1, info: msg});
        return;
    }

    user.auth(uid, password, new GeneralCallback(res, function() {
        group.create(name, desc, accessToken, modifyToken, new GeneralCallback(res, function(result) {
            user.group.join(uid, result.insertId, new GeneralCallback(res, null, "创建群组成功但未将自己加入").callback);
        }, "创建群组失败").callback);
    }, "无权限").callback);
});

//

// 列举群组内的成员
router.get("/:id/members", function(req, res) {
    var id = req.params.id;

    var msg = check({gid: id});
    if (msg) {
        res.json(aes.encrypt("[]", config.DEFAULT_KEY));
        return;
    }

    group.member.list(id, new ListResultCallback(res, config.DEFAULT_KEY).callback);
});

// 用拼音分隔好了的成员列表
router.get("/:id/members2", function(req, res) {
    var id = req.params.id;

    var msg = check({gid: id});
    if (msg) {
        res.json(aes.encrypt("[]", config.DEFAULT_KEY));
        return;
    }

    group.member.list(id, new ListResultCallback(res, config.DEFAULT_KEY, true).callback);
});


// TODO: 查询群组的meta信息
router.get("/:id/meta", function(req, res) {
    var id = req.params.id;
    var key = req.query.key;

    if (key === undefined) {
        key = config.DEFAULT_KEY;
    }

});

// TODO: 更新群组的meta信息
router.put("/:id/meta", function(req, res) {
    var id = req.params.id;
    var meta = req.body.meta;
    var modifyToken = req.body.modifyToken;

    modifyToken = aes.encrypt(modifyToken);
});

module.exports = router;
