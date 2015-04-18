var db = require("./db");
var User = require("./user");

module.exports = {
    user: new User(db)
};
