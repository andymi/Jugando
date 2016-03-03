'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /detalleVenta
// router.route('/detalleVenta') */

// POST /detalleVenta
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionVenta = req.body.descripcionVenta;
  var precioVenta = req.body.precioVenta;
  var cantidadVenta = req.body.cantidadVenta;  

  var index = Museo.DetalleVenta.build({
    descripcionVenta: descripcionVenta,
    precioVenta: precioVenta,    
    cantidadVenta: cantidadVenta
  });

  index.add(function (success) {
    res.render('./detalleVenta/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los detalleVenta)
// GET /detalleVenta */


router.get('/cargar', function (req, res) {
  var index = Museo.DetalleVenta.build();
  res.render('./detalleVenta/index',{index: index});
});

/* Rutas que terminan en /detalleVenta/:detalleVentaId
// router.route('/detalleVenta/:detalleVentaId')
// PUT /detalleVenta/:detalleVentaId
// Actualiza detalleVenta */

router.put('/:detalleVentaId', function (req, res) {
  var detalleVenta = Museo.DetalleVenta.build();

 detalleVenta.descripcionVenta = req.body.descripcionVenta;
  detalleVenta.precioVenta = req.body.precioVenta;
  detalleVenta.cantidadVenta = req.body.cantidadVenta;
  
  

  detalleVenta.updateById(req.params.detalleVentaId, function (success) {
    if (success) {
      res.json({ message: 'Detalle Venta actualizado!' });
    } else {
      res.send(401, 'Detalle Venta no encontrado');
    }
  }, function (error) {
    res.send('Detalle Venta no encontrado');
  });
});

// GET /detalleVenta/:detalleVentaId
// Toma un detalleVenta por id
router.get('/:detalleVentaId', function (req, res) {
  var detalleVenta = Museo.DetalleVenta.build();

  detalleVenta.retrieveById(req.params.detalleVentaId, function (detalleVenta) {
    if (detalleVenta) {
      res.json(detalleVenta);
    } else {
      res.send(401, 'Detalle Venta no encontrado');
    }
  }, function (error) {
    res.send('Detalle Venta no encontrado');
  });
});

// DELETE /detalleVenta/detalleVentaId
// Borra el detalleVentaId
router.delete('/:detalleVentaId', function (req, res) {
  var detalleVenta = Museo.DetalleVenta.build();

 detalleVenta.removeById(req.params.detalleVentaId, function (detalleVenta) {
    if (detalleVenta) {
      res.json({ message: 'Detalle Venta borrado!' });
    } else {
      res.send(401, 'Detalle Venta no encontrado');
    }
  }, function (error) {
    res.send('Detalle Venta no encontrado');
  });
});

module.exports = router;