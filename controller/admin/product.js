
//Get all employees
app.get('/admin/product', (req, res) => {
    mysqlConnection.query('SELECT * FROM test', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});