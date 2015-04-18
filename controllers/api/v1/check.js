exports.checkCreateGroup = function(res, name, desc, accessToken, modifyToken) {
    if (isEmpty(name, desc, accessToken, modifyToken)) {
        error(res, "参数不全");
        return false;
    }
    if (hasLeftOrRightSpace(name, desc)) {
        error(res, "参数前或后含有空格");
        return false;
    }
    if (!hasLength(name, 8, 20)) {
        error(res, "群组名应为4-10个中文字符或8-20个英文字符");
        return false;
    }
    if (!hasLength(accessToken, 6, 6) || !allDigit(accessToken)) {
        error(res, "访问密码只能为6位数字");
        return false;
    }
    if (!hasLength(modifyToken, 6, 6) || !allDigit(modifyToken)) {
        error(res, "管理密码只能为6位数字");
        return false;
    }
    return true;
};

exports.checkDeleteGroup = function(res, gid, modifyToken) {
    if (isEmpty(gid, modifyToken)) {
        error(res, "参数不全");
        return false;
    }
    if (!hasLength(gid, 1, -1) || !allDigit(gid)) {
        error(res, "群组ID格式有误");
        return false;
    }
    if (!hasLength(modifyToken, 6, 6) || !allDigit(modifyToken)) {
        error(res, "管理密码只能为6位数字");
        return false;
    }
    return true;
};

exports.checkListGroup = function(res, uid) {
    if (isEmpty(uid)) {
        res.json([]);
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        res.json([]);
        return false;
    }
    return true;
};

exports.checkListUser = function(res, gid, accessToken) {
    if (isEmpty(gid, accessToken)) {
        res.json([]);
        return false;
    }
    if (!hasLength(gid, 1, -1) || !allDigit(gid)) {
        res.json([]);
        return false;
    }
    if (!hasLength(accessToken, 6, 6) || !allDigit(accessToken)) {
        res.json([]);
        return false;
    }
    return true;
};

exports.checkCreateUser = function(res, name, phone) {
    if (isEmpty(name, phone)) {
        error(res, "参数不全");
        return false;
    }
    if (hasLeftOrRightSpace(name)) {
        error(res, "参数前或后含有空格");
        return false;
    }
    if (!isPhone(phone)) {
        error(res, "手机号码格式有误");
        return false;
    }
    return true;
};

exports.checkEditUser = function(res, uid, name, phone, ext) {
    if (isEmpty(uid, name, phone, ext)) {
        error(res, "参数不全");
        return false;
    }
    if (hasLeftOrRightSpace(name)) {
        error(res, "参数前或后含有空格");
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        error(res, "用户ID格式有误");
        return false;
    }
    if (!isPhone(phone)) {
        error(res, "手机号码格式有误");
        return false;
    }
    if (!isJSONObject(ext)) {
        error(res, "扩展属性必须为JSON对象");
        return false;
    }
    return true;
};

exports.checkJoinGroup = function(res, uid, gid, accessToken) {
    if (isEmpty(uid, gid, accessToken)) {
        error(res, "参数不全");
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        error(res, "用户ID格式有误");
        return false;
    }
    if (!hasLength(gid, 1, -1) || !allDigit(gid)) {
        error(res, "群组ID格式有误");
        return false;
    }
    if (!hasLength(accessToken, 6, 6) || !allDigit(accessToken)) {
        error(res, "访问密码只能为6位数字");
        return false;
    }
    return true;
};

exports.checkLeaveGroup = function(res, uid, name, gid) {
    if (isEmpty(uid, name, gid)) {
        error(res, "参数不全");
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        error(res, "用户ID格式有误");
        return false;
    }
    if (hasLeftOrRightSpace(name)) {
        error(res, "参数前或后含有空格");
        return false;
    }
    if (!hasLength(gid, 1, -1) || !allDigit(gid)) {
        error(res, "群组ID格式有误");
        return false;
    }
    return true;
};

exports.checkSearchGroup = function(res, name) {
    if (isEmpty(name) || hasLeftOrRightSpace(name)) {
        res.json([]);
        return false;
    }
    return true;
};

exports.checkFindUser = function(res, uid, name) {
    if (isEmpty(uid, name)) {
        res.json([]);
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        res.json([]);
        return false;
    }
    if (hasLeftOrRightSpace(name)) {
        res.json([]);
        return false;
    }
    return true;
};

