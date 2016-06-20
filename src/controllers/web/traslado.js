'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /traslado
// router.route('/traslado') */
exports.getForm = function (req, res) {
  var empleado = Model.Empleado.build();
  var facturaCompra = Model.FacturaCompra.build();
  var traslado = Model.Traslado.build();
  var ciudad = Model.Ciudad.build();
  ciudad.retrieveAll(function (ciudadQ) {
    console.log('ciudadQ',ciudadQ);
    if (ciudadQ) {
      facturaCompra.retrieveAll(function (facturaCompraq) {
      console.log('facturaCompraq',facturaCompraq);
      if (facturaCompraq) {
        empleado.retrieveAll(function (empleadoQ) {
        console.log('empleadoQ',empleadoQ);
        if (empleadoQ) {
          res.render('web/traslado/index', {
            trasladoJ: traslado,            
            selectJ: ciudadQ,
            selectk: empleadoQ,
            selectN: facturaCompraq
          });
        }
        },function (error) {
          res.send('Traslado no encontrado');
        }); 
        }
        },function (error) {
            res.send('Traslado no encontrado');
        }); 
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
};
// POST /traslado
exports.create =  function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaTraslado = req.body.fechaTraslado;
  var nombreConductor = req.body.nombreConductor;
  var cedulaConductor = req.body.cedulaConductor;
  var cantidadAnimal = req.body.cantidadAnimal;
  var numeroRUA = req.body.numeroRUA;
  var marcaAuto = req.body.marcaAuto;
  var CiudadIdCiudad = req.body.select;
  var EmpleadoIdEmpleado = req.body.selectJ;
  var FacturaCompraIdCompra = req.body.selectN;

  var index = Model.Traslado.build({
    fechaTraslado: fechaTraslado,
    nombreConductor: nombreConductor,    
    cedulaConductor: cedulaConductor,
    cantidadAnimal: cantidadAnimal,
    numeroRUA: numeroRUA,
    marcaAuto: marcaAuto,
    CiudadIdCiudad: CiudadIdCiudad,
    EmpleadoIdEmpleado:EmpleadoIdEmpleado,
    FacturaCompraIdCompra: FacturaCompraIdCompra
  });

  index.add(function (success) {
    res.redirect('/web/detalleTraslado/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los traslado)
// GET /traslado */
exports.listPag = function (req, res) {
  var traslado =Model.Traslado.build();
  console.log('request body',req.body);
  traslado.retrieveAll(function (traslado) {
    if (traslado) {      
      res.render('web/traslado/success', { traslado: traslado});
      console.log('soy traslado retrieveAll',traslado);
    } else {
      res.send(401, 'No se encontraron Traslados');
    }
  }, function (error) {
    res.send('Traslado no encontrado');
  });
};

/* Rutas que terminan en /traslado/:trasladoId
// router.route('/traslado/:trasladoId')
// PUT /traslado/:trasladoId
// Actualiza traslado */

exports.update = function (req, res) {
  var traslado = Model.Traslado.build();

  traslado.fechaTraslado = req.body.fechaTraslado;
  traslado.nombreConductor = req.body.nombreConductor;
  traslado.cedulaConductor = req.body.cedulaConductor;
  traslado.cantidadAnimal = req.body.cantidadAnimal;
  traslado.numeroRUA = req.body.numeroRUA;
  traslado.marcaAuto = req.body.marcaAuto;
  traslado.CiudadIdCiudad = req.body.ciudadSele;
  traslado.EmpleadoIdEmpleado = req.body.empleadoSele;
  traslado.FacturaCompraIdCompra = req.body.compraSele;

  traslado.updateById(req.params.trasladoId, function (success) {
    if (success) {
      res.redirect('/web/traslado');
    } else {
      res.send(401, 'Traslado no encontrado');
    }
  }, function (error) {
    res.send('Traslado no encontrado');
  });
};

// GET /traslado/:trasladoId
// Toma un traslado por id
exports.read = function (req, res) {
  var traslado = Model.Traslado.build();
  var empleado = Model.Empleado.build();
  var facturaCompra = Model.FacturaCompra.build();
  var ciudad =Model.Ciudad.build();
  ciudad.retrieveAll(function (ciudad) {
    if (ciudad) {
      facturaCompra.retrieveAll(function (facturaCompra) {
        if (facturaCompra) {
            empleado.retrieveAll(function (empleado) {
              if (empleado) {
                  traslado.retrieveById(req.params.trasladoId, function (traslado) {
                  if (traslado) {
                    res.render('web/traslado/edit', {
                          traslado:traslado,
                          select: ciudad,
                          selectJ: empleado,
                          selectN: facturaCompra
                    });
                  } else {
                    res.send(401, 'Traslado no encontrado');
                  }
                }, function (error) {
                  res.send('Traslado no encontrado');
                });
              } else {
                res.send(401, 'No se encontraron empleados');
              }
            }, function (error) {
              console.log(error);
              res.send('desempleados no encontrado');
            });
        } else {
          res.send(401, 'No se encontraron facturaCompra');
        }
      }, function (error) {
        console.log(error);
        res.send('desproveedor no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron ciudades');
    }
  }, function (error) {
    console.log(error);
    res.send('desProveedor no encontrado');
  });
};

exports.readId = function (req, res) {
  var traslado = Model.Traslado.build();
  traslado.retrieveVerId(req.params.id, function (trasladoQ) {
    if (trasladoQ) {
      res.render('web/detalleTraslado/success', {
                  traslado:trasladoQ
                });
    } else {
      res.send(401, 'arTraslado no encontrado');
    }
  }, function (error) {
    res.send('esTraslado no encontrado',error);
  });
};

// DELETE /traslado/trasladoId
// Borra el trasladoId
exports.delete = function (req, res) {
  var traslado = Model.Traslado.build();

 traslado.removeById(req.params.trasladoId, function (traslado) {
    if (traslado) {
      res.redirect('/web/traslado');
    } else {
      res.send(401, 'Traslado no encontrado');
    }
  }, function (error) {
    res.send('Traslado no encontrado');
  });
};
