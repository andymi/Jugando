'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /vacunacion
// router.route('/vacunacion') */

// POST /vacunacion
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaVacunacion = req.body.fechaVacunacion;
  var horaVacunacion = req.body.horaVacunacion;
  var cantidadVacunacion = req.body.cantidadVacunacion; 
  var costoVacunacion = req.body.costoVacunacion; 

  var index = Museo.Vacunacion.build({
    fechaVacunacion : fechaVacunacion,
    horaVacunacion: horaVacunacion,    
    cantidadVacunacion : cantidadVacunacion,
    costoVacunacion : costoVacunacion
  });

  index.add(function (success) {
    res.render('./vacunacion/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los vacunacion)
// GET /vacunacion */


router.get('/cargar', function (req, res) {
  var index = Museo.Vacunacion.build();
  res.render('./vacunacion/index',{index: index});
});

/* Rutas que terminan en /vacunacion/:vacunacionId
// router.route('/vacunacion/:vacunacionId')
// PUT /vacunacion/:vacunacionId
// Actualiza vacunacion */
router.put('/:vacunacionId', function (req, res) {
  var vacunacion = Museo.Vacunacion.build();

  vacunacion.fechaVacunacion = req.body.fechaVacunacion;
  vacunacion.horaVacunacion = req.body.horaVacunacion;
  vacunacion.cantidadVacunacion = req.body.cantidadVacunacion;  
  vacunacion.costoVacunacion = req.body.costoVacunacion;
  

  vacunacion.updateById(req.params.vacunacionId, function (success) {
    if (success) {
      res.json({ message: 'Vacunacion actualizado!' });
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
});

// GET /vacunacion/:vacunacionId
// Toma un vacunacion por id
router.get('/:vacunacionId', function (req, res) {
  var vacunacion = Museo.Vacunacion.build();

  vacunacion.retrieveById(req.params.vacunacionId, function (vacunacion) {
    if (vacunacion) {
      res.json(vacunacion);
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
});

// DELETE /vacunacion/vacunacionId
// Borra el vacunacionId
router.delete('/:vacunacionId', function (req, res) {
  var vacunacion = Museo.Vacunacion.build();

 vacunacion.removeById(req.params.vacunacionId, function (vacunacion) {
    if (vacunacion) {
      res.json({ message: 'Vacunacion borrado!' });
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
});

module.exports = router;