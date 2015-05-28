var aes = require("./lib/aes-ios");
var pinyin = require("./lib/pinyin");

var encrypted = aes.encrypt("helloworld", "GroupContact");
console.log(encrypted);

var decrypted = aes.decrypt("0306a2bd56965333ea6e5cb4ad62a225", "GroupContact");
console.log(decrypted);

var users = [
    {
        name: "周海兵"
    },
    {
        name: "周鑫"
    },
    {
        name: "杨娟"
    }
];

console.log(pinyin.pinyinlize(users));
