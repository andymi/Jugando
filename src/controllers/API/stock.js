'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /stock
// router.route('/stock') */

// POST /stock
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidad = req.body.cantidad;
  var lote = req.body.lote;
  var cantidadMinima = req.body.cantidadMinima;  

  var index = Museo.Stock.build({
    cantidad:cantidad,
    lote: lote,    
    cantidadMinima: cantidadMinima
  });

  index.add(function (success) {
    res.render('./stock/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los stock)
// GET /stock */


router.get('/cargar', function (req, res) {
  var index = Museo.Stock.build();
  res.render('./stock/index',{index: index});
});

/* Rutas que terminan en /stock/:stockId
// router.route('/stock/:stockId')
// PUT /stock/:stockId
// Actualiza stock */

router.put('/:stockId', function (req, res) {
  var stock = Museo.Stock.build();

  stock.cantidad = req.body.cantidad;
  stock.lote = req.body.lote;
  stock.cantidadMinima = req.body.cantidadMinima;
  
  

  stock.updateById(req.params.stockId, function (success) {
    if (success) {
      res.json({ message: 'Stock actualizado!' });
    } else {
      res.send(401, 'Stock no encontrado');
    }
  }, function (error) {
    res.send('Stock no encontrado');
  });
});

// GET /stock/:stockId
// Toma un stock por id
router.get('/:stockId', function (req, res) {
  var stock = Museo.Stock.build();

  stock.retrieveById(req.params.stockId, function (stock) {
    if (stock) {
      res.json(stock);
    } else {
      res.send(401, 'Stock no encontrado');
    }
  }, function (error) {
    res.send('Stock no encontrado');
  });
});

// DELETE /stock/stockId
// Borra el stockId
router.delete('/:stockId', function (req, res) {
  var stock = Museo.Stock.build();

 stock.removeById(req.params.stockId, function (stock) {
    if (stock) {
      res.json({ message: 'Stock borrado!' });
    } else {
      res.send(401, 'Stock no encontrado');
    }
  }, function (error) {
    res.send('Stock no encontrado');
  });
});

module.exports = router;