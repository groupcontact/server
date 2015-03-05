var express = require("express");
var router = express.Router();

var db = require("./db");

/*
 * API首页
 *
 */
router.get("/", function(req, res) {
    res.render('api/index');
});

/*
 * 查询用户加入的所有组的信息
 *
 */
router.get("/listGroup", function(req, res) {
    var uid = req.query.uid;
    var sql = "SELECT `name`, `desc` FROM `group` AS g WHERE EXISTS (" +
        "SELECT * FROM `usergroup` AS ug WHERE ug.uid = '" +
        uid + "' AND ug.gid = g.id)";
    db.query(sql, function(err, rows, fields) {
        res.json(rows);
    });
});

/*
 * 列举组下面所有的用户的信息
 *
 */
router.get("/listUser", function(req, res) {
    var gid = req.query.gid;
    var sql = "SELECT * FROM `user` AS u WHERE EXISTS (" +
        "SELECT * FROM `usergroup` AS ug WHERE ug.gid = '" +
        gid + "' AND ug.uid = u.id)";
    db.query(sql, function(err, rows, fields) {
        res.json(rows);
    });
});

/*
 * 注册用户:
 *
 * 若姓名和电话号码对已存在，则覆盖，否则创建新记录
 *
 */
router.post("/register", function(req, res) {
    var name = req.body.name;
    var phone = req.body.phone;

    // 先检查一下是否存在
    var sql = "SELECT * FROM `user` WHERE name = '" + name +
        "' AND phone = '" + phone + "'";
    db.query(sql, function(err, rows, fields) {
        // 已存在
        if (rows.length === 1) {
            res.json({id: rows[0].id});
        } else {
            sql = "INSERT INTO `user` (`name`, `phone`) VALUES ('" +
                name + "', '" + phone + "')";
            db.query(sql, function(err, result) {
                res.json({id: result.insertId});
            });
        }
    });
});

/*
 * 更新个人信息
 *
 * 为了简单起见, 使用全量更新(除名称外)
 *
 */
router.post("/update", function(req, res) {
    var phone = req.body.phone;
    var uid = req.body.uid;
    var name = req.body.name;

    var sql = "UPDATE `user` SET phone = '" + phone + "' WHERE id = '" +
        uid + "' AND name = '" + name + "'";
    db.query(sql, function(err, result) {
        // 更新成功
        if (result.affectedRows === 1) {
            res.json({status: 0});
        } else {
            res.json({status: -1});
        }
    });
});

/*
 * 加入某个组
 *
 */
router.post("/join", function(req, res) {
    var uid = req.body.uid;
    var gid = req.body.gid;

    var sql = "INSERT INTO `usergroup` (`uid`, `gid`) VALUES ('" +
        uid + "', '" + gid + "')";
    db.query(sql, function(err, result) {
        // 加入成功
        if (result.affectedRows === 1) {
            res.json({status: 0});
        } else {
            res.json({status: -1});
        }
    });
});

/*
 * 离开某个组
 *
 */
router.post("/leave", function(req, res) {
    var uid = req.body.uid;
    var gid = req.body.gid;

    var sql = "DELETE FROM `usergroup` WHERE uid = '" +
        uid + "' AND gid = '" + gid + "'";
    db.query(sql, function(err, result) {
        // 离开成功
        if (result.affectedRows === 1) {
            res.json({status: 0});
        } else {
            res.json({status: -1});
        }
    });
});

module.exports = router;
