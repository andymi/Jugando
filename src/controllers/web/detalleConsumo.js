'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleConsumo
// router.route('/detalleConsumo') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleConsumo = Model.DetalleConsumo.build();
  var consumo = Model.Consumo.build();
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
              consumo.retrieveId(function (consumoQ) {
                if (consumoQ) {      
                  console.log('soy consumo retrieveId',consumoQ);
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
                          res.render('web/detalleConsumo/index', {
                                          consumoJ:consumoQ,
                                          detalleConsumoJ: detalleConsumo,
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
                  res.send(401, 'No se encontraron Consumos');
                }
              });
            }else {
              res.send(401, 'No se Encontraron Consumos');
            }
          }, function (error) {
            res.send('Detalle Consumo no encontrado');
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
// POST /detalleConsumo
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia 
  var stock = Model.Stock.build();

  var cantidad = req.body.cantidad;
  var observacion = req.body.observacion;
  var AnimalIdAnimal = req.body.selectJ;
  var ConsumoIdConsumo = req.body.id;  

  var index = Model.DetalleConsumo.build({
    cantidad: cantidad,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    ConsumoIdConsumo: ConsumoIdConsumo
  });
  
  index.add(function (success) {
    console.log("dentro"); 
    stock.retrieveByInsumo(ConsumoIdConsumo, cantidad, function (detalleConsumos) {
      if (detalleConsumos) { 
        console.log("listo xfin"); 
        index.guardar(ConsumoIdConsumo, function (detalleConsumoss) {
          if (detalleConsumoss) {          
            res.redirect('/web/detalleConsumo/cargar');
          } else {
            res.send(401, 'No se puede cargar el total del consumo');
          }
        },function (err) {
            res.send('Error al intentar cargar el total del consumo',err);
        }); 
      } else {
        res.send(401, 'No se encontraron detalles');
      }
    }, function (error) {
      res.send('Detalle no encontrado');
    }); 
  },
  function (err) {
    res.send('error aca', err);
  });
};
/* (trae todos los detalleConsumo)
// GET /detalleConsumo */
exports.listPag1 = function (req, res) {
  var detalleConsumo = Model.DetalleConsumo.build();
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
    //console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        //console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          detalleConsumo.retrieveAll(req.params.id, function (detalleConsumos) {
            if (detalleConsumos) {
              alarma.retriveCount(function (alarma1) { 
                //console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    //console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(detalleConsumos);
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;
                      res.render('web/detalleConsumo/success', { 
                        detalleConsumos:detalleConsumos,
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
            res.send('DetalleConsumo no encontrado');
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
  var detalleConsumo = Model.DetalleConsumo.build();
  var consumoId = req.params.consumoId;
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
                      console.log('soy consumoId',consumoId);
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;

                      res.render('web/detalleConsumo/indexa', {
                                      consumoJ:consumoId,
                                      detalleConsumoJ: detalleConsumo,
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
              res.send(401, 'No se Encontraron Consumos');
            }
          }, function (error) {
            res.send('Detalle Consumo no encontrado');
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
// POST /detalleConsumo
exports.create2 = function (req, res) {
  console.log(req.body);
  
  var stock = Model.Stock.build();
  // bodyParser debe hacer la magia
  var cantidad = req.body.cantidad;
  var observacion = req.body.observacion;
  var AnimalIdAnimal = req.body.selectJ;
  var ConsumoIdConsumo = req.body.id;  

  var index = Model.DetalleConsumo.build({
    cantidad: cantidad,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    ConsumoIdConsumo: ConsumoIdConsumo
  });

  index.add(function (success) {
    console.log("dentro"); 
    stock.retrieveByInsumo(ConsumoIdConsumo, cantidad, function (detalleConsumos) {
      if (detalleConsumos) { 
        console.log("listo xfin");      
        res.redirect('/web/consumo');
      } else {
        res.send(401, 'No se encontraron detalles');
      }
    }, function (error) {
      res.send('Detalle no encontrado');
    }); 
  },
  function (err) {
    res.send(err);
  });
};
//***************************************************************
/* Rutas que terminan en /detalleConsumo/:detalleConsumoId
// router.route('/detalleConsumo/:detalleConsumoId')
// PUT /detalleConsumo/:detalleConsumoId
// Actualiza detalleConsumo */
exports.update = function (req, res) {
  var detalleConsumo = Model.DetalleConsumo.build();
  detalleConsumo.cantidad = req.body.cantidad;
  detalleConsumo.observacion = req.body.observacion;
  detalleConsumo.sobra = req.body.sobra;
  detalleConsumo.AnimalIdAnimal = req.body.animalSele;
  
  

  detalleConsumo.updateById(req.params.detalleConsumoId, function (success) {
    if (success) {
      res.redirect('/web/consumo');
    } else {
      res.send(401, 'Detalle Consumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
  });
};
// GET /detalleConsumo/:detalleConsumoId
// Toma un detalleConsumo por id
exports.read = function (req, res) {
  var animal = Model.Animal.build();
  var detalleConsumo = Model.DetalleConsumo.build();
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
              detalleConsumo.retrieveById(req.params.detalleConsumoId, function (detalleConsumo) {
                if (detalleConsumo) {
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
                          res.render('web/detalleConsumo/edit', {
                                    detalleConsumo:detalleConsumo,
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
                  res.send(401, 'Detalle Consumo no encontrado');
                }
              }, function (error) {
                res.send('Detalle Consumo no encontrado');
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
// DELETE /detalleConsumo/detalleConsumoId
// Borra el detalleConsumoId
exports.delete = function (req, res) {
  var detalleConsumo = Model.DetalleConsumo.build();

 detalleConsumo.removeById(req.params.detalleConsumoId, function (detalleConsumo) {
    if (detalleConsumo) {
      res.redirect('/web/consumo');
    } else {
      res.send(401, 'Detalle Consumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
  });
};
