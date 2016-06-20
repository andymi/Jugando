'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /stock
// router.route('/stock') */
router.get('/cargar', function (req, res) {
  var insumo = Museo.Insumo.build();
  var stock = Museo.Stock.build();
  var detalleCompra = Museo.DetalleCompra.build();
  insumo.retrieveAll(function (insumoQ) {
    console.log('insumoQ',insumoQ);
    if (insumoQ) {
      detalleCompra.retrieveId(function (detalleCompraQ) {
          if (detalleCompraQ) {      
            console.log('soy detalleCompra retrieveId',detalleCompraQ);
            res.render('web/stock/index', {
                            detalleCompraJ:detalleCompraQ,
                            stockJ: stock,
                            selectJ: insumoQ
            });    
          } else {
            res.send(401, 'No se encontraron Factura Compras');
          }
      });
    }else {
      res.send(401, 'No se Eencontraron Factura Compras');
    }
  }, function (error) {
    res.send('Detalle DetalleCompra no encontrado');
    }
  );
});
// POST /stock
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidad = req.body.cantidad;
  var lote = req.body.lote;
  var cantidadMinima = req.body.cantidadMinima; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleCompraIdDetalleCompra = req.body.id; 

  var index = Museo.Stock.build({
    cantidad:cantidad,
    lote: lote,    
    cantidadMinima: cantidadMinima,
    InsumoIdInsumo: InsumoIdInsumo,
    DetalleCompraIdDetalleCompra: DetalleCompraIdDetalleCompra
  });

  index.add(function (success) {
    res.redirect('/web/stock');
  },
  function (err) {
    res.send(err);
  });
});

router.get('/', function (req, res) {
  var stock = Museo.Stock.build();
  console.log('request body',req.body);
  stock.retrieveAll(function (stock) {
    if (stock) {      
      console.log('soy stock retrieveAll',stock);
      res.render('web/stock/success', { stocks: stock});
    } else {
      res.send(401, 'No se encontraron Sanitaciones');
    }
  }, function (error) {
    res.send('Stock no encontrado');
  });
});
/* (trae todos los stock)
// GET /stock */

/* Rutas que terminan en /stock/:stockId
// router.route('/stock/:stockId')
// PUT /stock/:stockId
// Actualiza stock */
/*
router.put('/:stockId', function (req, res) {
  var stock = Museo.Stock.build();

  stock.cantidad = req.body.cantidad;
  stock.lote = req.body.lote;
  stock.cantidadMinima = req.body.cantidadMinima;
  stock.InsumoIdInsumo = req.body.insumoSele;
  

  stock.updateById(req.params.stockId, function (success) {
    if (success) {
      res.redirect('/web/stock');
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
  var insumo = Museo.Insumo.build();
  insumo.retrieveAll(function (insumo) {
  if (insumo) {
      stock.retrieveById(req.params.stockId, function (stock) {
        if (stock) {
            res.render('web/stock/edit', {
                          stock:stock,
                          select: insumo
                        });
        } else {
          res.send(401, 'Stock no encontrado');
        }
      }, function (error) {
        res.send('Stock no encontrado');
      });
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
      res.redirect('/web/stock');
    } else {
      res.send(401, 'Stock no encontrado');
    }
  }, function (error) {
    res.send('Stock no encontrado');
  });
});
*/
module.exports = router;