var con;;
var multer = require('multer')
var urlImage = "";
var listImage = [];
var fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Math.floor(Math.random() * 1000) + file.originalname);
    }
});

const upload = multer({ storage: storage });

exports.sendconnection = function(cone) {
    con = cone;
}

exports.postDetails = function(app) {
    app.post('/Desing', function(req, res) {
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try {
            con.query(`INSERT INTO detalle_disenio (id_proyecto, estado,fecha,disenio,precio,nombre_diseniador,apellido_diseniador,email_diseniador) 
            VALUES (${req.body.id_proyecto}, '${req.body.status}','${date}','${req.body.disenio}',${req.body.precio},'${req.body.nombre_diseniador}','${req.body.apellido_diseniador}','${req.body.email_diseniador}')`, function(error, results, fields) {
                if (error) throw error
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    "responseCode": 200,
                    "message": "Diseño almacenado, se notificara su pubicacion via email.",
                    "object": ""
                }));
            });
        } catch (error) {
            console.log(error);
        }
    })
    app.post('/DesingImage', upload.single('disenio'), function(req, res, next) {
        urlImage = req.file.filename
        try {
            res.end(JSON.stringify({
                "responseCode": 200,
                "message": "OK",
                "object": urlImage
            }));
        } catch (error) {
            res.end(JSON.stringify({
                "responseCode": 400,
                "message": "error",
                "object": ""
            }));
        }
    })
}

exports.showDesing = function(req, res) {
    try {
        var id = req.params.id;
        con.query(`select * from detalle_disenio where id_proyecto = ${id} order by fecha desc`, function(error, results, fields) {
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

exports.sendImages = function(req, res) {
    try {
        var nameImage = req.params.id;
        res.sendFile(path.join(__dirname, '../uploads/', nameImage));
    } catch (error) {
        res.send('error');
    }
}