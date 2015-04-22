exports.check = function(args) {
    var property;
    var value;
    var handler;
    var msg;

    for(property in args) {
        handler = checks[property];
        if (!handler) {
            continue;
        } else {
            handler = handler.slice(0);
        }
        var func = handler[0];
        handler[0] = args[property];
        msg = func.apply(null, handler);
        if (msg) {
            return msg;
        }
    }
};

var id = function(id, argName) {
    if (!id) {
        return argName + "不能为空"
    }
    if (!id.hasLength(1, -1) || !allDigit(id)) {
        return argName + "必须为纯数字";
    }
};

var str = function(name, argName, min, max) {
    if (!name) {
        return argName + "不能为空";
    }
    if (name.indexOf("'") !== -1) {
        return argName + "不能含有单引号";
    }
    if (hasSpace(name)) {
        return argName + "不能含有空格";
    }
    if (min !== undefined && !hasLength(name, min, -1)) {
        return argName + "长度不能少于" + min + "个英文字符";
    }
    if (max !== undefined && !hasLength(name, -1, max)) {
        return argName + "长度不能大于" + max + "英文字符";
    }
};

var password = function(password, argName) {
    if (!password) {
        return argName + "不能为空";
    }
    if (!hasLength(password, 6, 6) || !allDigit(password)) {
        return argName + "必须为6位数字";
    }
};

var phone = function(phone) {
    if (!phone) {
        return "手机号不能为空";
    }
    if (!isPhone(phone)) {
        return "手机号码格式不正确";
    }
};

var extObj = function(ext) {
    if (!isJSONObject(ext)) {
        return "扩展字段必须为JSON对象格式";
    }
};

var extArray = function(ext) {
    if (!isJSONArray(ext)) {
        return "扩展字段必须为JSON数组格式";
    }
};

var checks = {
    "phone": [phone],
    "password": [password, "密码"],
    "userName": [str, "用户名"],
    "groupName": [str, "群组名"],
    "desc": [str, "描述"],
    "accessToken": [password, "访问密码"],
    "modifyToken": [password, "管理密码"],
    "userExt": [extObj],
    "groupExt": [extArray],
    "uid": [id, "用户ID"],
    "gid": [id, "群组ID"],
    "fid": [id, "好友ID"]
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
