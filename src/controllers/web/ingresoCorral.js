'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /ingresoCorral
// router.route('/ingresoCorral') */
exports.getForm = function (req, res) {
  var ingresoCorral = Model.IngresoCorral.build();
  var empleado = Model.Empleado.build();
  empleado.retrieveAll(function (empleadoQ) {
    console.log('empleadoQ',empleadoQ);

    if (empleadoQ) {
        res.render('web/ingresoCorral/index', {
            ingresoCorralJ: ingresoCorral,
            selectJ: empleadoQ
        });
    }
  }, function (error) {
    res.send('Usuario no encontrado');
    }
  );
};
// POST /ingresoCorral
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaIngreso = req.body.fechaIngreso;  
  var horaIngreso = req.body.horaIngreso;
  var observacionIngreso = req.body.observacionIngreso;
  var EmpleadoIdEmpleado=  req.body.selectJ;

  var index = Model.IngresoCorral.build({
    fechaIngreso: fechaIngreso,
    horaIngreso: horaIngreso,
    observacionIngreso: observacionIngreso,
    EmpleadoIdEmpleado: EmpleadoIdEmpleado
  });

  index.add(function (success) {
    res.redirect('/web/ingresoCorral');
  },
  function (err) {
    res.send(err);
  });
};

exports.listPag = function (req, res) {
  var ingresoCorral = Model.IngresoCorral.build();
  console.log('dentro de get /',req.body);
  ingresoCorral.retrieveAll(function (ingresoCorrales) {
    if (ingresoCorrales) {
      res.render('web/ingresoCorral/success', { ingresoCorrales: ingresoCorrales});
    } else {
      res.send(401, 'No se encontraron Ingresos');
    }
  }, function (error) {
    res.send('IngresoCorral no encontrado');
  });
};

/* Rutas que terminan en /ingresoCorral/:ingresoCorralId
// router.route('/ingresoCorral/:ingresoCorralId')
// PUT /ingresoCorral/:ingresoCorralId
// Actualiza ingresoCorral */

exports.update = function (req, res) {
  var ingresoCorral = Model.IngresoCorral.build();

  ingresoCorral.fechaIngreso = req.body.fechaIngreso;
  ingresoCorral.horaIngreso = req.body.horaIngreso;
  ingresoCorral.observacionIngreso = req.body.observacionIngreso;  
  ingresoCorral.EmpleadoIdEmpleado = req.body.empleadoSele;

  ingresoCorral.updateById(req.params.ingresoCorralId, function (success) {
    if (success) {
      res.redirect('/web/ingresoCorral');
    } else {
      res.send(401, 'IngresoCorral no encontrado');
    }
  }, function (error) {
    res.send('IngresoCorral no encontrado');
  });
};

// GET /ingresoCorral/:ingresoCorralId
// Toma un ingresoCorral por id
exports.read = function (req, res) {
  var ingresoCorral = Model.IngresoCorral.build();
  var empleado = Model.Empleado.build();
  empleado.retrieveAll(function (empleado) {
    if (empleado) {
        console.log('dentro de empleado',empleado);
        ingresoCorral.retrieveById(req.params.ingresoCorralId, function (ingresoCorralq) {
          console.log('dentro de ingresoCorral',ingresoCorralq);
          if (ingresoCorralq) {
            res.render('web/ingresoCorral/edit', {
                      ingresoCorral:ingresoCorralq,
                      select: empleado
                    });
          } else {
            res.send(401, 'IngresoCorral no encontrado');
          }
        }, function (error) {
          res.send('IngresoCorralES no encontrado');
        });

    } else {
      res.send(401, 'No se encontraron Ciudades');
    }
  }, function (error) {
    console.log(error);
    res.send('desCiudad no encontrado');
  });
};

// DELETE /ingresoCorral/ingresoCorralId
// Borra el ingresoCorralId
exports.delete = function (req, res) {
  var ingresoCorral = Model.IngresoCorral.build();

 ingresoCorral.removeById(req.params.ingresoCorralId, function (ingresoCorral) {
    if (ingresoCorral) {
      res.redirect('/web/ingresoCorral');
    } else {
      res.send(401, 'IngresoCorral no encontrado');
    }
  }, function (error) {
    res.send('IngresoCorral no encontrado');
  });
};
