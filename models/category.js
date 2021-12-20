var db = require("./db");

module.exports = {
    all: () => {
        return db.load(`SELECT * FROM category`);
    },
    getByid: (id) => {
        return db.load(`SELECT * FROM category WHERE id = '${id}'`);
    },
};