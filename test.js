var aes = require("./lib/aes-ios");

var encrypted = aes.encrypt("helloworld", "GroupContact");
console.log(encrypted);

var decrypted = aes.decrypt("0306a2bd56965333ea6e5cb4ad62a225", "GroupContact");
console.log(decrypted);
