var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dbprojectdesing'
});

connection.connect();

connection.query('SELECT * from empresa', function(error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();