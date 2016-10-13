'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleVenta
// router.route('/detalleVenta') */
exports.getForm1 = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  var detalleVenta = Model.DetalleVenta.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          facturaVenta.retrieveId(function (FacturaVentaq) {
            console.log('FacturaVentaq',FacturaVentaq);

            if (FacturaVentaq) {
                res.render('web/detalleVenta/index', {
                    detalleVentaJ: detalleVenta,
                    facturaVentaJ: FacturaVentaq,
                    mensajes: mensaje1,
                    mensajeria: mensaje2
                });
            }
          }, function (error) {
            res.send('DetalleVenta no encontrado');
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
// POST /detalleVenta
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionVenta = req.body.descripcionVenta;
  var precioVenta = req.body.precioVenta;
  var cantidadVenta = req.body.cantidadVenta;
  var subtotalVenta =cantidadVenta*precioVenta; 
  var FacturaVentaIdVenta = req.body.id; 
  console.log('subtotalVenta',subtotalVenta);

  var index = Model.DetalleVenta.build({
    descripcionVenta: descripcionVenta,
    precioVenta: precioVenta,    
    cantidadVenta: cantidadVenta,
    subtotalVenta : subtotalVenta,
    FacturaVentaIdVenta: FacturaVentaIdVenta
  });

  index.add(function (success) {
    index.retriveSum(FacturaVentaIdVenta, function (detalleVentas) {
      if (detalleVentas) {
        index.retriveCan(FacturaVentaIdVenta, function (detalleVentass) {
          if (detalleVentass) {
            //stock.add(function (success) {
              res.redirect('/web/detalleVenta/cargar');        
            /*}, function (err) {
              res.send('stock error',err);
            });*/            
          } else {
            res.send(401, 'No se puede cargar la cantidad total de animales');
          }
        },function (err) {
            res.send('Error en cantidad total de animales',err);
        });
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa',err);
    }); 
  },function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleVenta)
// GET /detalleVenta */
exports.listPag1 =  function (req, res) {
  var detalleVenta = Model.DetalleVenta.build();
  console.log('dentro de get /',req.params.id);
   //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          detalleVenta.retrieveAll(req.params.id, function (detalleVentas) {
            if (detalleVentas) {
              res.render('web/detalleVenta/success', { 
                detalleVentas:detalleVentas,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Detalles');
            }
          }, function (error) {
            res.send('DetalleVenta no encontrado');
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
//***********************************************************
exports.getForm2 = function (req, res) {
  var ventaId = req.params.ventaId;
  var detalleVenta = Model.DetalleVenta.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          console.log('ventaId',ventaId);
            res.render('web/detalleVenta/indexa', {
                detalleVentaJ: detalleVenta,
                ventaJ: ventaId,
                mensajes: mensaje1,
                mensajeria: mensaje2
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
// POST /detalleVenta
exports.create2 =  function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionVenta = req.body.descripcionVenta;
  var precioVenta = req.body.precioVenta;
  var cantidadVenta = req.body.cantidadVenta; 
  var subtotalVenta =req.body.subtotalVenta;
  var FacturaVentaIdVenta = req.body.id; 

  var index = Model.DetalleVenta.build({
    descripcionVenta: descripcionVenta,
    precioVenta: precioVenta,    
    cantidadVenta: cantidadVenta,
    subtotalVenta: subtotalVenta,
    FacturaVentaIdVenta: FacturaVentaIdVenta
  });

  index.add(function (success) {
    index.retriveSum(FacturaVentaIdVenta, function (detalleVentas) {
      if (detalleVentas) {
        index.retriveCan(FacturaVentaIdVenta, function (detalleVentas) {
          if (detalleVentas) {
            stock.add(function (success) {
              res.redirect('/web/facturaVenta');        
            }, function (err) {
              res.send('stock error',err);
            });            
          } else {
            res.send(401, 'No se puede cargar la cantidad total de animales');
          }
        },function (err) {
            res.send('Error en cantidad total de animales',err);
        });
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa',err);
    }); 
  },function (err) {
    res.send(err);
  });
};

//***********************************************************
/* Rutas que terminan en /detalleVenta/:detalleVentaId
// router.route('/detalleVenta/:detalleVentaId')
// PUT /detalleVenta/:detalleVentaId
// Actualiza detalleVenta */

exports.update = function (req, res) {
  var detalleVenta = Model.DetalleVenta.build();

  detalleVenta.descripcionVenta = req.body.descripcionVenta;
  detalleVenta.precioVenta = req.body.precioVenta;
  detalleVenta.cantidadVenta = req.body.cantidadVenta;
  detalleVenta.subtotalVenta = req.body.subtotalVenta;
  
  

  detalleVenta.updateById(req.params.detalleVentaId, function (success) {
    if (success) {
      res.redirect('/web/facturaVenta');
    } else {
      res.send(401, 'Detalle Venta no encontrado');
    }
  }, function (error) {
    res.send('Detalle Venta no encontrado');
  });
};

// GET /detalleVenta/:detalleVentaId
// Toma un detalleVenta por id
exports.read = function (req, res) {
  var detalleVenta = Model.DetalleVenta.build();
   //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          detalleVenta.retrieveById(req.params.detalleVentaId, function (detalleVenta) {
            if (detalleVenta) {
              res.render('web/detalleVenta/edit', {
                              detalleVenta:detalleVenta
                            });
            } else {
              res.send(401, 'Detalle Venta no encontrado');
            }
          }, function (error) {
            res.send('Detalle Venta no encontrado');
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

// DELETE /detalleVenta/detalleVentaId
// Borra el detalleVentaId
exports.delete = function (req, res) {
  var detalleVenta = Model.DetalleVenta.build();

 detalleVenta.removeById(req.params.detalleVentaId, function (detalleVenta) {
    if (detalleVenta) {
      res.redirect('/web/facturaVenta');
    } else {
      res.send(401, 'Detalle Venta no encontrado');
    }
  }, function (error) {
    res.send('Detalle Venta no encontrado');
  });
};
