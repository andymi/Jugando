'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleMuerte
// router.route('/detalleMuerte') */

// POST /detalleMuerte
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacion = req.body.observacion; 

  var index = Museo.DetalleMuerte.build({
    observacion: observacion
  });

  index.add(function (success) {
    res.render('./detalleMuerte/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleMuerte)
// GET /detalleMuerte */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleMuerte.build();
  res.render('./detalleMuerte/index',{index: index});
});

/* Rutas que terminan en /detalleMuerte/:detalleMuerteId
// router.route('/detalleMuerte/:detalleMuerteId')
// PUT /detalleMuerte/:detalleMuerteId
// Actualiza detalleMuerte*/

router.put('/:detalleMuerteId', function (req, res) {
  var detalleMuerte = Museo.DetalleMuerte.build();

  detalleMuerte.observacion = req.body.observacion;

 detalleMuerte.updateById(req.params.detalleMuerteId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Muerte Animal actualizado!' });
    } else {
      res.send(401, 'Detalle Muerte Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Muerte Animal no encontrado');
  });
});

// GET /detalleMuerte/:detalleMuerteId
// Toma un detalleMuerte por id
router.get('/:detalleMuerteId', function (req, res) {
  var detalleMuerte = Museo.DetalleMuerte.build();

  detalleMuerte.retrieveById(req.params.detalleMuerteId, function (detalleMuerte) {
    if (detalleMuerte) {
      res.json(detalleMuerte);
    } else {
      res.send(401, 'Detalle Muerte Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Muerte Animal no encontrado');
  });
});

// DELETE /detalleMuerte/detalleMuerteId
// Borra el detalleMuerteId
router.delete('/:detalleMuerteId', function (req, res) {
  var detalleMuerte = Museo.DetalleMuerte.build();

 detalleMuerte.removeById(req.params.detalleMuerteId, function (detalleMuerte) {
    if (detalleMuerte) {
      res.json({ message: 'Detalle Muerte Animal borrado!' });
    } else {
      res.send(401, 'Detalle Muerte Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Muerte Animal no encontrado');
  });
});

module.exports = router;