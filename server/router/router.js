const { Router } = require('express');
const router = Router();
var count = 1;
var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dbprojectdesing',
    port: 3306
});

con.connect();

router.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    con.query('SELECT * from empresa', function(error, results, fields) {
        if (error) throw error
        res.send(results);
    });
});

router.get('/distribuido', function(req, res) {
    if (count < 10) {
        res.send('http://localhost:3000/text');
    } else {
        res.send('<a href="http://192.168.1.110:3000">dirigete a esta direccion</a>');
    }
});

router.get('/image', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.sendFile('F:/ESCRITORIO/server/descarga.jpg');
});

router.get('/text', function(req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.send('Base');
});

//con.end();

module.exports = router;