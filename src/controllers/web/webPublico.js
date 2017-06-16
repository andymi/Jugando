'use strict';

// WEB PUBLICO
// =============================================================================
var express = require('express');
var router = express.Router();
//var request = require('request');
var Model = require('../../models/jugando.js');
/***********************alarma***************************
var http = require('http');
var url = require('url');



var SerialPort = require("serialport");
var com = new SerialPort("COM13");

var usuario1 = '_e4_0e_09_6f';
var alarma = 0;

/*****************alarma*******************
http.createServer(function(peticion, respuesta){ 
   var query = url.parse(peticion.url,true).query;
   var puerta = query.puerta;
   var codigo = query.codigo;
   var actual = query.actual;

   console.log("puertaaaaaaaaaaaaaaaaaaaaaaaaaaaa",puerta);
   console.log("codigoooooooooooooooooooooooooooo",codigo);
   console.log("codigoooooooooooooooooooooooooooo",actual);
   
   respuesta.writeHead(200, {'Content-Type': 'text/html'});
   respuesta.end(puerta);
   if (puerta === '0') {
      console.log('Puerta abierta');
      if (alarma === 0) {
        console.log('Entrada habilitada.');
      } else {
        com.write('<1'); 
        /*************************************
        console.log('Alarma activada!.');  
        var nombre = "Alarma Activada!. La Puerta está abierta"; 
        var alarma = "Alarma de Portón"; 

        var index = Model.Alarma.build({
          nombre: nombre,
          alarma: alarma
        });

        index.add(function (success) {
            console.log('Se guardo la alarma'); 
        },
        function (err) {
          console.log(err);
        });
        /*************************************        
      }
   }
   if (puerta === '1') {
      console.log('Puerta igual a cerrada');
      alarma = 1;
   }
  if (codigo ==='a' && puerta === '3') {
    if (actual === '0') {
      console.log('Puerta abierta');
      com.write('<1');
    }
    if (actual === '1') {
      console.log('Puerta cerrada'); 
      alarma = 1;        
    }
  }
   /*************************************leyendo para el lector********************************************************
      var empleado = Model.Empleado.build();
      console.log("codigo",codigo);
      //************************************  
      empleado.retrieveByCodigo(codigo, function (empleadooq) {
        if (empleadooq) {
          alarma = 0;
          console.log('Usuario registrado. Alarma desbloqueada.');
          com.write('<0');
          var f = new Date();
          //new Date().toJSON().slice(0,10)
          var fechaIngreso =  f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate();  
          var horaIngreso = f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
          var observacionIngreso = "Ingreso del Usuario al Corral";
          var EmpleadoIdEmpleado=  empleadooq.idEmpleado;

          var index = Model.IngresoCorral.build({
            fechaIngreso: fechaIngreso,
            horaIngreso: horaIngreso,
            observacionIngreso: observacionIngreso,
            EmpleadoIdEmpleado: EmpleadoIdEmpleado
          });

          index.add(function (success) {
            console.log('Se guardo el acceso');
          },
          function (err) {
            console.log(err);
          });
        } else{
          alarma = 1;   
          console.log('Alarma activada!.');
        }
      }, function (error) {
        console.log('Empleado no encontrado',error);
      });
}).listen(8000);
console.log('Servidor iniciado.');

com.on('error', function(err){
   console.log('Error: ', err.message);
});


/*******************************sector lector**************************************************/

var idlector = "";
var valor ="";
var SerialPort = require('serialport');
var serialport = new SerialPort("/COM12", {
  baudRate: 115200
});
var buffer3 = new Buffer(6);
buffer3[0] = 0xA0;   
buffer3[1] = 0x04;  
buffer3[2] = 0x01;  
buffer3[3] = 0x89;   
buffer3[4] = 0x01;
buffer3[5] = 0xD1;

serialport.on('data', function(data) {
  var buff = new Buffer(data, 'utf8');   
  var imprimir = buff.toString('hex');
  var cmd = imprimir.charAt(3);
  var enviar = imprimir.slice(14,-4); 
  if(cmd == 3){
    console.log('este es cmd********', cmd);
    idlector = enviar.trim();
    console.log('soy id del lector',idlector);
    var animal = Model.Animal.build();
    console.log('estoy adentro y tengo el id:',idlector);
    animal.retrieveByTag(idlector, function (animales) {
      if (animales) {
        //console.log(animales);          
        valor = animales.idAnimal;
        console.log('soy animalid--------',valor);
      }else{
        console.log("error");
        serialport.write(buffer3);
      }
    });
  }
}); 
// open errors will be emitted as an error event
serialport.on('error', function(err) {
  console.log('Error: ', err.message);
});






