var con;
var multer = require('multer')
var urlImage = "";
const path = require('path');
var Jimp = require("jimp");
var nodemailer = require('nodemailer');

var bash = require('cron').CronJob;
new bash('0 10 * * * *', function() {
    process_bash("no disponible");
}, null, true);

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

exports.InfoOnePage = function(req, res) {
    try {
        var id = req.params.id;
        con.query(`select p.nombre_proyecto , d.fecha, d.disenio, d.nombre_diseniador,d.apellido_diseniador,d.email_diseniador
        from detalle_disenio d,proyecto p, empresa e
        where d.id_proyecto = p.id_proyecto 
        and e.id_empresa = p.id_empresa
        and e.id_empresa = ${id}
        and d.estado = 'disponible'
        order by d.fecha desc`, function(error, results, fields) {
            if (results.length == 0) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    "responseCode": 400,
                    "message": "datos no encontrados",
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

function process_bash(stado) {
    try {
        con.query(`select * from detalle_disenio where estado = '${stado}'`, function(error, results, fields) {
            if (results.length != 0) {
                for (const key in results) {
                    var fileName = `${__dirname}/../uploads/${results[key].disenio}`;
                    writeImage(fileName, results[key]);
                    sendEmail(results[key]);
                    con.query(` UPDATE detalle_disenio SET estado = 'disponible' WHERE id_disenio = '${results[key].id_disenio}'`, function(error, results, fields) {

                    });
                }
            } else {
                console.log('no hay imagenes para procesar');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function writeImage(fileName, object) {
    var loadedImage;
    Jimp.read(fileName)
        .then(function(image) {
            loadedImage = image;
            loadedImage.resize(800, 600)
            return Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
        })
        .then(function(font) {
            loadedImage.print(font, 70, 20, object.nombre_diseniador + " " + object.apellido_diseniador).write(fileName);
        })
        .catch(function(err) {
            console.error(err);
        });
    console.log("marca de agua agregada a " + object.disenio)
}

function sendEmail(object) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: 'worid.desingmatch@gmail.com',
            pass: 'desingmatch123'
        }
    });
    var mensaje = `Señor(@) ${object.nombre_diseniador} ${object.apellido_diseniador} su publicacion se a realizado exitosamente`;
    var mailOptions = {
        from: 'team MatchDesing',
        to: object.email_diseniador,
        subject: 'Notificacion publicacion',
        text: mensaje
    };

    console.log("sending email", mailOptions);
    transporter.sendMail(mailOptions, function(error, info) {
        console.log("senMail returned!");
        if (error) {
            console.log("ERROR!!!!!!", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}