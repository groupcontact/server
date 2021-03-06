var express = require("express");
var router = express.Router();

// 测试创建用户
router.get("/createUser", function(req, res) {
    res.render("api/v2/test/createUser", {title: "群通讯录 - 创建用户"});
});

// 测试更新用户
router.get("/updateUser", function(req, res) {
    res.render("api/v2/test/updateUser", {title: "群通讯录 - 更新用户"});
});

module.exports = router;
