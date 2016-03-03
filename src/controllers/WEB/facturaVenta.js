'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /facturaVenta
// router.route('/facturaVenta') */
exports.getForm = function (req, res) {
  var cliente = Model.Cliente.build();
  var facturaVenta = Model.FacturaVenta.build();
  cliente.retrieveAll(function (clienteQ) {
    console.log('clienteQ',clienteQ);
    if (clienteQ) {
        res.render('web/facturaVenta/index', {
                facturaVentaJ: facturaVenta,
                selectJ: clienteQ
        });
      }
  },function (error) {
    res.send('Factura Venta no encontrado');
  }
  );    
};
// POST /facturaVenta
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaVenta = req.body.fechaVenta;
  var totalVenta = req.body.totalVenta;
  var condicionVenta = req.body.condicionVenta;
  var formaCobro = req.body.formaCobro;
  var numeroVenta = req.body.numeroVenta;  
  var horaVenta = req.body.horaVenta;
  var ClienteIdCliente = req.body.selectJ;

  var index = Model.FacturaVenta.build({
    fechaVenta: fechaVenta,
    totalVenta: totalVenta,    
    condicionVenta: condicionVenta,
    formaCobro: formaCobro,
    numeroVenta: numeroVenta,
    horaVenta: horaVenta,
    ClienteIdCliente: ClienteIdCliente
  });

  index.add(function (success) {
    res.redirect('/web/detalleVenta/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los facturaVenta)
// GET /facturaVenta */
exports.listPag = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  console.log('request body',req.body);
  facturaVenta.retrieveAll(function (facturaVenta) {
    if (facturaVenta) {      
      res.render('web/facturaVenta/success', { facturaVenta: facturaVenta});
      console.log('soy facturaVenta retrieveAll',facturaVenta);
    } else {
      res.send(401, 'No se encontraron Pesajes');
    }
  }, function (error) {
    res.send('FacturaVenta no encontrado');
  });
};

/* Rutas que terminan en /facturaVenta/:facturaVentaId
// router.route('/facturaVenta/:facturaVentaId')
// PUT /facturaVenta/:facturaVentaId
// Actualiza facturaVenta */

exports.update = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  console.log('*************',req.body);
  facturaVenta.fechaVenta = req.body.fechaVenta;
  facturaVenta.totalVenta = req.body.totalVenta;
  facturaVenta.condicionVenta = req.body.condicionVenta;
  facturaVenta.formaCobro = req.body.formaCobro;
  facturaVenta.numeroVenta = req.body.numeroVenta;
  facturaVenta.horaVenta = req.body.horaVenta;
  facturaVenta.ClienteIdCliente = req.body.clienteSele;

  facturaVenta.updateById(req.params.facturaVentaId, function (success) {
    if (success) {
      res.redirect('/web/facturaVenta');
    } else {
      res.send(401, 'facturaVenta no encontrado');
    }
  }, function (error) {
    res.send('facturaVenta no encontrado');
  });
};

// GET /facturaVenta/:facturaVentaId
// Toma un facturaVenta por id
exports.read = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  var cliente = Model.Cliente.build();
  cliente.retrieveAll(function (cliente) {
    if (cliente) {
        facturaVenta.retrieveById(req.params.facturaVentaId, function (facturaVenta) {
          if (facturaVenta) {
            res.render('web/facturaVenta/edit', {
                      facturaVenta:facturaVenta,
                      select: cliente
                    });
          } else {
            res.send(401, 'facturaVenta no encontrado');
          }
        }, function (error) {
          res.send('facturaVenta no encontrado');
        });
    } else {
      res.send(401, 'No se encontraron Vacunaciones');
    }
  }, function (error) {
    console.log(error);
    res.send('Vacunacion no encontrado');
  });
};

exports.readId = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();
  facturaVenta.retrieveVerId(req.params.id, function (facturaVentaQ) {
    if (facturaVentaQ) {
      res.render('web/detalleVenta/success', {
                  facturaVenta:facturaVentaQ
                });
    } else {
      res.send(401, 'FacturaVenta no encontrado');
    }
  }, function (error) {
    res.send('FacturaVenta no encontrado',error);
  });
};
// DELETE /facturaVenta/facturaVentaId
// Borra el facturaVentaId
exports.delete = function (req, res) {
  var facturaVenta = Model.FacturaVenta.build();

  facturaVenta.removeById(req.params.facturaVentaId, function (facturaVenta) {
    if (facturaVenta) {
      res.redirect('/web/facturaVenta');
    } else {
      res.send(401, 'facturaVenta no encontrado');
    }
  }, function (error) {
    res.send('facturaVenta no encontrado');
  });
};
