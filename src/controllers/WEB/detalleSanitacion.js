'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleSanitacion
// router.route('/detalleSanitacion') */
exports.getForm1 =  function (req, res) {
  var animal = Model.Animal.build();
  var detalleSanitacion = Model.DetalleSanitacion.build();
  var sanitacion = Model.Sanitacion.build();
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
      sanitacion.retrieveId(function (sanitacion) {
          if (sanitacion) {      
            console.log('soy sanitacion retrieveId',sanitacion);
            res.render('web/detalleSanitacion/index', {
                            sanitacionJ:sanitacion,
                            detalleSanitacionJ: detalleSanitacion,
                            selectJ: animalQ
            });    
          } else {
            res.send(401, 'No se encontraron Sanitaciones');
          }
      });
    }else {
      res.send(401, 'No se Eencontraron Sanitaciones');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
    }
  );
};
// POST /detalleSanitacion
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacionSanitacion = req.body.observacionSanitacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var SanitacionIdSanitacion = req.body.id;

  var index = Model.DetalleSanitacion.build({
    observacionSanitacion: observacionSanitacion,
    AnimalIdAnimal: AnimalIdAnimal,
    SanitacionIdSanitacion: SanitacionIdSanitacion
  });

  index.add(function (success) {
    res.redirect('/web/detalleSanitacionInsumo/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleSanitacion)
// GET /detalleSanitacion */
exports.listPag1 = function (req, res) {
  var detalleSanitacion =Model.DetalleSanitacion.build();
  console.log('dentro de get /',req.body);
  detalleSanitacion.retrieveAll(req.params.id, function (detalleSanitaciones) {
    if (detalleSanitaciones) {
      res.render('web/detalleSanitacion/success', { detalleSanitaciones:detalleSanitaciones});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleSanitacion no encontrado');
  });
};

//*******************************************************
exports.getForm2 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleSanitacion = Model.DetalleSanitacion.build();
  var sanitacionId = req.params.sanitacionId;
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
            console.log('soy sanitacionId',sanitacionId);
            res.render('web/detalleSanitacion/indexa', {
                            sanitacionJ:sanitacionId,
                            detalleSanitacionJ: detalleSanitacion,
                            selectJ: animalQ
            });    
    }else {
      res.send(401, 'No se Eencontraron Sanitaciones');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
    }
  );
};
// POST /detalleSanitacion
exports.create2 = function (req, res) {
  console.log('DENTRO DE ADD',req.body);
  // bodyParser debe hacer la magia
  var observacionSanitacion = req.body.observacionSanitacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var SanitacionIdSanitacion = req.body.id;

  var index = Model.DetalleSanitacion.build({
    observacionSanitacion: observacionSanitacion,
    AnimalIdAnimal: AnimalIdAnimal,
    SanitacionIdSanitacion: SanitacionIdSanitacion
  });

  index.add(function (success) {
    res.redirect('/web/sanitacion');
  },
  function (err) {
    res.send(err);
  });
};
//*******************************************************
/* Rutas que terminan en /detalleSanitacion/:detalleSanitacionId
// router.route('/detalleSanitacion/:detalleSanitacionId')
// PUT /detalleSanitacion/:detalleSanitacionId
// Actualiza detalleSanitacion */

exports.update =  function (req, res) {
  var detalleSanitacion = Model.DetalleSanitacion.build();

  detalleSanitacion.observacionSanitacion = req.body.observacionSanitacion;
  detalleSanitacion.AnimalIdAnimal = req.body.animalSele;

  detalleSanitacion.updateById(req.params.detalleSanitacionId, function (success) {
    if (success) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Detalle Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
  });
};

// GET /detalleSanitacion/:detalleSanitacionId
// Toma un detalleSanitacion por id
exports.read = function (req, res) {
  var detalleSanitacion = Model.DetalleSanitacion.build();
  var animal =Model.Animal.build();
  animal.retrieveAll(function (animal) {
    if (animal) { 
      detalleSanitacion.retrieveById(req.params.detalleSanitacionId, function (detalleSanitacion) {
        if (detalleSanitacion) {
          res.render('web/detalleSanitacion/edit', {
                      detalleSanitacion:detalleSanitacion,
                      select: animal
                    });
        } else {
          res.send(401, 'Detalle Sanitacion no encontrado');
        }
      }, function (error) {
        res.send('Detalle Sanitacion no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    console.log(error);
    res.send('desDetalles no encontrado');
  });
};

// DELETE /detalleSanitacion/detalleSanitacionId
// Borra el detalleSanitacionId
exports.delete = function (req, res) {
  var detalleSanitacion = Model.DetalleSanitacion.build();

 detalleSanitacion.removeById(req.params.detalleSanitacionId, function (detalleSanitacion) {
    if (detalleSanitacion) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Detalle Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
  });
};
