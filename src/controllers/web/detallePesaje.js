'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');
/******************************************************************
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
        console.log(animales);          
        valor = animales.idAnimal;
        console.log('soy animalid--------',valor);
      }else{
        console.log("error");
        serialport.write(buffer3); 
      }
    });
  }else{
    serialport.write(buffer3); 
  }
});
serialport.on('error', function(err) {
  console.log('Error: ', err.message);
  serialport.write(buffer3); 
});
/*************configuración para la prueba del pesaje***********
var SerialPort = require('serialport');
var parsers = require('serialport').parsers;
var port = new SerialPort("/COM12", {
  baudRate: 9600,
  parser: parsers.readline('\r\n')
});
function leerPeso(){
  port.on('data', function(data) {
    var imprimir = data.toString();
    var valorPeso = imprimir.substring(9); 
    var pesoP = "";
    console.log('valor**************', valorPeso);   
  });
}
port.on('error', function(err) {
  console.log('Error: ', err.message);
});

/* Rutas que terminan en /detallePesaje
// router.route('/detallePesaje') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detallePesaje = Model.DetallePesaje.build();
  var pesaje = Model.Pesaje.build();
  //************************************ 
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');              
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) {
              pesaje.retrieveId(function (pesajeQ) {
                if (pesajeQ) {      
                  console.log('soy pesaje retrieveId',pesajeQ);
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
                          res.render('web/detallePesaje/index', {
                                          pesajeJ:pesajeQ,
                                          detallePesajeJ: detallePesaje,
                                          selectJ: animalQ,
                                          mensajes: mensaje1,
                                          mensajeria: mensaje2,
                                          alarmas1: alarma1,
                                          alarmas2: alarma2,
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
                } else {
                  res.send(401, 'No se encontraron Pesajes');
                }
              });
            }else {
              res.send(401, 'No se Eencontraron Pesajes');
            }
          }, function (error) {
            res.send('Detalle Pesaje no encontrado');
            }
          );
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
};

// POST /detallePesaje
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  leerPeso();
  var peso = 286;
  var observacion = req.body.observacion;  
  var AnimalIdAnimal = 15;
  var PesajeIdPesaje = req.body.id;

  var index = Model.DetallePesaje.build({
    peso:peso,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    PesajeIdPesaje: PesajeIdPesaje
  });

  index.add(function (success) {
    index.guardar(PesajeIdPesaje, function (detallePesajess) {
      if (detallePesajess) {  
        res.redirect('/web/detallePesaje/cargar');
      } else {
        res.send(401, 'No se puede cargar el total del pesaje');
      }
    },function (err) {
        res.send('Error al intentar cargar el total del pesaje',err);
    }); 
  },
  function (err) {
    res.send(err);
  });
};
//**************************************************************
exports.readId = function (req, res) {
  var detallePesaje = Model.DetallePesaje.build();
  console.log('dentro de get /',req.body);
  //************************************ 
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');              
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          detallePesaje.retrieveAll(req.params.id, function (detallePesajes) {
            if (detallePesajes) {
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
                      res.render('web/detallePesaje/success', { 
                        detallePesajes:detallePesajes,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2,
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
            } else {
              res.send(401, 'No se encontraron Detalles');
            }
          }, function (error) {
            res.send('DetallePesaje no encontrado');
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
};
//***************************************************************
exports.getForm2 = function (req, res) {
  var animal = Model.Animal.build();
  var detallePesaje = Model.DetallePesaje.build();
  var pesajeId = req.params.pesajeId;
  //************************************ 
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');              
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) { 
              console.log('soy add pesajeId',pesajeId); 
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
                      res.render('web/detallePesaje/indexa', {
                                      pesajeN:pesajeId,
                                      detallesajeJ: detallePesaje,
                                      selectJ: animalQ,
                                      mensajes: mensaje1,
                                      mensajeria: mensaje2,
                                      alarmas1: alarma1,
                                      alarmas2: alarma2,
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
              res.send(401, 'No se Eencontraron Pesajes');
            }
          }, function (error) {
            res.send('Detalle Pesaje no encontrado');
            }
          );
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
};
// POST /detallePesaje
exports.create2 = function (req, res) {
  console.log('DENTRO DE ADD',req.body);
  // bodyParser debe hacer la magia
  var peso = req.body.peso;
  var observacion = req.body.observacion;  
  var AnimalIdAnimal = req.body.selectJ;
  var PesajeIdPesaje = req.body.id;

  var index = Model.DetallePesaje.build({
    peso:peso,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    PesajeIdPesaje: PesajeIdPesaje
  });

  index.add(function (success) {
    res.redirect('/web/pesaje');
  },
  function (err) {
    res.send(err);
  });
};
//*************************************************************
/* (trae todos los detallePesaje)
// GET /detallePesaje */

/* Rutas que terminan en /detallePesaje/:detallePesajeId
// router.route('/detallePesaje/:detallePesajeId')
// PUT /detallePesaje/:detallePesajeId
// Actualiza detallePesaje */

exports.update = function (req, res) {
  var detallePesaje = Model.DetallePesaje.build();

  detallePesaje.peso = req.body.peso;
  detallePesaje.observacion = req.body.observacion;
  detallePesaje.AnimalIdAnimal = req.body.animalSele;
  

  detallePesaje.updateById(req.params.detallePesajeId, function (success) {
    if (success) {
      //res.json({ message: 'Detalle Pesaje actualizado!' });
       res.redirect('/web/pesaje');
    } else {
      res.send(401, 'Detalle Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Detalle Pesaje no encontrado');
  });
};

// GET /detallePesaje/:detallePesajeId
// Toma un detallePesaje por id
exports.read = function (req, res) {
  var animal =Model.Animal.build();
  var detallePesaje = Model.DetallePesaje.build();
  //************************************ 
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');              
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          animal.retrieveAll(function (animal) {
            if (animal) {
              detallePesaje.retrieveById(req.params.detallePesajeId, function (detallePesajeQ) {
                if (detallePesajeQ) {
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
                          res.render('web/detallePesaje/edit', {
                              detallePesaje:detallePesajeQ,
                              select: animal,
                              mensajes: mensaje1,
                              mensajeria: mensaje2,
                              alarmas1: alarma1,
                              alarmas2: alarma2,
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
                } else {
                  res.send(401, 'arDetalles no encontrado');
                }
              }, function (error) {
                res.send('esDetalles no encontrado',error);
              });
            } else {
              res.send(401, 'No se encontraron Detalles');
            }
          }, function (error) {
            console.log(error);
            res.send('desDetalles no encontrado');
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
};

// DELETE /detallePesaje/detallePesajeId
// Borra el detallePesajeId
exports.delete = function (req, res) {
  var detallePesaje = Model.DetallePesaje.build();

 detallePesaje.removeById(req.params.detallePesajeId, function (detallePesaje) {
    if (detallePesaje) {
       res.redirect('/web/pesaje');
    } else {
      res.send(401, 'Detalle Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Detalle Pesaje no encontrado');
  });
};
