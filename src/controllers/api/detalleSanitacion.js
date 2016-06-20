'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleSanitacion
// router.route('/detalleSanitacion') */

// POST /detalleSanitacion
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacionSanitacion = req.body.observacionSanitacion; 

  var index = Museo.DetalleSanitacion.build({
    observacionSanitacion: observacionSanitacion
  });

  index.add(function (success) {
    res.render('./detalleSanitacion/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleSanitacion)
// GET /detalleSanitacion */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleSanitacion.build();
  res.render('./detalleSanitacion/index',{index: index});
});

/* Rutas que terminan en /detalleSanitacion/:detalleSanitacionId
// router.route('/detalleSanitacion/:detalleSanitacionId')
// PUT /detalleSanitacion/:detalleSanitacionId
// Actualiza detalleSanitacion */

router.put('/:detalleSanitacionId', function (req, res) {
  var detalleSanitacion = Museo.DetalleSanitacion.build();

  detalleSanitacion.observacionSanitacion = req.body.observacionSanitacion;

  detalleSanitacion.updateById(req.params.detalleSanitacionId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Sanitacion actualizado!' });
    } else {
      res.send(401, 'Detalle Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
  });
});

// GET /detalleSanitacion/:detalleSanitacionId
// Toma un detalleSanitacion por id
router.get('/:detalleSanitacionId', function (req, res) {
  var detalleSanitacion = Museo.DetalleSanitacion.build();

  detalleSanitacion.retrieveById(req.params.detalleSanitacionId, function (detalleSanitacion) {
    if (detalleSanitacion) {
      res.json(detalleSanitacion);
    } else {
      res.send(401, 'Detalle Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
  });
});

// DELETE /detalleSanitacion/detalleSanitacionId
// Borra el detalleSanitacionId
router.delete('/:detalleSanitacionId', function (req, res) {
  var detalleSanitacion = Museo.DetalleSanitacion.build();

 detalleSanitacion.removeById(req.params.detalleSanitacionId, function (detalleSanitacion) {
    if (detalleSanitacion) {
      res.json({ message: 'Detalle Sanitacion borrado!' });
    } else {
      res.send(401, 'Detalle Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
  });
});

module.exports = router;