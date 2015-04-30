var aes = require("./lib/aes-ios");

var encrypted = aes.encrypt("helloworld", "123456");
console.log(encrypted);

var decrypted = aes.decrypt(encrypted, '123456');
console.log(decrypted);
