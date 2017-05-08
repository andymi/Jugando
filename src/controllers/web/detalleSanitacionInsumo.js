'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleSanitacionInsumo
// router.route('/detalleSanitacionInsumo') */
exports.getForm = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();
  var sanitacion = Model.DetalleSanitacion.build();
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
          insumo.retrieveByMedicamento(function (insumoQ) {
            console.log('insumoQ',insumoQ);
            if (insumoQ) {
              sanitacion.retrieveId(function (sanitacion) {
                  if (sanitacion) { 
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
                            console.log('soy sanitacion retrieveId',sanitacion);
                            res.render('web/detalleSanitacionInsumo/index', {
                                    sanitacionJ:sanitacion,
                                    detalleSanitacionInsumoJ: detalleSanitacionInsumo,
                                    selectJ: insumoQ,
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
                    res.send(401, 'No se encontraron Sanitaciones');
                  }
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
// POST /detalleSanitacionInsumo
exports.create1 = function (req, res) {
  console.log(req.body);

  var stock = Model.Stock.build();
  // bodyParser debe hacer la magia
  var cantidadUtilizada = req.body.cantidadUtilizada; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleSanitacionIdDetalleSanitacion = req.body.id;

  var index = Model.DetalleSanitacionInsumo.build({
    cantidadUtilizada: cantidadUtilizada,
    InsumoIdInsumo: InsumoIdInsumo,
    DetalleSanitacionIdDetalleSanitacion: DetalleSanitacionIdDetalleSanitacion
  });

  index.add(function (success) {
    console.log('dentro de indexxxxxxxxxxx', InsumoIdInsumo);
    stock.retrieveByVacunacion(InsumoIdInsumo, cantidadUtilizada, function (success) {
      if (success) {
            console.log('tengo la suma de stock');   
            res.redirect('/web/detalleSanitacionInsumo/cargar');
      } else {
        res.send(401, 'stock no encontrado');
      }
    },function (err) {
      res.send('hay error en stock',err);
    });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleSanitacionInsumo)
// GET /detalleSanitacionInsumo */
exports.listPag1 = function (req, res) {
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();
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
          detalleSanitacionInsumo.retrieveAll(req.params.id, function (detalleSanitaciones) {
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
                      res.render('web/detalleSanitacionInsumo/success', { 
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
//************************************************
exports.getForm2 = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleSanitacionInsumo =Model.DetalleSanitacionInsumo.build();
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
          insumo.retrieveAll(function (insumoQ) {
            console.log('insumoQ',insumoQ);
            if (insumoQ) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      console.log('soy sanitacionId',sanitacionId);
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;
                      res.render('web/detalleSanitacionInsumo/indexa', {
                            sanitacionJ:sanitacionId,
                            detalleSanitacionInsumoJ: detalleSanitacionInsumo,
                            selectJ: insumoQ,
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
// POST /detalleSanitacionInsumo
exports.create2 = function (req, res) {
  console.log(req.body);

  var stock = Model.Stock.build();
  // bodyParser debe hacer la magia
  var cantidadUtilizada = req.body.cantidadUtilizada; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleSanitacionIdDetalleSanitacion = req.body.id;

  var index = Model.DetalleSanitacionInsumo.build({
    cantidadUtilizada: cantidadUtilizada,
    InsumoIdInsumo: InsumoIdInsumo,
    DetalleSanitacionIdDetalleSanitacion: DetalleSanitacionIdDetalleSanitacion
  });

  index.add(function (success) {
    console.log('dentro de indexxxxxxxxxxx', InsumoIdInsumo);
    stock.retrieveByVacunacion(InsumoIdInsumo, cantidadUtilizada, function (success) {
      if (success) {
            console.log('tengo la suma de stock');   
            res.redirect('/web/sanitacion');
      } else {
        res.send(401, 'stock no encontrado');
      }
    },function (err) {
      res.send('hay error en stock',err);
    });
  },
  function (err) {
    res.send(err);
  });
};
//************************************************
/* Rutas que terminan en /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// router.route('/detalleSanitacionInsumo/:detalleSanitacionInsumoId')
// PUT /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// Actualiza detalleSanitacionInsumo */

exports.update = function (req, res) {
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();

  detalleSanitacionInsumo.cantidadUtilizada = req.body.cantidadUtilizada;
  detalleSanitacionInsumo.InsumoIdInsumo = req.body.insumoSele;

  detalleSanitacionInsumo.updateById(req.params.detalleSanitacionInsumoId, function (success) {
    if (success) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Detalle Sanitacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion Insumo no encontrado');
  });
};

// GET /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// Toma un detalleSanitacionInsumo por id
exports.read = function (req, res) {
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();
  var insumo = Model.Insumo.build();
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
          insumo.retrieveAll(function (insumo) {
            if (insumo) { 
                detalleSanitacionInsumo.retrieveById(req.params.detalleSanitacionInsumoId, function (detalleSanitacionInsumo) {
                  if (detalleSanitacionInsumo) {
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
                            res.render('web/detalleSanitacionInsumo/edit', {
                              detalleSanitacionInsumo:detalleSanitacionInsumo,
                              select: insumo,
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
                    res.send(401, 'Detalle Sanitacion Insumo no encontrado');
                  }
                }, function (error) {
                  res.send('Detalle Sanitacion Insumo no encontrado');
                });
            } else {
              res.send(401, 'No se encontraron insumos');
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

// DELETE /detalleSanitacionInsumo/detalleSanitacionInsumoId
// Borra el detalleSanitacionInsumoId
exports.delete = function (req, res) {
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();

 detalleSanitacionInsumo.removeById(req.params.detalleSanitacionInsumoId, function (detalleSanitacionInsumo) {
    if (detalleSanitacionInsumo) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Detalle Sanitacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion Insumo no encontrado');
  });
};
