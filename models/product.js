var db = require("./db");

module.exports = {
    all: () => {
        return db.load("select * from product");
    },
    getById: (id) => {
        return db.load(`SELECT * FROM product where id = ${id}`);
    },
    update: entity => {
        return db.update("product", "id", entity);
    },
    addNewProduct: (entity) => {
        return db.add('product', entity)
    },
};