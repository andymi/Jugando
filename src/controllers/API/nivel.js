'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /nivel
// router.route('/nivel') */

// POST /nivel
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nivel = req.body.nivel; 

  var index = Museo.Nivel.build({
    nivel: nivel
  });

  index.add(function (success) {
    res.render('./nivel/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los nivel)
// GET /nivel */


router.get('/cargar', function (req, res) {
  var index = Museo.Nivel.build();
  res.render('./nivel/index',{index: index});
});

/* Rutas que terminan en /nivel/:nivelId
// router.route('/nivel/:nivelId')
// PUT /nivel/:nivelId
// Actualiza nivel */

router.put('/:nivelId', function (req, res) {
  var nivel = Museo.Nivel.build();

  nivel.nivel = req.body.nivel;

  nivel.updateById(req.params.nivelId, function (success) {
    if (success) {
      res.json({ message: 'Nivel actualizado!' });
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
});

// GET /nivel/:nivelId
// Toma un nivel por id
router.get('/:nivelId', function (req, res) {
  var nivel = Museo.Nivel.build();

  nivel.retrieveById(req.params.nivelId, function (nivel) {
    if (nivel) {
      res.json(nivel);
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
});

// DELETE /nivel/nivelId
// Borra el nivelId
router.delete('/:nivelId', function (req, res) {
  var nivel = Museo.Nivel.build();

 nivel.removeById(req.params.nivelId, function (nivel) {
    if (nivel) {
      res.json({ message: 'Nivel borrado!' });
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
});

module.exports = router;