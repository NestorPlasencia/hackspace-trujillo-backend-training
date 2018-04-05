'use strict'

// REQUERIMIENTO DE MODULOS

var express =  require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var cors = require('cors');

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

//Configuracion de cors
server.use(cors());

// Importacion de rutas
require('./routers')(server);

// CONFIGURACIONES DB

// Integración de mongoose
mongoose.connect('mongodb://CarlosPlasencia:hola@ds153835.mlab.com:53835/hackspacetrujillo-backend-training-final', { useMongoClient: true });
mongoose.Promise = global.Promise;

// Requerimiento de modelo speciality
var Speciality = require('./models/speciality'); 

//Requerimiento de modelo user
var User = require('./models/user');

// INICIAR SERVIDOR

// Se corre el servidor en el puerto 5000
server.listen(process.env.PORT || 5000, function() {
	console.log('El servidor esta escuchando en el puerto '+ 5000)
});