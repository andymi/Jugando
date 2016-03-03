'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /departamento
// router.route('/departamento') */

// POST /departamento
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var departamento = req.body.departamento; 

  var index = Museo.Departamento.build({
    departamento: departamento
  });

  index.add(function (success) {
    res.render('./departamento/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los departamento)
// GET /departamento */


router.get('/cargar', function (req, res) {
  var index = Museo.Departamento.build();
  res.render('./departamento/index',{index: index});
});

/* Rutas que terminan en /departamento/:departamentoId
// router.route('/departamento/:departamentoId')
// PUT /departamento/:departamentoId
// Actualiza departamento */

router.put('/:departamentoId', function (req, res) {
  var departamento = Museo.Departamento.build();

  departamento.departamento = req.body.departamento;

  departamento.updateById(req.params.departamentoId, function (success) {
    if (success) {
      res.json({ message: 'Departamento actualizado!' });
    } else {
      res.send(401, 'Departamento no encontrado');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
});

// GET /departamento/:departamentoId
// Toma un departamento por id
router.get('/:departamentoId', function (req, res) {
  var departamento = Museo.Departamento.build();

  departamento.retrieveById(req.params.departamentoId, function (departamento) {
    if (departamento) {
      res.json(departamento);
    } else {
      res.send(401, 'Departamento no encontrado');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
});

// DELETE /departamento/departamentoId
// Borra el departamentoId
router.delete('/:departamentoId', function (req, res) {
  var departamento = Museo.Departamento.build();

 departamento.removeById(req.params.departamentoId, function (departamento) {
    if (departamento) {
      res.json({ message: 'Departamento borrado!' });
    } else {
      res.send(401, 'Departamento no encontrado');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
});

module.exports = router;