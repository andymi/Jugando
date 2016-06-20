'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /facturaVenta
// router.route('/facturaVenta') */

// POST /facturaVenta
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaVenta = req.body.fechaVenta;
  var totalVenta = req.body.totalVenta;
  var condicionVenta = req.body.condicionVenta;
  var formaCobro = req.body.formaCobro;
  var numeroVenta = req.body.numeroVenta;  
  var horaVenta = req.body.horaVenta;

  var index = Museo.FacturaVenta.build({
    fechaVenta: fechaVenta,
    totalVenta: totalVenta,    
    condicionVenta: condicionVenta,
    formaCobro: formaCobro,
    numeroVenta: numeroVenta,
    horaVenta: horaVenta
  });

  index.add(function (success) {
    res.render('./facturaVenta/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los facturaVenta)
// GET /facturaVenta */


router.get('/cargar', function (req, res) {
  var index = Museo.FacturaVenta.build();
  res.render('./facturaVenta/index',{index: index});
});

/* Rutas que terminan en /facturaVenta/:facturaVentaId
// router.route('/facturaVenta/:facturaVentaId')
// PUT /facturaVenta/:facturaVentaId
// Actualiza facturaVenta */

router.put('/:facturaVentaId', function (req, res) {
  var facturaVenta = Museo.FacturaVenta.build();

  facturaVenta.fechaVenta = req.body.fechaVenta;
  facturaVenta.totalVenta = req.body.totalVenta;
  facturaVenta.condicionVenta = req.body.condicionVenta;
  facturaVenta.formaCobro = req.body.formaCobro;
  facturaVenta.numeroVenta = req.body.numeroVenta;
  facturaVenta.horaVenta = req.body.horaVenta;

  facturaVenta.updateById(req.params.facturaVentaId, function (success) {
    if (success) {
      res.json({ message: 'facturaVenta actualizado!' });
    } else {
      res.send(401, 'facturaVenta no encontrado');
    }
  }, function (error) {
    res.send('facturaVenta no encontrado');
  });
});

// GET /facturaVenta/:facturaVentaId
// Toma un facturaVenta por id
router.get('/:facturaVentaId', function (req, res) {
  var facturaVenta = Museo.FacturaVenta.build();

  facturaVenta.retrieveById(req.params.facturaVentaId, function (facturaVenta) {
    if (facturaVenta) {
      res.json(facturaVenta);
    } else {
      res.send(401, 'facturaVenta no encontrado');
    }
  }, function (error) {
    res.send('facturaVenta no encontrado');
  });
});

// DELETE /facturaVenta/facturaVentaId
// Borra el facturaVentaId
router.delete('/:facturaVentaId', function (req, res) {
  var facturaVenta = Museo.FacturaVenta.build();

  facturaVenta.removeById(req.params.facturaVentaId, function (facturaVenta) {
    if (facturaVenta) {
      res.json({ message: 'facturaVenta borrado!' });
    } else {
      res.send(401, 'facturaVenta no encontrado');
    }
  }, function (error) {
    res.send('facturaVenta no encontrado');
  });
});

module.exports = router;