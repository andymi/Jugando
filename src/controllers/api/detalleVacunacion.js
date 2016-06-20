'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleVacunacion
// router.route('/detalleVacunacion') */

// POST /detalleVacunacion
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var numeroCertificado = req.body.numeroCertificado;
  var observacion = req.body.observacion;  

  var index = Museo.DetalleVacunacion.build({
    numeroCertificado:numeroCertificado,
    observacion: observacion
  });

  index.add(function (success) {
    res.render('./detalleVacunacion/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleVacunacion)
// GET /detalleVacunacion */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleVacunacion.build();
  res.render('./detalleVacunacion/index',{index: index});
});

/* Rutas que terminan en /detalleVacunacion/:detalleVacunacionId
// router.route('/detalleVacunacion/:detalleVacunacionId')
// PUT /detalleVacunacion/:detalleVacunacionId
// Actualiza detalleVacunacion */

router.put('/:detalleVacunacionId', function (req, res) {
  var detalleVacunacion = Museo.DetalleVacunacion.build();

  detalleVacunacion.numeroCertificado = req.body.numeroCertificado;
  detalleVacunacion.observacion = req.body.observacion;
  
  

  detalleVacunacion.updateById(req.params.detalleVacunacionId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Vacunacion actualizado!' });
    } else {
      res.send(401, 'Detalle Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion no encontrado');
  });
});

// GET /detalleVacunacion/:detalleVacunacionId
// Toma un detalleVacunacion por id
router.get('/:detalleVacunacionId', function (req, res) {
  var detalleVacunacion = Museo.DetalleVacunacion.build();

  detalleVacunacion.retrieveById(req.params.detalleVacunacionId, function (detalleVacunacion) {
    if (detalleVacunacion) {
      res.json(detalleVacunacion);
    } else {
      res.send(401, 'Detalle Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion no encontrado');
  });
});

// DELETE /detalleVacunacion/detalleVacunacionId
// Borra el detalleVacunacionId
router.delete('/:detalleVacunacionId', function (req, res) {
  var detalleVacunacion = Museo.DetalleVacunacion.build();

 detalleVacunacion.removeById(req.params.detalleVacunacionId, function (detalleVacunacion) {
    if (detalleVacunacion) {
      res.json({ message: 'Detalle Vacunacion borrado!' });
    } else {
      res.send(401, 'Detalle Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion no encontrado');
  });
});

module.exports = router;