var crypto = require("crypto");

exports.encrypt = function(data, secretKey) {
    try {
        var cipher = crypto.createCipher('aes-128-ecb', secretKey);
        return cipher.update(data,'utf8','hex') + cipher.final('hex');
    } catch (x) {
        return null;
    }
};

exports.decrypt = function(data, secretKey) {
    try {
        var cipher = crypto.createDecipher('aes-128-ecb', secretKey);
        return cipher.update(data,'hex','utf8') + cipher.final('utf8');
    } catch (x) {
        return null;
    }
};
