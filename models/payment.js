var db = require("./db");

module.exports = {
    all: () => {
        return db.load(`SELECT * FROM trademark`);
    },
};