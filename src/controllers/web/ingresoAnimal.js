'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /ingresoAnimal
// router.route('/ingresoAnimal') */
exports.getForm = function (req, res) {
  var ingresoAnimal = Model.IngresoAnimal.build();
  res.render('web/ingresoAnimal/index',{ingresoAnimal: ingresoAnimal});
};
// POST /ingresoAnimal
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaEntrada = req.body.fechaEntrada;  
  var horaEntrada = req.body.horaEntrada;
  var cantidadEntrada = req.body.cantidadEntrada;
  var observacion = req.body.observacion;

  var index = Model.IngresoAnimal.build({
    fechaEntrada: fechaEntrada,
    horaEntrada: horaEntrada,
    cantidadEntrada: cantidadEntrada,
    observacion: observacion
  });

  index.add(function (success) {
    res.redirect('/web/detalleIngresoAnimal/cargar');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los ingresoAnimal)
// GET /ingresoAnimal */
exports.listPag = function (req, res) {
  var ingresoAnimal = Model.IngresoAnimal.build();
  console.log(req.body);
  ingresoAnimal.retrieveAll(function (ingresoanimales) {
    if (ingresoanimales) {
      res.render('web/ingresoAnimal/success', { ingresoanimales: ingresoanimales});
    } else {
      res.send(401, 'No se encontraron Animales');
    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
};
/* Rutas que terminan en /ingresoAnimal/:ingresoAnimalId
// router.route('/ingresoAnimal/:ingresoAnimalId')
// PUT /ingresoAnimal/:ingresoAnimalId
// Actualiza ingresoAnimal */
exports.update = function (req, res) {
  var ingresoAnimal = Model.IngresoAnimal.build();
  ingresoAnimal.fechaEntrada = req.body.fechaEntrada;
  ingresoAnimal.horaEntrada = req.body.horaEntrada;
  ingresoAnimal.cantidadEntrada = req.body.cantidadEntrada;
  ingresoAnimal.observacion = req.body.observacion;

  ingresoAnimal.updateById(req.params.ingresoAnimalId, function (success) {
    if (success) {
      res.redirect('/web/ingresoAnimal');
    } else {
      res.send(401, 'IngresoAnimal no encontrado');
    }
  }, function (error) {
    res.send('IngresoAnimal no encontrado');
  });
};

// GET /ingresoAnimal/:ingresoAnimalId
// Toma un ingresoAnimal por id
exports.read = function (req, res) {
  var ingresoAnimal = Model.IngresoAnimal.build();
  console.log('soy get edit',req.body);
  ingresoAnimal.retrieveById(req.params.ingresoAnimalId, function (ingresoAnimal) {
    if (ingresoAnimal) {
      res.render('web/ingresoAnimal/edit', {ingresoAnimal:ingresoAnimal});
    } else {
      res.send(401, 'IngresoAnimal no encontrado');
    }
  }, function (error) {
    res.send('IngresoAnimal no encontrado');
  });
};

exports.readId = function (req, res) {
  var ingresoAnimal = Model.IngresoAnimal.build();
  console.log('dentro de get id', req.body);
  ingresoAnimal.retrieveVerId(req.params.id, function (ingresoAnimalQ) {
    if (ingresoAnimalQ) {
      res.render('web/detalleIngresoAnimal/success', {
                  ingresoAnimal:ingresoAnimalQ
                });
    } else {
      res.send(401, 'IngresoAnimal no encontrado');
    }
  }, function (error) {
    res.send('IngresoAnimal no encontrado',error);
  });
};

// DELETE /ingresoAnimal/ingresoAnimalId
// Borra el ingresoAnimalId
exports.delete = function (req, res) {
  var ingresoAnimal = Model.IngresoAnimal.build();

 ingresoAnimal.removeById(req.params.ingresoAnimalId, function (ingresoAnimal) {
    if (ingresoAnimal) {
      res.redirect('/web/ingresoAnimal');
    } else {
      res.send(401, 'IngresoAnimal no encontrado');
    }
  }, function (error) {
    res.send('IngresoAnimal no encontrado');
  });
};
