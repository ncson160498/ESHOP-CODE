var db = require("./db");

module.exports = {
    all: () => {
        return db.load(`SELECT * FROM trademark`);
    },
    getByid: (id) => {
        return db.load(`SELECT * FROM trademark WHERE id = ${id}`);
    },
};