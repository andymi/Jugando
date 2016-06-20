'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleTraslado
// router.route('/detalleTraslado') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleTraslado = Model.DetalleTraslado.build();
  var notaTraslado = Model.Traslado.build();
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
      notaTraslado.retrieveId(function (notaTrasladoQ) {
          if (notaTrasladoQ) {      
            console.log('soy notaTraslado retrieveId',notaTrasladoQ);
            res.render('web/detalleTraslado/index', {
                            notaTrasladoJ:notaTrasladoQ,
                            detalleTrasladoJ: detalleTraslado,
                            selectJ: animalQ
            });    
          } else {
            res.send(401, 'No se encontraron nota Traslado');
          }
      });
    }else {
      res.send(401, 'No se Eencontraron nota Traslado');
    }
  }, function (error) {
    res.send('Detalle Traslado no encontrado');
    }
  );
};
// POST /detalleTraslado
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcion = req.body.descripcion; 
  var AnimalIdAnimal = req.body.selectJ;
  var TrasladoIdTraslado = req.body.id;


  var index = Model.DetalleTraslado.build({
    descripcion: descripcion,
    AnimalIdAnimal: AnimalIdAnimal,
    TrasladoIdTraslado: TrasladoIdTraslado
  });

  index.add(function (success) {
    res.redirect('/web/detalleTraslado/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleTraslado)
// GET /detalleTraslado */
exports.readId = function (req, res) {
  var detalleTraslado = Model.DetalleTraslado.build();
  console.log('dentro de get /',req.body);
  detalleTraslado.retrieveAll(req.params.id, function (detalleTraslados) {
    if (detalleTraslados) {
      res.render('web/detalleTraslado/success', { detalleTraslados:detalleTraslados});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleTraslado no encontrado');
  });
};
//*****************************************************************
exports.getForm2 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleTraslado = Model.DetalleTraslado.build();
  var trasladoId = req.params.trasladoId;
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
            console.log('soy notaTraslado retrieveId',trasladoId);
            res.render('web/detalleTraslado/indexa', {
                            trasladoJ:trasladoId,
                            detalleTrasladoJ: detalleTraslado,
                            selectJ: animalQ
            });   
    }else {
      res.send(401, 'No se Eencontraron nota Traslado');
    }
  }, function (error) {
    res.send('Detalle Traslado no encontrado');
    }
  );
};
// POST /detalleTraslado
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcion = req.body.descripcion; 
  var AnimalIdAnimal = req.body.selectJ;
  var TrasladoIdTraslado = req.body.id;


  var index = Model.DetalleTraslado.build({
    descripcion: descripcion,
    AnimalIdAnimal: AnimalIdAnimal,
    TrasladoIdTraslado: TrasladoIdTraslado
  });

  index.add(function (success) {
    res.redirect('/web/traslado');
  },
  function (err) {
    res.send(err);
  });
};
//*****************************************************************
/* Rutas que terminan en /detalleTraslado/:detalleTrasladoId
// router.route('/detalleTraslado/:detalleTrasladoId')
// PUT /detalleTraslado/:detalleTrasladoId
// Actualiza detalleTraslado*/

exports.update = function (req, res) {
  var detalleTraslado = Model.DetalleTraslado.build();

  detalleTraslado.descripcion = req.body.descripcion;
  detalleTraslado.AnimalIdAnimal = req.body.animalSele;

  detalleTraslado.updateById(req.params.detalleTrasladoId, function (success) {
    if (success) {
      res.redirect('/web/traslado');
    } else {
      res.send(401, 'Detalle Traslado Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Traslado Animal no encontrado');
  });
};

// GET /detalleTraslado/:detalleTrasladoId
// Toma un detalleTraslado por id
exports.read = function (req, res) {
  var detalleTraslado = Model.DetalleTraslado.build();
  var animal = Model.Animal.build();
  animal.retrieveAll(function (animal) {
    if (animal) {
      detalleTraslado.retrieveById(req.params.detalleTrasladoId, function (detalleTraslado) {
        if (detalleTraslado) {
          res.render('web/detalleTraslado/edit', {
                      detalleTraslado:detalleTraslado,
                      select: animal
                    });
        } else {
          res.send(401, 'Detalle Traslado Animal no encontrado');
        }
      }, function (error) {
        res.send('Detalle Traslado Animal no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    console.log(error);
    res.send('desDetalles no encontrado');
  });
};

// DELETE /detalleTraslado/detalleTrasladoId
// Borra el detalleTrasladoId
exports.delete = function (req, res) {
  var detalleTraslado = Model.DetalleTraslado.build();

 detalleTraslado.removeById(req.params.detalleTrasladoId, function (detalleTraslado) {
    if (detalleTraslado) {
      res.redirect('/web/traslado');
    } else {
      res.send(401, 'Detalle Traslado Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Traslado Animal no encontrado');
  });
};
