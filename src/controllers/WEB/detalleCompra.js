'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleCompra
// router.route('/detalleCompra') */
exports.getForm1 = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleCompra = Model.DetalleCompra.build();
  var facturaCompra = Model.FacturaCompra.build();
  insumo.retrieveAll(function (insumoQ) {
    console.log('insumoQ',insumoQ);
    if (insumoQ) {
      facturaCompra.retrieveId(function (facturaCompraQ) {
          if (facturaCompraQ) {      
            console.log('soy facturaCompra retrieveId',facturaCompraQ);
            res.render('web/detalleCompra/index', {
                            facturaCompraJ:facturaCompraQ,
                            detalleCompraJ: detalleCompra,
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
    res.send('Detalle FacturaCompra no encontrado');
    }
  );
};
// POST /detalleCompra
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionCompra = req.body.descripcionCompra;
  var precioCompra = req.body.precioCompra;
  var cantidadCompra = req.body.cantidadCompra;  
  var InsumoIdInsumo = req.body.selectJ;
  var FacturaCompraIdCompra = req.body.id;

  var index = Model.DetalleCompra.build({
    descripcionCompra: descripcionCompra,
    precioCompra: precioCompra,    
    cantidadCompra: cantidadCompra,
    InsumoIdInsumo: InsumoIdInsumo,
    FacturaCompraIdCompra: FacturaCompraIdCompra
  });

  index.add(function (success) {
    res.redirect('/web/detalleCompra/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleCompra)
// GET /detalleCompra */
exports.listPag1 =  function (req, res) {
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
exports.getForm2 = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleCompra = Model.DetalleCompra.build();
  var compraId = req.params.compraId;
  insumo.retrieveAll(function (insumoQ) {
    console.log('insumoQ',insumoQ);
    if (insumoQ) {
         
            console.log('soy compraId',compraId);
            res.render('web/detalleCompra/indexa', {
                            compraJ:compraId,
                            detalleCompraJ: detalleCompra,
                            selectJ: insumoQ
            });   
    }else {
      res.send(401, 'No se Eencontraron Factura Compras');
    }
  }, function (error) {
    res.send('Detalle FacturaCompra no encontrado');
    }
  );
};
// POST /detalleCompra
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var descripcionCompra = req.body.descripcionCompra;
  var precioCompra = req.body.precioCompra;
  var cantidadCompra = req.body.cantidadCompra;  
  var InsumoIdInsumo = req.body.selectJ;
  var FacturaCompraIdCompra = req.body.id;

  var index = Model.DetalleCompra.build({
    descripcionCompra: descripcionCompra,
    precioCompra: precioCompra,    
    cantidadCompra: cantidadCompra,
    InsumoIdInsumo: InsumoIdInsumo,
    FacturaCompraIdCompra: FacturaCompraIdCompra
  });

  index.add(function (success) {
    res.redirect('/web/facturaCompra');
  },
  function (err) {
    res.send(err);
  });
};
//***************************************************************
/* Rutas que terminan en /detalleCompra/:detalleCompraId
// router.route('/detalleCompra/:detalleCompraId')
// PUT /detalleCompra/:detalleCompraId
// Actualiza detalleCompra */

exports.update = function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();

  detalleCompra.descripcionCompra = req.body.descripcionCompra;
  detalleCompra.precioCompra = req.body.precioCompra;
  detalleCompra.cantidadCompra = req.body.cantidadCompra;
  detalleCompra.InsumoIdInsumo = req.body.insumoSele;

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
  var insumo = Model.Insumo.build();
  insumo.retrieveAll(function (insumo) {
    if (insumo) {
        console.log('dentro de if insumo');
        detalleCompra.retrieveById(req.params.detalleCompraId, function (detalleCompra) {
          if (detalleCompra) {
            console.log('dentro de if Compra');
            res.render('web/detalleCompra/edit', {
                      detalleCompra:detalleCompra,
                      select: insumo
                    });
          } else {
            res.send(401, 'Detalle Compra no encontrado');
          }
        }, function (error) {
          res.send('Detalle Compra no encontrado');
        });
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    console.log(error);
    res.send('desDetalles no encontrado');
  });
};

// DELETE /detalleCompra/detalleCompraId
// Borra el detalleCompraId
exports.delete =  function (req, res) {
  var detalleCompra = Model.DetalleCompra.build();

  detalleCompra.removeById(req.params.detalleCompraId, function (detalleCompra) {
    if (detalleCompra) {
      res.redirect('/web/facturaCompra');
    } else {
      res.send(401, 'Detalle Compra no encontrado');
    }
  }, function (error) {
    res.send('Detalle Compra no encontrado');
  });
};
