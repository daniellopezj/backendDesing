var express = require('express');
var app = express();
var morgan = require('morgan');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

//services
app.use(require('./router/router'));

//listen
app.listen(3000, function() {
    console.log('app listening on port 3000!');
});

//manager error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Se presento un problema!');
});