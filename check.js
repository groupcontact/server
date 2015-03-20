exports.checkCreateGroup = function(res, name, desc, accessToken, modifyToken) {
    if (isEmpty(name, desc, accessToken, modifyToken)) {
        error(res, "参数不全");
        return false;
    }
    if (hasSpace(name, desc, accessToken, modifyToken)) {
        error(res, "参数中不能含有空格");
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
    if (isEmpty(name, desc, accessToken, modifyToken)) {
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

var isEmpty = function() {
    for (var i = 0; i < arguments.length; ++i) {
        // null or undefined or ""
        if (!arguments[i]) {
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

var allDigit = function(str) {
    for (var i = 0; i < str.length; ++i) {
        if (str[i] < '0' || str[i] > '9') {
            return false;
        }
    }
    return true;
};

var hasLength = function(str, min, max) {
    var length = str.length;
    if (min > 0 && length < min) {
        return false;
    }
    if (max >0 && length > max) {
        return false;
    }
    return true;
};
