var express = require("express");
var router = express.Router();

// 测试创建组
router.get("/createGroup", function(req, res) {
    res.render("apitest/createGroup", {title: "群通讯录 - 创建群组"});
});
