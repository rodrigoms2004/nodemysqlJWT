// CREATE DATABASE nodemysql_db;
// use nodemysql_db;

// GRANT ALL on nodemysql_db.* TO 'user01'@'localhost' identified by 'cisco123';
// GRANT ALL on nodemysql_db.* TO 'user01'@'%' identified by 'cisco123';


// http://www.luiztools.com.br/post/como-usar-nodejs-mysql/#11
// http://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
// https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52

const mysql = require('mysql')
const connection = mysql.createConnection({
    host        : '172.16.105.153 ',
    port        : '3306',
    user        : 'user01',
    password    : 'cisco123',
    database    : 'nodemysql_db'
})

connection.connect( (err) => {
    if(err) return console.log(err)
    console.log('conectou!')
    createTable(connection)
    addRows(connection)
    createTableUsers(connection)
    addUsers(connection)
})

// function createTable(conn) {
const createTable = (conn) => {
    const sql = "CREATE TABLE IF NOT EXISTS Clientes (\n"+
                "ID int NOT NULL AUTO_INCREMENT,\n"+
                "Nome varchar(150) NOT NULL,\n"+
                "CPF char(11) NOT NULL,\n"+
                "PRIMARY KEY (ID)\n"+
                ");";

    conn.query(sql, (error, results, fields) => {
        if(error) return console.log(error)
        console.log('criou a tabela!')
    })
}

const addRows = (conn) => {
  const sql = "INSERT INTO Clientes(Nome,CPF) VALUES ?";
  const values = [
        ['teste1', '12345678901'],
        ['teste1', '09876543210'],
        ['teste3', '12312312399']
      ];
  conn.query(sql, [values], (error, results, fields) => {
          if(error) return console.log(error);
          console.log('adicionou registros!');
          conn.end();//fecha a conexão
      });
}

const createTableUsers = (conn) => {
    const sql = "CREATE TABLE IF NOT EXISTS Users (\n"+
                "ID int NOT NULL AUTO_INCREMENT,\n"+
                "USERNAME varchar(150) NOT NULL,\n"+
                "PASSWORD varchar(150) NOT NULL,\n"+
                "PRIMARY KEY (ID)\n"+
                ");";

    conn.query(sql, (error, results, fields) => {
        if(error) return console.log(error)
        console.log('criou a tabela users!')
    })
}

const addUsers = (conn) => {
    const sql = "INSERT INTO Users(USERNAME, PASSWORD) VALUES ?";
    const values = [
          ['luiz', '123'],
          ['rodrigo', '456'],
          ['teste', 'teste2018']
        ];
    conn.query(sql, [values], (error, results, fields) => {
            if(error) return console.log(error);
            console.log('adicionou registros!');
            conn.end();//fecha a conexão
        });
  }
  