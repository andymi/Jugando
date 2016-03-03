'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /extraviado
// router.route('/extraviado') */

// POST /extraviado
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaExtraviado = req.body.fechaExtraviado;
  var horaExtraviado = req.body.horaExtraviado;
  var lugarExtraviado = req.body.lugarExtraviado;
  var cantidadExtraviado = req.body.cantidadExtraviado;
  

  var index = Museo.Extraviado.build({
    fechaExtraviado: fechaExtraviado,
    horaExtraviado: horaExtraviado,    
    lugarExtraviado: lugarExtraviado,
    cantidadExtraviado: cantidadExtraviado
  });

  index.add(function (success) {
    res.render('./extraviado/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los extraviado)
// GET /extraviado */


router.get('/cargar', function (req, res) {
  var index = Museo.Extraviado.build();
  res.render('./extraviado/index',{index: index});
});

/* Rutas que terminan en /extraviado/:extraviadoId
// router.route('/extraviado/:extraviadoId')
// PUT /extraviado/:extraviadoId
// Actualiza extraviado */

router.put('/:extraviadoId', function (req, res) {
  var extraviado = Museo.Extraviado.build();

  extraviado.fechaExtraviado = req.body.fechaExtraviado;
  extraviado.horaExtraviado = req.body.horaExtraviado;
  extraviado.lugarExtraviado = req.body.lugarExtraviado;
  extraviado.cantidadExtraviado = req.body.cantidadExtraviado;
  

  extraviado.updateById(req.params.extraviadoId, function (success) {
    if (success) {
      res.json({ message: 'Extraviado actualizado!' });
    } else {
      res.send(401, 'Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });
});

// GET /extraviado/:extraviadoId
// Toma un extraviado por id
router.get('/:extraviadoId', function (req, res) {
  var extraviado = Museo.Extraviado.build();

  extraviado.retrieveById(req.params.extraviadoId, function (extraviado) {
    if (extraviado) {
      res.json(extraviado);
    } else {
      res.send(401, 'Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });
});

// DELETE /extraviado/extraviadoId
// Borra el extraviadoId
router.delete('/:extraviadoId', function (req, res) {
  var extraviado = Museo.Extraviado.build();

 extraviado.removeById(req.params.extraviadoId, function (extraviado) {
    if (extraviado) {
      res.json({ message: 'Extraviado borrado!' });
    } else {
      res.send(401, 'Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });
});

module.exports = router;