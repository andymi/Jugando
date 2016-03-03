'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /cliente
// router.route('/cliente') */

// POST /cliente
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nombreCliente = req.body.nombreCliente;
  var direccionCliente = req.body.direccionCliente;
  var rucCliente = req.body.rucCliente;

  var index = Museo.Cliente.build({
    nombreCliente: nombreCliente,
    direccionCliente: direccionCliente,    
    rucCliente: rucCliente
  });

  index.add(function (success) {
    res.render('./cliente/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los cliente)
// GET /cliente */


router.get('/cargar', function (req, res) {
  var index = Museo.Cliente.build();
  res.render('./cliente/index',{index: index});
});

/* Rutas que terminan en /cliente/:clienteId
// router.route('/cliente/:clienteId')
// PUT /cliente/:clienteId
// Actualiza cliente */

router.put('/:clienteId', function (req, res) {
  var cliente = Museo.Cliente.build();

  cliente.nombreCliente = req.body.nombreCliente;
  cliente.direccionCliente = req.body.direccionCliente;
  cliente.rucCliente = req.body.rucCliente;

  cliente.updateById(req.params.clienteId, function (success) {
    if (success) {
      res.json({ message: 'Cliente actualizado!' });
    } else {
      res.send(401, 'Cliente no encontrado');
    }
  }, function (error) {
    res.send('Cliente no encontrado');
  });
});

// GET /cliente/:clienteId
// Toma un cliente por id
router.get('/:clienteId', function (req, res) {
  var cliente = Museo.Cliente.build();

  cliente.retrieveById(req.params.clienteId, function (cliente) {
    if (cliente) {
      res.json(cliente);
    } else {
      res.send(401, 'Cliente no encontrado');
    }
  }, function (error) {
    res.send('Cliente no encontrado');
  });
});

// DELETE /cliente/clienteId
// Borra el clienteId
router.delete('/:clienteId', function (req, res) {
  var cliente = Museo.Cliente.build();

 cliente.removeById(req.params.clienteId, function (cliente) {
    if (cliente) {
      res.json({ message: 'Cliente borrado!' });
    } else {
      res.send(401, 'Cliente no encontrado');
    }
  }, function (error) {
    res.send('Cliente no encontrado');
  });
});

module.exports = router;