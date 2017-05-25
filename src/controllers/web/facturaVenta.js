'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /facturaVenta
// router.route('/facturaVenta') */
exports.getForm = function (req, res) {
  var cliente = Model.Cliente.build();
  var facturaVenta = Model.FacturaVenta.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
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
            cliente.retrieveAll(function (clienteQ) {
              console.log('clienteQ',clienteQ);
              if (clienteQ) {
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
                        res.render('web/facturaVenta/index', {
                          facturaVentaJ: facturaVenta,
                          selectJ: clienteQ,
                          mensajes: mensaje1,
                          alarmas1: alarma1,
                          alarmas2: alarma2,
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
              }
            },function (error) {
              res.send('Factura Venta no encontrado');
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
};
// POST /facturaVenta
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaVenta = req.body.fechaVenta;
  var condicionVenta = req.body.condicionVenta;
  var formaCobro = req.body.formaCobro;
  var numeroVenta = req.body.numeroVenta;  
  var horaVenta = req.body.horaVenta;
  var ClienteIdCliente = req.body.selectJ;

  var index = Model.FacturaVenta.build({
    fechaVenta: fechaVenta,
    condicionVenta: condicionVenta,
    formaCobro: formaCobro,
    numeroVenta: numeroVenta,
    horaVenta: horaVenta,
    ClienteIdCliente: ClienteIdCliente
  });

  index.add(function (success) {
    res.redirect('/web/detalleVenta/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los facturaVenta)
// GET /facturaVenta */
exports.listPag = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  console.log('request body',req.body);
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
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
            facturaVenta.retrieveAll(function (facturaVenta) {
              if (facturaVenta) {
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
                        res.render('web/facturaVenta/success', { 
                          facturaVenta: facturaVenta,
                          mensajes: mensaje1,
                          alarmas1: alarma1,
                          alarmas2: alarma2,
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
                console.log('soy facturaVenta retrieveAll',facturaVenta);
              } else {
                res.send(401, 'No se encontraron Pesajes');
              }
            }, function (error) {
              res.send('FacturaVenta no encontrado');
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
};

/* Rutas que terminan en /facturaVenta/:facturaVentaId
// router.route('/facturaVenta/:facturaVentaId')
// PUT /facturaVenta/:facturaVentaId
// Actualiza facturaVenta */

exports.update = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  console.log('*************',req.body);
  facturaVenta.fechaVenta = req.body.fechaVenta;
  facturaVenta.condicionVenta = req.body.condicionVenta;
  facturaVenta.formaCobro = req.body.formaCobro;
  facturaVenta.numeroVenta = req.body.numeroVenta;
  facturaVenta.horaVenta = req.body.horaVenta;
  facturaVenta.ClienteIdCliente = req.body.clienteSele;

  facturaVenta.updateById(req.params.facturaVentaId, function (success) {
    if (success) {
      res.redirect('/web/facturaVenta');
    } else {
      res.send(401, 'facturaVenta no encontrado');
    }
  }, function (error) {
    res.send('facturaVenta no encontrado');
  });
};

// GET /facturaVenta/:facturaVentaId
// Toma un facturaVenta por id
exports.read = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  var cliente = Model.Cliente.build();
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
          cliente.retrieveAll(function (cliente) {
            if (cliente) {
                facturaVenta.retrieveById(req.params.facturaVentaId, function (facturaVenta) {
                  if (facturaVenta) {
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
                            res.render('web/facturaVenta/edit', {
                              facturaVenta:facturaVenta,
                              select: cliente,
                              mensajes: mensaje1,
                              alarmas1: alarma1,
                              alarmas2: alarma2,
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
                  } else {
                    res.send(401, 'facturaVenta no encontrado');
                  }
                }, function (error) {
                  res.send('facturaVenta no encontrado');
                });
            } else {
              res.send(401, 'No se encontraron Vacunaciones');
            }
          }, function (error) {
            console.log(error);
            res.send('Vacunacion no encontrado');
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

exports.readId = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
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
          facturaVenta.retrieveVerId(req.params.id, function (facturaVentaQ) {
            if (facturaVentaQ) {
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
                      res.render('web/detalleVenta/success', {
                          facturaVenta:facturaVentaQ,
                          mensajes: mensaje1,
                          alarmas1: alarma1,
                          alarmas2: alarma2,
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
            } else {
              res.send(401, 'FacturaVenta no encontrado');
            }
          }, function (error) {
            res.send('FacturaVenta no encontrado',error);
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
// DELETE /facturaVenta/facturaVentaId
// Borra el facturaVentaId
exports.delete = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();

  facturaVenta.removeById(req.params.facturaVentaId, function (facturaVenta) {
    if (facturaVenta) {
      res.redirect('/web/facturaVenta');
    } else {
      res.send(401, 'facturaVenta no encontrado');
    }
  }, function (error) {
    res.send('facturaVenta no encontrado');
  });
};
