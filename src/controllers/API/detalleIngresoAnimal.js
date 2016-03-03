'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleIngresoAnimal
// router.route('/detalleIngresoAnimal') */

// POST /detalleIngresoAnimal
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacion = req.body.observacion; 

  var index = Museo.DetalleIngresoAnimal.build({
    observacion: observacion
  });

  index.add(function (success) {
    res.render('./detalleIngresoAnimal/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleIngresoAnimal)
// GET /detalleIngresoAnimal */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleIngresoAnimal.build();
  res.render('./detalleIngresoAnimal/index',{index: index});
});

/* Rutas que terminan en /detalleIngresoAnimal/:detalleIngresoAnimalId
// router.route('/detalleIngresoAnimal/:detalleIngresoAnimalId')
// PUT /detalleIngresoAnimal/:detalleIngresoAnimalId
// Actualiza detalleIngresoAnimal*/

router.put('/:detalleIngresoAnimalId', function (req, res) {
  var detalleIngresoAnimal = Museo.DetalleIngresoAnimal.build();

  detalleIngresoAnimal.observacion = req.body.observacion;

  detalleIngresoAnimal.updateById(req.params.detalleIngresoAnimalId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Ingreso Animal actualizado!' });
    } else {
      res.send(401, 'Detalle Ingreso Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Ingreso Animal no encontrado');
  });
});

// GET /detalleIngresoAnimal/:detalleIngresoAnimalId
// Toma un detalleIngresoAnimal por id
router.get('/:detalleIngresoAnimalId', function (req, res) {
  var detalleIngresoAnimal = Museo.DetalleIngresoAnimal.build();

  detalleIngresoAnimal.retrieveById(req.params.detalleIngresoAnimalId, function (detalleIngresoAnimal) {
    if (detalleIngresoAnimal) {
      res.json(detalleIngresoAnimal);
    } else {
      res.send(401, 'Detalle Ingreso Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Ingreso Animal no encontrado');
  });
});

// DELETE /detalleIngresoAnimal/detalleIngresoAnimalId
// Borra el detalleIngresoAnimalId
router.delete('/:detalleIngresoAnimalId', function (req, res) {
  var detalleIngresoAnimal = Museo.DetalleIngresoAnimal.build();

 detalleIngresoAnimal.removeById(req.params.detalleIngresoAnimalId, function (detalleIngresoAnimal) {
    if (detalleIngresoAnimal) {
      res.json({ message: 'Detalle Ingreso Animal borrado!' });
    } else {
      res.send(401, 'Detalle Ingreso Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Ingreso Animal no encontrado');
  });
});

module.exports = router;