'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /facturaCompra
// router.route('/facturaCompra') */
exports.getForm = function (req, res) {
  var proveedor = Model.Proveedor.build();
  var facturaCompra = Model.FacturaCompra.build();
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
          proveedor.retrieveByProveedor(function (proveedorQ) {
            console.log('proveedorQ',proveedorQ);
            if (proveedorQ) {
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
                      res.render('web/facturaCompra/index', {
                        facturaCompraJ: facturaCompra,
                        selectJ: proveedorQ,
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
            res.send('FacturaCompra no encontrado');
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
// POST /facturaCompra
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaCompra = req.body.fechaCompra;
  var horaCompra = req.body.horaCompra;
  var condicionCompra = req.body.condicionCompra;
  var formaPago = req.body.formaPago;
  var numeroCompra = req.body.numeroCompra;  
  var ProveedorIdProveedor = req.body.selectJ;

  console.log('soy post fechaCompra',fechaCompra);
  console.log('soy post horaCompra',horaCompra);
  console.log('soy post condicionCompra',condicionCompra);
  console.log('soy post formaPago',formaPago);
  console.log('soy post numeroCompra',numeroCompra);
  console.log('soy post ProveedorIdProveedor',ProveedorIdProveedor);


  var facturaCompra = Model.FacturaCompra.build({
    fechaCompra: fechaCompra,
    horaCompra: horaCompra,    
    condicionCompra: condicionCompra,
    formaPago: formaPago,
    numeroCompra: numeroCompra,
    ProveedorIdProveedor: ProveedorIdProveedor
  });

  facturaCompra.add(function (success) {
    res.redirect('/web/detalleCompra/cargar');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los facturaCompra)
// GET /facturaCompra */
exports.listPag = function (req, res) {
  var facturaCompra = Model.FacturaCompra.build();
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
          alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) { 
                  facturaCompra.retrieveAll2(function (facturaCompra) {
                    if (facturaCompra) {  
                      console.log('FacturaCompra', facturaCompra);    
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;                    
                      res.render('web/facturaCompra/success', { 
                        facturaCompra: facturaCompra,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2,
                        usuarios: usuario,
                        passs: pass,
                        fechaCreacions: fechaCreacion
                      });
                    } else {
                      res.send(401, 'No se encontraron Compras');
                    }
                  }, function (error) {
                    res.send('Factura Compra no encontrado');
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
};
/* Rutas que terminan en /facturaCompra/:facturaCompraId
// router.route('/facturaCompra/:facturaCompraId')
// PUT /facturaCompra/:facturaCompraId
// Actualiza facturaCompra */
exports.update = function (req, res) {
  var facturaCompra = Model.FacturaCompra.build();
  console.log('*************',req.body);
  facturaCompra.fechaCompra = req.body.fechaCompra;
  facturaCompra.horaCompra = req.body.horaCompra;
  facturaCompra.condicionCompra = req.body.condicionCompra;
  facturaCompra.formaPago = req.body.formaPago;
  facturaCompra.numeroCompra = req.body.numeroCompra;
  facturaCompra.ProveedorIdProveedor = req.body.proveedorSele;

  facturaCompra.updateById(req.params.facturaCompraId, function (success) {
    if (success) {
      res.redirect('/web/facturaCompra');
    } else {
      res.send(401, 'FacturaCompra no encontrado');
    }
  }, function (error) {
    res.send('Factura Compras no encontrado');
  });
};

// GET /facturaCompra/:facturaCompraId
// Toma un facturaCompra por id
exports.read = function (req, res) {
  var facturaCompra = Model.FacturaCompra.build();
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
          proveedor.retrieveByProveedor(function (proveedor) {
            if (proveedor) {
              facturaCompra.retrieveById(req.params.facturaCompraId, function (facturaCompra) {
                if (facturaCompra) {
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
                          res.render('web/facturaCompra/edit', {
                              facturaCompra:facturaCompra,
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
                  res.send(401, 'FacturaCompra no encontrado');
                }
              }, function (error) {
                res.send('FacturaCompra no encontrado');
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
  var facturaCompra = Model.FacturaCompra.build();
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
          facturaCompra.retrieveVerId(req.params.id, function (facturaCompraQ) {
            if (facturaCompraQ) {
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
                      res.render('web/detalleCompra/success', {
                          facturaCompra:facturaCompraQ,
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
            } else {
              res.send(401, 'FacturaCompra no encontrado');
            }
          }, function (error) {
            res.send('FacturaCompra no encontrado',error);
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
// DELETE /facturaCompra/facturaCompraId
// Borra el facturaCompraId
exports.delete = function (req, res) {
  var facturaCompra = Model.FacturaCompra.build();

  facturaCompra.removeById(req.params.facturaCompraId, function (facturaCompra) {
    if (facturaCompra) {
      res.redirect('/web/facturaCompra');
    } else {
      res.send(401, 'FacturaCompra no encontrado');
    }
  }, function (error) {
    res.send('FacturaCompra no encontrado');
  });
};
