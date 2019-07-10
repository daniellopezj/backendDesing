var con;;
var multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

exports.sendconnection = function(cone) {
    con = cone;
}

exports.postDetails = function(app) {
    app.post('/Desing', upload.single('disenio'), function(req, res, next) {
        console.log(req.file)
        console.log(req.body.name);
        try {
            res.end(JSON.stringify({
                "responseCode": 200,
                "message": "OK",
                "object": ""
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