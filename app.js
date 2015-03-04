var port = 18080;

var express = require("express");
var app = express();

// 静态文件
app.use(express.static("static"));

// 主页
app.get("/", function(req, res) {
    res.send("Group Contact Homepage");
});

// 加载API路由
var api = require("./api");
app.use("/api", api);

var server = app.listen(port);
