var con;
exports.sendconnection = function(cone) {
    con = cone;
}
exports.getempresa = function(req, res) {
    try {
        con.query('SELECT * from empresa', function(error, results, fields) {
            if (error) throw error
            res.send(results);
        });
    } catch (error) {
        console.log(error);
    }
}

exports.maxId = function(req, res) {
    try {
        con.query('select max(id_empresa) as mayor from empresa ', function(error, results, fields) {
            if (error) throw error
            res.send(results);
        });
    } catch (error) {
        console.log(error);
    }
}

exports.login = function(req, res) {
    try {
        con.query(`select * from empresa where email_empresa = '${req.body.email}' and contrasenia  = '${req.body.password}'`, function(error, results, fields) {
            if (results.length == 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    "responseCode": 400,
                    "message": "error",
                    "object": ""
                }));
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    "responseCode": 200,
                    "message": "OK",
                    "object": results
                }));
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports.postEmpresa = function(req, res) {
    try {
        con.query(`INSERT INTO empresa (nombre_empresa, email_empresa,contrasenia,url) VALUES ('${req.body.nombre_empresa}', '${req.body.email_empresa}','${req.body.contrasenia}','${req.body.url}')`, function(error, results, fields) {
            if (error) throw error
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                "responseCode": 200,
                "message": "datos almacenados",
                "object": ""
            }));
        });
    } catch (error) {
        console.log(error);
    }
}

exports.directionCompany = function(req, res) {
    try {
        var url = req.params.url;
        con.query(`select * from empresa where url = '${url}'`, function(error, results, fields) {
            if (results.length == 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    "responseCode": 400,
                    "message": "error",
                    "object": ""
                }));
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    "responseCode": 200,
                    "message": "OK",
                    "object": results
                }));
            }
        });
    } catch (error) {
        console.log(error);
    }
}