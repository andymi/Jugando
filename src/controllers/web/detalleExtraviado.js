'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleExtraviado
// router.route('/detalleExtraviado') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleExtraviado = Model.DetalleExtraviado.build();
  var extraviado = Model.Extraviado.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) {
              extraviado.retrieveId(function (extraviadoQ) {
                  if (extraviadoQ) {      
                    //console.log('soy extraviado retrieveId',extraviadoQ);
                    res.render('web/detalleExtraviado/index', {
                                    extraviadoJ:extraviadoQ,
                                    detalleExtraviadoJ: detalleExtraviado,
                                    selectJ: animalQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });    
                  } else {
                    res.send(401, 'No se encontraron Extraviado');
                  }
              });
            }else {
              res.send(401, 'No se Eencontraron Extraviado');
            }
          }, function (error) {
            res.send('Detalle Extraviado no encontrado');
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
// POST /detalleExtraviado
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacionExtraviado = req.body.observacionExtraviado; 
  var AnimalIdAnimal = req.body.selectJ;
  var ExtraviadoIdExtraviado = req.body.id;

  var index = Model.DetalleExtraviado.build({
    observacionExtraviado: observacionExtraviado,
    AnimalIdAnimal: AnimalIdAnimal,
    ExtraviadoIdExtraviado: ExtraviadoIdExtraviado
  });

  index.add(function (success) {
    index.retriveCount(ExtraviadoIdExtraviado, function (detalleExtraviados) {
      if (detalleExtraviados) {
        res.redirect('/web/detalleExtraviado/cargar');    
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa');
    });
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleExtraviado)
// GET /detalleExtraviado */

exports.listPag1 = function (req, res) {
  var detalleExtraviado = Model.DetalleExtraviado.build();
  console.log('dentro de get /',req.body);
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        //console.log('mensaje2', mensaje2);
        if (mensaje2) {
          detalleExtraviado.retrieveAll(req.params.id, function (detalleExtraviados) {
            if (detalleExtraviados) {
              res.render('web/detalleExtraviado/success', { 
                detalleExtraviados:detalleExtraviados,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Detalles');
            }
          }, function (error) {
            res.send('DetalleExtraviado no encontrado');
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
//*************************************************************
exports.getForm2 = function (req, res) {
  var animal =Model.Animal.build();
  var detalleExtraviado = Model.DetalleExtraviado.build();
  var extraviadoId = req.params.extraviadoId;
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) {
                   // console.log('soy extraviado retrieveId',extraviadoId);
                    res.render('web/detalleExtraviado/indexa', {
                                    extraviadoJ:extraviadoId,
                                    detalleExtraviadoJ: detalleExtraviado,
                                    selectJ: animalQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });              
            }else {
              res.send(401, 'No se Eencontraron Extraviado');
            }
          }, function (error) {
            res.send('Detalle Extraviado no encontrado');
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
// POST /detalleExtraviado
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacionExtraviado = req.body.observacionExtraviado; 
  var AnimalIdAnimal = req.body.selectJ;
  var ExtraviadoIdExtraviado = req.body.id;

  var index = Model.DetalleExtraviado.build({
    observacionExtraviado: observacionExtraviado,
    AnimalIdAnimal: AnimalIdAnimal,
    ExtraviadoIdExtraviado: ExtraviadoIdExtraviado
  });

  index.add(function (success) {
    index.retriveCount(ExtraviadoIdExtraviado, function (detalleExtraviados) {
      if (detalleExtraviados) {
        res.redirect('/web/extraviado');   
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa');
    });
  },
  function (err) {
    res.send(err);
  });
};
//*************************************************************
/* Rutas que terminan en /detalleExtraviado/:detalleExtraviadoId
// router.route('/detalleExtraviado/:detalleExtraviadoId')
// PUT /detalleExtraviado/:detalleExtraviadoId
// Actualiza detalleExtraviado */

exports.update = function (req, res) {
  var detalleExtraviado = Model.DetalleExtraviado.build();

  detalleExtraviado.observacionExtraviado = req.body.observacionExtraviado;
  detalleExtraviado.AnimalIdAnimal = req.body.animalSele;
  
  detalleExtraviado.updateById(req.params.detalleExtraviadoId, function (success) {
    if (success) {
      res.redirect('/web/extraviado');
    } else {
      res.send(401, 'Detalle Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Detalle Extraviado no encontrado');
  });
};

// GET /detalleExtraviado/:detalleExtraviadoId
// Toma un detalleExtraviado por id
exports.read = function (req, res) {
  var detalleExtraviado = Model.DetalleExtraviado.build();
  var animal = Model.Animal.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          animal.retrieveAll(function (animal) {
            if (animal) {
              detalleExtraviado.retrieveById(req.params.detalleExtraviadoId, function (detalleExtraviado) {
                if (detalleExtraviado) {
                  res.render('web/detalleExtraviado/edit', {
                              detalleExtraviado:detalleExtraviado,
                              select: animal,
                              mensajes: mensaje1,
                              mensajeria: mensaje2
                            });
                } else {
                  res.send(401, 'Detalle Extraviado no encontrado');
                }
              }, function (error) {
                res.send('Detalle Extraviado no encontrado');
              });
            } else {
              res.send(401, 'No se encontraron Detalles');
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

// DELETE /detalleExtraviado/detalleExtraviadoId
// Borra el detalleExtraviadoId
exports.delete =  function (req, res) {
  var detalleExtraviado = Model.DetalleExtraviado.build();

 detalleExtraviado.removeById(req.params.detalleExtraviadoId, function (detalleExtraviado) {
    if (detalleExtraviado) {
      res.redirect('/web/extraviado');
    } else {
      res.send(401, 'Detalle Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Detalle Extraviado no encontrado');
  });
};