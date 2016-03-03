'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /empleado
// router.route('/empleado') */

// POST /empleado
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nombreEmpleado = req.body.nombreEmpleado;
  var direccionEmpleado = req.body.direccionEmpleado;
  var cedulaEmpleado = req.body.cedulaEmpleado;
  var estadoEmpleado = req.body.estadoEmpleado;

  var index = Museo.Empleado.build({
    nombreEmpleado: nombreEmpleado,
    direccionEmpleado: direccionEmpleado,    
    cedulaEmpleado: cedulaEmpleado,
    estadoEmpleado: estadoEmpleado
  });

  index.add(function (success) {
    res.render('./empleado/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los empleado)
// GET /empleado */


router.get('/cargar', function (req, res) {
  var index = Museo.Empleado.build();
  res.render('./empleado/index',{index: index});
});

/* Rutas que terminan en /empleado/:empleadoId
// router.route('/empleado/:empleadoId')
// PUT /empleado/:empleadoId
// Actualiza empleado */

router.put('/:empleadoId', function (req, res) {
  var empleado = Museo.Empleado.build();

  empleado.nombreEmpleado = req.body.nombreEmpleado;
  empleado.direccionEmpleado = req.body.direccionEmpleado;
  empleado.cedulaEmpleado = req.body.cedulaEmpleado;
  empleado.estadoEmpleado = req.body.estadoEmpleado;

  empleado.updateById(req.params.empleadoId, function (success) {
    if (success) {
      res.json({ message: 'Empleado actualizado!' });
    } else {
      res.send(401, 'Empleado no encontrado');
    }
  }, function (error) {
    res.send('Empleado no encontrado');
  });
});

// GET /empleado/:empleadoId
// Toma un empleado por id
router.get('/:empleadoId', function (req, res) {
  var empleado = Museo.Empleado.build();

  empleado.retrieveById(req.params.empleadoId, function (empleado) {
    if (empleado) {
      res.json(empleado);
    } else {
      res.send(401, 'Empleado no encontrado');
    }
  }, function (error) {
    res.send('Empleado no encontrado');
  });
});

// DELETE /empleado/empleadoId
// Borra el empleadoId
router.delete('/:empleadoId', function (req, res) {
  var empleado = Museo.Empleado.build();

 empleado.removeById(req.params.empleadoId, function (empleado) {
    if (empleado) {
      res.json({ message: 'Empleado borrado!' });
    } else {
      res.send(401, 'Empleado no encontrado');
    }
  }, function (error) {
    res.send('Empleado no encontrado');
  });
});

module.exports = router;