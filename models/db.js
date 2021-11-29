var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
    multipleStatements: true
  });
  
  mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection success');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
  });

  module.exports = mysqlConnection;