/******************************************************************************/

var horaC="";
var horasC="";
var nivelC="";
var pesoBatea="";
var pesoRacionC="";
var pesoBateaC="";
var idInsumoC="";
var consumoId="";
var niv = 5;

var SerialPort = require('serialport');
var parsers = require('serialport').parsers;
var port = new SerialPort("/COM14", {
  baudRate: 9600,
  parser: parsers.readline('\r\n')
});
leerNivel();
leerPesoyRacion();
leerHora();
/************************leer el nivel actual del comedero***********************/
function leerNivel(){
  port.on('open', function() {
    port.write('main screen turn on', function(err) {
       if (err) {
         return console.log('Error: ', err.message);
       }
       console.log('mensaje 2 escrito');
    });
    setTimeout(function(){
      port.write('>2', function(err) {
        if (err) {
          return console.log('Error: ', err.message);
        }
        console.log('cmd 2');
      });
    }, 1000);
  });
}

/*************leer la hora actual del comedero*********************/
function leerHora(){
  port.on('open', function() {
    port.write('main screen turn on', function(err) {
       if (err) {
         return console.log('Error: ', err.message);
       }
       console.log('mensaje 1 escrito');
    });
    setTimeout(function(){
      port.write('>1', function(err) {
        if (err) {
          return console.log('Error: ', err.message);
        }
        console.log('cmd 1');
      });
    }, 3000);
  });
}
/*************leer el peso actual del comedero********************/
function leerPesoyRacion(){
  port.on('open', function() {
    port.write('main screen turn on', function(err) {
       if (err) {
         return console.log('Error: ', err.message);
       }
       console.log('mensaje 4 escrito');
    });
    setTimeout(function(){
      port.write('>4', function(err) {
        if (err) {
          return console.log('Error: ', err.message);
        }
        console.log('cmd 4');
      });
    }, 2000);
  });
}
/***************funcion para leer datos recibidos del comedero*******************/
//setTimeout(function(){
port.on('data', function(data) {
  var imprimir = data.toString();
  var cmd = imprimir.charAt(0);
  var enviar = imprimir.substring(1); 
  console.log('valor**************', imprimir);   
  if (cmd == 1) {
    console.log('dentro de cmd 1',cmd); 
    horaC = enviar.trim();
    console.log('hora:', horaC);
  } else if(cmd == 2){
    console.log('dentro de cmd 2',cmd); 
    nivelC = enviar.trim();
    console.log('nivel:', nivelC);
  } else if(cmd == 4){
    console.log('dentro de cmd 4',cmd); 
    pesoRacionC = '2';
    console.log('pesoRacion:', pesoRacionC);
  }else if(cmd == 3){
    console.log('dentro de cmd 3',cmd); 
    pesoBatea = enviar.trim();
    console.log('pesoBatea:', pesoBatea);
    var detalleConsumo = Model.DetalleConsumo.build();
    detalleConsumo.retrieveId(function (detalleQ) {
      if (detalleQ) {
        console.log('dentro de detalleQ ultimo id del detalle consumo>', detalleQ[0].dataValues['idDetalleConsumo']);
        var idDetalleQ = detalleQ[0].dataValues['idDetalleConsumo'];
        detalleConsumo.updateById2(idDetalleQ,pesoBatea,function (success) {
          if (success) {
            console.log('se guardo la sobra');
          } else {
            console.log('Detalle Consumo1 no encontrado');
          }
        }, function (error) {
          console.log('Detalle Consumo2 no encontrado');
        });
      } else {
        console.log('Detalle Consumo3 no encontrado');
      }
    }, function (error) {
      res.send('Detalle Consumo4 no encontrado');
    });

  } else if(cmd == "x"){
    //serialport.write(buffer3);         
    console.log('dentro de cmd x',cmd); 
    horasC = imprimir.substring(1,9);
    console.log('horas:', horasC);
    //pesoBateaC = imprimir.slice(9,-1);  
    pesoBateaC  = '2';  
    console.log('pesoBatea:', '2');
    idInsumoC = imprimir.slice(-1); 
    console.log('idInsumo:', idInsumoC);
    serialport.write(buffer3);      
    var f = new Date();
    var fecha = f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate();
    var consumo = Model.Consumo.build();
    var stock = Model.Stock.build();
    serialport.write(buffer3);
    var index = Model.Consumo.build({
      fechaConsumo: fecha,
      horaConsumo: horasC,
      InsumoIdInsumo: idInsumoC
    });   
    serialport.write(buffer3);   
    index.add(function (success) {
      console.log("listo cabecera");
      serialport.write(buffer3);
      consumo.retrieveId(function (consumoQ) {
        if (consumoQ) { 
            consumoId = consumoQ[0].dataValues['idConsumo'];
            console.log("soy consumoId*********", consumoId);
            var index2 = Model.DetalleConsumo.build({
              cantidad: 2,
              observacion: "Consumo de Balanceados",
              AnimalIdAnimal: valor,
              ConsumoIdConsumo: consumoId
            });         
      
            index2.add(function (success) {
              console.log("dentro"); 
                stock.retrieveByInsumo(consumoId, pesoBateaC, function (detalleConsumos) {
                  if (detalleConsumos) { 
                    console.log("listo xfin");  
                    index2.guardar(consumoId, function (detalleConsumoss) {
                      if (detalleConsumoss) {          
                        console.log('se guardo el total del consumo');
                      } else {
                       console.log('No se puede cargar el total del consumo');
                      }
                    },function (err) {
                        console.log('Error al intentar cargar el total del consumo',err);
                    });     
                  } else {
                    console.log('No se encontraron detalles');
                  }
                }, function (error) {
                  console.log('Detalle no encontrado');
                }); 
            },
            function (err) {
              console.log('error aca', err);
            });
        }else {
          console.log('No se encontraron Consumos');
        }
      });
    },
    function (err) {
      console.log(err);
    });
  }
});
//}, 1000);

