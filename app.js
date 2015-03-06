// BAE约定的端口号
var port = 18080;

var express = require("express");
var app = express();

// 使用jade模板引擎
app.set('views', './views');
app.set('view engine', 'jade');

// POST参数获取, 被注释的那几行暂时用不上
var bodyParser = require("body-parser");
// var multer = require("multer");
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(multer());

// 静态文件
app.use(express.static("public"));

// 首页路由
var home = require("./home");
app.use("/", home);

// API路由
var api = require("./api");
app.use("/api", api);

// API测试路由
var apitest = require("./apitest");
app.use("/apitest", apitest);

var server = app.listen(port);
