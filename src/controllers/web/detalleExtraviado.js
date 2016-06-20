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
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
      extraviado.retrieveId(function (extraviadoQ) {
          if (extraviadoQ) {      
            console.log('soy extraviado retrieveId',extraviadoQ);
            res.render('web/detalleExtraviado/index', {
                            extraviadoJ:extraviadoQ,
                            detalleExtraviadoJ: detalleExtraviado,
                            selectJ: animalQ
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
    }
  );
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
    res.redirect('/web/detalleExtraviado/cargar');
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
  detalleExtraviado.retrieveAll(req.params.id, function (detalleExtraviados) {
    if (detalleExtraviados) {
      res.render('web/detalleExtraviado/success', { detalleExtraviados:detalleExtraviados});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleExtraviado no encontrado');
  });
};
//*************************************************************
exports.getForm2 = function (req, res) {
  var animal =Model.Animal.build();
  var detalleExtraviado = Model.DetalleExtraviado.build();
  var extraviadoId = req.params.extraviadoId;
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
            console.log('soy extraviado retrieveId',extraviadoId);
            res.render('web/detalleExtraviado/indexa', {
                            extraviadoJ:extraviadoId,
                            detalleExtraviadoJ: detalleExtraviado,
                            selectJ: animalQ
            });              
    }else {
      res.send(401, 'No se Eencontraron Extraviado');
    }
  }, function (error) {
    res.send('Detalle Extraviado no encontrado');
    }
  );
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
    res.redirect('/web/extraviado');
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
  animal.retrieveAll(function (animal) {
    if (animal) {
      detalleExtraviado.retrieveById(req.params.detalleExtraviadoId, function (detalleExtraviado) {
        if (detalleExtraviado) {
          res.render('web/detalleExtraviado/edit', {
                      detalleExtraviado:detalleExtraviado,
                      select: animal
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
