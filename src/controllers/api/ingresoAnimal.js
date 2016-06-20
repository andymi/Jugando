'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /ingresoAnimal
// router.route('/ingresoAnimal') */

// POST /ingresoAnimal
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var horaSalida = req.body.horaSalida;
  var cantidadSalida = req.body.cantidadSalida;
  var fechaSalida = req.body.fechaSalida;
  var observacion = req.body.observacion;
  var fechaEntrada = req.body.fechaEntrada;  
  var horaEntrada = req.body.horaEntrada;
  var cantidadEntrada = req.body.cantidadEntrada;

  var index = Museo.IngresoAnimal.build({
    horaSalida: horaSalida,
    cantidadSalida: cantidadSalida,    
    fechaSalida: fechaSalida,
    observacion: observacion,
    fechaEntrada: fechaEntrada,
    horaEntrada: horaEntrada,
    cantidadEntrada: cantidadEntrada
  });

  index.add(function (success) {
    res.render('./ingresoAnimal/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los ingresoAnimal)
// GET /ingresoAnimal */


router.get('/cargar', function (req, res) {
  var index = Museo.IngresoAnimal.build();
  res.render('./ingresoAnimal/index',{index: index});
});

/* Rutas que terminan en /ingresoAnimal/:ingresoAnimalId
// router.route('/ingresoAnimal/:ingresoAnimalId')
// PUT /ingresoAnimal/:ingresoAnimalId
// Actualiza ingresoAnimal */

router.put('/:ingresoAnimalId', function (req, res) {
  var ingresoAnimal = Museo.IngresoAnimal.build();

  ingresoAnimal.horaSalida = req.body.horaSalida;
  ingresoAnimal.cantidadSalida = req.body.cantidadSalida;
  ingresoAnimal.fechaSalida = req.body.fechaSalida;
  ingresoAnimal.observacion = req.body.observacion;
  ingresoAnimal.fechaEntrada = req.body.fechaEntrada;
  ingresoAnimal.horaEntrada = req.body.horaEntrada;
  ingresoAnimal.cantidadEntrada = req.body.cantidadEntrada;

  ingresoAnimal.updateById(req.params.ingresoAnimalId, function (success) {
    if (success) {
      res.json({ message: 'IngresoAnimal actualizado!' });
    } else {
      res.send(401, 'IngresoAnimal no encontrado');
    }
  }, function (error) {
    res.send('IngresoAnimal no encontrado');
  });
});

// GET /ingresoAnimal/:ingresoAnimalId
// Toma un ingresoAnimal por id
router.get('/:ingresoAnimalId', function (req, res) {
  var ingresoAnimal = Museo.IngresoAnimal.build();

  ingresoAnimal.retrieveById(req.params.ingresoAnimalId, function (ingresoAnimal) {
    if (ingresoAnimal) {
      res.json(ingresoAnimal);
    } else {
      res.send(401, 'IngresoAnimal no encontrado');
    }
  }, function (error) {
    res.send('IngresoAnimal no encontrado');
  });
});

// DELETE /ingresoAnimal/ingresoAnimalId
// Borra el ingresoAnimalId
router.delete('/:ingresoAnimalId', function (req, res) {
  var ingresoAnimal = Museo.IngresoAnimal.build();

 ingresoAnimal.removeById(req.params.ingresoAnimalId, function (ingresoAnimal) {
    if (ingresoAnimal) {
      res.json({ message: 'IngresoAnimal borrado!' });
    } else {
      res.send(401, 'IngresoAnimal no encontrado');
    }
  }, function (error) {
    res.send('IngresoAnimal no encontrado');
  });
});

module.exports = router;