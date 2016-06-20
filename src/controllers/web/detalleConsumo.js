'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleConsumo
// router.route('/detalleConsumo') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleConsumo = Model.DetalleConsumo.build();
  var consumo = Model.Consumo.build();
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
      consumo.retrieveId(function (consumoQ) {
          if (consumoQ) {      
            console.log('soy consumo retrieveId',consumoQ);
            res.render('web/detalleConsumo/index', {
                            consumoJ:consumoQ,
                            detalleConsumoJ: detalleConsumo,
                            selectJ: animalQ
            });    
          } else {
            res.send(401, 'No se encontraron Consumos');
          }
      });
    }else {
      res.send(401, 'No se Encontraron Consumos');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
    }
  );
};
// POST /detalleConsumo
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  
  var cantidad = req.body.cantidad;
  var observacion = req.body.observacion;
  var AnimalIdAnimal = req.body.selectJ;
  var ConsumoIdConsumo = req.body.id;  

  var index = Model.DetalleConsumo.build({
    cantidad: cantidad,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    ConsumoIdConsumo: ConsumoIdConsumo
  });

  index.add(function (success) {
    res.redirect('/web/detalleConsumo/cargar');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los detalleConsumo)
// GET /detalleConsumo */
exports.listPag1 = function (req, res) {
  var detalleConsumo = Model.DetalleConsumo.build();
  console.log('dentro de get /',req.body);
  detalleConsumo.retrieveAll(req.params.id, function (detalleConsumos) {
    if (detalleConsumos) {
      res.render('web/detalleConsumo/success', { detalleConsumos:detalleConsumos});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleConsumo no encontrado');
  });
};
//***************************************************************
exports.getForm2 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleConsumo = Model.DetalleConsumo.build();
  var consumoId = req.params.consumoId;
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
           console.log('soy consumoId',consumoId);
            res.render('web/detalleConsumo/indexa', {
                            consumoJ:consumoId,
                            detalleConsumoJ: detalleConsumo,
                            selectJ: animalQ
            });    
    }else {
      res.send(401, 'No se Encontraron Consumos');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
    }
  );
};
// POST /detalleConsumo
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidad = req.body.cantidad;
  var observacion = req.body.observacion;
  var AnimalIdAnimal = req.body.selectJ;
  var ConsumoIdConsumo = req.body.id;  

  var index = Model.DetalleConsumo.build({
    cantidad: cantidad,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    ConsumoIdConsumo: ConsumoIdConsumo
  });

  index.add(function (success) {
    res.redirect('/web/consumo');
  },
  function (err) {
    res.send(err);
  });
};
//***************************************************************
/* Rutas que terminan en /detalleConsumo/:detalleConsumoId
// router.route('/detalleConsumo/:detalleConsumoId')
// PUT /detalleConsumo/:detalleConsumoId
// Actualiza detalleConsumo */
exports.update = function (req, res) {
  var detalleConsumo = Model.DetalleConsumo.build();
  detalleConsumo.cantidad = req.body.cantidad;
  detalleConsumo.observacion = req.body.observacion;
  detalleConsumo.AnimalIdAnimal = req.body.animalSele;
  
  

  detalleConsumo.updateById(req.params.detalleConsumoId, function (success) {
    if (success) {
      res.redirect('/web/consumo');
    } else {
      res.send(401, 'Detalle Consumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
  });
};
// GET /detalleConsumo/:detalleConsumoId
// Toma un detalleConsumo por id
exports.read = function (req, res) {
  var animal = Model.Animal.build();
  var detalleConsumo = Model.DetalleConsumo.build();
  animal.retrieveAll(function (animal) {
    if (animal) {
      detalleConsumo.retrieveById(req.params.detalleConsumoId, function (detalleConsumo) {
        if (detalleConsumo) {
          res.render('web/detalleConsumo/edit', {
                    detalleConsumo:detalleConsumo,
                    select: animal
                  });
        } else {
          res.send(401, 'Detalle Consumo no encontrado');
        }
      }, function (error) {
        res.send('Detalle Consumo no encontrado');
      });

    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    console.log(error);
    res.send('desDetalles no encontrado');
  });
};
// DELETE /detalleConsumo/detalleConsumoId
// Borra el detalleConsumoId
exports.delete = function (req, res) {
  var detalleConsumo = Model.DetalleConsumo.build();

 detalleConsumo.removeById(req.params.detalleConsumoId, function (detalleConsumo) {
    if (detalleConsumo) {
      res.redirect('/web/consumo');
    } else {
      res.send(401, 'Detalle Consumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
  });
};
