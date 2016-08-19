'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleVacunacion
// router.route('/detalleVacunacion') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleVacunacion = Model.DetalleVacunacion.build();
  var vacunacion = Model.Vacunacion.build();
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
              vacunacion.retrieveId(function (vacunacionQ) {
                  if (vacunacionQ) {      
                    console.log('soy Vacunacion retrieveId',vacunacionQ);
                    res.render('web/detalleVacunacion/index', {
                                    vacunacionJ:vacunacionQ,
                                    detalleVacunacionJ: detalleVacunacion,
                                    selectJ: animalQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });    
                  } else {
                    res.send(401, 'No se encontraron Pesajes');
                  }
              });
            }else {
              res.send(401, 'No se Eencontraron Pesajes');
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
// POST /detalleVacunacion
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var numeroCertificado = req.body.numeroCertificado;
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var VacunacionIdVacunacion = req.body.id; 

  var index = Model.DetalleVacunacion.build({
    numeroCertificado:numeroCertificado,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    VacunacionIdVacunacion:VacunacionIdVacunacion
  });

  index.add(function (success) {
    res.redirect('/web/detalleVacunacionInsumo/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleVacunacion)
// GET /detalleVacunacion */

exports.listPag1 = function (req, res) {
  var detalleVacunacion = Model.DetalleVacunacion.build();
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
          detalleVacunacion.retrieveAll(req.params.id, function (detalleVacunacion) {
            if (detalleVacunacion) {
              res.render('web/detalleVacunacion/success', { 
                detalleVacunaciones:detalleVacunacion,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Detalles');
            }
          }, function (error) {
            res.send('DetalleVacunacion no encontrado');
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
//******************************************************
exports.getForm2 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleVacunacion = Model.DetalleVacunacion.build();
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
          animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) {
                    console.log('soy vacunacionId',vacunacionId);
                    res.render('web/detalleVacunacion/indexa', {
                                    vacunacionJ:vacunacionId,
                                    detalleVacunacionJ: detalleVacunacion,
                                    selectJ: animalQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });    
            }else {
              res.send(401, 'No se Eencontraron Pesajes');
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
// POST /detalleVacunacion
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var numeroCertificado = req.body.numeroCertificado;
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var VacunacionIdVacunacion = req.body.id; 

  var index = Model.DetalleVacunacion.build({
    numeroCertificado:numeroCertificado,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    VacunacionIdVacunacion:VacunacionIdVacunacion
  });

  index.add(function (success) {
    res.redirect('/web/vacunacion');
  },
  function (err) {
    res.send(err);
  });
};
//******************************************************
/* Rutas que terminan en /detalleVacunacion/:detalleVacunacionId
// router.route('/detalleVacunacion/:detalleVacunacionId')
// PUT /detalleVacunacion/:detalleVacunacionId
// Actualiza detalleVacunacion */

exports.update = function (req, res) {
  var detalleVacunacion = Model.DetalleVacunacion.build();

  detalleVacunacion.numeroCertificado = req.body.numeroCertificado;
  detalleVacunacion.observacion = req.body.observacion;
  detalleVacunacion.AnimalIdAnimal = req.body.animalSele;

  detalleVacunacion.updateById(req.params.detalleVacunacionId, function (success) {
    if (success) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Detalle Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion no encontrado');
  });
};

// GET /detalleVacunacion/:detalleVacunacionId
// Toma un detalleVacunacion por id
exports.read = function (req, res) {
  var detalleVacunacion = Model.DetalleVacunacion.build();
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
              detalleVacunacion.retrieveById(req.params.detalleVacunacionId, function (detalleVacunacion) {
                if (detalleVacunacion) {
                  res.render('web/detalleVacunacion/edit', {
                              detalleVacunacion:detalleVacunacion,
                              select: animal,
                              mensajes: mensaje1,
                              mensajeria: mensaje2
                            });
                } else {
                  res.send(401, 'Detalle Vacunacion no encontrado');
                }
              }, function (error) {
                res.send('Detalle Vacunacion no encontrado');
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

// DELETE /detalleVacunacion/detalleVacunacionId
// Borra el detalleVacunacionId
exports.delete = function (req, res) {
  var detalleVacunacion = Model.DetalleVacunacion.build();

 detalleVacunacion.removeById(req.params.detalleVacunacionId, function (detalleVacunacion) {
    if (detalleVacunacion) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Detalle Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion no encontrado');
  });
};
