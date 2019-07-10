var con;
exports.sendconnection = function(cone) {
    con = cone;
}

exports.showProjects = function(req, res) {
    try {
        var id = req.params.id;
        con.query(`select * from proyecto where id_empresa = ${id} order by id_proyecto desc`, function(error, results, fields) {
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

exports.postProjects = function(req, res) {
    try {
        con.query(`INSERT INTO proyecto (id_empresa, nombre_proyecto,descripcion,valor_pagar) VALUES (${req.body.id_empresa}, '${req.body.nombre_proyecto}','${req.body.descripcion}',${req.body.valor_pagar})`, function(error, results, fields) {
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

exports.putProjects = function(req, res) {
    try {
        con.query(`update proyecto set nombre_proyecto = '${req.body.nombre_proyecto}',descripcion = '${req.body.descripcion}',valor_pagar=${req.body.valor_pagar} where id_proyecto=${req.body.id_proyecto}`, function(error, results, fields) {
            if (error) throw error
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                "responseCode": 200,
                "message": "datos actualizados",
                "object": ""
            }));
        });
    } catch (error) {
        console.log(error);
    }
}

exports.deleteProjects = function(req, res) {
    var id = req.params.id;
    console.log(id);
    try {
        con.query(`delete from proyecto where id_proyecto=${id}`, function(error, results, fields) {
            if (error) throw error
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                "responseCode": 200,
                "message": "datos eliminados",
                "object": ""
            }));
        });
    } catch (error) {
        console.log(error);
    }
}