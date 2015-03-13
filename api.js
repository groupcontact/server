var express = require("express");
var router = express.Router();

var db = require("./db");

/*
 * API首页
 *
 */
router.get("/", function(req, res) {
    res.render('api/index', {title: "群通讯录 - API文档"});
});

/*
 * 创建组
 *
 */
router.post("/createGroup", function(req, res) {
    var name = req.body.name;
    var desc = req.body.desc;
    var accessToken = req.body.accessToken;
    var modifyToken = req.body.modifyToken;

    var sql = "INSERT INTO `group` (`name`, `desc`, `access_token`, `modify_token`) VALUES ('" +
        name + "', '" + desc + "', SHA1('" + accessToken + "'), SHA1('" + modifyToken + "'))";
    db.query(sql, function(err, result) {
        if (err) {
            res.json({status: -1, info: "请稍候重试"});
        } else {
            res.json({status: 0, id: result.insertId});
        }
    });
});

/*
 * 删除组
 *
 */
router.post("/deleteGroup", function(req, res) {
    var gid = req.body.gid;
    var modifyToken = req.body.modifyToken;

    var sql = "DELETE FROM `group` WHERE id = '" + gid +
        "' AND modify_token = SHA1('" + modifyToken + "')";
    db.query(sql, function(err, result) {
        if (err) {
            res.json({status: -1, info: "请稍候重试"});
            return;
        }
        if (result.affectedRows === 1) {
            res.json({status: 0});
        } else {
            res.json({status: -1, info: "该群组不存在"});
        }
    });
});


/*
 * 查询用户加入的所有组的信息
 *
 */
router.get("/listGroup", function(req, res) {
    var uid = req.query.uid;
    var sql = "SELECT `id`, `name`, `desc` FROM `group` AS g WHERE EXISTS (" +
        "SELECT * FROM `usergroup` AS ug WHERE ug.uid = '" +
        uid + "' AND ug.gid = g.id)";
    db.query(sql, function(err, rows, fields) {
        if (err) {
            res.json([]);
            return;
        }
        res.json(rows);
    });
});

/*
 * 列举组下面所有的用户的信息
 *
 */
router.get("/listUser", function(req, res) {
    var gid = req.query.gid;
    var accessToken = req.query.accessToken;

    // 检查访问密码是否正确
    var sql = "SELECT COUNT(*) AS c FROM `group` WHERE id = '" + gid +
        "' AND access_token = SHA1('" + accessToken + "')";
    db.query(sql, function(err, rows, fields) {
        if (err || rows[0].c !== 1) {
            res.json([]);
        } else {
            sql = "SELECT * FROM `user` AS u WHERE EXISTS (" +
                "SELECT * FROM `usergroup` AS ug WHERE ug.gid = '" +
                gid + "' AND ug.uid = u.id)" +
                "ORDER BY CONVERT(u.name USING gbk) COLLATE gbk_chinese_ci";
            db.query(sql, function(err, rows, fields) {
                if (err) {
                    rows = [];
                }
                res.json(rows);
            });
        }
    });
});

/*
 * 创建用户:
 *
 * 若姓名和电话号码对已存在，则覆盖，否则创建新记录
 *
 */
router.post("/createUser", function(req, res) {
    var name = req.body.name;
    var phone = req.body.phone;

    // 先检查一下是否存在
    var sql = "SELECT * FROM `user` WHERE name = '" + name +
        "' AND phone = '" + phone + "'";
    db.query(sql, function(err, rows, fields) {
        if (err) {
            res.json({status: -1, info: "请稍候重试"});
            return;
        }
        // 已存在
        if (rows.length === 1) {
            res.json({status: 0, id: rows[0].id});
        } else {
            sql = "INSERT INTO `user` (`name`, `phone`) VALUES ('" +
                name + "', '" + phone + "')";
            db.query(sql, function(err, result) {
                if (err) {
                    res.json({status: -1, info: "请稍候重试"});
                    return;
                }
                res.json({status: 0, id: result.insertId});
            });
        }
    });
});

/*
 * 编辑个人信息
 *
 * 为了简单起见, 使用全量更新(除名称外)
 *
 */
router.post("/editUser", function(req, res) {
    var phone = req.body.phone;
    var uid = req.body.uid;
    var name = req.body.name;
    var ext = req.body.ext;

    var sql = "UPDATE `user` SET phone = '" + phone + "', ext = '" +
        ext + "' WHERE id = '" + uid + "' AND name = '" + name + "'";
    db.query(sql, function(err, result) {
        if (err) {
            res.json({status: -1, info: "请稍候重试"});
            return;
        }
        // 更新成功
        if (result.affectedRows === 1) {
            res.json({status: 0});
        } else {
            res.json({status: -1, info: "该用户不存在"});
        }
    });
});

/*
 * 加入某个组
 *
 */
