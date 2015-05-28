var pinyin = require("pinyin");

exports.pinyinlize = function(users) {
    var data = {};
    users.forEach(function(user) {
        var c = pinyin(user.name.substr(0, 1), {
            style: pinyin.STYLE_FIRST_LETTER
        })[0][0].toUpperCase();
        if (data[c] == undefined) {
            data[c] = [];
        }
        data[c].push(user);
    });
    return data;
};
