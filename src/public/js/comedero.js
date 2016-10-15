var SerialPort = require('serialport');
var serialport = new SerialPort("/COM14");

function liberar(){	
    serialport.write(">x", function (err, result) {
	    if (err) {
	        console.log('Error2: ' + err);
	    }
        console.log('Liberando Racion');    
    });
}
function abrir(){
    serialport.write(">i", function (err, result) {
	    if (err) {
	        console.log('Error2: ' + err);
	    }
        console.log('Abriendo Compuerta');    
    });
}
function cerrar(){	
    serialport.write(">j", function (err, result) {
	    if (err) {
	        console.log('Error2: ' + err);
	    }
        console.log('Cerrando Compuerta');    
    });
}     
function leer(){
	serialport.on('open', function() {
	    serialport.write('main screen turn on', function(err) {
		    if (err) {
		      return console.log('Error no conectado: ', err.message);
		    }
		    console.log('conectado');
	    });
		/*recibiendo la hora del comedero*/
		serialport.on('data', function(data){
	        /*lo recibido paso a una variable cadena para luego pasar a string*/
	        var cadena = data;
	        var imprimir = cadena.toString();
	        /*quitando espacios de la cadena*/
	        var corto = imprimir.trim();
	        /*obviando el primer valor obtenido de la cadena*/
	        enviar = corto.substring(1);
	        /*temporizador para enviar el comando al comedero e imprimir el resultado cada 2 seg */
	        setTimeout(function() {
	          console.log(enviar); 
	          serialport.write(">1");
	        }, 2000);  
	    });
    });
}    
        
// open errors will be emitted as an error event
serialport.on('error', function(err) {
  console.log('Error: ', err.message);
});