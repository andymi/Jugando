'use strict';

// WEB PUBLICO
// =============================================================================
var express = require('express');
var router = express.Router();
//var request = require('request');
var Model = require('../../models/jugando.js');
/*******************************************************************************
var horaC="";
var horasC="";
var nivelC="";
var pesoRacionC="";
var pesoBateaC="";
var idInsumoC="";
var consumoId="";
/*******************************************************************************/
var SerialPort = require('serialport');
var parsers = require('serialport').parsers;
var port = new SerialPort("/COM11", {
  baudRate: 9600,
  parser: parsers.readline('\r\n')
});
/*********************************************************************************
leerNivel();
leerPesoyRacion();
leerHora();

/************************leer el nivel actual del comedero***********************
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
/*************leer la hora actual del comedero*********************
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
/*************leer el peso actual del comedero********************
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
setTimeout(function(){
  port.on('data', function(data) {
    var imprimir = data.toString();
    var cmd = imprimir.charAt(0);
    var enviar = imprimir.substring(1); 
    console.log('valor**************', imprimir);   
    /*if (cmd == 1) {
      console.log('dentro de cmd 1',cmd); 
      horaC = enviar.trim();
      console.log('hora:', horaC);
    } else if(cmd == 2){
      console.log('dentro de cmd 2',cmd); 
      nivelC = enviar.trim();
      console.log('nivel:', nivelC);
    } else if(cmd == 4){
      console.log('dentro de cmd 4',cmd); 
      pesoRacionC = enviar.trim();
      console.log('pesoRacion:', pesoRacionC);
    } else if(cmd == "x"){
      console.log('dentro de cmd x',cmd); 
      horasC = imprimir.substring(1,9);
      console.log('horas:', horasC);
      pesoBateaC = imprimir.slice(9,-1);      
      console.log('pesoBatea:', pesoBateaC);
      idInsumoC = imprimir.slice(-1); 
      console.log('idInsumo:', idInsumoC);      
      var f = new Date();
      var fecha = f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate();
      var consumo = Model.Consumo.build();
      var stock = Model.Stock.build();
      /***********************************
      var index = Model.Consumo.build({
        fechaConsumo: fecha,
        horaConsumo: horasC,
        InsumoIdInsumo: idInsumoC
      });      
      index.add(function (success) {
        console.log("listo cabecera");
        consumo.retrieveId(function (consumoQ) {
          if (consumoQ) { 
              consumoId = consumoQ[0].dataValues['idConsumo'];
              console.log("soy consumoId*********", consumoId);
              var index2 = Model.DetalleConsumo.build({
                cantidad: pesoBateaC,
                observacion: "Consumo de Balanceados",
                AnimalIdAnimal: 1,
                ConsumoIdConsumo: consumoId
              });         
        
              index2.add(function (success) {
                console.log("dentro"); 
                  stock.retrieveByInsumo(consumoId, pesoBateaC, function (detalleConsumos) {
                    if (detalleConsumos) { 
                      console.log("listo xfin");      
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
      });*/
    //}
  });
}, 1000);
/*********************************************************************
router.get('/abrir', function (req, res) {
  console.log('dentro de abrir');
  port.write('>i');
});
*/
router.get('/abrir', function (req, res) {
  console.log('dentro de abrir');
  port.write('<1');
});
/********************************************************************
router.get('/cerrar', function (req, res) {
  console.log('dentro de cerrar');
  port.write('>j');
});
*/
router.get('/cerrar', function (req, res) {
  console.log('dentro de cerrar');
  port.write('<0');
});
/********************************************************************
router.get('/liberar', function (req, res) {
  console.log('dentro de liberar');
  port.write('>x');
});
/***************************************************************************/
router.get('/', function (req, res) {
  res.render('publico/home/indexa.jade');
});
/*ruta para redireccionar al comedero donde al renderizar la pagina le paso la 
variable enviar a una variable de la vista llamada horas*/
router.get('/comedero', function(req, res) {
  var mensaje = Model.Mensaje.build();
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          res.render('web/index/Comedero.jade',{
            mensajes: mensaje1,
            mensajeria: mensaje2
            //niveles: nivelC,
            //horas: horaC,
            //pesoRacion: pesoRacionC          
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
                                                                                                                  res.render('web/index/PaginaPrincipal',{ 
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
                                                                                                                    ventass: ventas                                                                      
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

//página principal del capataz

/* 
//users page (http://localhost:1337/admin/users)
router.get('/users', function (req, res) {
 res.send('¡Muestro todos los usuarios!');
});

/*
router.get('/fundacion', function (req, res) {
  res.render('publico/museo/fundacion',{ title: 'Bienvenidos' });
});

router.get('/informacion-practica', function (req, res) {
  res.render('./publico/informacion/informacion-practica',{ title: 'Bienvenidos' });
});

router.get('/horarios-tarifas', function (req, res) {
  res.render('./publico/informacion/horarios-tarifas',{ title: 'Bienvenidos' });
});

router.get('/visitas-guiadas', function (req, res) {
  res.render('./publico/informacion/visitas-guiadas',{ title: 'Bienvenidos' });
});

router.get('/planos', function (req, res) {
  res.render('./publico/informacion/planos',{ title: 'Bienvenidos' });
});

router.get('/normas', function (req, res) {
  res.render('./publico/informacion/normas',{ title: 'Bienvenidos' });
});*/
/* (trae todos los usuarios)
// GET /usuario */


module.exports = router;