/*********************************************************************/
router.get('/abrir', function (req, res) {
  console.log('dentro de abrir');
  port.write('>i');
});

/*router.get('/abrir', function (req, res) {
  console.log('dentro de abrir');
  port.write('<1');
});
/********************************************************************/
router.get('/cerrar', function (req, res) {
  console.log('dentro de cerrar');
  port.write('>j');
});
/*
router.get('/cerrar', function (req, res) {
  console.log('dentro de cerrar');
  port.write('<0');
});
/********************************************************************/
router.get('/liberar', function (req, res) {
  console.log('dentro de liberar');
  console.log('obteniendo id del animal');
  port.write('>x');
});
/********************************************************************/
router.get('/sobra', function (req, res) {
  console.log('dentro de sobra');
  console.log('obteniendo id del animal');
  port.write('>3');
});
/***************************************************************************/
router.get('/', function (req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.render('publico/home/indexa.jade');
    }
  });  
});
/****************************************************************************/
router.get('/perfil', function (req, res) {
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');            
  }
  var nivelUsuario = req.session.user.Nivel['nivel'];
  console.log('soy nivelUsuario', nivelUsuario);
  if(nivelUsuario =='admin'){
    mensaje.retriveCount(function (mensaje1) { 
      console.log('mensaje1', mensaje1);
      if (mensaje1) {     
        mensaje.retrieveAll(function (mensaje2) {
          console.log('mensaje2', mensaje2);
          if (mensaje2) {  
            console.log(req.body);
            alarma.retriveCount(function (alarma1) { 
              console.log('alarma1', alarma1);
              if (alarma1) {     
                alarma.retrieveAll(function (alarma2) {
                  console.log('alarma2', alarma2);
                  if (alarma2) {  
                    console.log(req.session);  
                    var usuario = req.session.user.usuario;
                    var pass = req.session.user.pass;
                    var fechaCreacion = req.session.user.fechaCreacion;
                    res.render('web/index/perfil.jade',{
                      alarmas1: alarma1,
                      alarmas2: alarma2,
                      mensajes: mensaje1,
                      mensajeria: mensaje2,
                      usuarios: usuario,
                      passs: pass,
                      fechaCreacions: fechaCreacion
                    });
                  }else {
                    res.send(401, 'No se encontraron Alarmas');
                  }
                }, function (error) {
                  res.send('Alarma no encontrado');
                });
              } else {
                res.send(401, 'No se encontraron Alarmas');
              }
            }, function (error) {
              res.send('Alarma no encontrado');
            });
            
          }else {
            res.send(401, 'No se encontraron Mensajes');
          }
        }, function (error) {
          res.send('Mensaje no encontrado');
        });
      } else {
        res.send(401, 'No se encontraron Mensajes');
      }
    }, function (error) {
      res.send('Mensaje no encontrado');
    });
  } else{
    mensaje.retriveCount(function (mensaje1) { 
      console.log('mensaje1', mensaje1);
      if (mensaje1) {     
        mensaje.retrieveAll(function (mensaje2) {
          console.log('mensaje2', mensaje2);
          if (mensaje2) {  
            console.log(req.body);

            alarma.retriveCount(function (alarma1) { 
              console.log('alarma1', alarma1);
              if (alarma1) {     
                alarma.retrieveAll(function (alarma2) {
                  console.log('alarma2', alarma2);
                  if (alarma2) {  
                    console.log(req.body);
                    var usuario = req.session.user.usuario;
                    var pass = req.session.user.pass;
                    var fechaCreacion = req.session.user.fechaCreacion;
                    res.render('web/index/errores.jade',{
                      alarmas1: alarma1,
                      alarmas2: alarma2,
                      mensajes: mensaje1,
                      mensajeria: mensaje2,
                      usuarios: usuario,
                      passs: pass,
                      fechaCreacions: fechaCreacion
                    });
                  }else {
                    res.send(401, 'No se encontraron Alarmas');
                  }
                }, function (error) {
                  res.send('Alarma no encontrado');
                });
              } else {
                res.send(401, 'No se encontraron Alarmas');
              }
            }, function (error) {
              res.send('Alarma no encontrado');
            });
            
          }else {
            res.send(401, 'No se encontraron Mensajes');
          }
        }, function (error) {
          res.send('Mensaje no encontrado');
        });
      } else {
        res.send(401, 'No se encontraron Mensajes');
      }
    }, function (error) {
      res.send('Mensaje1 no encontrado');
    });
  }
});
/****************************************************************************/
router.get('/reportes', function (req, res) {
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');               
  }
  var nivelUsuario = req.session.user.Nivel['nivel'];
  console.log('soy nivelUsuario', nivelUsuario);
  if(nivelUsuario =='admin'){
    mensaje.retriveCount(function (mensaje1) { 
      console.log('mensaje1', mensaje1);
      if (mensaje1) {     
        mensaje.retrieveAll(function (mensaje2) {
          console.log('mensaje2', mensaje2);
          if (mensaje2) {  
            console.log(req.body);

            alarma.retriveCount(function (alarma1) { 
              console.log('alarma1', alarma1);
              if (alarma1) {     
                alarma.retrieveAll(function (alarma2) {
                  console.log('alarma2', alarma2);
                  if (alarma2) {  
                    console.log(req.body);
                    var usuario = req.session.user.usuario;
                    var pass = req.session.user.pass;
                    var fechaCreacion = req.session.user.fechaCreacion;
                    console.log('soy nivelUsuario', nivelUsuario);
                    res.render('web/index/reportes.jade',{
                      alarmas1: alarma1,
                      alarmas2: alarma2,
                      mensajes: mensaje1,
                      mensajeria: mensaje2,
                      usuarios: usuario,
                      passs: pass,
                      fechaCreacions: fechaCreacion
                    });
                  }else {
                    res.send(401, 'No se encontraron Alarmas');
                  }
                }, function (error) {
                  res.send('Alarma no encontrado');
                });
              } else {
                res.send(401, 'No se encontraron Alarmas');
              }
            }, function (error) {
              res.send('Alarma no encontrado');
            });
            
          }else {
            res.send(401, 'No se encontraron Mensajes');
          }
        }, function (error) {
          res.send('Mensaje no encontrado');
        });
      } else {
        res.send(401, 'No se encontraron Mensajes');
      }
    }, function (error) {
      res.send('Mensaje1 no encontrado');
    });
  }else{
    mensaje.retriveCount(function (mensaje1) { 
      console.log('mensaje1', mensaje1);
      if (mensaje1) {     
        mensaje.retrieveAll(function (mensaje2) {
          console.log('mensaje2', mensaje2);
          if (mensaje2) {  
            console.log(req.body);

            alarma.retriveCount(function (alarma1) { 
              console.log('alarma1', alarma1);
              if (alarma1) {     
                alarma.retrieveAll(function (alarma2) {
                  console.log('alarma2', alarma2);
                  if (alarma2) {  
                    console.log(req.body);
                    var usuario = req.session.user.usuario;
                    var pass = req.session.user.pass;
                    var fechaCreacion = req.session.user.fechaCreacion;
                    res.render('web/index/errores.jade',{
                      alarmas1: alarma1,
                      alarmas2: alarma2,
                      mensajes: mensaje1,
                      mensajeria: mensaje2,
                      usuarios: usuario,
                      passs: pass,
                      fechaCreacions: fechaCreacion
                    });
                  }else {
                    res.send(401, 'No se encontraron Alarmas');
                  }
                }, function (error) {
                  res.send('Alarma no encontrado');
                });
              } else {
                res.send(401, 'No se encontraron Alarmas');
              }
            }, function (error) {
              res.send('Alarma no encontrado');
            });
            
          }else {
            res.send(401, 'No se encontraron Mensajes');
          }
        }, function (error) {
          res.send('Mensaje no encontrado');
        });
      } else {
        res.send(401, 'No se encontraron Mensajes');
      }
    }, function (error) {
      res.send('Mensaje1 no encontrado');
    });
  }
});
/*ruta para redireccionar al comedero donde al renderizar la pagina le paso la 
variable enviar a una variable de la vista llamada horas*/
router.get('/comedero', function(req, res) {
  var mensaje = Model.Mensaje.build();
  var alarma = Model.Alarma.build();
  if(!req.session.user){
    res.render('web/index/404.jade');               
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
           alarma.retriveCount(function (alarma1) { 
              console.log('alarma1', alarma1);
              if (alarma1) {     
                alarma.retrieveAll(function (alarma2) {
                  console.log('alarma2', alarma2);
                  if (alarma2) {
                    var usuario = req.session.user.usuario;
                    var pass = req.session.user.pass;
                    var fechaCreacion = req.session.user.fechaCreacion; 

                    res.render('web/index/Comedero.jade',{
                      alarmas1: alarma1,
                      alarmas2: alarma2,
                      mensajes: mensaje1,
                      mensajeria: mensaje2,
                      niveles: nivelC,
                      horas: horasC,
                      pesoRacion: 2,
                      usuarios: usuario,
                      passs: pass,
                      fechaCreacions: fechaCreacion          
                    }); 
                  }else {
                    res.send(401, 'No se encontraron Alarmas');
                  }
                }, function (error) {
                  res.send('Alarma no encontrado');
                });
              } else {
                res.send(401, 'No se encontraron Alarmas');
              }
            }, function (error) {
              res.send('Alarma no encontrado');
            });
                   
        }else {
          res.send(401, 'No se encontraron Mensajes');
        }
      }, function (error) {
        res.send('Mensajes no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Mensajes');
    }
  }, function (error) {
    res.send('Mensaje no encontrado');
  });
});
//página principal del admin, panel de administración
router.get('/principal', function (req, res) {
	var mensaje = Model.Mensaje.build();
  var stock = Model.Stock.build();
  var consumo = Model.Consumo.build();
  var pesaje = Model.Pesaje.build();
  var muerte = Model.Muertes.build();
  var extraviado = Model.Extraviado.build();
  var sanitacion = Model.Sanitacion.build();  
  var vacunacion = Model.Vacunacion.build();
  var ventas = Model.FacturaVenta.build();
  //************************************
  var alarma = Model.Alarma.build();
  if(!req.session.user){     
    console.log('dentro');                  
    res.render('web/index/404.jade');
  } 
           
  leerCantidadMinima();
  leerHerramienta();
  if(niv <= "5"){
     leerComederoMinima();
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) { 		
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          stock.retrieveAll(function (stockQ) {
            console.log('stockQ', stockQ);
            if (stockQ) {
              consumo.retrieveBar(function (consumobar) {
                console.log('consumobar', consumobar);
                if (consumobar) {
                  pesaje.retrieveLine2(function (pesaje2) {
                    console.log('pesaje2', pesaje2);
                    if (pesaje2) {
                      consumo.retrieveBar2(function (consumobar2) {
                        console.log('consumobar2', consumobar2);
                        if (consumobar2) {
                          consumo.retrieveBar3(function (consumobar3) {
                            console.log('consumobar3', consumobar3);
                            if (consumobar3) {
                              consumo.retrieveBar4(function (consumobar4) {
                                console.log('consumobar4', consumobar4);
                                if (consumobar4) {
                                  consumo.retrieveBar5(function (consumobar5) {
                                    console.log('consumobar5', consumobar5);
                                    if (consumobar5) {
                                      consumo.retrieveBar6(function (consumobar6) {
                                        console.log('consumobar6', consumobar6);
                                        if (consumobar6) {
                                          consumo.retrieveBar7(function (consumobar7) {
                                            console.log('consumobar7', consumobar7);
                                            if (consumobar7) {
                                              pesaje.retrieveLine3(function (pesaje3) {
                                                console.log('pesaje3', pesaje3);
                                                if (pesaje3) {
                                                  pesaje.retrieveLine4(function (pesaje4) {
                                                    console.log('pesaje4', pesaje4);
                                                    if (pesaje4) {
                                                      pesaje.retrieveLine5(function (pesaje5) {
                                                        console.log('pesaje5', pesaje5);
                                                        if (pesaje5) {
                                                          pesaje.retrieveLine6(function (pesaje6) {
                                                            console.log('pesaje6', pesaje6);
                                                            if (pesaje6) {
                                                              pesaje.retrieveLine7(function (pesaje7) {
                                                                console.log('pesaje7', pesaje7);
                                                                if (pesaje7) {
                                                                  stock.retrieveAll2(function (stockN) {
                                                                    console.log('stockN', stockN);
                                                                    if (stockN) { 
                                                                      stock.retrieveAll3(function (stockL) {
                                                                        console.log('stockL', stockL);
                                                                        if (stockL) { 
                                                                          stock.retrieveAll4(function (stockO) {
                                                                            console.log('stockO', stockO);
                                                                            if (stockO) { 
                                                                              consumo.retrievePie(function (consumir) {
                                                                                console.log('consumir', consumir);
                                                                                if (consumir) {
                                                                                  consumo.retrievePie2(function (consumir2) {
                                                                                    console.log('consumir2', consumir2);
                                                                                    if (consumir2) {  
                                                                                      stock.retrieveSAnimal2(function (animal2) {
                                                                                        console.log('animal2', animal2);
                                                                                        if (animal2) {  
                                                                                          pesaje.retrieveLine(function (pesaje) {
                                                                                            console.log('pesaje', pesaje);
                                                                                            if (pesaje) { 
                                                                                              muerte.retrieveSMuerte2(function (muertes) {
                                                                                                console.log('muertes', muertes);
                                                                                                if (muertes) {
                                                                                                  extraviado.retrieveExtraviado(function (extraviado) {
                                                                                                    console.log('extraviado', extraviado);
                                                                                                    if (extraviado) {
                                                                                                      sanitacion.retrieveSanitacion(function (sanitacion) {
                                                                                                        console.log('sanitacion', sanitacion);
                                                                                                        if (sanitacion) {
                                                                                                          vacunacion.retrieveVacunacion(function (vacunacion) {
                                                                                                            console.log('vacunacion', vacunacion);
                                                                                                            if (vacunacion) {
                                                                                                              ventas.retrieveVenta(function (ventas) {
                                                                                                                console.log('ventas', ventas);
                                                                                                                if (ventas) {
                                                                                                                  alarma.retriveCount(function (alarma1) { 
                                                                                                                    console.log('alarma1', alarma1);
                                                                                                                    if (alarma1) {     
                                                                                                                      alarma.retrieveAll(function (alarma2) {
                                                                                                                        console.log('alarma2', alarma2);
                                                                                                                        if (alarma2) {  
                                                                                                                          console.log(req.body);
                                                                                                                          console.log(req.session.user);
                                                                                                                          var usuario = req.session.user.usuario;
                                                                                                                          var pass = req.session.user.pass;
                                                                                                                          var fechaCreacion = req.session.user.fechaCreacion;
                  
                                                                                                                          res.render('web/index/PaginaPrincipal',{ 
                                                                                                                            usuarios: usuario,
                                                                                                                            passs: pass,
                                                                                                                            fechaCreacions: fechaCreacion,
                                                                                                                            mensajes: mensaje1,
                                                                                                                            mensajeria: mensaje2,
                                                                                                                            peso2: pesaje2,
                                                                                                                            peso3: pesaje3,
                                                                                                                            peso4: pesaje4,
                                                                                                                            peso5: pesaje5,
                                                                                                                            peso6: pesaje6,
                                                                                                                            peso7: pesaje7,
                                                                                                                            consumoBar: consumobar,
                                                                                                                            consumoBar2: consumobar2,
                                                                                                                            consumoBar3: consumobar3,
                                                                                                                            consumoBar4: consumobar4,
                                                                                                                            consumoBar5: consumobar5,
                                                                                                                            consumoBar6: consumobar6,
                                                                                                                            consumoBar7: consumobar7,                                                                                                   
                                                                                                                            stock: stockQ,
                                                                                                                            Stock2: stockN,
                                                                                                                            Vtock3: stockL,
                                                                                                                            consumiendo: consumir,
                                                                                                                            Otock4: stockO,
                                                                                                                            consusal: consumir2,
                                                                                                                            animal2: animal2,
                                                                                                                            peso: pesaje,
                                                                                                                            muerted: muertes,
                                                                                                                            extraviados: extraviado,
                                                                                                                            sanitaciones: sanitacion,
                                                                                                                            vacunaciones: vacunacion, 
                                                                                                                            alarmas1: alarma1,
                                                                                                                            alarmas2: alarma2,
                                                                                                                            ventass: ventas                                                                      
                                                                                                                          });
                                                                                                                        }else {
                                                                                                                          res.send(401, 'No se encontraron Alarmas');
                                                                                                                        }
                                                                                                                      }, function (error) {
                                                                                                                        res.send('Alarma no encontrado');
                                                                                                                      });
                                                                                                                    } else {
                                                                                                                      res.send(401, 'No se encontraron Alarmas');
                                                                                                                    }
                                                                                                                  }, function (error) {
                                                                                                                    res.send('Alarma no encontrado');
                                                                                                                  });
                                                                                                                } else {
                                                                                                                  res.send(401, 'No se Encontraron Ventas de Animales');
                                                                                                                }
                                                                                                              }, function (error) {
                                                                                                                res.send('Ventas no encontrado');
                                                                                                              });
                                                                                                            } else {
                                                                                                              res.send(401, 'No se Encontraron Vacunacion de Animales');
                                                                                                            }
                                                                                                          }, function (error) {
                                                                                                            res.send('Vacunacion no encontrado');
                                                                                                          });
                                                                                                        } else {
                                                                                                          res.send(401, 'No se Encontraron Sanitacion de Animales');
                                                                                                        }
                                                                                                      }, function (error) {
                                                                                                        res.send('Sanitacion no encontrado');
                                                                                                      });
                                                                                                    } else {
                                                                                                      res.send(401, 'No se Encontraron Extraviados de Animales');
                                                                                                    }
                                                                                                  }, function (error) {
                                                                                                    res.send('Extraviados no encontrado');
                                                                                                  }); 
                                                                                                } else {
                                                                                                  res.send(401, 'No se Encontraron Muertes de Animales');
                                                                                                }
                                                                                              }, function (error) {
                                                                                                res.send('Muerte no encontrado');
                                                                                              }); 
                                                                                            } else {
                                                                                              res.send(401, 'No se Encontraron Pesajes de Animales');
                                                                                            }
                                                                                          }, function (error) {
                                                                                            res.send('Pesaje no encontrado');
                                                                                          }); 
                                                                                        } else {
                                                                                          res.send(401, 'No se Encontraron Stock de Animales');
                                                                                        }
                                                                                      }, function (error) {
                                                                                        res.send('Stock no encontrado');
                                                                                      });  
                                                                                    } else {
                                                                                      res.send(401, 'No se Encontraron Consumos de Sal Mineral');
                                                                                    }
                                                                                  }, function (error) {
                                                                                    res.send('Consumo de sal no encontrado');
                                                                                  });
                                                                                } else {
                                                                                  res.send(401, 'No se Encontraron Consumos de Balanceados');
                                                                                }
                                                                              }, function (error) {
                                                                                res.send('Consumo no encontrado');
                                                                              });
                                                                            } else {
                                                                              res.send(401, 'No se Encontraron Insumos de Medicamento');
                                                                            }
                                                                          }, function (error) {
                                                                            res.send('Insumo de Medicamento no encontrado');
                                                                          });
                                                                        } else {
                                                                          res.send(401, 'No se Encontraron Insumos de Medicamento');
                                                                        }
                                                                      }, function (error) {
                                                                          res.send('Insumo de Medicamento no encontrado');
                                                                      });
                                                                    } else {
                                                                      res.send(401, 'No se Encontraron Insumos de Sal');
                                                                    }
                                                                  }, function (error) {
                                                                    res.send('Insumo de Sal no encontrado');
                                                                  });
                                                                } else {
                                                                  res.send(401, 'No se Encontraron Pesajes7');
                                                                }
                                                              }, function (error) {
                                                                res.send('Pesaje7 no encontrado');
                                                              });
                                                            } else {
                                                              res.send(401, 'No se Encontraron Pesajes6');
                                                            }
                                                          }, function (error) {
                                                            res.send('Pesaje6 no encontrado');
                                                          });
                                                        } else {
                                                          res.send(401, 'No se Encontraron Pesajes 5');
                                                        }
                                                      }, function (error) {
                                                        res.send('Pesaje5 no encontrado');
                                                      });
                                                    } else {
                                                      res.send(401, 'No se Encontraron Pesajes4');
                                                    }
                                                  }, function (error) {
                                                    res.send('Pesaje4 no encontrado');
                                                  });
                                                } else {
                                                  res.send(401, 'No se Encontraron Pesajes3');
                                                }
                                              }, function (error) {
                                                res.send('Pesaje3 no encontrado');
                                              });
                                            } else {
                                              res.send(401, 'No se Encontraron Consumos7');
                                            }
                                          }, function (error) {
                                            res.send('ConsumoBar7 no encontrado');
                                          });
                                        } else {
                                            res.send(401, 'No se Encontraron Consumos6');
                                        }
                                      }, function (error) {
                                        res.send('ConsumoBar6 no encontrado');
                                      });
                                    } else {
                                        res.send(401, 'No se Encontraron Consumos5');
                                    }
                                  }, function (error) {
                                    res.send('ConsumoBar5 no encontrado');
                                  });
                                } else {
                                    res.send(401, 'No se Encontraron Consumos4');
                                }
                              }, function (error) {
                                res.send('ConsumoBar4 no encontrado');
                              });
                            } else {
                                res.send(401, 'No se Encontraron Consumos3');
                            }
                          }, function (error) {
                            res.send('ConsumoBar3 no encontrado');
                          });
                        } else {
                          res.send(401, 'No se Encontraron Consumos2');
                        }
                      }, function (error) {
                        res.send('ConsumoBar2 no encontrado');
                      });
                    } else {
                      res.send(401, 'No se Encontraron Pesajes');
                    }
                  }, function (error) {
                    res.send('Pesaje2 no encontrado');
                  });
                } else {
                  res.send(401, 'No se Encontraron Consumos');
                }
              }, function (error) {
                res.send('ConsumoBar no encontrado');
              });
            }else {
              res.send(401, 'No se encontraron Mensajes');
            }
          }, function (error) {
            res.send('Mensaje no encontrado');
          });
        } else {
          res.send(401, 'No se encontraron Mensajes');
        }
      }, function (error) {
        res.send('Mensaje no encontrado');
      });
    } else {
          res.send(401, 'No se encontraron Mensajes');
    }
  }, function (error) {
      res.send('Mensaje no encontrado');
  });
});

