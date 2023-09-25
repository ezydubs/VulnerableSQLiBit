const mysql = require('mysql');

const connect = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : 'roots',
    database : 'nodelogin'
});

module.exports = {
    connect
}