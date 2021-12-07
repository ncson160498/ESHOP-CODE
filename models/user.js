var db = require("./db");

module.exports = {
    all: () => {
        return db.load("select * from user");
    },
    allUser: () => {
        return db.load("select * from user where admin = false")
    },
    getUserByEmail: (email) => {
        return db.load(`select * from user where email = '${email}'`)
    },
    find: (email, password) => {
        return db.load(
            `select a.* from user where password = ${password} and email = ${email}`
        );
    },
    update: entity => {
        return db.update("account", "id", entity);
    },
    getUserById: id => {
        return db.load(`select * from user where id=${id}`)
    },
    addNewUser: (entity) => {
        return db.add('user', entity)
    },
};