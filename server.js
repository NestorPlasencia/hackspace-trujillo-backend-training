'use strict'

// REQUERIMIENTO DE MODULOS

var express =  require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

//CONFIGURACIONES

// Creación del servidor web con express
var server = express();

// Integracion del motor de templates swig
server.engine('html',swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
swig.setDefaults({cache: false});

// Seteo de dirección de carpeta de archivos estaticos
server.use(express.static(__dirname + '/public'));

// Integración de body parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Importacion de rutas
require('./routers')(server);

// CONFIGURACIONES DB

// Integración de mongoose
mongoose.connect('mongodb://NestorPlasencia:123456@ds115446.mlab.com:15446/hackspace', { useMongoClient: true });
mongoose.Promise = global.Promise;

// Requerimiento de modelo speciality
var Speciality = require('./models/speciality'); 

//Requerimiento de modelo user
var User = require('./models/user');

// INICIAR SERVIDOR

// Se corre el servidor en el puerto 8000
server.listen(8000, function() {
	console.log('El servidor esta escuchando en el puerto '+ 8000)
});