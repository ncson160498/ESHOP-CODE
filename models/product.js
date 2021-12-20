var db = require("./db");

module.exports = {
    all: () => {
        return db.load(`SELECT * FROM product`);
    },
    getById: (id) => {
        return db.load(`SELECT * FROM product WHERE id = ${id}`);
    },
    update: entity => {
        return db.update("product", entity);
    },
    addNewProduct: (entity) => {
        return db.add('product', entity)
    },
    getByKeyWord: (key) => {
        return db.load(`SELECT * FROM product WHERE name LIKE '${key}%'`);
    },
    deleteProduct: (entity) => {
        return db.delete('product', entity);
    },
};