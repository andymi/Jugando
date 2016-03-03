'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');
/* Rutas que terminan en /empleado
// router.route('/empleado') */
exports.getForm = function (req, res) {
  var empleado = Model.Empleado.build();
  var ciudad = Model.Ciudad.build();
  ciudad.retrieveAll(function (ciudadQ) {
    console.log('ciudadQ',ciudadQ);
    if (ciudadQ) {
        res.render('web/empleado/index',{
            selectJ: ciudadQ,
            empleado: empleado
        });
    }
  }, function (error) {
    res.send('Usuario no encontrado');
    }
  );
};
// POST /empleado
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nombreEmpleado = req.body.nombreEmpleado;
  var codigoLlave = req.body.codigoLlave;
  var direccionEmpleado = req.body.direccionEmpleado;
  var cedulaEmpleado = req.body.cedulaEmpleado;
  var estadoEmpleado = req.body.estadoEmpleado;
  var CiudadIdCiudad = req.body.selectJ;

  var index = Model.Empleado.build({
    nombreEmpleado: nombreEmpleado,
    codigoLlave: codigoLlave,
    direccionEmpleado: direccionEmpleado,    
    cedulaEmpleado: cedulaEmpleado,
    estadoEmpleado: estadoEmpleado,
    CiudadIdCiudad: CiudadIdCiudad
  });

  index.add(function (success) {
    res.redirect('/web/empleado');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los empleado)
// GET /empleado */
exports.listPag = function (req, res) {
  var empleado = Model.Empleado.build();
  console.log(req.body);
  empleado.retrieveAll(function (empleados) {
    if (empleados) {
      res.render('web/empleado/success', { empleados: empleados});
    } else {
      res.send(401, 'No se encontraron Empleados');
    }
  }, function (error) {
    res.send('Empleado no encontrado');
  });
};
/* Rutas que terminan en /empleado/:empleadoId
// router.route('/empleado/:empleadoId')
// PUT /empleado/:empleadoId
// Actualiza empleado */

exports.update = function (req, res) {
  var empleado = Model.Empleado.build();

  empleado.nombreEmpleado = req.body.nombreEmpleado;
  empleado.codigoLlave = req.body.codigoLlave;
  empleado.direccionEmpleado = req.body.direccionEmpleado;
  empleado.cedulaEmpleado = req.body.cedulaEmpleado;
  empleado.estadoEmpleado = req.body.estadoEmpleado;
  empleado.CiudadIdCiudad = req.body.ciudadSele;

  empleado.updateById(req.params.empleadoId, function (success) {
    if (success) {
      //res.json({ message: 'Empleado actualizado!' });
      console.log('redirigiendo a /web/empleado');
      res.redirect('/web/empleado');
    } else {
      res.send(401, 'Empleado no encontrado');
    }
  }, function (error) {
    res.send('Empleado no encontrado');
  });
};

// GET /empleado/:empleadoId
// Toma un empleado por id
exports.read = function (req, res) {
  var empleado = Model.Empleado.build();
  var ciudad = Model.Ciudad.build();
  console.log('editar:*****************');
  console.log(req.params);
  
  ciudad.retrieveAll(function (ciudad) {
    if (ciudad) {
      empleado.retrieveById(req.params.empleadoId, function (empleadooq) {
        if (empleadooq) {
          res.render('web/empleado/edit', {
                      empleado:empleadooq,
                      select: ciudad
                    });
        } else {
          res.send(401, 'arEmpleado no encontrado');
        }
      }, function (error) {
        res.send('esEmpleado no encontrado',error);
      });
    } else {
      res.send(401, 'No se encontraron Empleados');
    }
  }, function (error) {
    console.log(error);
    res.send('desEmpleado no encontrado');
  });
};

// DELETE /empleado/empleadoId
// Borra el empleadoId
exports.delete = function (req, res) {
  var empleado = Model.Empleado.build();

 empleado.removeById(req.params.empleadoId, function (empleado) {
    if (empleado) {
      //res.json({ message: 'Empleado borrado!' });
      console.log('dentro de borrar:*****************');
      res.redirect('/web/empleado');
    } else {
      res.send(401, 'Empleado no encontrado');
    }
  }, function (error) {
    res.send('Empleado no encontrado');
  });
};