exports.checkListFriend = function(res, uid, name) {
    if (isEmpty(uid, name)) {
        res.json([]);
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        res.json([]);
        return false;
    }
    if (hasLeftOrRightSpace(name)) {
        res.json([]);
        return false;
    }
    return true;
};

exports.checkAddFriend = function(res, uid, fname, fphone) {
    if (isEmpty(uid, fname, fphone)) {
        error(res, "参数不全");
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        error(res, "用户ID格式有误");
        return false;
    }
    if (hasLeftOrRightSpace(fname)) {
        error(res, "参数前或后含有空格");
        return false;
    }
    if (!isPhone(fphone)) {
        error(res, "手机号码格式有误");
        return false;
    }
    return true;
};

exports.checkDeleteFriend = function(res, uid, name, fid) {
    if (isEmpty(uid, name, fid)) {
        error(res, "参数不全");
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        error(res, "用户ID格式有误");
        return false;
    }
    if (hasLeftOrRightSpace(name)) {
        error(res, "参数前或后含有空格");
        return false;
    }
    if (!hasLength(fid, 1, -1) || !allDigit(fid)) {
        error(res, "用户ID格式有误");
        return false;
    }
    return true;
};

exports.checkUpdateField = function(res, gid, modifyToken, meta) {
    if (isEmpty(gid, meta, modifyToken)) {
        error(res, "参数不全");
        return false;
    }
    if (!hasLength(gid, 1, -1) || !allDigit(gid)) {
        error(res, "群组ID格式有误");
        return false;
    }
    if (!isJSONObject(meta)) {
        error(res, "字段设置格式有误");
        return false;
    }
    if (!hasLength(modifyToken, 6, 6) || !allDigit(modifyToken)) {
        error(res, "管理密码格式有误");
        return false;
    }
    return true;
};

exports.checkUpdateUserInGroup = function(res, uid, gid, ext, accessToken) {
    if (isEmpty(uid, gid, ext, accessToken)) {
        error(res, "参数不全");
        return false;
    }
    if (!hasLength(uid, 1, -1) || !allDigit(uid)) {
        error(res, "用户ID格式有误");
        return false;
    }
    if (!hasLength(gid, 1, -1) || !allDigit(gid)) {
        error(res, "群组ID格式有误");
        return false;
    }
    if (!hasLength(accessToken, 6, 6) || !allDigit(accessToken)) {
        error(res, "访问密码格式有误");
        return false;
    }
    if (!isJSONObject(ext)) {
        error(res, "用户信息格式有误");
        return false;
    }
    return true;
};

var error = function(res, message) {
    res.json({status: -1, info: message});
};

/*
 * Check whether the given string is a valid phone number
 *
 */
var isPhone = function(num) {
    return num.length == 11 && parseInt(num) == num;
};

var isJSONObject = function(str) {
    try {
        var obj = JSON.parse(str);
        return !Array.isArray(obj);
    } catch (e) {
        return false;
    }
};

var isJSONArray = function(str) {
    try {
        var obj = JSON.parse(str);
        return Array.isArray(obj);
    } catch (e) {
        return false;
    }
};

var isEmpty = function() {
    for (var i = 0; i < arguments.length; ++i) {
        // null or undefined or ""
        if (!arguments[i]) {
            return true;
        }
        if (arguments[i].trim().length == 0) {
            return true;
        }
    }
    return false;
};

var hasSpace = function() {
    for (var i = 0; i < arguments.length; ++i) {
        if (arguments[i].indexOf(' ') != -1) {
            return true;
        }
    }
};

var hasLeftOrRightSpace = function(str) {
    var length = str.length;
    return str[0] == ' ' || str[length - 1] == ' ';
};

var allDigit = function(str) {
    for (var i = 0; i < str.length; ++i) {
        if (str[i] < '0' || str[i] > '9') {
            return false;
        }
    }
    return true;
};

var hasLength = function(str, min, max) {
    var length = str.match(/[^ -~]/g) == null ? str.length : str.length + str.match(/[^ -~]/g).length;
    if (min > 0 && length < min) {
        return false;
    }
    if (max >0 && length > max) {
        return false;
    }
    return true;
};
