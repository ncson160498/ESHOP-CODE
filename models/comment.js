const db = require("./db");

module.exports = {
    all: () => {
        return db.load("select * from comment");
    },
    getByIdProduct: (id,perPage, skip) => {

        if(perPage != -1)
            var sql = `SELECT * FROM comment where product_id = ${id} LIMIT ${skip},${perPage}`;
        else
            var sql = `SELECT * FROM comment where product_id = ${id}`;
        return db.load(sql);
    },
    // find: (id, skip) => {
    //     return db.load(
    //         `select * from comment where product_id = ${id} LIMIT 9,${skip}`
    //     );
    // },
    getByUserId: (id) => {
        return db.load(`SELECT * FROM comment where userId = ${id}`);
    },
    update: (entity) => {
        return db.update('comment', entity);
    },
    addcomment: (entity) => {
        return db.add('comment', entity)
    },
    deletecomment: (entity) =>{
        return db.delete('comment', entity)
    }
};