//---------------------------alarmas

function leerCantidadMinima(){
  var stockA = Model.Stock.build();
  var alarmaA = Model.Alarma.build();
  stockA.retrieveAlarma(function (stock) {
    if (stock) { 
      console.log("soy stock*********", stock[0].Insumo.nombreInsumo);
      alarmaA.retrieveByAlarma(stock[0].Insumo.nombreInsumo, function (alarma1) {
        if (alarma1) { 
          console.log("ya existe la alarma");
        }else {
          console.log("no existe la alarma, guardando...", stock[0].Insumo.nombreInsumo);
          var alarma2 = Model.Alarma.build({
              nombre: "Cantidad Minima Alcanzada",
              alarma: stock[0].Insumo.nombreInsumo
          });

          alarma2.add(function (success) {
            console.log("Se guardo alarma");
          },
          function (err) {
            console.log(err);
          });
        }
      }, function (error) {
        console.log('Alarma no encontrado');
      });
    }else {
      console.log(401, 'No se encontraron Alarmas');
    }
  }, function (error) {
    console.log('Cantidad Minima no encontrado');
  });
}

function leerHerramienta(){
  var herramienta = Model.Herramienta.build();
  var alarmaA = Model.Alarma.build();
  var mantenimiento =  new Date().toJSON().slice(0,10);  
  console.log("soy mantenimiento*********", mantenimiento);
      
  herramienta.retrieveByAlarma(mantenimiento, function (herramientasq) {
    if (herramientasq) { 
      console.log("soy herramienta*********", herramientasq.nombre);
      alarmaA.retrieveByAlarma(herramientasq.nombre, function (alarma1) {
        if (alarma1) { 
          console.log("ya existe la alarma");
        }else {
          console.log("no existe la alarma, guardando...", herramientasq.nombre);
          var alarma2 = Model.Alarma.build({
              nombre: "Realizar Mantenimiento",
              alarma: herramientasq.nombre
          });

          alarma2.add(function (success) {
            console.log("Se guardo la alarma");
          },
          function (err) {
            console.log(err);
          });
        }
      }, function (error) {
        console.log('Alarma no encontrado');
      });
    }else {
      console.log(401, 'No se encontraron Herramientas');
    }
  }, function (error) {
    console.log('Herramienta no encontrado');
  });
}

function leerComederoMinima(){
  var stockA = Model.Stock.build();
  var alarmaA = Model.Alarma.build();
  stockA.retrieveAlarma(function (stock) {
    if (stock) {       
      var comedero = 'Comedero Vacio'
      alarmaA.retrieveByAlarma(comedero, function (alarma1) {
        if (alarma1) { 
          console.log("ya existe la alarma");
        }else {
          console.log("no existe la alarma, guardando...", comedero);
          var alarma2 = Model.Alarma.build({
              nombre: "Nivel Mínima Alcanzado",
              alarma: comedero
          });

          alarma2.add(function (success) {
            console.log("Se guardo alarma");
          },
          function (err) {
            console.log(err);
          });
        }
      }, function (error) {
        console.log('Alarma no encontrado');
      });
    }else {
      console.log(401, 'No se encontraron Alarmas');
    }
  }, function (error) {
    console.log('Cantidad Minima no encontrado');
  });
}
module.exports = router;
