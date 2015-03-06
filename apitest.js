var express = require("express");
var router = express.Router();

// 测试创建组
router.get("/createGroup", function(req, res) {
    res.render("apitest/createGroup", {title: "群通讯录 - 创建群组"});
});

// 测试删除组
router.get("/deleteGroup", function(req, res) {
    res.render("apitest/deleteGroup", {title: "群通讯录 - 删除群组"});
});

// 测试注册用户
router.get("/createUser", function(req, res) {
    res.render("apitest/createUser", {title: "群通讯录 - 注册用户"});
});

// 测试编辑用户信息
router.get("/editUser", function(req, res) {
    res.render("apitest/editUser", {title: "群通讯录 - 编辑用户信息"});
});

// 测试加入群组
router.get("/joinGroup", function(req, res) {
    res.render("apitest/joinGroup", {title: "群通讯录 - 加入群组"});
});

// 测试离开群组
router.get("/leaveGroup", function(req, res) {
    res.render("apitest/leaveGroup", {title: "群通讯录 - 退出群组"});
});

module.exports = router;
