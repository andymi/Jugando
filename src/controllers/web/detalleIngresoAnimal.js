'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleIngresoAnimal
// router.route('/detalleIngresoAnimal') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleIngresoAnimal = Model.DetalleIngresoAnimal.build();
  var ingresoAnimal = Model.IngresoAnimal.build();
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
      ingresoAnimal.retrieveId(function (ingresoAnimalQ) {
          if (ingresoAnimalQ) {      
            console.log('soy ingresoAnimal retrieveId',ingresoAnimalQ);
            res.render('web/detalleIngresoAnimal/index', {
                            ingresoAnimalJ:ingresoAnimalQ,
                            detalleIngresoAnimalJ: detalleIngresoAnimal,
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
    res.send('Detalle IngresoAnimal no encontrado');
    }
  );
};
// POST /detalleIngresoAnimal
exports.create1 =  function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var IngresoAnimalIdIngresoAnimal = req.body.id;  

  var index = Model.DetalleIngresoAnimal.build({
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    IngresoAnimalIdIngresoAnimal: IngresoAnimalIdIngresoAnimal
  });

  index.add(function (success) {
    res.redirect('/web/detalleIngresoAnimal/cargar');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los detalleIngresoAnimal)
// GET /detalleIngresoAnimal */
//***************************************************
exports.getForm2 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleIngresoAnimal = Model.DetalleIngresoAnimal.build();
  var ingresoId = req.params.ingresoId;
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
            console.log('soy ingresoAnimal retrieveId',ingresoId);
            res.render('web/detalleIngresoAnimal/indexa', {
                            ingresoAnimalJ:ingresoId,
                            detalleIngresoAnimalJ: detalleIngresoAnimal,
                            selectJ: animalQ
            });   
    }else {
      res.send(401, 'No se Encontraron Consumos');
    }
  }, function (error) {
    res.send('Detalle IngresoAnimal no encontrado');
    }
  );
};
// POST /detalleIngresoAnimal
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var IngresoAnimalIdIngresoAnimal = req.body.id;  

  var index = Model.DetalleIngresoAnimal.build({
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    IngresoAnimalIdIngresoAnimal: IngresoAnimalIdIngresoAnimal
  });

  index.add(function (success) {
    res.redirect('/web/ingresoAnimal');
  },
  function (err) {
    res.send(err);
  });
};
//***************************************************
/* Rutas que terminan en /detalleIngresoAnimal/:detalleIngresoAnimalId
// router.route('/detalleIngresoAnimal/:detalleIngresoAnimalId')
// PUT /detalleIngresoAnimal/:detalleIngresoAnimalId
// Actualiza detalleIngresoAnimal*/
exports.update = function (req, res) {
  var detalleIngresoAnimal = Model.DetalleIngresoAnimal.build();

  detalleIngresoAnimal.observacion = req.body.observacion;
  detalleIngresoAnimal.AnimalIdAnimal = req.body.animalSele;
  console.log('idDetalleIAS',req.params.idDetalleIAS);
  detalleIngresoAnimal.updateById(req.params.idDetalleIAS, function (success) {
    if (success) {
      res.redirect('/web/ingresoAnimal');
    } else {
      res.send(401, 'Detalle Ingreso Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Ingreso Animal no encontrado');
  });
};
// GET /detalleIngresoAnimal/:idDetalleIA
// Toma un detalleIngresoAnimal por id
exports.read = function (req, res) {
  var detalleIngresoAnimal =Model.DetalleIngresoAnimal.build();
  var animal = Model.Animal.build();
  animal.retrieveAll(function (animal) {
    if (animal) {

      detalleIngresoAnimal.retrieveById(req.params.idDetalleIAS, function (detalleIngresoAnimal) {
        if (detalleIngresoAnimal) {
          res.render('web/detalleIngresoAnimal/edit', {
                    detalleIngresoAnimal:detalleIngresoAnimal,
                    select: animal
                  });
        } else {
          res.send(401, 'Detalle Ingreso Animal no encontrado');
        }
      }, function (error) {
        res.send('Detalle Ingreso Animal no encontrado');
      });

    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    console.log(error);
    res.send('desDetalles no encontrado');
  });
};
exports.readId = function (req, res) {
  var detalleIngresoAnimal = Model.DetalleIngresoAnimal.build();
  console.log('dentro de get /',req.body);
  detalleIngresoAnimal.retrieveAll(req.params.id, function (detalleIngresoAnimales) {
    if (detalleIngresoAnimales) {
      res.render('web/detalleIngresoAnimal/success', { detalleIngresoAnimales:detalleIngresoAnimales});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleIngresoAnimal no encontrado');
  });
};
// DELETE /detalleIngresoAnimal/detalleIngresoAnimalId
// Borra el detalleIngresoAnimalId
exports.delete =  function (req, res) {
  var detalleIngresoAnimal = Model.DetalleIngresoAnimal.build();

 detalleIngresoAnimal.removeById(req.params.idDetalleIA, function (detalleIngresoAnimal) {
    if (detalleIngresoAnimal) {
      res.redirect('/web/ingresoAnimal');
    } else {
      res.send(401, 'Detalle Ingreso Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Ingreso Animal no encontrado');
  });
};