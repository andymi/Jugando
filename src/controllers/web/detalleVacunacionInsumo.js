'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleVacunacionInsumo
// router.route('/detalleVacunacionInsumo') */
exports.getForm = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleVacunacionInsumo = Model.DetalleVacunacionInsumo.build();
  var vacunacion = Model.DetalleVacunacion.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          insumo.retrieveByMedicamento(function (insumoQ) {
            console.log('insumoQ',insumoQ);
            if (insumoQ) {
              vacunacion.retrieveId(function (vacunacion) {
                  if (vacunacion) {      
                    console.log('soy ************************** retrieveId',mensaje2);
                    console.log('soy -------------------------- retrieveId',mensaje1);
                    res.render('web/detalleVacunacionInsumo/index', {
                                    vacunacionJ:vacunacion,
                                    detalleVacunacionInsumoJ: detalleVacunacionInsumo,
                                    selectJ: insumoQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });    
                  } else {
                    res.send(401, 'No se encontraron Sanitaciones');
                  }
              });
            }else {
              res.send(401, 'No se Eencontraron Sanitaciones');
            }
          }, function (error) {
            res.send('Detalle Vacunacion no encontrado');
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
// POST /detalleVacunacionInsumo
exports.create1 = function (req, res) {
  console.log(req.body);
  var stock = Model.Stock.build();
  // bodyParser debe hacer la magia
  var cantidadInsumo = req.body.cantidadInsumo; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleVacunacionIdDetalleVacunacion = req.body.id;

  var index = Model.DetalleVacunacionInsumo.build({
   cantidadInsumo : cantidadInsumo,
   InsumoIdInsumo: InsumoIdInsumo,
   DetalleVacunacionIdDetalleVacunacion: DetalleVacunacionIdDetalleVacunacion
  });

  index.add(function (success) {
    console.log('dentro de indexxxxxxxxxxx', InsumoIdInsumo);
    //stock.retrieveVacunacion(InsumoIdInsumo, cantidadInsumo, function (success) {
    //if (success) {
          console.log('tengo la suma de stock');   
          res.redirect('/web/detalleVacunacion/cargar');
    /*} else {
      res.send(401, 'stock no encontrado');
    }
    },function (err) {
      res.send('hay error en stock',err);
    });*/
  },
  function (err) {
    res.send('hay error en index', err);
  });
};

/* (trae todos los detalleVacunacionInsumo)
// GET /detalleVacunacionInsumo */
exports.listPag1 = function (req, res) {
  var detalleVacunacionInsumo = Model.DetalleVacunacionInsumo.build();
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
          detalleVacunacionInsumo.retrieveAll(req.params.id, function (detalleVacunaciones) {
            if (detalleVacunaciones) {
              res.render('web/detalleVacunacionInsumo/success', { 
                detalleVacunaciones:detalleVacunaciones,
                mensajes: mensaje1,
                mensajeria: mensaje2
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
//*********************************************************
exports.getForm2 = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleVacunacionInsumo = Model.DetalleVacunacionInsumo.build();
  var vacunacionId = req.params.vacunacionId;
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          insumo.retrieveAll(function (insumoQ) {
            console.log('insumoQ',insumoQ);
            if (insumoQ) {     
                    console.log('soy vacunacion retrieveId',vacunacionId);
                    res.render('web/detalleVacunacionInsumo/indexa', {
                                    vacunacionJ:vacunacionId,
                                    detalleVacunacionInsumoJ: detalleVacunacionInsumo,
                                    selectJ: insumoQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });    
            }else {
              res.send(401, 'No se Eencontraron Sanitaciones');
            }
          }, function (error) {
            res.send('Detalle Vacunacion no encontrado');
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
// POST /detalleVacunacionInsumo
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidadInsumo = req.body.cantidadInsumo; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleVacunacionIdDetalleVacunacion = req.body.id;

  var index = Model.DetalleVacunacionInsumo.build({
   cantidadInsumo : cantidadInsumo,
   InsumoIdInsumo: InsumoIdInsumo,
   DetalleVacunacionIdDetalleVacunacion: DetalleVacunacionIdDetalleVacunacion
  });

  index.add(function (success) {
    res.redirect('/web/vacunacion');
  },
  function (err) {
    res.send(err);
  });
};

//*********************************************************
/* Rutas que terminan en /detalleVacunacionInsumo/:detalleVacunacionInsumoId
// router.route('/detalleVacunacionInsumo/:detalleVacunacionInsumoId')
// PUT /detalleVacunacionInsumo/:detalleVacunacionInsumoId
// Actualiza detalleVacunacionInsumo */

exports.update = function (req, res) {
  var detalleVacunacionInsumo = Model.DetalleVacunacionInsumo.build();

  detalleVacunacionInsumo.cantidadInsumo = req.body.cantidadInsumo;
  detalleVacunacionInsumo.InsumoIdInsumo = req.body.insumoSele;

  detalleVacunacionInsumo.updateById(req.params.detalleVacunacionInsumoId, function (success) {
    if (success) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Detalle Vacunacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion Insumo no encontrado');
  });
};

// GET /detalleVacunacionInsumo/:detalleVacunacionInsumoId
// Toma un detalleVacunacionInsumo por id
exports.read = function (req, res) {
  var detalleVacunacionInsumo = Model.DetalleVacunacionInsumo.build();
  var insumo = Model.Insumo.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          insumo.retrieveAll(function (insumo) {
            if (insumo) { 
              detalleVacunacionInsumo.retrieveById(req.params.detalleVacunacionInsumoId, function (detalleVacunacionInsumo) {
                if (detalleVacunacionInsumo) {
                  res.render('web/detalleVacunacionInsumo/edit', {
                              detalleVacunacionInsumo:detalleVacunacionInsumo,
                              select: insumo,
                              mensajes: mensaje1,
                              mensajeria: mensaje2
                            });
                } else {
                  res.send(401, 'Detalle Vacunacion Insumo no encontrado');
                }
              }, function (error) {
                res.send('Detalle Vacunacion Insumo no encontrado');
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

// DELETE /detalleVacunacionInsumo/detalleVacunacionInsumoId
// Borra el detalleVacunacionInsumoId
exports.delete = function (req, res) {
  var detalleVacunacionInsumo = Model.DetalleVacunacionInsumo.build();

 detalleVacunacionInsumo.removeById(req.params.detalleVacunacionInsumoId, function (detalleSanitacionInsumo) {
    if (detalleVacunacionInsumo) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Detalle Vacunacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion Insumo no encontrado');
  });
};