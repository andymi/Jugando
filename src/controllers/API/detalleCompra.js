'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleCompra
// router.route('/detalleCompra') */

// POST /detalleCompra
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionCompra = req.body.descripcionCompra;
  var precioCompra = req.body.precioCompra;
  var cantidadCompra = req.body.cantidadCompra;  

  var index = Museo.DetalleCompra.build({
    descripcionCompra: descripcionCompra,
    precioCompra: precioCompra,    
    cantidadCompra: cantidadCompra
  });

  index.add(function (success) {
    res.render('./detalleCompra/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleCompra)
// GET /detalleCompra */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleCompra.build();
  res.render('./detalleCompra/index',{index: index});
});

/* Rutas que terminan en /detalleCompra/:detalleCompraId
// router.route('/detalleCompra/:detalleCompraId')
// PUT /detalleCompra/:detalleCompraId
// Actualiza detalleCompra */

router.put('/:detalleCompraId', function (req, res) {
  var detalleCompra = Museo.DetalleCompra.build();

  detalleCompra.descripcionCompra = req.body.descripcionCompra;
  detalleCompra.precioCompra = req.body.precioCompra;
  detalleCompra.cantidadCompra = req.body.cantidadCompra;
  
  

  detalleCompra.updateById(req.params.detalleCompraId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Compra actualizado!' });
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
});

// GET /detalleCompra/:detalleCompraId
// Toma un detalleCompra por id
router.get('/:detalleCompraId', function (req, res) {
  var detalleCompra = Museo.DetalleCompra.build();

  detalleCompra.retrieveById(req.params.detalleCompraId, function (detalleCompra) {
    if (detalleCompra) {
      res.json(detalleCompra);
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
});

// DELETE /detalleCompra/detalleCompraId
// Borra el detalleCompraId
router.delete('/:detalleCompraId', function (req, res) {
  var detalleCompra = Museo.DetalleCompra.build();

 detalleCompra.removeById(req.params.detalleCompraId, function (detalleCompra) {
    if (detalleCompra) {
      res.json({ message: 'Detalle Compra borrado!' });
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
});

module.exports = router;