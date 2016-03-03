'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleTraslado
// router.route('/detalleTraslado') */

// POST /detalleTraslado
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcion = req.body.descripcion; 

  var index = Museo.DetalleTraslado.build({
    descripcion: descripcion
  });

  index.add(function (success) {
    res.render('./detalleTraslado/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleTraslado)
// GET /detalleTraslado */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleTraslado.build();
  res.render('./detalleTraslado/index',{index: index});
});

/* Rutas que terminan en /detalleTraslado/:detalleTrasladoId
// router.route('/detalleTraslado/:detalleTrasladoId')
// PUT /detalleTraslado/:detalleTrasladoId
// Actualiza detalleTraslado*/

router.put('/:detalleTrasladoId', function (req, res) {
  var detalleTraslado = Museo.DetalleTraslado.build();

  detalleTraslado.descripcion = req.body.descripcion;

 detalleTraslado.updateById(req.params.detalleTrasladoId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Traslado Animal actualizado!' });
    } else {
      res.send(401, 'Detalle Traslado Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Traslado Animal no encontrado');
  });
});

// GET /detalleTraslado/:detalleTrasladoId
// Toma un detalleTraslado por id
router.get('/:detalleTrasladoId', function (req, res) {
  var detalleTraslado = Museo.DetalleTraslado.build();

  detalleTraslado.retrieveById(req.params.detalleTrasladoId, function (detalleTraslado) {
    if (detalleTraslado) {
      res.json(detalleTraslado);
    } else {
      res.send(401, 'Detalle Traslado Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Traslado Animal no encontrado');
  });
});

// DELETE /detalleTraslado/detalleTrasladoId
// Borra el detalleTrasladoId
router.delete('/:detalleTrasladoId', function (req, res) {
  var detalleTraslado = Museo.DetalleTraslado.build();

 detalleTraslado.removeById(req.params.detalleTrasladoId, function (detalleTraslado) {
    if (detalleTraslado) {
      res.json({ message: 'Detalle Traslado Animal borrado!' });
    } else {
      res.send(401, 'Detalle Traslado Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Traslado Animal no encontrado');
  });
});

module.exports = router;