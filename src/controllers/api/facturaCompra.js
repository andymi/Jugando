'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /facturaCompra
// router.route('/facturaCompra') */

// POST /facturaCompra
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaCompra = req.body.fechaCompra;
  var totalCompra = req.body.totalCompra;
  var condicionCompra = req.body.condicionCompra;
  var formaPago = req.body.formaPago;
  var numeroCompra = req.body.numeroCompra;  
  var horaCompra = req.body.horaCompra;

  console.log('soy post fechaCompra',fechaCompra);
  console.log('soy post totalCompra',totalCompra);
  console.log('soy post condicionCompra',condicionCompra);
  console.log('soy post formaPago',formaPago);
  console.log('soy post numeroCompra',numeroCompra);
  console.log('soy post horaCompra',horaCompra);



  var facturaCompra = Museo.FacturaCompra.build({
    fechaCompra: fechaCompra,
    totalCompra: totalCompra,    
    condicionCompra: condicionCompra,
    formaPago: formaPago,
    numeroCompra: numeroCompra,
    horaCompra: horaCompra
  });

  facturaCompra.add(function (success) {
    res.render('./facturaCompra/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los facturaCompra)
// GET /facturaCompra */


router.get('/cargar', function (req, res) {
  var facturaCompra = Museo.FacturaCompra.build();
  res.render('./facturaCompra/index',{facturaCompra: facturaCompra});
});

/* Rutas que terminan en /facturaCompra/:facturaCompraId
// router.route('/facturaCompra/:facturaCompraId')
// PUT /facturaCompra/:facturaCompraId
// Actualiza facturaCompra */

router.put('/:facturaCompraId', function (req, res) {
  var facturaCompra = Museo.FacturaCompra.build();

  facturaCompra.fechaCompra = req.body.fechaCompra;
  facturaCompra.totalCompra = req.body.totalCompra;
  facturaCompra.condicionCompra = req.body.condicionCompra;
  facturaCompra.formaPago = req.body.formaPago;
  facturaCompra.numeroCompra = req.body.numeroCompra;
  facturaCompra.horaCompra = req.body.horaCompra;

  facturaCompra.updateById(req.params.facturaCompraId, function (success) {
    if (success) {
      res.json({ message: 'FacturaCompra actualizado!' });
    } else {
      res.send(401, 'FacturaCompra no encontrado');
    }
  }, function (error) {
    res.send('FacturaCompra no encontrado');
  });
});

// GET /facturaCompra/:facturaCompraId
// Toma un facturaCompra por id
router.get('/:facturaCompraId', function (req, res) {
  var facturaCompra = Museo.FacturaCompra.build();

  facturaCompra.retrieveById(req.params.facturaCompraId, function (facturaCompra) {
    if (facturaCompra) {
      res.json(facturaCompra);
    } else {
      res.send(401, 'FacturaCompra no encontrado');
    }
  }, function (error) {
    res.send('FacturaCompra no encontrado');
  });
});

// DELETE /facturaCompra/facturaCompraId
// Borra el facturaCompraId
router.delete('/:facturaCompraId', function (req, res) {
  var facturaCompra = Museo.FacturaCompra.build();

  facturaCompra.removeById(req.params.facturaCompraId, function (facturaCompra) {
    if (facturaCompra) {
      res.json({ message: 'FacturaCompra borrado!' });
    } else {
      res.send(401, 'FacturaCompra no encontrado');
    }
  }, function (error) {
    res.send('FacturaCompra no encontrado');
  });
});

module.exports = router;