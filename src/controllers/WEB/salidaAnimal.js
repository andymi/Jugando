'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /salidaAnimal
// router.route('/salidaAnimal') */
exports.getForm = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  res.render('web/salidaAnimal/index',{salidaAnimal: salidaAnimal});
};
// POST /salidaAnimal
exports.create =  function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var horaSalida = req.body.horaSalida;
  var cantidadSalida = req.body.cantidadSalida;
  var fechaSalida = req.body.fechaSalida;
  var observacion = req.body.observacion;

  var index = Model.SalidaAnimal.build({
    horaSalida: horaSalida,
    cantidadSalida: cantidadSalida,    
    fechaSalida: fechaSalida,
    observacion: observacion,
  });

  index.add(function (success) {
    res.redirect('/web/detalleSalidaAnimal/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los salidaAnimal)
// GET /salidaAnimal */

exports.listPag = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  console.log(req.body);
  salidaAnimal.retrieveAll(function (salidaAnimales) {
    if (salidaAnimales) {
      res.render('web/salidaAnimal/success', { salidaAnimales: salidaAnimales});
    } else {
      res.send(401, 'No se encontraron Animales');
    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
};

/* Rutas que terminan en /salidaAnimal/:salidaAnimalId
// router.route('/salidaAnimal/:salidaAnimalId')
// PUT /salidaAnimal/:salidaAnimalId
// Actualiza salidaAnimal */

exports.update = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();

  salidaAnimal.horaSalida = req.body.horaSalida;
  salidaAnimal.cantidadSalida = req.body.cantidadSalida;
  salidaAnimal.fechaSalida = req.body.fechaSalida;
  salidaAnimal.observacion = req.body.observacion;

  salidaAnimal.updateById(req.params.salidaAnimalId, function (success) {
    if (success) {
      res.redirect('/web/salidaAnimal');
    } else {
      res.send(401, 'SalidaAnimal no encontrado');
    }
  }, function (error) {
    res.send('SalidaAnimal no encontrado');
  });
};

// GET /salidaAnimal/:salidaAnimalId
// Toma un salidaAnimal por id
exports.read = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  console.log('soy get edit',req.body);
  salidaAnimal.retrieveById(req.params.salidaAnimalId, function (salidaAnimal) {
    if (salidaAnimal) {
      res.render('web/salidaAnimal/edit', {salidaAnimal:salidaAnimal});
    } else {
      res.send(401, 'SalidaAnimal no encontrado');
    }
  }, function (error) {
    res.send('SalidaAnimal no encontrado');
  });
};

exports.readId = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  console.log('dentro de get id', req.body);
  salidaAnimal.retrieveVerId(req.params.id, function (salidaAnimalq) {
    if (salidaAnimalq) {
      res.render('web/detalleSalidaAnimal/success', {
                  salidaAnimal:salidaAnimalq
                });
    } else {
      res.send(401, 'SalidaAnimal no encontrado');
    }
  }, function (error) {
    res.send('SalidaAnimal no encontrado',error);
  });
};

// DELETE /salidaAnimal/salidaAnimalId
// Borra el salidaAnimalId
exports.delete = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  salidaAnimal.removeById(req.params.salidaAnimalId, function (salidaAnimal) {
    if (salidaAnimal) {
      res.redirect('/web/salidaAnimal');
    } else {
      res.send(401, 'SalidaAnimal no encontrado');
    }
  }, function (error) {
    res.send('SalidaAnimal no encontrado');
  });
};
