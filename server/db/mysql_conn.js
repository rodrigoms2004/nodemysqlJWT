const mysql = require('mysql');

const execSQLQuery = (sqlQry, res, id) => {
    const connection = mysql.createConnection({
        host        : '172.16.105.153 ',
        port        : '3306',
        user        : 'user01',
        password    : 'cisco123',
        database    : 'nodemysql_db'
    })
    
    const connR = connection.query(sqlQry, [id], (error, results, fields) => {
        if(error) {
            res.json(error)
        } else {
            res.id = results
            return res.id
            // res.json(results)
        }
        connection.end()
        console.log('executou!')
    })
}

module.exports = {execSQLQuery}