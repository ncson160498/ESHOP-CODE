var db = require("./db");

module.exports = {
    all: () => {
        return db.load("select * from orderproduct");
    },
    addNewOrder: (entity) => {
        return db.add('orderproduct', entity)
    },
    deleteOrder: (entity) => {
        return db.delete('orderproduct', entity)
    },
    getById: (id) => {
        return db.load(`SELECT * FROM orderproduct WHERE id = ${id}`);
    },
    update: (entity) => {
        return db.update("orderproduct", entity);
    },
};