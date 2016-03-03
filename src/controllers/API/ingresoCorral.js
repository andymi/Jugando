'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /ingresoCorral
// router.route('/ingresoCorral') */

// POST /ingresoCorral
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaIngreso = req.body.fechaIngreso;  
  var horaIngreso = req.body.horaIngreso;
  var observacionIngreso = req.body.observacionIngreso;

  var index = Museo.IngresoCorral.build({
    fechaIngreso: fechaIngreso,
    horaIngreso: horaIngreso,
    observacionIngreso: observacionIngreso
  });

  index.add(function (success) {
    res.render('./ingresoCorral/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los ingresoCorral)
// GET /ingresoCorral */


router.get('/cargar', function (req, res) {
  var index = Museo.IngresoCorral.build();
  res.render('./ingresoCorral/index',{index: index});
});

/* Rutas que terminan en /ingresoCorral/:ingresoCorralId
// router.route('/ingresoCorral/:ingresoCorralId')
// PUT /ingresoCorral/:ingresoCorralId
// Actualiza ingresoCorral */

router.put('/:ingresoCorralId', function (req, res) {
  var ingresoCorral = Museo.IngresoCorral.build();

  ingresoCorral.fechaIngreso = req.body.fechaIngreso;
  ingresoCorral.horaIngreso = req.body.horaIngreso;
  ingresoCorral.observacionIngreso = req.body.observacionIngreso;

  ingresoCorral.updateById(req.params.ingresoCorralId, function (success) {
    if (success) {
      res.json({ message: 'IngresoCorral actualizado!' });
    } else {
      res.send(401, 'IngresoCorral no encontrado');
    }
  }, function (error) {
    res.send('IngresoCorral no encontrado');
  });
});

// GET /ingresoCorral/:ingresoCorralId
// Toma un ingresoCorral por id
router.get('/:ingresoCorralId', function (req, res) {
  var ingresoCorral = Museo.IngresoCorral.build();

  ingresoCorral.retrieveById(req.params.ingresoCorralId, function (ingresoCorral) {
    if (ingresoCorral) {
      res.json(ingresoCorral);
    } else {
      res.send(401, 'IngresoCorral no encontrado');
    }
  }, function (error) {
    res.send('IngresoCorral no encontrado');
  });
});

// DELETE /ingresoCorral/ingresoCorralId
// Borra el ingresoCorralId
router.delete('/:ingresoCorralId', function (req, res) {
  var ingresoCorral = Museo.IngresoCorral.build();

 ingresoCorral.removeById(req.params.ingresoCorralId, function (ingresoCorral) {
    if (ingresoCorral) {
      res.json({ message: 'IngresoCorral borrado!' });
    } else {
      res.send(401, 'IngresoCorral no encontrado');
    }
  }, function (error) {
    res.send('IngresoCorral no encontrado');
  });
});

module.exports = router;