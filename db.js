var mysql = require("mysql");

var conf = {
    host: "sqld.duapp.com",
    port: "4050",
    user: "4cdMnbk1AyzNajowgmyHPb5U",
    password: "b2lavIVEeOcgSNgZhIOPcFsNMm5tAYjQ",
    database: "OxRjSwGClcBjWeOCYdkP"
};

var db = {};

/*
 * 执行一条SQL语句
 *
 */
db.query = function(sql, cb) {
    var connection = mysql.createConnection(conf);
    connection.connect();
    connection.query(sql, cb);
    connection.end();
};

module.exports = db;
