var cb = require.main.require("./lib/cb");
var RowCountCallback = cb.RowCountCallback;
var AffectedRowsCallback = cb.AffectedRowsCallback;

function Member(db) {
    this.db = db;
}

function Group(db) {
    this.db = db;

    this.member = new Member(db);
}

// 查询群组
Group.prototype.query = function(name, cb) {
    var sql = "SELECT `id`, `name`, `desc` FROM `group` WHERE `name` LIKE '" +
        name + "%'";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

// 列举组内的成员
Member.prototype.list = function(gid, cb) {
    sql = "SELECT * FROM `user` AS u WHERE EXISTS (" +
        "SELECT * FROM `usergroup` AS ug WHERE ug.gid = '" + gid +
        "' AND ug.uid = u.id) ORDER BY `name`" ;
    this.db.query(sql, new RowCountCallback(cb).callback);
};

// 给定用户是否在群组成员当中
Member.prototype.exist = function(gid, uid, cb) {
    var sql = "SELECT * FROM `usergroup` WHERE uid = '" + uid + "' AND gid = '" +
        gid + "'";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

module.exports = Group;
