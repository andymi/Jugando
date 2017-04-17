'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleCompra
// router.route('/detalleCompra') */
exports.getForm = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  var insumo = Model.Insumo.build();
  var facturaCompra = Model.FacturaCompra.build();
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
          facturaCompra.retrieveId(function (facturaCompraQ) {
              if (facturaCompraQ) { 
                console.log('soy facturaCompra retrieveId',facturaCompraQ);                                
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
                            res.render('web/detalleCompraInsumo/indexb', {
                                            facturaCompraJ:facturaCompraQ,
                                            detalleCompraJ: detalleCompra,
                                            mensajes: mensaje1,
                                            mensajeria: mensaje2,
                                            selectJ: insumoQ,
                                            alarmas1: alarma1,
                                            alarmas2: alarma2 
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
                  res.send('Insumo no encontrado');
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
  var insumo = Model.Insumo.build();

  var precioCompra = req.body.precioCompra;
  var cantidadCompra = req.body.cantidadCompra;  
  var subtotalCompra = cantidadCompra*precioCompra;
  var FacturaCompraIdCompra = req.body.id;
  console.log('soy cantidad', cantidadCompra);
  console.log('soy precioCompra', precioCompra);
  console.log(subtotalCompra);
  var InsumoIdInsumo = req.body.selectJ;
  var cantidadMinima = req.body.cantidadMinima;
  

  var index = Model.DetalleCompra.build({
    precioCompra: precioCompra,    
    cantidadCompra: cantidadCompra,
    subtotalCompra: subtotalCompra,
    FacturaCompraIdCompra: FacturaCompraIdCompra,
    InsumoIdInsumo: InsumoIdInsumo
  });
  var stock = Model.Stock.build({
    cantidad: cantidadCompra,
    cantidadMinima: cantidadMinima,
    InsumoIdInsumo: InsumoIdInsumo
  });

  index.add2(function (success) {
    index.retriveSum(FacturaCompraIdCompra, function (detalleCompras) {
      if (detalleCompras) {
        index.retriveCan(FacturaCompraIdCompra, function (detalleCompras) {
          if (detalleCompras) {            
              stock.retrieveByCompraInsumo(InsumoIdInsumo, function (detalle) {
                console.log("detalleee***********", detalle);
                if (detalle) {
                  console.log("dentroooo1***********", detalle.idStock);
                  console.log("dentroooo2***********", detalle.cantidad);
                  var id = detalle.idStock;
                  var cantidad1 = detalle.cantidad;
                  /******************************************************/
                  insumo.retrieveByContenido(InsumoIdInsumo, function (detalle) {
                    console.log("insumooooo1***********", detalle.contenidoInsumo);
                    console.log("insumooooo2***********", detalle.presentacionInsumo);
                    var presentacion = detalle.presentacionInsumo;
                    var contenido = parseInt(detalle.contenidoInsumo);
                    var cantidades = parseInt(cantidadCompra);
                    if (presentacion == "Bolsa") {
                        var resultado = contenido * cantidades;
                        console.log("soy resultadoooo", resultado);
                        stock.retrieveByActualizarCompra(id, cantidad1, resultado, function (detalle) {
                          res.redirect('/web/detalleCompraInsumo/cargar');
                        },function (err) {
                          res.send('Error en cantidad total de animales',err);
                        });
                    }else{
                      stock.retrieveByActualizarCompra(id, cantidad1, cantidadCompra, function (detalle) {
                        res.redirect('/web/detalleCompraInsumo/cargar');
                      },function (err) {
                        res.send('Error en cantidad total de animales',err);
                      });
                    }
                  },function (err) {
                    res.send('Error en cantidad total de animales',err);
                  });
                  /****************************************************************/
                } else {
                  console.log("elseeeeee***********"); 
                  insumo.retrieveByContenido(InsumoIdInsumo, function (detalle) {
                    console.log("insumooooo1***********", detalle.contenidoInsumo);
                    console.log("insumooooo2***********", detalle.presentacionInsumo);
                    var presentacion = detalle.presentacionInsumo;
                    var contenido = parseInt(detalle.contenidoInsumo);
                    var cantidades = parseInt(cantidadCompra);
                    if (presentacion == "Bolsa") {
                        var resultado = contenido * cantidades;
                        console.log("soy resultadoooo", resultado);
                        stock.addInsumo2(resultado, function (success) {
                          res.redirect('/web/detalleCompraInsumo/cargar');
                        });
                    }else{
                        stock.addInsumo(function (success) {
                          res.redirect('/web/detalleCompraInsumo/cargar');
                        });
                    }
                  },function (err) {
                    res.send('Error en cantidad total de animales',err);
                  });                  
                }
              },function (err) {
                  res.send('Error en cantidad total de animales',err);
              });


          } else {
            res.send(401, 'No se puede cargar la cantidad total de insumos');
          }
        },function (err) {
            res.send('Error en cantidad total de insumos',err);
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
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          detalleCompra.retrieveAll(req.params.id, function (detalleCompras) {
            if (detalleCompras) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      res.render('web/detalleCompraInsumo/success', { 
                        detalleCompras:detalleCompras,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2 
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
  //************************************ 
  var alarma = Model.Alarma.build();
  
        detalleCompra.retrieveById(req.params.detalleCompraId, function (detalleCompra) {
          if (detalleCompra) {
            console.log('dentro de if Compra');
            alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) {  
                  console.log(req.body);
                  res.render('web/detalleCompraInsumo/edit', {
                    detalleCompra:detalleCompra,
                    alarmas1: alarma1,
                    alarmas2: alarma2 
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
