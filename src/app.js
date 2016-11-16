var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

/*var SerialPort = require('serialport');
  var serialport = new SerialPort("/COM13", {
  baudRate: 115200
});
/*var SerialPort = require('serialport');
var serialport = new SerialPort("/COM14", {
  baudRate: 9600
});*/

//enviar3();
var config = require('./config/config');
/**********empezamos a declarar nuestro controlador****************/
var webPublico = require('./controllers/web/webPublico');
var routesAPI = require('./controllers/routesAPI');
var routesWEB = require('./controllers/routesWEB');
var app = express();


/**
 * Configuración y seteo de Express
 */

// Las variables locals son para la renderización de todos los templates
// dentro de la aplicación. Son utiles para proveer de funciones Helpers
// a los templates, así como datos globales a nivel del app
app.locals.application  = config.name;
app.locals.version      = config.version;
app.locals.description  = config.description;
app.locals.author       = config.author;
app.locals.keywords     = config.keywords;
app.locals.ga           = config.ga;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('layout', 'layout'); // layout por defecto

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public','img','icon', 'icono.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// If you want to simulate DELETE and PUT
// in your app you need methodOverride.
// override with POST having
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


// Keep user, csrf token and config available
app.use(function (req, res, next) {
  //console.log(req);
  res.locals.user = req.user;
  res.locals.config = config;
  res.locals._csrf = "req.csrfToken()";
  next();
});

/*
  este router va a estar montado bajo /api, es decir router.use( '/usuario', usuario )
  va a montar el controlador usuario bajo /api/usuario.
*/


app.use('/api', routesAPI);
app.use('/web', routesWEB);
app.use('/', webPublico);


/*
  esta ruta es para el controlador de páginas estáticas, va a estar montada en la raíz
*/

//app.use('/', estatico);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/**************valores en buffer de los comandos para leer el id de la orejera**************/
/*var buffer = new Buffer(5);
buffer[0] = 0xA0;   
buffer[1] = 0x03;  
buffer[2] = 0xFF;  
buffer[3] = 0x79;   
buffer[4] = 0xE5;
var buffer2 = new Buffer(6);
buffer2[0] = 0xA0;   
buffer2[1] = 0x04;  
buffer2[2] = 0x01;  
buffer2[3] = 0x74;   
buffer2[4] = 0x00;
buffer2[5] = 0xE7;
var buffer3 = new Buffer(6);
buffer3[0] = 0xA0;   
buffer3[1] = 0x04;  
buffer3[2] = 0x01;  
buffer3[3] = 0x89;   
buffer3[4] = 0x01;
buffer3[5] = 0xD1;

/*function enviar1(){
  serialport.on('open', function() {
    console.log('conectado a enviar1');
    setTimeout(function(){
      serialport.write(buffer, function(err) {
        if (err) {
          return console.log('Error: ', err.message);
        }
        console.log('B1');
      });
    }, 1000);
  });
}
function enviar2(){
  serialport.on('open', function() {
    console.log('conectado a enviar1');
    setTimeout(function(){
      serialport.write(buffer2, function(err) {
        if (err) {
          return console.log('Error: ', err.message);
        }
        console.log('B2');
      });
    }, 2000);
  });
}
function enviar3(){
  serialport.on('open', function() {
    console.log('conectado a enviar1');
    setTimeout(function(){
      serialport.write(buffer3, function(err) {
        if (err) {
          return console.log('Error: ', err.message);
        }
        console.log('B3');
      });
    }, 1000);
  });
}

serialport.on('data', function(data) {
  var buff = new Buffer(data, 'utf8'); //no sure about this
  
  var imprimir = buff.toString('hex');
  var cmd = imprimir.charAt(3);
  var enviar = imprimir.slice(14,-4); 
  console.log('este es cmd********', cmd);
  //console.log('valor**************', enviar);
  if(cmd == 3){
    console.log('soy id del lector',enviar);
  }else{
    console.log('soy el detalle', enviar);
  }

}); 
// open errors will be emitted as an error event
serialport.on('error', function(err) {
  console.log('Error: ', err.message);
});
*/




module.exports = app;