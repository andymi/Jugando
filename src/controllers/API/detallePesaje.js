'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detallePesaje
// router.route('/detallePesaje') */

// POST /detallePesaje
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var peso = req.body.peso;
  var observacion = req.body.observacion;  

  var index = Museo.DetallePesaje.build({
    peso:peso,
    observacion: observacion
  });

  index.add(function (success) {
    res.render('./detallePesaje/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detallePesaje)
// GET /detallePesaje */


router.get('/cargar', function (req, res) {
  var index = Museo.DetallePesaje.build();
  res.render('./detallePesaje/index',{index: index});
});

/* Rutas que terminan en /detallePesaje/:detallePesajeId
// router.route('/detallePesaje/:detallePesajeId')
// PUT /detallePesaje/:detallePesajeId
// Actualiza detallePesaje */

router.put('/:detallePesajeId', function (req, res) {
  var detallePesaje = Museo.DetallePesaje.build();

  detallePesaje.peso = req.body.peso;
  detallePesaje.observacion = req.body.observacion;
  
  

  detallePesaje.updateById(req.params.detallePesajeId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Pesaje actualizado!' });
    } else {
      res.send(401, 'Detalle Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Detalle Pesaje no encontrado');
  });
});

// GET /detallePesaje/:detallePesajeId
// Toma un detallePesaje por id
router.get('/:detallePesajeId', function (req, res) {
  var detallePesaje = Museo.DetallePesaje.build();

  detallePesaje.retrieveById(req.params.detallePesajeId, function (detallePesaje) {
    if (detallePesaje) {
      res.json(detallePesaje);
    } else {
      res.send(401, 'Detalle Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Detalle Pesaje no encontrado');
  });
});

// DELETE /detallePesaje/detallePesajeId
// Borra el detallePesajeId
router.delete('/:detallePesajeId', function (req, res) {
  var detallePesaje = Museo.DetallePesaje.build();

 detallePesaje.removeById(req.params.detallePesajeId, function (detallePesaje) {
    if (detallePesaje) {
      res.json({ message: 'Detalle Pesaje borrado!' });
    } else {
      res.send(401, 'Detalle Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Detalle Pesaje no encontrado');
  });
});

module.exports = router;