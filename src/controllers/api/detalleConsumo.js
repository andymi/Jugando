'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleConsumo
// router.route('/detalleConsumo') */

// POST /detalleConsumo
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidadConsumo = req.body.cantidadConsumo;
  var observacion = req.body.observacion;  

  var index = Museo.DetalleConsumo.build({
    cantidadConsumo:cantidadConsumo,
    observacion: observacion
  });

  index.add(function (success) {
    res.render('./detalleConsumo/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleConsumo)
// GET /detalleConsumo */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleConsumo.build();
  res.render('./detalleConsumo/index',{index: index});
});

/* Rutas que terminan en /detalleConsumo/:detalleConsumoId
// router.route('/detalleConsumo/:detalleConsumoId')
// PUT /detalleConsumo/:detalleConsumoId
// Actualiza detalleConsumo */

router.put('/:detalleConsumoId', function (req, res) {
  var detalleConsumo = Museo.DetalleConsumo.build();

  detalleConsumo.cantidadConsumo = req.body.cantidadConsumo;
  detalleConsumo.observacion = req.body.observacion;
  
  

  detalleConsumo.updateById(req.params.detalleConsumoId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Consumo actualizado!' });
    } else {
      res.send(401, 'Detalle Consumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
  });
});

// GET /detalleConsumo/:detalleConsumoId
// Toma un detalleConsumo por id
router.get('/:detalleConsumoId', function (req, res) {
  var detalleConsumo = Museo.DetalleConsumo.build();

  detalleConsumo.retrieveById(req.params.detalleConsumoId, function (detalleConsumo) {
    if (detalleConsumo) {
      res.json(detalleConsumo);
    } else {
      res.send(401, 'Detalle Consumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
  });
});

// DELETE /detalleConsumo/detalleConsumoId
// Borra el detalleConsumoId
router.delete('/:detalleConsumoId', function (req, res) {
  var detalleConsumo = Museo.DetalleConsumo.build();

 detalleConsumo.removeById(req.params.detalleConsumoId, function (detalleConsumo) {
    if (detalleConsumo) {
      res.json({ message: 'Detalle Consumo borrado!' });
    } else {
      res.send(401, 'Detalle Consumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Consumo no encontrado');
  });
});

module.exports = router;