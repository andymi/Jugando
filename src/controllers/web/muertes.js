'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /muertes
// router.route('/muertes') */
exports.getForm = function (req, res) {
  var empleado = Model.Empleado.build();
  var proveedor = Model.Proveedor.build();
  var muertes = Model.Muertes.build();
  proveedor.retrieveAll(function (proveedorQ) {
    console.log('proveedorQ',proveedorQ);
    if (proveedorQ) {
      empleado.retrieveAll(function (empleadoQ) {
        console.log('empleadoQ',empleadoQ);

        if (empleadoQ) {
            res.render('web/muertes/index', {
                    muertesJ: muertes,
                    selectJ: empleadoQ,
                    selectN: proveedorQ
            });
        }

      },function (error) {
        res.send('Muertes no encontrado');
      }
      ); 
    }
    },function (error) {
        res.send('Muertes no encontrado');
    }); 
};
// POST /muertes
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaMuerte = req.body.fechaMuerte;
  var horaMuerte = req.body.horaMuerte;
  var EmpleadoIdEmpleado = req.body.selectJ;
  var ProveedorIdProveedor = req.body.selectN; 

  var index = Model.Muertes.build({
    fechaMuerte: fechaMuerte,
    horaMuerte: horaMuerte,    
    EmpleadoIdEmpleado: EmpleadoIdEmpleado,
    ProveedorIdProveedor: ProveedorIdProveedor
  });

  index.add(function (success) {
    res.redirect('/web/detalleMuerte/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los muertes)
// GET /muertes */
exports.listPag = function (req, res) {
  var muertes = Model.Muertes.build();
  console.log('request body',req.body);
  muertes.retrieveAll(function (muertes) {
    if (muertes) {      
      res.render('web/muertes/success', {muertes: muertes});
      console.log('soy muertes retrieveAll',muertes);
    } else {
      res.send(401, 'No se encontraron Muertes');
    }
  }, function (error) {
    res.send('Muertes no encontrado');
  });
};
/* Rutas que terminan en /muertes/:muertesId
// router.route('/muertes/:muertesId')
// PUT /muertes/:muertesId
// Actualiza muertes */
exports.update = function (req, res) {
  var muertes =Model.Muertes.build();

  muertes.fechaMuerte = req.body.fechaMuerte;
  muertes.horaMuerte = req.body.horaMuerte;
  muertes.EmpleadoIdEmpleado = req.body.empleadoSele;
  muertes.ProveedorIdProveedor = req.body.proveedorSele;
  
  

  muertes.updateById(req.params.muertesId, function (success) {
    if (success) {
      res.redirect('/web/muertes');
    } else {
      res.send(401, 'Muertes no encontrado');
    }
  }, function (error) {
    res.send('Muertes no encontrado');
  });
};

// GET /muertes/:muertesId
// Toma un muertes por id
exports.read = function (req, res) {
  var muertes = Model.Muertes.build();
  var empleado = Model.Empleado.build();
  var proveedor = Model.Proveedor.build();
  proveedor.retrieveAll(function (proveedor) {
    if (proveedor) {
        empleado.retrieveAll(function (empleado) {
          if (empleado) {
            muertes.retrieveById(req.params.muertesId, function (muertes) {
              if (muertes) {
                res.render('web/muertes/edit', {
                      muertes:muertes,
                      selectJ: empleado,
                      select: proveedor
                    });
              } else {
                res.send(401, 'Muertes no encontrado');
              }
            }, function (error) {
              res.send('Muertes no encontrado');
            });
          } else {
            res.send(401, 'No se encontraron empleados');
          }
        }, function (error) {
          console.log(error);
          res.send('desempleados no encontrado');
        });
    } else {
      res.send(401, 'No se encontraron proveedor');
    }
  }, function (error) {
    console.log(error);
    res.send('desproveedor no encontrado');
  });
};
exports.readId = function (req, res) {
  var muertes = Model.Muertes.build();
  muertes.retrieveVerId(req.params.id, function (muertesQ) {
    if (muertesQ) {
      res.render('web/detalleMuerte/success', {
                  muertes:muertesQ
                });
    } else {
      res.send(401, 'arPesaje no encontrado');
    }
  }, function (error) {
    res.send('esPesaje no encontrado',error);
  });
};
// DELETE /muertes/muertesId
// Borra el muertesId
exports.delete = function (req, res) {
  var muertes = Model.Muertes.build();

 muertes.removeById(req.params.muertesId, function (muertes) {
    if (muertes) {
      res.redirect('/web/muertes');
    } else {
      res.send(401, 'Muertes no encontrado');
    }
  }, function (error) {
    res.send('Muertes no encontrado');
  });
};