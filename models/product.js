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
    getByTrademarkId: (id) => {
        return db.load(`SELECT * FROM product WHERE trademark_id = ${id}`);
    },
    getByCategoryId: (id) => {
        return db.load(`SELECT * FROM product WHERE category_id = ${id}`);
    },
    getQuantily: () => {
        return db.load(`SELECT COUNT(*) as totalCount FROM product`);
    },
    getLimit: (start, limit) => {
        return db.load(`SELECT * FROM product LIMIT ${start}, ${limit}`);
    }
};