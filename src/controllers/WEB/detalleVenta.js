'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleVenta
// router.route('/detalleVenta') */
exports.getForm1 = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  var detalleVenta = Model.DetalleVenta.build();
  facturaVenta.retrieveId(function (FacturaVentaq) {
    console.log('FacturaVentaq',FacturaVentaq);

    if (FacturaVentaq) {
        res.render('web/detalleVenta/index', {
            detalleVentaJ: detalleVenta,
            facturaVentaJ: FacturaVentaq
        });
    }
  }, function (error) {
    res.send('DetalleVenta no encontrado');
    }
  );
};
// POST /detalleVenta
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionVenta = req.body.descripcionVenta;
  var precioVenta = req.body.precioVenta;
  var cantidadVenta = req.body.cantidadVenta; 
  var FacturaVentaIdVenta = req.body.id; 

  var index = Model.DetalleVenta.build({
    descripcionVenta: descripcionVenta,
    precioVenta: precioVenta,    
    cantidadVenta: cantidadVenta,
    FacturaVentaIdVenta: FacturaVentaIdVenta
  });

  index.add(function (success) {
    res.redirect('/web/detalleVenta/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleVenta)
// GET /detalleVenta */
exports.listPag1 =  function (req, res) {
  var detalleVenta = Model.DetalleVenta.build();
  console.log('dentro de get /',req.params.id);
  detalleVenta.retrieveAll(req.params.id, function (detalleVentas) {
    if (detalleVentas) {
      res.render('web/detalleVenta/success', { detalleVentas:detalleVentas});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleVenta no encontrado');
  });
};
//***********************************************************
exports.getForm2 = function (req, res) {
  var ventaId = req.params.ventaId;
  var detalleVenta = Model.DetalleVenta.build();
  console.log('ventaId',ventaId);
    res.render('web/detalleVenta/indexa', {
        detalleVentaJ: detalleVenta,
        ventaJ: ventaId
    });
};
// POST /detalleVenta
exports.create2 =  function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionVenta = req.body.descripcionVenta;
  var precioVenta = req.body.precioVenta;
  var cantidadVenta = req.body.cantidadVenta; 
  var FacturaVentaIdVenta = req.body.id; 

  var index = Model.DetalleVenta.build({
    descripcionVenta: descripcionVenta,
    precioVenta: precioVenta,    
    cantidadVenta: cantidadVenta,
    FacturaVentaIdVenta: FacturaVentaIdVenta
  });

  index.add(function (success) {
    res.redirect('/web/facturaVenta');
  },
  function (err) {
    res.send(err);
  });
};

//***********************************************************
/* Rutas que terminan en /detalleVenta/:detalleVentaId
// router.route('/detalleVenta/:detalleVentaId')
// PUT /detalleVenta/:detalleVentaId
// Actualiza detalleVenta */

exports.update = function (req, res) {
  var detalleVenta = Model.DetalleVenta.build();

 detalleVenta.descripcionVenta = req.body.descripcionVenta;
  detalleVenta.precioVenta = req.body.precioVenta;
  detalleVenta.cantidadVenta = req.body.cantidadVenta;
  
  

  detalleVenta.updateById(req.params.detalleVentaId, function (success) {
    if (success) {
      res.redirect('/web/facturaVenta');
    } else {
      res.send(401, 'Detalle Venta no encontrado');
    }
  }, function (error) {
    res.send('Detalle Venta no encontrado');
  });
};

// GET /detalleVenta/:detalleVentaId
// Toma un detalleVenta por id
exports.read = function (req, res) {
  var detalleVenta = Model.DetalleVenta.build();

  detalleVenta.retrieveById(req.params.detalleVentaId, function (detalleVenta) {
    if (detalleVenta) {
      res.render('web/detalleVenta/edit', {
                      detalleVenta:detalleVenta
                    });
    } else {
      res.send(401, 'Detalle Venta no encontrado');
    }
  }, function (error) {
    res.send('Detalle Venta no encontrado');
  });
};

// DELETE /detalleVenta/detalleVentaId
// Borra el detalleVentaId
exports.delete = function (req, res) {
  var detalleVenta = Model.DetalleVenta.build();

 detalleVenta.removeById(req.params.detalleVentaId, function (detalleVenta) {
    if (detalleVenta) {
      res.redirect('/web/facturaVenta');
    } else {
      res.send(401, 'Detalle Venta no encontrado');
    }
  }, function (error) {
    res.send('Detalle Venta no encontrado');
  });
};
