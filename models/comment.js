var db = require("./db");

module.exports = {
    all: () => {
        return db.load(`SELECT * FROM comment`);
    },
    getByIdProduct: (id) => {
        return db.load(`SELECT * FROM comment WHERE product_id = ${id}`);
    },
    addNewComment: (entity) => {
        return db.add('comment', entity)
    },
};