'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /traslado
// router.route('/traslado') */
exports.getForm = function (req, res) {
  var empleado = Model.Empleado.build();
  var facturaCompra = Model.FacturaCompra.build();
  var traslado = Model.Traslado.build();
  var ciudad = Model.Ciudad.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          ciudad.retrieveAll(function (ciudadQ) {
            console.log('ciudadQ',ciudadQ);
            if (ciudadQ) {
              facturaCompra.retrieveAll2(function (facturaCompraq) {
              console.log('facturaCompraq',facturaCompraq);
              if (facturaCompraq) {
                empleado.retrieveAll(function (empleadoQ) {
                //console.log('empleadoQ',empleadoQ);
                if (empleadoQ) {
                  alarma.retriveCount(function (alarma1) { 
                    console.log('alarma1', alarma1);
                    if (alarma1) {     
                      alarma.retrieveAll(function (alarma2) {
                        console.log('alarma2', alarma2);
                        if (alarma2) {  
                          console.log(req.body);                  
                          res.render('web/traslado/index', {
                            trasladoJ: traslado,            
                            selectJ: ciudadQ,
                            selectk: empleadoQ,
                            selectN: facturaCompraq,
                            mensajes: mensaje1,
                            alarmas1: alarma1,
                            alarmas2: alarma2,
                            mensajeria: mensaje2
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
                  res.send('Traslado no encontrado');
                }); 
                }
                },function (error) {
                    res.send('Traslado no encontrado');
                }); 
            }
          }, function (error) {
            res.send('Usuario no encontrado');
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
// POST /traslado
exports.create =  function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaTraslado = req.body.fechaTraslado;
  var numeroRUA = req.body.numeroRUA;
  var marcaAuto = req.body.marcaAuto;
  var CiudadIdCiudad = req.body.selectJ;
  var EmpleadoIdEmpleado = req.body.selectk;
  var FacturaCompraIdCompra = req.body.selectN;

  var index = Model.Traslado.build({
    fechaTraslado: fechaTraslado,
    numeroRUA: numeroRUA,
    marcaAuto: marcaAuto,
    CiudadIdCiudad: CiudadIdCiudad,
    EmpleadoIdEmpleado:EmpleadoIdEmpleado,
    FacturaCompraIdCompra: FacturaCompraIdCompra
  });

  index.add(function (success) {
    res.redirect('/web/detalleTraslado/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los traslado)
// GET /traslado */
exports.listPag = function (req, res) {
  var traslado =Model.Traslado.build();
  console.log('request body',req.body);
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          traslado.retrieveAll(function (traslado) {
            if (traslado) {    
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);                    
                      res.render('web/traslado/success', { 
                        traslado: traslado,
                        mensajes: mensaje1,
                        alarmas1: alarma1,
                        alarmas2: alarma2,
                        mensajeria: mensaje2
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
              console.log('soy traslado retrieveAll',traslado);
            } else {
              res.send(401, 'No se encontraron Traslados');
            }
          }, function (error) {
            res.send('Traslado no encontrado');
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

/* Rutas que terminan en /traslado/:trasladoId
// router.route('/traslado/:trasladoId')
// PUT /traslado/:trasladoId
// Actualiza traslado */

exports.update = function (req, res) {
  var traslado = Model.Traslado.build();

  traslado.fechaTraslado = req.body.fechaTraslado;
  traslado.numeroRUA = req.body.numeroRUA;
  traslado.marcaAuto = req.body.marcaAuto;
  traslado.CiudadIdCiudad = req.body.ciudadSele;
  traslado.EmpleadoIdEmpleado = req.body.empleadoSele;
  traslado.FacturaCompraIdCompra = req.body.compraSele;

  traslado.updateById(req.params.trasladoId, function (success) {
    if (success) {
      res.redirect('/web/traslado');
    } else {
      res.send(401, 'Traslado no encontrado');
    }
  }, function (error) {
    res.send('Traslado no encontrado');
  });
};

// GET /traslado/:trasladoId
// Toma un traslado por id
exports.read = function (req, res) {
  var traslado = Model.Traslado.build();
  var empleado = Model.Empleado.build();
  var facturaCompra = Model.FacturaCompra.build();
  var ciudad =Model.Ciudad.build();
  //************************************
  var alarma = Model.Alarma.build();
  ciudad.retrieveAll(function (ciudad) {
    if (ciudad) {
      facturaCompra.retrieveAll(function (facturaCompra) {
        if (facturaCompra) {
            empleado.retrieveAll(function (empleado) {
              if (empleado) {
                  traslado.retrieveById(req.params.trasladoId, function (traslado) {
                  if (traslado) {
                    alarma.retriveCount(function (alarma1) { 
                      console.log('alarma1', alarma1);
                      if (alarma1) {     
                        alarma.retrieveAll(function (alarma2) {
                          console.log('alarma2', alarma2);
                          if (alarma2) {  
                            console.log(req.body);                  
                            res.render('web/traslado/edit', {
                                  traslado:traslado,
                                  select: ciudad,
                                  selectJ: empleado,
                                  alarmas1: alarma1,
                                  alarmas2: alarma2,
                                  selectN: facturaCompra
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
                    res.send(401, 'Traslado no encontrado');
                  }
                }, function (error) {
                  res.send('Traslado no encontrado');
                });
              } else {
                res.send(401, 'No se encontraron empleados');
              }
            }, function (error) {
              console.log(error);
              res.send('desempleados no encontrado');
            });
        } else {
          res.send(401, 'No se encontraron facturaCompra');
        }
      }, function (error) {
        console.log(error);
        res.send('desproveedor no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron ciudades');
    }
  }, function (error) {
    console.log(error);
    res.send('desProveedor no encontrado');
  });
};

exports.readId = function (req, res) {
  var traslado = Model.Traslado.build();
  //************************************
  var alarma = Model.Alarma.build();
  traslado.retrieveVerId(req.params.id, function (trasladoQ) {
    if (trasladoQ) {
      alarma.retriveCount(function (alarma1) { 
        console.log('alarma1', alarma1);
        if (alarma1) {     
          alarma.retrieveAll(function (alarma2) {
            console.log('alarma2', alarma2);
            if (alarma2) {  
              console.log(req.body);
              res.render('web/detalleTraslado/success', {
                  traslado:trasladoQ,
                  alarmas1: alarma1,
                  alarmas2: alarma2,
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
      res.send(401, 'arTraslado no encontrado');
    }
  }, function (error) {
    res.send('esTraslado no encontrado',error);
  });
};

// DELETE /traslado/trasladoId
// Borra el trasladoId
exports.delete = function (req, res) {
  var traslado = Model.Traslado.build();

 traslado.removeById(req.params.trasladoId, function (traslado) {
    if (traslado) {
      res.redirect('/web/traslado');
    } else {
      res.send(401, 'Traslado no encontrado');
    }
  }, function (error) {
    res.send('Traslado no encontrado');
  });
};
