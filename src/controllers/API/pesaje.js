'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /pesaje
// router.route('/pesaje') */

// POST /pesaje
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaPesaje = req.body.fechaPesaje;
  var horaPesaje = req.body.horaPesaje; 

  var index = Museo.Pesaje.build({
    fechaPesaje: fechaPesaje,
    horaPesaje: horaPesaje
  });

  index.add(function (success) {
    res.render('./pesaje/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los pesaje)
// GET /pesaje */


router.get('/cargar', function (req, res) {
  var index = Museo.Pesaje.build();
  res.render('./pesaje/index',{index: index});
});

/* Rutas que terminan en /pesaje/:pesajeId
// router.route('/pesaje/:pesajeId')
// PUT /pesaje/:pesajeId
// Actualiza pesaje */

router.put('/:pesajeId', function (req, res) {
  var pesaje = Museo.Pesaje.build();

  pesaje.fechaPesaje = req.body.fechaPesaje;
  pesaje.horaPesaje = req.body.horaPesaje;
  
  

  pesaje.updateById(req.params.pesajeId, function (success) {
    if (success) {
      res.json({ message: 'Pesaje actualizado!' });
    } else {
      res.send(401, 'Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Pesaje no encontrado');
  });
});

// GET /pesaje/:pesajeId
// Toma un pesaje por id
router.get('/:pesajeId', function (req, res) {
  var pesaje = Museo.Pesaje.build();

  pesaje.retrieveById(req.params.pesajeId, function (pesaje) {
    if (pesaje) {
      res.json(pesaje);
    } else {
      res.send(401, 'Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Pesaje no encontrado');
  });
});

// DELETE /pesaje/pesajeId
// Borra el pesajeId
router.delete('/:pesajeId', function (req, res) {
  var pesaje = Museo.Pesaje.build();

 pesaje.removeById(req.params.pesajeId, function (pesaje) {
    if (pesaje) {
      res.json({ message: 'Pesaje borrado!' });
    } else {
      res.send(401, 'Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Pesaje no encontrado');
  });
});

module.exports = router;