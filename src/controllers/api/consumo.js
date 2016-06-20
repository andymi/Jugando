'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /consumo
// router.route('/consumo') */

// POST /consumo
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaConsumo = req.body.fechaConsumo;
  var horaConsumo = req.body.horaConsumo;
  var cantidadTotal = req.body.cantidadTotal;  

  var index = Museo.Consumo.build({
    fechaConsumo: fechaConsumo,
    horaConsumo: horaConsumo,    
    cantidadTotal: cantidadTotal
  });

  index.add(function (success) {
    res.render('./consumo/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los consumo)
// GET /consumo */


router.get('/cargar', function (req, res) {
  var index = Museo.Consumo.build();
  res.render('./consumo/index',{index: index});
});

/* Rutas que terminan en /consumo/:consumoId
// router.route('/consumo/:consumoId')
// PUT /consumo/:consumoId
// Actualiza consumo */

router.put('/:consumoId', function (req, res) {
  var consumo = Museo.Consumo.build();

  consumo.fechaConsumo = req.body.fechaConsumo;
  consumo.horaConsumo = req.body.horaConsumo;
  consumo.cantidadTotal = req.body.cantidadTotal;
  
  

  consumo.updateById(req.params.consumoId, function (success) {
    if (success) {
      res.json({ message: 'Consumo actualizado!' });
    } else {
      res.send(401, 'Consumo no encontrado');
    }
  }, function (error) {
    res.send('Consumo no encontrado');
  });
});

// GET /consumo/:consumoId
// Toma un consumo por id
router.get('/:consumoId', function (req, res) {
  var consumo = Museo.Consumo.build();

  consumo.retrieveById(req.params.consumoId, function (consumo) {
    if (consumo) {
      res.json(consumo);
    } else {
      res.send(401, 'Consumo no encontrado');
    }
  }, function (error) {
    res.send('Consumo no encontrado');
  });
});

// DELETE /consumo/consumoId
// Borra el consumoId
router.delete('/:consumoId', function (req, res) {
  var consumo = Museo.Consumo.build();

 consumo.removeById(req.params.consumoId, function (consumo) {
    if (consumo) {
      res.json({ message: 'Consumo borrado!' });
    } else {
      res.send(401, 'Consumo no encontrado');
    }
  }, function (error) {
    res.send('Consumo no encontrado');
  });
});

module.exports = router;