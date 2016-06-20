'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleVacunacionInsumo
// router.route('/detalleVacunacionInsumo') */

// POST /detalleVacunacionInsumo
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidadInsumo = req.body.cantidadInsumo; 

  var index = Museo.detalleVacunacionInsumo.build({
   cantidadInsumo : cantidadInsumo
  });

  index.add(function (success) {
    res.render('./detalleVacunacionInsumo/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleVacunacionInsumo)
// GET /detalleVacunacionInsumo */


router.get('/cargar', function (req, res) {
  var index = Museo.detalleVacunacionInsumo.build();
  res.render('./detalleVacunacionInsumo/index',{index: index});
});

/* Rutas que terminan en /detalleVacunacionInsumo/:detalleVacunacionInsumoId
// router.route('/detalleVacunacionInsumo/:detalleVacunacionInsumoId')
// PUT /detalleVacunacionInsumo/:detalleVacunacionInsumoId
// Actualiza detalleVacunacionInsumo */

router.put('/:detalleVacunacionInsumoId', function (req, res) {
  var detalleVacunacionInsumo = Museo.detalleVacunacionInsumo.build();

  detalleVacunacionInsumo.cantidadInsumo = req.body.cantidadInsumo;

  detalleVacunacionInsumo.updateById(req.params.detalleVacunacionInsumoId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Vacunacion Insumo actualizado!' });
    } else {
      res.send(401, 'Detalle Vacunacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion Insumo no encontrado');
  });
});

// GET /detalleVacunacionInsumo/:detalleVacunacionInsumoId
// Toma un detalleVacunacionInsumo por id
router.get('/:detalleVacunacionInsumoId', function (req, res) {
  var detalleVacunacionInsumo = Museo.detalleVacunacionInsumo.build();

  detalleVacunacionInsumo.retrieveById(req.params.detalleVacunacionInsumoId, function (detalleSanitacionInsumo) {
    if (detalleVacunacionInsumo) {
      res.json(detalleVacunacionInsumo);
    } else {
      res.send(401, 'Detalle Vacunacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion Insumo no encontrado');
  });
});

// DELETE /detalleVacunacionInsumo/detalleVacunacionInsumoId
// Borra el detalleVacunacionInsumoId
router.delete('/:detalleVacunacionInsumoId', function (req, res) {
  var detalleVacunacionInsumo = Museo.detalleVacunacionInsumo.build();

 detalleVacunacionInsumo.removeById(req.params.detalleVacunacionInsumoId, function (detalleSanitacionInsumo) {
    if (detalleVacunacionInsumo) {
      res.json({ message: 'Detalle Vacunacion Insumo borrado!' });
    } else {
      res.send(401, 'Detalle Vacunacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion Insumo no encontrado');
  });
});

module.exports = router;