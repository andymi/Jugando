'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleCompra
// router.route('/detalleCompra') */
exports.getForm = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  var facturaCompra = Model.FacturaCompra.build();
  facturaCompra.retrieveId(function (facturaCompraQ) {
      if (facturaCompraQ) {      
        console.log('soy facturaCompra retrieveId',facturaCompraQ);
        res.render('web/detalleCompra/indexb', {
                        facturaCompraJ:facturaCompraQ,
                        detalleCompraJ: detalleCompra
        });    
      } else {
        res.send(401, 'No se encontraron Factura Compras');
      }
  });
  }, function (error) {
    res.send('Detalle FacturaCompra no encontrado');
  }
// POST /detalleCompra
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionCompra = req.body.descripcionCompra;
  var precioCompra = req.body.precioCompra;
  var cantidadCompra = req.body.cantidadCompra;  
  var subtotalCompra = req.body.subtotalCompra;
  var FacturaCompraIdCompra = req.body.id;

  var index = Model.DetalleCompra.build({
    descripcionCompra: descripcionCompra,
    precioCompra: precioCompra,    
    cantidadCompra: cantidadCompra,
    subtotalCompra: subtotalCompra,
    FacturaCompraIdCompra: FacturaCompraIdCompra
  });

  index.add(function (success) {
    index.retriveSum(FacturaCompraIdCompra, function (detalleCompras) {
      if (detalleCompras) {
        res.redirect('/web/detalleCompra/cargar');
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa',err);
    });    
  }, function (err) {
    res.send('error',err);
  });
};

/* (trae todos los detalleCompra)
// GET /detalleCompra */
exports.listPag =  function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  console.log('dentro de get /',req.body);
  detalleCompra.retrieveAll(req.params.id, function (detalleCompras) {
    if (detalleCompras) {
      res.render('web/detalleCompra/success', { detalleCompras:detalleCompras});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleCompra no encontrado');
  });
};
//***************************************************************
exports.update = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  detalleCompra.descripcionCompra = req.body.descripcionCompra;
  detalleCompra.precioCompra = req.body.precioCompra;
  detalleCompra.cantidadCompra = req.body.cantidadCompra;
  detalleCompra.subtotalCompra = req.body.subtotalCompra;
  detalleCompra.updateById(req.params.detalleCompraId, function (success) {
    if (success) {
      res.redirect('/web/facturaCompra');
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
};
// GET /detalleCompra/:detalleCompraId
// Toma un detalleCompra por id
exports.read = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
        detalleCompra.retrieveById(req.params.detalleCompraId, function (detalleCompra) {
          if (detalleCompra) {
            console.log('dentro de if Compra');
            res.render('web/detalleCompra/edit', {
                      detalleCompra:detalleCompra
                    });
          } else {
            res.send(401, 'Detalle Compra no encontrado');
          }
        }, function (error) {
          res.send('Detalle Compra no encontrado');
        });
};

// DELETE /detalleCompra/detalleCompraId
// Borra el detalleCompraId
exports.delete =  function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();
  console.log('dentro de delete:*****************');
  detalleCompra.removeById(req.params.detalleCompraId, function (detalleCompra) {
    if (detalleCompra) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/facturaCompra');
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
};
