var empresa = require('../services/Empresa')
var proyecto = require('../services/Proyecto')
var detalle = require('../services/detalle_disenio')

var db = require('../persistence/db');
var con = db.CrearConexion();

con.connect();

exports.assignRoutes = function(app) {

    //MANEJO DE EMPRESA
    empresa.sendconnection(con);
    app.get('/empresa', empresa.getempresa);
    app.get('/maxId', empresa.maxId);
    app.get('/:url', empresa.directionCompany);
    app.post('/login', empresa.login);
    app.post('/empresa', empresa.postEmpresa);

    //MANEJO DE PROYECTO
    proyecto.sendconnection(con);
    app.get('/showprojects/:id', proyecto.showProjects);
    app.post('/showprojects', proyecto.postProjects);
    app.put('/showprojects', proyecto.putProjects);
    app.delete('/showprojects/:id', proyecto.deleteProjects);
    app.get('/selectProject/:id', proyecto.selectProject);
    //MANEJO DE Diseños
    detalle.sendconnection(con);
    detalle.postDetails(app);
    app.get('/showDesing/:id', detalle.showDesing);
    app.get('/loadFile/:id', detalle.sendImages);
    app.get('/InfoOnePage/:id', detalle.InfoOnePage);
}