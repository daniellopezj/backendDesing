var express = require('express');
var app = express();
var morgan = require('morgan');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

//Control CORS
app.use(allowCrossDomain);

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//controller
var routes = require('./routes/router');
routes.assignRoutes(app);

//listen
app.listen(3000, function() {
    console.log('app listening on port 3000!');
});

//manager error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Se presento un problema!');
});

module.exports = app;