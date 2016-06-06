'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /extraviado
// router.route('/extraviado') */
exports.getForm = function (req, res) {
  var empleado = Museo.Empleado.build();
  var extraviado = Museo.Extraviado.build();
  empleado.retrieveAll(function (empleadoQ) {
    console.log('empleadoQ',empleadoQ);
    if (empleadoQ) {
        res.render('web/extraviado/index', {
                extraviadoJ: extraviado,
                selectJ: empleadoQ
        });
      }
  },function (error) {
    res.send('Extraviado no encontrado');
  }
  );    
};
// POST /extraviado
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaExtraviado = req.body.fechaExtraviado;
  var horaExtraviado = req.body.horaExtraviado;
  var lugarExtraviado = req.body.lugarExtraviado;
  var EmpleadoIdEmpleado = req.body.selectJ;

  var index = Museo.Extraviado.build({
    fechaExtraviado: fechaExtraviado,
    horaExtraviado: horaExtraviado,    
    lugarExtraviado: lugarExtraviado,
    cantidadTotal: cantidadTotal,
    EmpleadoIdEmpleado: EmpleadoIdEmpleado
  });

  index.add(function (success) {
    res.redirect('/web/detalleExtraviado/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los extraviado)
// GET /extraviado */
exports.listPag = function (req, res) {
  var extraviado = Museo.Extraviado.build();
  console.log('request body',req.body);
  extraviado.retrieveAll(function (extraviado) {
    if (extraviado) {      
      res.render('web/extraviado/success', { extraviado: extraviado});
      console.log('soy extraviado retrieveAll',extraviado);
    } else {
      res.send(401, 'No se encontraron Pesajes');
    }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });
};

/* Rutas que terminan en /extraviado/:extraviadoId
// router.route('/extraviado/:extraviadoId')
// PUT /extraviado/:extraviadoId
// Actualiza extraviado */

exports.update = function (req, res) {
  var extraviado = Museo.Extraviado.build();

  extraviado.fechaExtraviado = req.body.fechaExtraviado;
  extraviado.horaExtraviado = req.body.horaExtraviado;
  extraviado.lugarExtraviado = req.body.lugarExtraviado;
  extraviado.EmpleadoIdEmpleado = req.body.empleadoSele;
  

  extraviado.updateById(req.params.extraviadoId, function (success) {
    if (success) {
      res.redirect('/web/extraviado');
    } else {
      res.send(401, 'Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });
};

// GET /extraviado/:extraviadoId
// Toma un extraviado por id
exports.read = function (req, res) {
  var extraviado = Museo.Extraviado.build();
  var empleado = Museo.Empleado.build();
  empleado.retrieveAll(function (empleado) {
    if (empleado) {
      extraviado.retrieveById(req.params.extraviadoId, function (extraviado) {
        if (extraviado) {
          res.render('web/extraviado/edit', {
                      extraviado:extraviado,
                      select: empleado
                    });
        } else {
          res.send(401, 'Extraviado no encontrado');
        }
      }, function (error) {
        res.send('Extraviado no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Pesajes');
    }
  }, function (error) {
    console.log(error);
    res.send('desPesaje no encontrado');
  });
};

exports.readId = function (req, res) {
  var extraviado = Museo.Extraviado.build();
  extraviado.retrieveVerId(req.params.id, function (extraviadoq) {
    if (extraviadoq) {
      res.render('web/detalleExtraviado/success', {
                  extraviado:extraviadoq
                });
    } else {
      res.send(401, 'Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Extraviado no encontrado',error);
  });
};
// DELETE /extraviado/extraviadoId
// Borra el extraviadoId
exports.delete = function (req, res) {
  var extraviado = Museo.Extraviado.build();

 extraviado.removeById(req.params.extraviadoId, function (extraviado) {
    if (extraviado) {
      res.redirect('/web/extraviado');
    } else {
      res.send(401, 'Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });
};
