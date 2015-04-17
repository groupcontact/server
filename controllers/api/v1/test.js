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

// 测试列举加入的组
router.get("/listGroup", function(req, res) {
    res.render("apitest/listGroup", {title: "群通讯录 - 列举群组"});
});

// 测试列举组内的所有用户
router.get("/listUser", function(req, res) {
    res.render("apitest/listUser", {title: "群通讯录 - 列举用户"});
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

// 测试搜索群组
router.get("/searchGroup", function(req, res) {
    res.render("apitest/searchGroup", {title: "群通讯录 - 搜索群组"});
});

// 测试查找用户
router.get("/findUser", function(req, res) {
    res.render("apitest/findUser", {title: "群通讯录 - 查找用户"});
});

// 测试列举好友
router.get("/listFriend", function(req, res) {
    res.render("apitest/listFriend", {title: "群通讯录 - 列举好友"});
});

// 测试添加好友
router.get("/addFriend", function(req, res) {
    res.render("apitest/addFriend", {title: "群通讯录 - 添加好友"});
});

// 测试删除好友
router.get("/deleteFriend", function(req, res) {
    res.render("apitest/deleteFriend", {title: "群通讯录 - 删除好友"});
});

module.exports = router;
