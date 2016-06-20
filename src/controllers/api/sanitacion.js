'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /sanitacion
// router.route('/sanitacion') */

// POST /sanitacion
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaSanitacion = req.body.fechaSanitacion;
  var horaSanitacion = req.body.horaSanitacion; 

  var index = Museo.Sanitacion.build({
    fechaSanitacion: fechaSanitacion,
    horaSanitacion: horaSanitacion
  });

  index.add(function (success) {
    res.render('./sanitacion/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los sanitacion)
// GET /sanitacion */


router.get('/cargar', function (req, res) {
  var index = Museo.Sanitacion.build();
  res.render('./sanitacion/index',{index: index});
});

/* Rutas que terminan en /sanitacion/:sanitacionId
// router.route('/sanitacion/:sanitacionId')
// PUT /sanitacion/:sanitacionId
// Actualiza sanitacion */

router.put('/:sanitacionId', function (req, res) {
  var sanitacion = Museo.Sanitacion.build();

  sanitacion.fechaSanitacion = req.body.fechaSanitacion;
  sanitacion.horaSanitacion = req.body.horaSanitacion;
  
  

  sanitacion.updateById(req.params.sanitacionId, function (success) {
    if (success) {
      res.json({ message: 'Sanitacion actualizado!' });
    } else {
      res.send(401, 'Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Sanitacion no encontrado');
  });
});

// GET /sanitacion/:sanitacionId
// Toma un sanitacion por id
router.get('/:sanitacionId', function (req, res) {
  var sanitacion = Museo.Sanitacion.build();

  sanitacion.retrieveById(req.params.sanitacionId, function (sanitacion) {
    if (sanitacion) {
      res.json(sanitacion);
    } else {
      res.send(401, 'Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Sanitacion no encontrado');
  });
});

// DELETE /sanitacion/sanitacionId
// Borra el sanitacionId
router.delete('/:sanitacionId', function (req, res) {
  var sanitacion = Museo.Sanitacion.build();

 sanitacion.removeById(req.params.sanitacionId, function (sanitacion) {
    if (sanitacion) {
      res.json({ message: 'Sanitacion borrado!' });
    } else {
      res.send(401, 'Sanitacion no encontrado');
    }
  }, function (error) {
    res.send('Sanitacion no encontrado');
  });
});

module.exports = router;