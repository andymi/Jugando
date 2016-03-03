'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /proveedor
// router.route('/proveedor') */

// POST /proveedor
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nombreProveedor = req.body.nombreProveedor;
  var direccionProveedor = req.body.direccionProveedor;
  var rucProveedor = req.body.rucProveedor;

  var index = Museo.Proveedor.build({
    nombreProveedor: nombreProveedor,
    direccionProveedor: direccionProveedor,    
    rucProveedor: rucProveedor
  });

  index.add(function (success) {
    res.render('./proveedor/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los proveedor)
// GET /proveedor */


router.get('/cargar', function (req, res) {
  var index = Museo.Proveedor.build();
  res.render('./proveedor/index',{index: index});
});

/* Rutas que terminan en /proveedor/:proveedorId
// router.route('/proveedor/:proveedorId')
// PUT /proveedor/:proveedorId
// Actualiza proveedor */

router.put('/:proveedorId', function (req, res) {
  var proveedor = Museo.Proveedor.build();

  proveedor.nombreProveedor = req.body.nombreProveedor;
  proveedor.direccionProveedor = req.body.direccionProveedor;
  proveedor.rucProveedor = req.body.rucProveedor;

  proveedor.updateById(req.params.proveedorId, function (success) {
    if (success) {
      res.json({ message: 'Proveedor actualizado!' });
    } else {
      res.send(401, 'Proveedor no encontrado');
    }
  }, function (error) {
    res.send('Proveedor no encontrado');
  });
});

// GET /proveedor/:proveedorId
// Toma un proveedor por id
router.get('/:proveedorId', function (req, res) {
  var proveedor = Museo.Proveedor.build();

  proveedor.retrieveById(req.params.proveedorId, function (proveedor) {
    if (proveedor) {
      res.json(proveedor);
    } else {
      res.send(401, 'Proveedor no encontrado');
    }
  }, function (error) {
    res.send('Proveedor no encontrado');
  });
});

// DELETE /proveedor/proveedorId
// Borra el proveedorId
router.delete('/:proveedorId', function (req, res) {
  var proveedor = Museo.Proveedor.build();

 proveedor.removeById(req.params.proveedorId, function (proveedor) {
    if (proveedor) {
      res.json({ message: 'Proveedor borrado!' });
    } else {
      res.send(401, 'Proveedor no encontrado');
    }
  }, function (error) {
    res.send('Proveedor no encontrado');
  });
});

module.exports = router;