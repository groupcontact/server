var db = require("./db");
var User = require("./user");
var Group = require("./group");

module.exports = {
    user: new User(db),
    group: new Group(db)
};
