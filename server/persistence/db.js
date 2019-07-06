exports.CrearConexion = function() {
    var mysql = require('mysql');
    return con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'dbprojectdesing',
        port: 3306
    });
}