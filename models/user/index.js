var ERROR = -1, FAILURE = 0;

function User(db) {
    this.db = db;
}

function RowCountCallback(cb) {
    this.cb = cb;

    this.callback = function(err, rows, fields) {
        cb(err ? ERROR : rows.length === 0 ? FAILURE : rows);
    };
}

function AffectedRowsCallback(cb) {
    this.cb = cb;

    this.calback = function(err, result) {
        cb(err ? ERROR : result.affectedRows === 0 ? FAILURE : result);
    }
}

User.prototype.exist = function(phone, cb) {
    var sql = "SELECT * FROM `user` WHERE `phone` = '" + phone + "'";
    this.db.query(sql, new RowCountCallback(cb).callback);
};

User.prototype.create = function(phone, password, cb) {
    sql = "INSERT INTO `user` (`gmt_create`, `gmt_modified`, `phone`, `password`) " +
        "VALUES (NOW(), NOW(), '" + phone + "', SHA1('" + password + "'))";
    this.db.query(sql, new AffectedRowsCallback(cb).callback);
};

User.prototype.ERROR = ERROR;
User.prototype.FAILURE = FAILURE;

module.exports = User;