router.post("/joinGroup", function(req, res) {
    var uid = req.body.uid;
    var gid = req.body.gid;
    var accessToken = req.body.accessToken;

    // 检查访问密码是否正确
    var sql = "SELECT COUNT(*) AS c FROM `group` WHERE id = '" + gid +
        "' AND access_token = SHA1('" + accessToken + "')";
    db.query(sql, function(err, rows, fields) {
        if (err) {
            res.json({status: -1, info: "请稍候重试"});
            return;
        }
        if (rows[0].c !== 1) {
            res.json({status: -1, info: "Incorrect Access Token."});
        } else {
            // 插入新记录
            sql = "INSERT INTO `usergroup` (`uid`, `gid`) VALUES ('" +
                uid + "', '" + gid + "')";
            db.query(sql, function(err, result) {
                if (err) {
                    res.json({status: -1, info: "请稍候重试"});
                    return;
                }
                // 加入成功
                if (result.affectedRows === 1) {
                    res.json({status: 0});
                } else {
                    res.json({status: -1, info: "Already Joined."});
                }
            });
        }
    });
});

/*
 * 离开某个组
 *
 */
router.post("/leaveGroup", function(req, res) {
    var uid = req.body.uid;
    var name = req.body.name;
    var gid = req.body.gid;

    var sql = "SELECT * FROM `user` WHERE id = '" + uid + "' AND name = '" +
        name + "'";
    db.query(sql, function(err, rows, fields) {
        if (err) {
            res.json({status: -1, info: "请稍候重试"});
            return;
        }
        if (rows.length != 1) {
            res.json({status: -1, info: "该用户不存在"});
            return;
        }
        // do the deletion in action
        sql = "DELETE FROM `usergroup` WHERE uid = '" +
            uid + "' AND gid = '" + gid + "'";
        db.query(sql, function(err, result) {
            // 离开成功
            if (result.affectedRows === 1) {
                res.json({status: 0});
            } else {
                res.json({status: -1, info: "该用户不存在于此群组中"});
            }
        });
    });
});

/*
 * 搜索群组
 *
 */
router.get("/searchGroup", function(req, res) {
    var name = req.query.name;

    var sql = "SELECT `id`, `name`, `desc` FROM `group` WHERE `name` LIKE '" +
        name + "%'";
    db.query(sql, function(err, rows, fields) {
        if (err) {
            res.json([]);
            return;
        }
        res.json(rows);
    });
});

/*
 * 查询用户信息
 *
 */
router.get("/findUser", function(req, res) {
    var uid = req.query.uid;
    var name = req.query.name;

    var sql = "SELECT * FROM user WHERE id = '" + uid + "' AND name = '" +
        name + "'";
    db.query(sql, function(err, rows, fields) {
        if (err || rows.length != 1) {
            res.json([]);
            return;
        }
        res.json(rows);
    });
});

/*
 * 列举好友
 *
 */
router.get("/listFriend", function(req, res) {
    var uid = req.query.uid;
    var name = req.query.name;

    var sql = "SELECT * FROM `user` WHERE id = '" + uid + "' AND name = '" +
        name + "'";
    db.query(sql, function(err, rows, fields) {
        if (err || rows.length != 1) {
            res.json([]);
            return;
        }
        sql = "SELECT * FROM `user` AS u WHERE EXISTS (SELECT * FROM `friend`" +
            " AS f WHERE f.uid = '" + uid + "' AND u.id = f.fid) " +
            "ORDER BY CONVERT(u.name USING gbk) COLLATE gbk_chinese_ci";
        db.query(sql, function(err, rows, fields) {
            if (err) {
                res.json([]);
                return;
            }
            res.json(rows);
        });
    });
});

/*
 * 添加好友
 *
 */
router.post("/addFriend", function(req, res) {
    var uid = req.body.uid;
    var fname = req.body.fname;
    var fphone = req.body.fphone;

    var sql = "SELECT * FROM `user` WHERE name = '" + fname + "' AND phone = '" +
        fphone + "'";
    db.query(sql, function(err, rows, fields) {
        if (err) {
            res.json({status: -1, info: "请稍后重试"});
            return;
        }
        if (rows.length != 1) {
            res.json({status: -1, info: "该用户不存在"});
            return;
        }
        var fid = rows[0].id;
        if (uid == fid) {
            res.json({status: -1, info: "不能添加自己为好友"});
            return;
        }
        sql = "INSERT INTO `friend` (`uid`, `fid`) VALUES ('" + uid + "', '" +
            fid + "')";
        db.query(sql, function(err, result) {
            if (err) {
                res.json({status: -1, info: "请稍后重试"});
                return;
            }
            res.json({status: 0});
        })
    });
});

/*
 * 删除好友
 *
 */
router.post("/deleteFriend", function(req, res) {
    var uid = req.body.uid;
    var name = req.body.name;
    var fid = req.body.fid;

    var sql = "SELECT * FROM `user` WHERE id = '" + uid + "' AND name = '" +
        name + "'";
    db.query(sql, function(err, rows, fields) {
        if (err) {
            res.json({status: -1, info: "请稍后重试"});
            return;
        }
        if (rows.length != 1) {
            res.json({status: -1, info: "该用户不存在"});
            return;
        }
        sql = "DELETE FROM `friend` WHERE uid = '" + uid + "' AND fid = '" +
            fid + "'";
        db.query(sql, function(err, result) {
            if (err) {
                res.json({status: -1, info: "请稍后重试"});
                return;
            }
            if (result.affectedRows != 1) {
                res.json({status: -1, info: "删除好友失败"});
                return;
            }
            res.json({status: 0});
        });
    });
});

module.exports = router;
