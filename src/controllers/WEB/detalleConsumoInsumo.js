'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');
/* Rutas que terminan en /detalleVacunacionInsumo
// router.route('/detalleVacunacionInsumo') */
exports.getForm = function (req, res) {
  var insumo = Model.Insumo.build();  
  var consumo = Model.DetalleConsumo.build();
  var detalleConsumoInsumo = Model.DetalleConsumoInsumo.build();
  insumo.retrieveAll(function (insumoQ) {
    console.log('insumoQ',insumoQ);
    if (insumoQ) {
      consumo.retrieveId(function (consumo) {
      console.log('consumo',consumo);
          if (consumo) {      
            console.log('soy consumo retrieveId',consumo);
            res.render('web/detalleConsumoInsumo/index', {
                            consumoJ:consumo,
                            detalleConsumoInsumoJ: detalleConsumoInsumo,
                            selectJ: insumoQ
            });    
          } else {
            res.send(401, 'No se encontraron consumos');
          }
      });
    }else {
      res.send(401, 'No se Eencontraron consumos');
    }
  }, function (error) {
    res.send('Detalle consumo no encontrado');
    }
  );
};
// POST /detalleVacunacionInsumo
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidad = req.body.cantidad; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleConsumoIdDetalleConsumo = req.body.id;

  var index = Model.DetalleConsumoInsumo.build({
   cantidad : cantidad,
   InsumoIdInsumo: InsumoIdInsumo,
   DetalleConsumoIdDetalleConsumo: DetalleConsumoIdDetalleConsumo
  });

  index.add(function (success) {
    res.redirect('/web/detalleConsumo/cargar');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los detalleConsumoInsumo)
// GET /detalleConsumoInsumo */
exports.listPag1 = function (req, res) {
  var detalleConsumoInsumo = Model.DetalleConsumoInsumo.build();
  console.log('dentro de get /',req.body);
  detalleConsumoInsumo.retrieveAll(req.params.id, function (detalleConsumos) {
    if (detalleConsumos) {
      res.render('web/detalleConsumoInsumo/success', { detalleConsumos:detalleConsumos});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleSanitacion no encontrado');
  });
};
//*********************************************************
exports.getForm2 = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleConsumoInsumo = Model.DetalleConsumoInsumo.build();
  var consumoId = req.params.consumoId;
  insumo.retrieveAll(function (insumoQ) {
    console.log('insumoQ',insumoQ);
    if (insumoQ) {     
            console.log('soy consumo retrieveId',consumoId);
            res.render('web/detalleConsumoInsumo/indexa', {
                            consumoJ:consumoId,
                            detalleConsumoInsumoJ: detalleConsumoInsumo,
                            selectJ: insumoQ
            });    
    }else {
      res.send(401, 'No se Eencontraron Consumos');
    }
  }, function (error) {
    res.send('Detalle Consumos no encontrado');
    }
  );
};
// POST /detalleVacunacionInsumo
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidad = req.body.cantidad; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleConsumoIdDetalleConsumo = req.body.id;

  var index = Model.DetalleConsumoInsumo.build({
   cantidad : cantidad,
   InsumoIdInsumo: InsumoIdInsumo,
   DetalleConsumoIdDetalleConsumo: DetalleConsumoIdDetalleConsumo
  });

  index.add(function (success) {
    res.redirect('/web/consumo');
  },
  function (err) {
    res.send(err);
  });
};
//*********************************************************
/* Rutas que terminan en /detalleVacunacionInsumo/:detalleVacunacionInsumoId
// router.route('/detalleVacunacionInsumo/:detalleVacunacionInsumoId')
// PUT /detalleVacunacionInsumo/:detalleVacunacionInsumoId
// Actualiza detalleVacunacionInsumo */
exports.update = function (req, res) {
  var detalleConsumoInsumo = Model.DetalleConsumoInsumo.build();

  detalleConsumoInsumo.cantidad = req.body.cantidad;
  detalleConsumoInsumo.InsumoIdInsumo = req.body.insumoSele;
  console.log('dentro de put',req.body.cantidad, req.body.insumoSele);

  detalleConsumoInsumo.updateById(req.params.detalleConsumoInsumoId, function (success) {
    if (success) {
      res.redirect('/web/consumo');
    } else {
      res.send(401, 'Detalle Consumo Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Consumo InsumoS no encontrado');
  });
};
// GET /detalleVacunacionInsumo/:detalleConsumoInsumoId
// Toma un detalleVacunacionInsumo por id
exports.read = function (req, res) {
  var detalleConsumoInsumo = Model.DetalleConsumoInsumo.build();
  var insumo = Model.Insumo.build();
  insumo.retrieveAll(function (insumo) {
    if (insumo) { 
      detalleConsumoInsumo.retrieveById(req.params.detalleConsumoInsumoId, function (detalleConsumoInsumo) {
        if (detalleConsumoInsumo) {
          res.render('web/detalleConsumoInsumo/edit', {
                      detalleConsumoInsumo:detalleConsumoInsumo,
                      select: insumo
                    });
        } else {
          res.send(401, 'Detalle Consumo Insumo no encontrado');
        }
      }, function (error) {
        res.send('Detalle Consumo Insumo no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron insumos');
    }
  }, function (error) {
    console.log(error);
    res.send('desDetalles no encontrado');
  });
};
// DELETE /detalleConsumoInsumo/detalleVacunacionInsumoId
// Borra el detalleVacunacionInsumoId
exports.delete = function (req, res) {
  var detalleConsumoInsumo = Model.DetalleConsumoInsumo.build();

 detalleConsumoInsumo.removeById(req.params.detalleConsumoInsumoId, function (detalleConsumoInsumo) {
    if (detalleConsumoInsumo) {
      res.redirect('/web/consumo');
    } else {
      res.send(401, 'Detalle Vacunacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Vacunacion Insumo no encontrado');
  });
};
