var aes = require("./aes");

// 通用的回调函数
function GeneralCallback(res, successFunc, failFunc) {
    this.res = res;
    this.failFunc = failFunc;
    this.successFunc = successFunc;

    this.callback = function(result) {
        if (result === user.ERROR) {
            res.json({status: -1, info: "请稍后重试"});
        } else if (result === user.FAILURE) {
            if (typeof(failFunc) === "string") {
                res.json({status: 0, info: failFunc});
            } else {
                failFunc();
            }
        } else {
            if (successFunc) {
                successFunc(result);
            } else {
                res.json({status: 1});
            }
        }
    };
}

/*
 * 返回结果为数组信息的回调函数, 可以指定加密用的密钥
 */
function ListResultCallback(res, key) {
    this.res = res;

    this.callback = function(result) {
        var listResult = [];
        if (result != user.ERROR && result != user.FAILURE) {
            listResult = result;
        }
        if (key) {
            res.end(aes.encrypt(JSON.stringify(listResult), key));
        } else {
            res.json(listResult);
        }
    };
}

// 读类型的回调函数
function RowCountCallback(cb) {
    this.cb = cb;

    this.callback = function(err, rows, fields) {
        cb(err ? ERROR : rows.length === 0 ? FAILURE : rows);
    };
}

// 写类型的回调函数
function AffectedRowsCallback(cb) {
    this.cb = cb;

    this.callback = function(err, result) {
        cb(err ? ERROR : result.affectedRows === 0 ? FAILURE : result);
    }
}

exports.GeneralCallback = GeneralCallback;
exports.ListResultCallback = ListResultCallback;
exports.RowCountCallback = RowCountCallback;
exports.AffectedRowsCallback = AffectedRowsCallback;
