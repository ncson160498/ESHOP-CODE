

var mysql = require("mysql")


var createConnection = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shop',
    port:'3306',
    multipleStatements: true,
    charset: 'utf8mb4'
  })
}


module.exports = {

  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection()
      connection.connect()
      connection.query(sql, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
        connection.end()
      })
    })
  },
  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert into ${tableName} set ?`
      var connection = createConnection();
      connection.connect();
      connection.query(sql, entity, (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.insertId);
        }
        connection.end();
      });
    })
  },
  update: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `UPDATE ${tableName} set ? WHERE id = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, [entity, entity.id], (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.changedRows);
        }
        connection.end();
      });
    })
  },
  delete: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `DELETE from ${tableName} WHERE id = ?`;
      var connection = createConnection();
      connection.connect();
      connection.query(sql, entity.id, (error, value) => {
        if (error)
          reject(error);
        else {
          resolve(value.affectedRows);
        }
        connection.end();
      });
    });
  },
}