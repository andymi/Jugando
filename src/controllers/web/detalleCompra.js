'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleCompra
// router.route('/detalleCompra') */
exports.getForm = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  var facturaCompra = Model.FacturaCompra.build();
  var raza = Model.Raza.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          facturaCompra.retrieveId(function (facturaCompraQ) {
              if (facturaCompraQ) {  
                raza.retrieveAll(function (razaQ) {
                  console.log('razaQ',razaQ);
                  if (razaQ) {    
                    console.log('soy facturaCompra retrieveId',facturaCompraQ);
                    res.render('web/detalleCompra/indexb', {
                                    facturaCompraJ:facturaCompraQ,
                                    detalleCompraJ: detalleCompra,
                                    selectJ:razaQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });
                  } else {
                    res.send(401, 'No se encontraron Razas');
                  }
                }, function (error) {
                  res.send('Animal no encontrado');
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
  var descripcionCompra = req.body.descripcionCompra;
  var precioCompra = req.body.precioCompra;
  var cantidadCompra = req.body.cantidadCompra;  
  var subtotalCompra = cantidadCompra*precioCompra;
  var FacturaCompraIdCompra = req.body.id;
  var RazaIdRaza = req.body.selectJ;
  console.log('soy cantidad', cantidadCompra);
  console.log('soy precioCompra', precioCompra);
  console.log(subtotalCompra);

  var index = Model.DetalleCompra.build({
    descripcionCompra: descripcionCompra,
    precioCompra: precioCompra,    
    cantidadCompra: cantidadCompra,
    subtotalCompra: subtotalCompra,
    FacturaCompraIdCompra: FacturaCompraIdCompra
  });
  var stock = Model.Stock.build({
    cantidad: cantidadCompra,
    RazaIdRaza: RazaIdRaza
  });

  index.add(function (success) {
    index.retriveSum(FacturaCompraIdCompra, function (detalleCompras) {
      if (detalleCompras) {
        index.retriveCan(FacturaCompraIdCompra, function (detalleCompras) {
          if (detalleCompras) {
            stock.retrieveByCompra(RazaIdRaza, function (detalle) {
              console.log("detalleee***********", detalle);
              if (detalle) {
                console.log("dentroooo1***********", detalle.idStock);
                console.log("dentroooo2***********", detalle.cantidad);
                var id = detalle.idStock;
                var cantidad1 = detalle.cantidad;
                
                stock.retrieveByActualizarCompra(id, cantidad1, cantidadCompra, function (detalle) {
                  res.redirect('/web/detalleCompra/cargar');
                },function (err) {
                  res.send('Error en cantidad total de animales',err);
                });
              } else {
                console.log("elseeeeee***********");                
                stock.add(function (success) {
                  res.redirect('/web/detalleCompra/cargar');
                });
              }
            },function (err) {
                res.send('Error en cantidad total de animales',err);
            });
          } else {
            res.send(401, 'No se puede cargar la cantidad total de animales');
          }
        },function (err) {
            res.send('Error en cantidad total de animales',err);
        });
      } else {
        res.send(401, 'No se puede cargar el total de la compra');
      }
    },function (err) {
        res.send('Error al intentar cargar el total de la compra',err);
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
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          detalleCompra.retrieveAll2(req.params.id, function (detalleCompras) {
            if (detalleCompras) {
              res.render('web/detalleCompra/success', { 
                detalleCompras:detalleCompras,
                mensajes: mensaje1,
                mensajeria: mensaje2
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
      res.redirect('/web/facturaCompra');
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
  var raza = Model.Raza.build();
        detalleCompra.retrieveById(req.params.detalleCompraId, function (detalleCompra) {
          if (detalleCompra) {
            console.log('dentro de if Compra');
            raza.retrieveAll(function (razaQ) {
                  console.log('razaQ',razaQ);
                  if (razaQ) {    
                    res.render('web/detalleCompra/edit', {
                              detalleCompra:detalleCompra
                            });
                  } else {
                    res.send(401, 'No se encontraron Razas');
                  }
            }, function (error) {
              res.send('Raza no encontrado');
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
      res.redirect('/web/facturaCompra');
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
};
