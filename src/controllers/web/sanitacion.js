'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /sanitacion
// router.route('/sanitacion') */
exports.getForm = function (req, res) {
  var empleado = Model.Empleado.build();
  var proveedor = Model.Proveedor.build();
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
          proveedor.retrieveByProveedor3(function (proveedorQ) {
            console.log('proveedorQ',proveedorQ);
            if (proveedorQ) {
              empleado.retrieveAll(function (empleadoQ) {
                console.log('empleadoQ',empleadoQ);
                if (empleadoQ) {
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
                          res.render('web/sanitacion/index', {
                            sanitacionJ: sanitacion,
                            selectJ: empleadoQ,
                            selectN: proveedorQ,
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
                }

              },function (error) {
                res.send('Sanitacion no encontrado');
              }); 
            }
          },function (error) {
              res.send('Sanitacion no encontrado');
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
// POST /sanitacion
exports.create = function (req, res) {
  //console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaSanitacion = req.body.fechaSanitacion;
  var horaSanitacion = req.body.horaSanitacion;
  var observacion = req.body.observacion; 
  var EmpleadoIdEmpleado = req.body.selectJ;
  var ProveedorIdProveedor = req.body.selectN;

  var index = Model.Sanitacion.build({
    fechaSanitacion: fechaSanitacion,
    horaSanitacion: horaSanitacion,
    observacion: observacion,
    EmpleadoIdEmpleado: EmpleadoIdEmpleado,
    ProveedorIdProveedor: ProveedorIdProveedor
  });

  index.add(function (success) {
    res.redirect('/web/detalleSanitacion/cargar');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los sanitacion)
// GET /sanitacion */
exports.listPag = function (req, res) {
  var sanitacion = Model.Sanitacion.build();
  console.log('request body',req.body);
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
          sanitacion.retrieveAll(function (sanitacion) {
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
                      res.render('web/sanitacion/success', { 
                        sanitacion: sanitacion,
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
              console.log('soy sanitacion retrieveAll',sanitacion);
            } else {
              res.send(401, 'No se encontraron Sanitaciones');
            }
          }, function (error) {
            res.send('Sanitacion no encontrado');
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
/* Rutas que terminan en /sanitacion/:sanitacionId
// router.route('/sanitacion/:sanitacionId')
// PUT /sanitacion/:sanitacionId
// Actualiza sanitacion */

exports.update = function (req, res) {
  var sanitacion = Model.Sanitacion.build();

  sanitacion.fechaSanitacion = req.body.fechaSanitacion;
  sanitacion.horaSanitacion = req.body.horaSanitacion;
  sanitacion.observacion = req.body.observacion;
  sanitacion.EmpleadoIdEmpleado = req.body.empleadoSele;
  sanitacion.ProveedorIdProveedor = req.body.proveedorSele;
  
  

  sanitacion.updateById(req.params.sanitacionId, function (success) {
    if (success) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Sanitacion no encontrado');
  });
};
// GET /sanitacion/:sanitacionId
// Toma un sanitacion por id
exports.read = function (req, res) {
  var sanitacion = Model.Sanitacion.build();
  var empleado = Model.Empleado.build();
  var proveedor = Model.Proveedor.build();
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
          proveedor.retrieveAll(function (proveedor) {
            if (proveedor) {
                empleado.retrieveAll(function (empleado) {
                  if (empleado) {
                    sanitacion.retrieveById(req.params.sanitacionId, function (sanitacion) {
                      if (sanitacion) {
                        alarma.retriveCount(function (alarma1) { 
                          console.log('alarma1', alarma1);
                          if (alarma1) {     
                            alarma.retrieveAll(function (alarma2) {
                              console.log('alarma2', alarma2);
                              if (alarma2) {  
                                
                                    console.log(empleado); 
                                    var usuario = req.session.user.usuario;
                                    var pass = req.session.user.pass;
                                    var fechaCreacion = req.session.user.fechaCreacion;                 
                                    res.render('web/sanitacion/edit', {
                                          sanitacion:sanitacion,
                                          selectJ: empleado,
                                          select: proveedor,
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
                        res.send(401, 'Sanitacion no encontrado');
                      }
                    }, function (error) {
                      res.send('Sanitacion no encontrado');
                    });
                  } else {
                    res.send(401, 'No se encontraron empleados');
                  }
                }, function (error) {
                  console.log(error);
                  res.send('desempleados no encontrado');
                });
            } else {
              res.send(401, 'No se encontraron proveedor');
            }
          }, function (error) {
            console.log(error);
            res.send('desproveedor no encontrado');
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
exports.listPag1 = function (req, res) {
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
          sanitacion.retrieveVerId(req.params.id, function (sanitacionq) {
            if (sanitacionq) {
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
                          sanitacion:sanitacionq,
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
              res.send(401, 'arPesaje no encontrado');
            }
          }, function (error) {
            res.send('esPesaje no encontrado',error);
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
exports.listPag2 = function (req, res) {
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
          sanitacion.retrieveVerId(req.params.id, function (sanitacionq) {
            if (sanitacionq) {
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
                          sanitacion:sanitacionq,
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
              res.send(401, 'arPesaje no encontrado');
            }
          }, function (error) {
            res.send('esPesaje no encontrado',error);
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
// DELETE /sanitacion/sanitacionId
// Borra el sanitacionId
exports.delete = function (req, res) {
  var sanitacion = Model.Sanitacion.build();

 sanitacion.removeById(req.params.sanitacionId, function (sanitacion) {
    if (sanitacion) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Sanitacion no encontrado');
  });
};
