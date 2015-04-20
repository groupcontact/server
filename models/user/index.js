var cb = require.main.require("./lib/cb");

var RowCountCallback = cb.RowCountCallback;
var AffectedRowsCallback = cb.AffectedRowsCallback;

function Group(db) {
    this.db = db;
}

function Friend(db) {
    this.db = db;
}

function User(db) {
    this.db = db;

    this.group = new Group(db);
    this.friend = new Friend(db);
}

/*
 * 验证密码
 */
User.prototype.auth = function(uid, password, cb) {
    var sql = "SELECT * FROM `user` WHERE id = '" + uid + "' AND password = SHA1('" +
        password + "')";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

/*
 * 查询用户信息
 */
User.prototype.get = function(uid, cb) {
    var sql = "SELECT * FROM user WHERE id = '" + uid + "'";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

/*
 * 根据手机号和密码判断是否存在
 */
User.prototype.exist = function(phone, password, cb) {
    var sql = "SELECT * FROM `user` WHERE `phone` = '" + phone +
        "' AND password = SHA1('" + password + "')";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

/*
 * 创建用户
 */
User.prototype.create = function(phone, password, cb) {
    var sql = "INSERT INTO `user` (`gmt_create`, `gmt_modified`, `phone`, `password`) " +
        "VALUES (NOW(), NOW(), '" + phone + "', SHA1('" + password + "'))";
    this.db.query(sql, new AffectedRowsCallback(cb).callback);
};

/*
 * 更新用户信息, 不包括密码
 */
User.prototype.update = function(uid, name, phone, ext, cb) {
    var sql = "UPDATE `user` SET gmt_modified = NOW(), name = '" + name +
        "', phone = '" + phone + "', ext = '" + ext + "' WHERE id = '" +
        uid + "'";
    this.db.query(sql, new AffectedRowsCallback(cb).callback);
};

/*
 * 权限验证
 */
Group.prototype.auth = function(gid, accessToken, cb) {
    var sql = "SELECT * FROM `group` WHERE id = '" + gid + "' AND access_token = SHA1('" +
        accessToken + "')";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

/*
 * 查询用户加入的组列表信息
 */
Group.prototype.list = function(uid, cb) {
    var sql = "SELECT `id`, `name`, `desc` FROM `group` AS g WHERE EXISTS (" +
        "SELECT * FROM `usergroup` AS ug WHERE ug.uid = '" +
        uid + "' AND ug.gid = g.id)";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

/*
 * 加入群组
 */
Group.prototype.join = function(uid, gid, cb) {
    var sql = "INSERT INTO `usergroup` (`gmt_create`, `gmt_modified`, `uid`, `gid`)" +
        " VALUES (NOW(), NOW(), '" + uid + "', '" + gid + "')";
    this.db.query(sql, new AffectedRowsCallback(cb).callback);
};

/*
 * 退出群组
 */
Group.prototype.leave = function(uid, gid, cb) {
    var sql = "DELETE FROM `usergroup` WHERE uid = '" + uid + "' AND gid = '" +
        gid + "'";
    this.db.query(sql, new AffectedRowsCallback(cb).callback);
};

// 验证即将添加的好友是否存在
Friend.prototype.auth = function(name, phone, cb) {
    var sql = "SELECT * FROM `user` WHERE name = '" + name + "' AND phone = '" +
        phone + "'";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

/*
 * 查询用户的朋友列表信息
 */
Friend.prototype.list = function(uid, cb) {
    var sql = "SELECT * FROM `user` AS u WHERE EXISTS (SELECT * FROM `friend`" +
        " AS f WHERE f.uid = '" + uid + "' AND u.id = f.fid) ORDER BY `name`";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

/*
 * 检查朋友关系是否已存在
 */
Friend.prototype.exist = function(uid, fid, cb) {
    var sql = "SELECT * FROM `friend` WHERE uid = '" + uid + "' AND fid = '" +
        fid + "'";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

/*
 * 添加好友
 */
Friend.prototype.add = function(uid, fid, cb) {
    var sql = "INSERT INTO `friend` (`gmt_create`, `gmt_modified`, `uid`, `fid`)" +
        " VALUES (NOW(), NOW(), '" + uid + "', '" + fid + "')";
    this.db.query(sql, new AffectedRowsCallback(cb).callback);
};

/*
 * 删除好友
 */
Friend.prototype.delete = function(uid, fid, cb) {
    var sql = "DELETE FROM `friend` WHERE uid = '" + uid + "' AND fid = '" +
        fid + "'";
    this.db.query(sql, new AffectedRowsCallback(cb).callback);
};

module.exports = User;
