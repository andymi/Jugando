'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleExtraviado
// router.route('/detalleExtraviado') */

// POST /detalleExtraviado
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacionExtraviado = req.body.observacionExtraviado; 

  var index = Museo.DetalleExtraviado.build({
    observacionExtraviado: observacionExtraviado
  });

  index.add(function (success) {
    res.render('./detalleExtraviado/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleExtraviado)
// GET /detalleExtraviado */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleExtraviado.build();
  res.render('./detalleExtraviado/index',{index: index});
});

/* Rutas que terminan en /detalleExtraviado/:detalleExtraviadoId
// router.route('/detalleExtraviado/:detalleExtraviadoId')
// PUT /detalleExtraviado/:detalleExtraviadoId
// Actualiza detalleExtraviado */

router.put('/:detalleExtraviadoId', function (req, res) {
  var detalleExtraviado = Museo.DetalleExtraviado.build();

  detalleExtraviado.observacionExtraviado = req.body.observacionExtraviado;

  detalleExtraviado.updateById(req.params.detalleExtraviadoId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Extraviado actualizado!' });
    } else {
      res.send(401, 'Detalle Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Detalle Extraviado no encontrado');
  });
});

// GET /detalleExtraviado/:detalleExtraviadoId
// Toma un detalleExtraviado por id
router.get('/:detalleExtraviadoId', function (req, res) {
  var detalleExtraviado = Museo.DetalleExtraviado.build();

  detalleExtraviado.retrieveById(req.params.detalleExtraviadoId, function (detalleExtraviado) {
    if (detalleExtraviado) {
      res.json(detalleExtraviado);
    } else {
      res.send(401, 'Detalle Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Detalle Extraviado no encontrado');
  });
});

// DELETE /detalleExtraviado/detalleExtraviadoId
// Borra el detalleExtraviadoId
router.delete('/:detalleExtraviadoId', function (req, res) {
  var detalleExtraviado = Museo.DetalleExtraviado.build();

 detalleExtraviado.removeById(req.params.detalleExtraviadoId, function (detalleExtraviado) {
    if (detalleExtraviado) {
      res.json({ message: 'Detalle Extraviado borrado!' });
    } else {
      res.send(401, 'Detalle Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Detalle Extraviado no encontrado');
  });
});

module.exports = router;