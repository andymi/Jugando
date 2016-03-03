'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleSanitacionInsumo
// router.route('/detalleSanitacionInsumo') */
exports.getForm = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();
  var sanitacion = Model.DetalleSanitacion.build();
  insumo.retrieveAll(function (insumoQ) {
    console.log('insumoQ',insumoQ);
    if (insumoQ) {
      sanitacion.retrieveId(function (sanitacion) {
          if (sanitacion) {      
            console.log('soy sanitacion retrieveId',sanitacion);
            res.render('web/detalleSanitacionInsumo/index', {
                            sanitacionJ:sanitacion,
                            detalleSanitacionInsumoJ: detalleSanitacionInsumo,
                            selectJ: insumoQ
            });    
          } else {
            res.send(401, 'No se encontraron Sanitaciones');
          }
      });
    }else {
      res.send(401, 'No se Eencontraron Sanitaciones');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
    }
  );
};
// POST /detalleSanitacionInsumo
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidadUtilizada = req.body.cantidadUtilizada; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleSanitacionIdDetalleSanitacion = req.body.id;

  var index = Model.DetalleSanitacionInsumo.build({
    cantidadUtilizada: cantidadUtilizada,
    InsumoIdInsumo: InsumoIdInsumo,
    DetalleSanitacionIdDetalleSanitacion: DetalleSanitacionIdDetalleSanitacion
  });

  index.add(function (success) {
    res.redirect('/web/detalleSanitacion/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleSanitacionInsumo)
// GET /detalleSanitacionInsumo */
exports.listPag1 = function (req, res) {
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();
  console.log('dentro de get /',req.body);
  detalleSanitacionInsumo.retrieveAll(req.params.id, function (detalleSanitaciones) {
    if (detalleSanitaciones) {
      res.render('web/detalleSanitacionInsumo/success', { detalleSanitaciones:detalleSanitaciones});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleSanitacion no encontrado');
  });
};
//************************************************
exports.getForm2 = function (req, res) {
  var insumo = Model.Insumo.build();
  var detalleSanitacionInsumo =Model.DetalleSanitacionInsumo.build();
  var sanitacionId = req.params.sanitacionId;
  insumo.retrieveAll(function (insumoQ) {
    console.log('insumoQ',insumoQ);
    if (insumoQ) {
            console.log('soy sanitacionId',sanitacionId);
            res.render('web/detalleSanitacionInsumo/indexa', {
                            sanitacionJ:sanitacionId,
                            detalleSanitacionInsumoJ: detalleSanitacionInsumo,
                            selectJ: insumoQ
            });    
    }else {
      res.send(401, 'No se Eencontraron Sanitaciones');
    }
  }, function (error) {
    res.send('Detalle Sanitacion no encontrado');
    }
  );
};
// POST /detalleSanitacionInsumo
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var cantidadUtilizada = req.body.cantidadUtilizada; 
  var InsumoIdInsumo = req.body.selectJ;
  var DetalleSanitacionIdDetalleSanitacion = req.body.id;

  var index = Model.DetalleSanitacionInsumo.build({
    cantidadUtilizada: cantidadUtilizada,
    InsumoIdInsumo: InsumoIdInsumo,
    DetalleSanitacionIdDetalleSanitacion: DetalleSanitacionIdDetalleSanitacion
  });

  index.add(function (success) {
    res.redirect('/web/sanitacion');
  },
  function (err) {
    res.send(err);
  });
};
//************************************************
/* Rutas que terminan en /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// router.route('/detalleSanitacionInsumo/:detalleSanitacionInsumoId')
// PUT /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// Actualiza detalleSanitacionInsumo */

exports.update = function (req, res) {
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();

  detalleSanitacionInsumo.cantidadUtilizada = req.body.cantidadUtilizada;
  detalleSanitacionInsumo.InsumoIdInsumo = req.body.insumoSele;

  detalleSanitacionInsumo.updateById(req.params.detalleSanitacionInsumoId, function (success) {
    if (success) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Detalle Sanitacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion Insumo no encontrado');
  });
};

// GET /detalleSanitacionInsumo/:detalleSanitacionInsumoId
// Toma un detalleSanitacionInsumo por id
exports.read = function (req, res) {
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();
  var insumo = Model.Insumo.build();
  insumo.retrieveAll(function (insumo) {
    if (insumo) { 

        detalleSanitacionInsumo.retrieveById(req.params.detalleSanitacionInsumoId, function (detalleSanitacionInsumo) {
          if (detalleSanitacionInsumo) {
            res.render('web/detalleSanitacionInsumo/edit', {
                      detalleSanitacionInsumo:detalleSanitacionInsumo,
                      select: insumo
                    });
          } else {
            res.send(401, 'Detalle Sanitacion Insumo no encontrado');
          }
        }, function (error) {
          res.send('Detalle Sanitacion Insumo no encontrado');
        });
    } else {
      res.send(401, 'No se encontraron insumos');
    }
  }, function (error) {
    console.log(error);
    res.send('desDetalles no encontrado');
  });
};

// DELETE /detalleSanitacionInsumo/detalleSanitacionInsumoId
// Borra el detalleSanitacionInsumoId
exports.delete = function (req, res) {
  var detalleSanitacionInsumo = Model.DetalleSanitacionInsumo.build();

 detalleSanitacionInsumo.removeById(req.params.detalleSanitacionInsumoId, function (detalleSanitacionInsumo) {
    if (detalleSanitacionInsumo) {
      res.redirect('/web/sanitacion');
    } else {
      res.send(401, 'Detalle Sanitacion Insumo no encontrado');
    }
  }, function (error) {
    res.send('Detalle Sanitacion Insumo no encontrado');
  });
};
