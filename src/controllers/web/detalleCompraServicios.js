'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleCompra
// router.route('/detalleCompra') */
exports.getForm = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  var servicios = Model.Servicios.build();
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
          facturaCompra.retrieveId(function (facturaCompraQ) {
              if (facturaCompraQ) {  
                console.log('soy facturaCompra retrieveId',facturaCompraQ);   
                servicios.retrieveAll(function (serviciosQ) {
                  console.log('SERVICEQ',serviciosQ);
                  if (serviciosQ) { 
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
                            res.render('web/detalleCompraServicios/indexb', {
                                            facturaCompraJ:facturaCompraQ,
                                            detalleCompraJ: detalleCompra,
                                            mensajes: mensaje1,
                                            mensajeria: mensaje2,
                                            selectJ: serviciosQ,
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
                    res.send(401, 'No se encontraron insumos');
                  }
                }, function (error) {
                  res.send('Servicios no encontrado');
                });  
              } else {
                res.send(401, 'No se encontraron Factura Compras');
              }
          }, function (error) {
            res.send('Detalle FacturaCompra no encontrado');
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
          
// POST /detalleCompra
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var precioCompra = req.body.precioCompra;
  var cantidadCompra = req.body.cantidadCompra;  
  var subtotalCompra = cantidadCompra*precioCompra;
  var FacturaCompraIdCompra = req.body.id;
  console.log('soy cantidad', cantidadCompra);
  console.log('soy precioCompra', precioCompra);
  console.log(subtotalCompra);
  var ServiciosIdServicios = req.body.selectJ;

  var index = Model.DetalleCompra.build({
    precioCompra: precioCompra,    
    cantidadCompra: cantidadCompra,
    subtotalCompra: subtotalCompra,
    FacturaCompraIdCompra: FacturaCompraIdCompra,
    ServiciosIdServicios: ServiciosIdServicios
  });

  index.add3(function (success) {
    index.retriveSum(FacturaCompraIdCompra, function (detalleCompras) {
      if (detalleCompras) {
        index.retriveCan(FacturaCompraIdCompra, function (detalleCompras) {
          if (detalleCompras) {
            res.redirect('/web/detalleCompraServicios/cargar');
          } else {
            res.send(401, 'No se puede cargar la cantidad total de servicios');
          }
        },function (err) {
            res.send('Error en cantidad total de servicios',err);
        });
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa',err);
    });    
  }, function (err) {
    res.send('error',err);
  });
};

/* (trae todos los detalleCompra)
// GET /detalleCompra */
exports.listPag =  function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
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
        if (mensaje2) { 
          console.log('mensaje2', mensaje2); 
          detalleCompra.retrieveAll3(req.params.id, function (detalleCompras) {
            if (detalleCompras) {
              console.log('dentro de detalleCompras', detalleCompras);
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
                      res.render('web/detalleCompraServicios/success', { 
                        detalleCompras:detalleCompras,
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
            res.send('DetalleCompra no encontrado');
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
exports.update = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  detalleCompra.descripcionCompra = req.body.descripcionCompra;
  detalleCompra.precioCompra = req.body.precioCompra;
  detalleCompra.cantidadCompra = req.body.cantidadCompra;
  detalleCompra.subtotalCompra = req.body.subtotalCompra;
  detalleCompra.updateById(req.params.detalleCompraId, function (success) {
    if (success) {
      res.redirect('/web/facturaCompraInsumo');
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
};
// GET /detalleCompra/:detalleCompraId
// Toma un detalleCompra por id
exports.read = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
        detalleCompra.retrieveById(req.params.detalleCompraId, function (detalleCompra) {
          if (detalleCompra) {
            console.log('dentro de if Compra');
            res.render('web/detalleCompraInsumo/edit', {
                      detalleCompra:detalleCompra
                    });
          } else {
            res.send(401, 'Detalle Compra no encontrado');
          }
        }, function (error) {
          res.send('Detalle Compra no encontrado');
        });
};

// DELETE /detalleCompra/detalleCompraId
// Borra el detalleCompraId
exports.delete =  function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  console.log('dentro de delete:*****************');
  detalleCompra.removeById(req.params.detalleCompraId, function (detalleCompra) {
    if (detalleCompra) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/facturaCompraInsumo');
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
};
