'use strict';

// USUARIOS CRUD
// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

var idlector = "";
var valor ="";
var SerialPort = require('serialport');
var serialport = new SerialPort("/COM13", {
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
      }
    });
  }
}); 
// open errors will be emitted as an error event
serialport.on('error', function(err) {
  console.log('Error: ', err.message);
});

/* Rutas que terminan en /detalleSanitacion
// router.route('/detalleSanitacion') */
exports.getForm1 =  function (req, res) {
  //var animal = Model.Animal.build();
  var detalleSanitacion = Model.DetalleSanitacion.build();
  var sanitacion = Model.Sanitacion.build();
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
            //animal.retrieveAll(function (animalQ) {
            //console.log('animalQ',animalQ);
            //if (animalQ) {
          alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) {  
                  console.log(req.body);
                  sanitacion.retrieveId(function (sanitacion) {
                      if (sanitacion) {
                        serialport.write(buffer3);  
                        console.log('soy sanitacion retrieveId',sanitacion);
                        var usuario = req.session.user.usuario;
                        var pass = req.session.user.pass;
                        var fechaCreacion = req.session.user.fechaCreacion; 
                        res.render('web/detalleSanitacion/index', {
                                        sanitacionJ:sanitacion,
                                        detalleSanitacionJ: detalleSanitacion,
                                        mensajes: mensaje1,
                                        mensajeria: mensaje2,
                                        alarmas1: alarma1,
                                        alarmas2: alarma2,
                                        usuarios: usuario,
                                        passs: pass,
                                        fechaCreacions: fechaCreacion
                        });   
                      } else {
                        res.send(401, 'No se encontraron Sanitaciones');
                      }
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
            /*}else {
              res.send(401, 'No se Eencontraron Sanitaciones');
            }
          }, function (error) {
            res.send('Detalle Sanitacion no encontrado');
          });*/
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
// POST /detalleSanitacion
exports.create1 = function (req, res) {
  var observacionSanitacion = req.body.observacionSanitacion; 
  var AnimalIdAnimal = valor;
  var SanitacionIdSanitacion = req.body.id;
  console.log('soy AnimalIdAnimal--------',AnimalIdAnimal);
  
  var index = Model.DetalleSanitacion.build({
    observacionSanitacion: observacionSanitacion,
    AnimalIdAnimal: AnimalIdAnimal,
    SanitacionIdSanitacion: SanitacionIdSanitacion
  });
  index.add(function (success) {
    console.log("listo1");
    index.retriveCount(SanitacionIdSanitacion, function (detalleSanitacion) {
      if (detalleSanitacion) {
        console.log("listo2");
        res.redirect('/web/detalleSanitacionInsumo/cargar');
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa');
    });
  },
  function (err) {
    res.send(err);
  });                   
};

/* (trae todos los detalleSanitacion)
// GET /detalleSanitacion */
exports.listPag1 = function (req, res) {
  var detalleSanitacion =Model.DetalleSanitacion.build();
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
          detalleSanitacion.retrieveAll(req.params.id, function (detalleSanitaciones) {
            if (detalleSanitaciones) {
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
                      res.render('web/detalleSanitacion/success', { 
                        detalleSanitaciones:detalleSanitaciones,
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
            res.send('DetalleSanitacion no encontrado');
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

//*******************************************************
exports.getForm2 = function (req, res) {
  serialport.write(buffer3);
  var animal = Model.Animal.build();
  var detalleSanitacion = Model.DetalleSanitacion.build();
  var sanitacionId = req.params.sanitacionId;
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
              console.log('soy sanitacionId',sanitacionId);
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
                      res.render('web/detalleSanitacion/indexa', {
                              sanitacionJ:sanitacionId,
                              detalleSanitacionJ: detalleSanitacion,
                              mensajes: mensaje1,
                              mensajeria: mensaje2,
                              selectJ: animalQ,
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
              res.send(401, 'No se Eencontraron Sanitaciones');
            }
          }, function (error) {
            res.send('Detalle Sanitacion no encontrado');
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
// POST /detalleSanitacion
exports.create2 = function (req, res) {
  console.log('DENTRO DE ADD',req.body);
  // bodyParser debe hacer la magia
  var observacionSanitacion = req.body.observacionSanitacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var SanitacionIdSanitacion = req.body.id;

  var index = Model.DetalleSanitacion.build({
    observacionSanitacion: observacionSanitacion,
    AnimalIdAnimal: AnimalIdAnimal,
    SanitacionIdSanitacion: SanitacionIdSanitacion
  });

  index.add(function (success) {
    index.retriveCount(SanitacionIdSanitacion, function (detalleSanitacion) {
      if (detalleSanitacion) {
        res.redirect('/web/sanitacion');
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa');
    });
  },
  function (err) {
    res.send(err);
  });
};
//*******************************************************
/* Rutas que terminan en /detalleSanitacion/:detalleSanitacionId
// router.route('/detalleSanitacion/:detalleSanitacionId')
// PUT /detalleSanitacion/:detalleSanitacionId
// Actualiza detalleSanitacion */

exports.update =  function (req, res) {
  var detalleSanitacion = Model.DetalleSanitacion.build();

  detalleSanitacion.observacionSanitacion = req.body.observacionSanitacion;
  detalleSanitacion.AnimalIdAnimal = req.body.animalSele;

  detalleSanitacion.updateById(req.params.detalleSanitacionId, function (success) {
    if (success) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Detalle Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
  });
};

// GET /detalleSanitacion/:detalleSanitacionId
// Toma un detalleSanitacion por id
exports.read = function (req, res) {
  var detalleSanitacion = Model.DetalleSanitacion.build();
  var animal =Model.Animal.build();
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
              detalleSanitacion.retrieveById(req.params.detalleSanitacionId, function (detalleSanitacion) {
                if (detalleSanitacion) {
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
                          res.render('web/detalleSanitacion/edit', {
                              detalleSanitacion:detalleSanitacion,
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
                  res.send(401, 'Detalle Sanitacion no encontrado');
                }
              }, function (error) {
                res.send('Detalle Sanitacion no encontrado');
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

// DELETE /detalleSanitacion/detalleSanitacionId
// Borra el detalleSanitacionId
exports.delete = function (req, res) {
  var detalleSanitacion = Model.DetalleSanitacion.build();

 detalleSanitacion.removeById(req.params.detalleSanitacionId, function (detalleSanitacion) {
    if (detalleSanitacion) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Detalle Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
  });
};
/*********************************DESDE ACA COMIENZA DETALLE VACUNACION******************************************************/
/* Rutas que terminan en /detalleVacunacion
// router.route('/detalleVacunacion') */
exports.getFormV1 = function (req, res) {
  //var animal = Model.Animal.build();
  var detalleVacunacion = Model.DetalleVacunacion.build();
  var vacunacion = Model.Vacunacion.build();
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
            /*animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) {*/
          alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) {  
                  console.log(req.body);
                    vacunacion.retrieveId(function (vacunacionQ) {
                      if (vacunacionQ) {   
                        serialport.write(buffer3);    
                        console.log('soy Vacunacion retrieveId',vacunacionQ);
                        var usuario = req.session.user.usuario;
                        var pass = req.session.user.pass;
                        var fechaCreacion = req.session.user.fechaCreacion; 
                        res.render('web/detalleVacunacion/index', {
                                        vacunacionJ:vacunacionQ,
                                        detalleVacunacionJ: detalleVacunacion,
                                        mensajes: mensaje1,
                                        mensajeria: mensaje2,
                                        alarmas1: alarma1,
                                        alarmas2: alarma2,
                                        usuarios: usuario,
                                        passs: pass,
                                        fechaCreacions: fechaCreacion
                        });    
                      } else {
                        res.send(401, 'No se encontraron Pesajes');
                      }
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
            /*}else {
              res.send(401, 'No se Eencontraron Pesajes');
            }
          }, function (error) {
            res.send('Detalle Vacunacion no encontrado');
          });*/
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
// POST /detalleVacunacion
exports.createV1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var numeroCertificado = req.body.numeroCertificado;
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = valor;
  var VacunacionIdVacunacion = req.body.id; 
  console.log('soy AnimalIdAnimal--------',AnimalIdAnimal);
  

  var index = Model.DetalleVacunacion.build({
    numeroCertificado:numeroCertificado,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    VacunacionIdVacunacion:VacunacionIdVacunacion
  });

  index.add(function (success) {
    index.retriveCount(VacunacionIdVacunacion, function (detalleVacunacion) {
      if (detalleVacunacion) {
        res.redirect('/web/detalleVacunacionInsumo/cargar');    
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa');
    });
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los detalleVacunacion)
// GET /detalleVacunacion */
exports.listPagV1 = function (req, res) {
  var detalleVacunacion = Model.DetalleVacunacion.build();
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
          detalleVacunacion.retrieveAll(req.params.id, function (detalleVacunacion) {
            if (detalleVacunacion) {
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
                      res.render('web/detalleVacunacion/success', { 
                        detalleVacunaciones:detalleVacunacion,
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
            res.send('DetalleVacunacion no encontrado');
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
//******************************************************
exports.getFormV2 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleVacunacion = Model.DetalleVacunacion.build();
  var vacunacionId = req.params.vacunacionId;
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
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      console.log('soy vacunacionId',vacunacionId);
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion; 
                      res.render('web/detalleVacunacion/indexa', {
                                      vacunacionJ:vacunacionId,
                                      detalleVacunacionJ: detalleVacunacion,
                                      mensajes: mensaje1,
                                      selectJ: animalQ,
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
              res.send(401, 'No se Encontraron Animales');
            }
          }, function (error) {
            res.send('Animal no encontrado');
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
// POST /detalleVacunacion
exports.createV2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var numeroCertificado = req.body.numeroCertificado;
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var VacunacionIdVacunacion = req.body.id; 
  console.log('soy AnimalIdAnimal--------',AnimalIdAnimal);

  var index = Model.DetalleVacunacion.build({
    numeroCertificado:numeroCertificado,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    VacunacionIdVacunacion:VacunacionIdVacunacion
  });

  index.add(function (success) {
    index.retriveCount(VacunacionIdVacunacion, function (detalleVacunacion) {
      if (detalleVacunacion) {
        res.redirect('/web/vacunacion');       
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa');
    });
  },
  function (err) {
    res.send(err);
  });
};
/* Rutas que terminan en /detalleVacunacion/:detalleVacunacionId
// router.route('/detalleVacunacion/:detalleVacunacionId')
// PUT /detalleVacunacion/:detalleVacunacionId
// Actualiza detalleVacunacion */
exports.updateV = function (req, res) {
  var detalleVacunacion = Model.DetalleVacunacion.build();

  detalleVacunacion.numeroCertificado = req.body.numeroCertificado;
  detalleVacunacion.observacion = req.body.observacion;
  detalleVacunacion.AnimalIdAnimal = req.body.animalSele;

  detalleVacunacion.updateById(req.params.detalleVacunacionId, function (success) {
    if (success) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Detalle Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion no encontrado');
  });
};
// GET /detalleVacunacion/:detalleVacunacionId
// Toma un detalleVacunacion por id
exports.readV = function (req, res) {
  var detalleVacunacion = Model.DetalleVacunacion.build();
  var animal = Model.Animal.build();
  //************************************ 
  var alarma = Model.Alarma.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');              
  }
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          animal.retrieveAll(function (animal) {
            if (animal) {
              detalleVacunacion.retrieveById(req.params.detalleVacunacionId, function (detalleVacunacion) {
                if (detalleVacunacion) {
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
                          res.render('web/detalleVacunacion/edit', {
                              detalleVacunacion:detalleVacunacion,
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
                  res.send(401, 'Detalle Vacunacion no encontrado');
                }
              }, function (error) {
                res.send('Detalle Vacunacion no encontrado');
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

// DELETE /detalleVacunacion/detalleVacunacionId
// Borra el detalleVacunacionId
exports.deleteV = function (req, res) {
  var detalleVacunacion = Model.DetalleVacunacion.build();

 detalleVacunacion.removeById(req.params.detalleVacunacionId, function (detalleVacunacion) {
    if (detalleVacunacion) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Detalle Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion no encontrado');
  });
};
//------------------------------------ACA EMPIEZA EL DETALLE DEL TRASLADO--------------------------------------------------------------
/* Rutas que terminan en /detalleTraslado
// router.route('/detalleTraslado') */
exports.getForm1T = function (req, res) {
  //var animal = Model.Animal.build();
  var detalleTraslado = Model.DetalleTraslado.build();
  var notaTraslado = Model.Traslado.build();
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
              /*animal.retrieveAll(function (animalQ) {
              console.log('animalQ',animalQ);
              if (animalQ) {*/
          alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) {  
                  console.log(req.body);
                  notaTraslado.retrieveId(function (notaTrasladoQ) {
                    if (notaTrasladoQ) { 
                    serialport.write(buffer3);     
                      console.log('soy notaTraslado retrieveId',notaTrasladoQ);
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion; 
                      res.render('web/detalleTraslado/index', {
                                      notaTrasladoJ:notaTrasladoQ,
                                      detalleTrasladoJ: detalleTraslado,
                                      mensajes: mensaje1,
                                      mensajeria: mensaje2,
                                      alarmas1: alarma1,
                                      alarmas2: alarma2,
                                      usuarios: usuario,
                                      passs: pass,
                                      fechaCreacions: fechaCreacion
                      });    
                    } else {
                      res.send(401, 'No se encontraron nota Traslado');
                    }
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
            /*}else {
              res.send(401, 'No se Eencontraron nota Traslado');
            }
          }, function (error) {
            res.send('Detalle Traslado no encontrado');
          });*/
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
// POST /detalleTraslado
exports.create1T = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcion = req.body.descripcion; 
  var AnimalIdAnimal = valor;
  var TrasladoIdTraslado = req.body.id;


  var index = Model.DetalleTraslado.build({
    descripcion: descripcion,
    AnimalIdAnimal: AnimalIdAnimal,
    TrasladoIdTraslado: TrasladoIdTraslado
  });

  index.add(function (success) {
    res.redirect('/web/detalleTraslado/cargar');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los detalleTraslado)
// GET /detalleTraslado */
exports.readIdT = function (req, res) {
  var detalleTraslado = Model.DetalleTraslado.build();
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
          detalleTraslado.retrieveAll(req.params.id, function (detalleTraslados) {
            if (detalleTraslados) {
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
                      res.render('web/detalleTraslado/success', { 
                        detalleTraslados:detalleTraslados,
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
            res.send('DetalleTraslado no encontrado');
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
//*****************************************************************
exports.getForm2T = function (req, res) {
  var animal = Model.Animal.build();
  var detalleTraslado = Model.DetalleTraslado.build();
  var trasladoId = req.params.trasladoId;
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
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      console.log('soy notaTraslado retrieveId',trasladoId);
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion; 
                      res.render('web/detalleTraslado/indexa', {
                                    trasladoJ:trasladoId,
                                    detalleTrasladoJ: detalleTraslado,
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
              res.send(401, 'No se Eencontraron nota Traslado');
            }
          }, function (error) {
            res.send('Detalle Traslado no encontrado');
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
// POST /detalleTraslado
exports.create2T = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcion = req.body.descripcion; 
  var AnimalIdAnimal = req.body.selectJ;
  var TrasladoIdTraslado = req.body.id;


  var index = Model.DetalleTraslado.build({
    descripcion: descripcion,
    AnimalIdAnimal: AnimalIdAnimal,
    TrasladoIdTraslado: TrasladoIdTraslado
  });

  index.add(function (success) {
    res.redirect('/web/traslado');
  },
  function (err) {
    res.send(err);
  });
};
//*****************************************************************
/* Rutas que terminan en /detalleTraslado/:detalleTrasladoId
// router.route('/detalleTraslado/:detalleTrasladoId')
// PUT /detalleTraslado/:detalleTrasladoId
// Actualiza detalleTraslado*/

exports.updateT = function (req, res) {
  var detalleTraslado = Model.DetalleTraslado.build();

  detalleTraslado.descripcion = req.body.descripcion;
  detalleTraslado.AnimalIdAnimal = req.body.animalSele;

  detalleTraslado.updateById(req.params.detalleTrasladoId, function (success) {
    if (success) {
      res.redirect('/web/traslado');
    } else {
      res.send(401, 'Detalle Traslado Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Traslado Animal no encontrado');
  });
};
// GET /detalleTraslado/:detalleTrasladoId
// Toma un detalleTraslado por id
exports.readT = function (req, res) {
  var detalleTraslado = Model.DetalleTraslado.build();
  var animal = Model.Animal.build();
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
              detalleTraslado.retrieveById(req.params.detalleTrasladoId, function (detalleTraslado) {
                if (detalleTraslado) {
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
                          res.render('web/detalleTraslado/edit', {
                            detalleTraslado:detalleTraslado,
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
                  res.send(401, 'Detalle Traslado Animal no encontrado');
                }
              }, function (error) {
                res.send('Detalle Traslado Animal no encontrado');
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
// DELETE /detalleTraslado/detalleTrasladoId
// Borra el detalleTrasladoId
exports.deleteT = function (req, res) {
  var detalleTraslado = Model.DetalleTraslado.build();

 detalleTraslado.removeById(req.params.detalleTrasladoId, function (detalleTraslado) {
    if (detalleTraslado) {
      res.redirect('/web/traslado');
    } else {
      res.send(401, 'Detalle Traslado Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Traslado Animal no encontrado');
  });
};
