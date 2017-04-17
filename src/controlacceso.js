var http = require('http');
var url = require('url');

var SerialPort = require("serialport");
var com = new SerialPort("COM12");

var usuario1 = '_e4_0e_09_6f';
var alarma = 0;

http.createServer(function(peticion, respuesta){ 
   var query = url.parse(peticion.url,true).query;
   var puerta = query.puerta;
   var codigo = query.codigo;
   respuesta.writeHead(200, {'Content-Type': 'text/html'});
   respuesta.end(puerta);

   if (puerta === '0') {
      console.log('Puerta abierta');
      if (alarma === 0) {
         console.log('Entrada habilitada.');
      } else {
  	 com.write('<1');   
         console.log('Alarma activada!.');        
      }
   }
   if (puerta === '1') {
      console.log('Puerta cerrada');
      alarma = 1;
   }
   if (codigo === '_e4_0e_09_6f') {
      alarma = 0;
      console.log('Usuario registrado. Alarma desbloqueada.');
      com.write('<0');
   }  
   
}).listen(8000);
console.log('Servidor iniciado.');

com.on('error', function(err){
   console.log('Error: ', err.message);
});