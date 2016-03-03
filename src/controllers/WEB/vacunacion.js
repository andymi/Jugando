'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /vacunacion
// router.route('/vacunacion') */
exports.getForm = function (req, res) {
  var proveedor = Model.Proveedor.build();
  var vacunacion = Model.Vacunacion.build();
  proveedor.retrieveAll(function (proveedorQ) {
    console.log('proveedorQ',proveedorQ);
    if (proveedorQ) {
        res.render('web/vacunacion/index', {
                vacunacionJ: vacunacion,
                selectJ: proveedorQ
        });
      }
  },function (error) {
    res.send('Vacunacion no encontrado');
  }
  );    
};
// POST /vacunacion
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaVacunacion = req.body.fechaVacunacion;
  var horaVacunacion = req.body.horaVacunacion;
  var costoVacunacion = req.body.costoVacunacion; 
  var ProveedorIdProveedor = req.body.selectJ;

  var index = Model.Vacunacion.build({
    fechaVacunacion : fechaVacunacion,
    horaVacunacion: horaVacunacion,    
    costoVacunacion : costoVacunacion,
    ProveedorIdProveedor: ProveedorIdProveedor
  });

  index.add(function (success) {
    res.redirect('/web/detalleVacunacion/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los vacunacion)
// GET /vacunacion */

exports.listPag = function (req, res) {
  var vacunacion = Model.Vacunacion.build();
  console.log('request body',req.body);
  vacunacion.retrieveAll(function (vacunacion) {
    if (vacunacion) {      
      res.render('web/vacunacion/success', { vacunacion: vacunacion});
      console.log('soy vacunacion retrieveAll',vacunacion);
    } else {
      res.send(401, 'No se encontraron Pesajes');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
};


/* Rutas que terminan en /vacunacion/:vacunacionId
// router.route('/vacunacion/:vacunacionId')
// PUT /vacunacion/:vacunacionId
// Actualiza vacunacion */
exports.update = function (req, res) {
  var vacunacion = Model.Vacunacion.build();

  vacunacion.fechaVacunacion = req.body.fechaVacunacion;
  vacunacion.horaVacunacion = req.body.horaVacunacion;  
  vacunacion.costoVacunacion = req.body.costoVacunacion;
  vacunacion.ProveedorIdProveedor = req.body.proveedorSele;

  vacunacion.updateById(req.params.vacunacionId, function (success) {
    if (success) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
};

// GET /vacunacion/:vacunacionId
// Toma un vacunacion por id
exports.read = function (req, res) {
  var vacunacion = Model.Vacunacion.build();
  var proveedor = Model.Proveedor.build();

  proveedor.retrieveAll(function (proveedor) {
    if (proveedor) {

      vacunacion.retrieveById(req.params.vacunacionId, function (vacunacion) {
        if (vacunacion) {
          res.render('web/vacunacion/edit', {
                      vacunacion:vacunacion,
                      select: proveedor
                    });
        } else {
          res.send(401, 'Vacunacion no encontrado');
        }
      }, function (error) {
        res.send('Vacunacion no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Vacunaciones');
    }
  }, function (error) {
    console.log(error);
    res.send('Vacunacion no encontrado');
  });
};


exports.listPag1 = function (req, res) {
  var vacunacion = Model.Vacunacion.build();
  vacunacion.retrieveVerId(req.params.id, function (vacunacionQ) {
    if (vacunacionQ) {
      res.render('web/detalleVacunacion/success', {
                  vacunacion:vacunacionQ
                });
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado',error);
  });
};

exports.listPag2 = function (req, res) {
  var vacunacion = Model.Vacunacion.build();
  vacunacion.retrieveVerId(req.params.id, function (vacunacionQ) {
    if (vacunacionQ) {
      res.render('web/detalleVacunacionInsumo/success', {
                  vacunacion:vacunacionQ
                });
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado',error);
  });
};
// DELETE /vacunacion/vacunacionId
// Borra el vacunacionId
exports.delete = function (req, res) {
  var vacunacion = Model.Vacunacion.build();

 vacunacion.removeById(req.params.vacunacionId, function (vacunacion) {
    if (vacunacion) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
};
