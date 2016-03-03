'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /traslado
// router.route('/traslado') */

// POST /traslado
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaTraslado = req.body.fechaTraslado;
  var nombreConductor = req.body.nombreConductor;
  var cedulaConductor = req.body.cedulaConductor;
  var cantidadAnimal = req.body.cantidadAnimal;
  var numeroRUA = req.body.numeroRUA;
  var marcaAuto = req.body.marcaAuto;

  var index = Museo.Traslado.build({
    fechaTraslado: fechaTraslado,
    nombreConductor: nombreConductor,    
    cedulaConductor: cedulaConductor,
    cantidadAnimal: cantidadAnimal,
    numeroRUA: numeroRUA,
    marcaAuto: marcaAuto,
  });

  index.add(function (success) {
    res.render('./traslado/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los traslado)
// GET /traslado */


router.get('/cargar', function (req, res) {
  var index = Museo.Traslado.build();
  res.render('./traslado/index',{index: index});
});

/* Rutas que terminan en /traslado/:trasladoId
// router.route('/traslado/:trasladoId')
// PUT /traslado/:trasladoId
// Actualiza traslado */

router.put('/:trasladoId', function (req, res) {
  var traslado = Museo.Traslado.build();

  traslado.fechaTraslado = req.body.fechaTraslado;
  traslado.nombreConductor = req.body.nombreConductor;
  traslado.cedulaConductor = req.body.cedulaConductor;
  traslado.cantidadAnimal = req.body.cantidadAnimal;
  traslado.numeroRUA = req.body.numeroRUA;
  traslado.marcaAuto = req.body.marcaAuto;

  traslado.updateById(req.params.trasladoId, function (success) {
    if (success) {
      res.json({ message: 'Traslado actualizado!' });
    } else {
      res.send(401, 'Traslado no encontrado');
    }
  }, function (error) {
    res.send('Traslado no encontrado');
  });
});

// GET /traslado/:trasladoId
// Toma un traslado por id
router.get('/:trasladoId', function (req, res) {
  var traslado = Museo.Traslado.build();

  traslado.retrieveById(req.params.trasladoId, function (traslado) {
    if (traslado) {
      res.json(traslado);
    } else {
      res.send(401, 'Traslado no encontrado');
    }
  }, function (error) {
    res.send('Traslado no encontrado');
  });
});

// DELETE /traslado/trasladoId
// Borra el trasladoId
router.delete('/:trasladoId', function (req, res) {
  var traslado = Museo.Traslado.build();

 traslado.removeById(req.params.trasladoId, function (traslado) {
    if (traslado) {
      res.json({ message: 'Traslado borrado!' });
    } else {
      res.send(401, 'Traslado no encontrado');
    }
  }, function (error) {
    res.send('Traslado no encontrado');
  });
});

module.exports = router;