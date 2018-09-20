// pool-factory.js

const mysql = require('mysql');

const pool = mysql.createPool({
    host: '172.16.105.153',
    user: 'user01',
    password: 'cisco123',
    port: 3306,
    connectionLimit: 200,
    connectTimeout: 2000,
    queueLimit: 0,
    debug: false,
    waitForConnection: true,
    compression: true
});

// database    : 'nodemysql_db'

console.log('pool => created');

pool.on('release', () => console.log('pool => connection returned'));

try {

    process.on('SIGINT', () => 
    pool.end(err => {
        if(err) return console.log(err);
        console.log('pool => closed');
        process.exit(0);
    })
); 


} catch(e) {
    console.log(e);
}

module.exports = pool;

// example!
// const pool = require('./pool-factory');