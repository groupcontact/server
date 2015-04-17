var mysql = require("mysql");

var conf = {
    // test
    // host: "192.168.56.101",
    // port: "3306",
    // user: "root",
    // password: "123456",
    host: "sqld.duapp.com",
    port: "4050",
    user: "4cdMnbk1AyzNajowgmyHPb5U",
    password: "b2lavIVEeOcgSNgZhIOPcFsNMm5tAYjQ",

    connectionLimit: 50,
    database: "OxRjSwGClcBjWeOCYdkP"
};

var db = {};

var pool = mysql.createPool(conf);

/*
 * 执行一条SQL语句
 *
 */
db.query = function(sql, cb) {
    pool.getConnection(function(err, connection) {
        if (err) {
            cb(err);
        } else {
            connection.query(sql, cb);
            connection.release();
        }
    });
};

module.exports = db;
