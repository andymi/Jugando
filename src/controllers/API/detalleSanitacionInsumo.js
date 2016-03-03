'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleSanitacionInsumo
// router.route('/detalleSanitacionInsumo') */

// POST /detalleSanitacionInsumo
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidadUtilizada = req.body.cantidadUtilizada; 

  var index = Museo.detalleSanitacionInsumo.build({
    cantidadUtilizada: cantidadUtilizada
  });

  index.add(function (success) {
    res.render('./detalleSanitacionInsumo/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleSanitacionInsumo)
// GET /detalleSanitacionInsumo */


router.get('/cargar', function (req, res) {
  var index = Museo.detalleSanitacionInsumo.build();
  res.render('./detalleSanitacionInsumo/index',{index: index});
});

/* Rutas que terminan en /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// router.route('/detalleSanitacionInsumo/:detalleSanitacionInsumoId')
// PUT /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// Actualiza detalleSanitacionInsumo */

router.put('/:detalleSanitacionInsumoId', function (req, res) {
  var detalleSanitacionInsumo = Museo.detalleSanitacionInsumo.build();

  detalleSanitacionInsumo.cantidadUtilizada = req.body.cantidadUtilizada;

  detalleSanitacionInsumo.updateById(req.params.detalleSanitacionInsumoId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Sanitacion Insumo actualizado!' });
    } else {
      res.send(401, 'Detalle Sanitacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion Insumo no encontrado');
  });
});

// GET /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// Toma un detalleSanitacionInsumo por id
router.get('/:detalleSanitacionInsumoId', function (req, res) {
  var detalleSanitacionInsumo = Museo.detalleSanitacionInsumo.build();

  detalleSanitacionInsumo.retrieveById(req.params.detalleSanitacionInsumoId, function (detalleSanitacionInsumo) {
    if (detalleSanitacionInsumo) {
      res.json(detalleSanitacionInsumo);
    } else {
      res.send(401, 'Detalle Sanitacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion Insumo no encontrado');
  });
});

// DELETE /detalleSanitacionInsumo/detalleSanitacionInsumoId
// Borra el detalleSanitacionInsumoId
router.delete('/:detalleSanitacionInsumoId', function (req, res) {
  var detalleSanitacionInsumo = Museo.detalleSanitacionInsumo.build();

 detalleSanitacionInsumo.removeById(req.params.detalleSanitacionInsumoId, function (detalleSanitacionInsumo) {
    if (detalleSanitacionInsumo) {
      res.json({ message: 'Detalle Sanitacion Insumo borrado!' });
    } else {
      res.send(401, 'Detalle Sanitacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion Insumo no encontrado');
  });
});

module.exports = router;