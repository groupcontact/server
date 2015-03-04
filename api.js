var express = require("express");
var router = express.Router();

var db = require("./db");

/*
 * API首页
 *
 */
router.get("/", function(req, res) {
    res.send("API首页");
});

/*
 * 注册用户:
 *
 * 若姓名和电话号码对已存在，则覆盖，否则创建新记录
 */
router.post("/register", function(req, res) {

});

/*
 * 查询用户加入的所有组的信息
 *
 */
router.get("/listGroup", function(req, res) {
    // 用户ID
    var uid = req.query.uid;
    var sql = "SELECT * FROM usergroup WHERE uid = '" + uid + "'";
    db.query(sql, function(err, rows, fields) {
        // 直接输出结果
        res.json(rows);
    });
});

/*
 * 列举组下面所有的用户的信息
 *
 */
router.get("/listUser", function(req, res) {

});

/*
 * 更新个人信息
 *
 */
router.get("/update", function(req, res) {

});

module.exports = router;
