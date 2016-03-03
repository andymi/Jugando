'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /proveedor
// router.route('/proveedor') */
exports.getForm = function (req, res) {
  var proveedor = Model.Proveedor.build();
  var ciudad = Model.Ciudad.build();
  ciudad.retrieveAll(function (ciudadQ) {
    console.log('ciudadQ',ciudadQ);
    if (ciudadQ) {
        res.render('web/proveedor/index',{
            proveedor: proveedor,
            selectJ: ciudadQ
        });
    }
  }, function (error) {
    res.send('Proveedor no encontrado');
    }
  );
};

// POST /proveedor
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nombreProveedor = req.body.nombreProveedor;
  var direccionProveedor = req.body.direccionProveedor;
  var rucProveedor = req.body.rucProveedor;
  var tipoProveedor = req.body.tipoProveedor;
  var CiudadIdCiudad = req.body.selectJ;

  var index = Model.Proveedor.build({
    nombreProveedor: nombreProveedor,
    direccionProveedor: direccionProveedor,    
    rucProveedor: rucProveedor,
    tipoProveedor: tipoProveedor,
    CiudadIdCiudad: CiudadIdCiudad
  });

  index.add(function (success) {
     res.redirect('/web/proveedor');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los proveedor)
// GET /proveedor */
exports.listPag = function (req, res) {
  var proveedor = Model.Proveedor.build();
  console.log(req.body);
  proveedor.retrieveAll(function (proveedores) {
    if (proveedores) {
      res.render('web/proveedor/success', { proveedores: proveedores});
    } else {
      res.send(401, 'No se encontraron Proveedores');
    }
  }, function (error) {
    res.send('Proveedor no encontrado');
  });
};
/* Rutas que terminan en /proveedor/:proveedorId
// router.route('/proveedor/:proveedorId')
// PUT /proveedor/:proveedorId
// Actualiza proveedor */
exports.update = function (req, res) {
  var proveedor = Model.Proveedor.build();

  proveedor.nombreProveedor = req.body.nombreProveedor;
  proveedor.direccionProveedor = req.body.direccionProveedor;
  proveedor.rucProveedor = req.body.rucProveedor;
  proveedor.tipoProveedor = req.body.tipoProveedor;
  proveedor.CiudadIdCiudad = req.body.ciudadSele;

  proveedor.updateById(req.params.proveedorId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/proveedor');
      res.redirect('/web/proveedor');
    } else {
      res.send(401, 'Proveedor no encontrado');
    }
  }, function (error) {
    res.send('Proveedor no encontrado');
  });
};
// GET /proveedor/:proveedorId
// Toma un proveedor por id
exports.read = function (req, res) {
  var proveedor = Model.Proveedor.build();
  var ciudad = Model.Ciudad.build();
  ciudad.retrieveAll(function (ciudad) {
    if (ciudad) {
      proveedor.retrieveById(req.params.proveedorId, function (proveedoroq) {
        if (proveedoroq) {
          res.render('web/proveedor/edit', {
                      proveedor:proveedoroq,
                      select: ciudad
                    });
        } else {
          res.send(401, 'arProveedor no encontrado');
        }
      }, function (error) {
        res.send('esProveedor no encontrado',error);
      });
    } else {
      res.send(401, 'No se encontraron Proveedores');
    }
  }, function (error) {
    console.log(error);
    res.send('desProveedor no encontrado');
  });
};

// DELETE /proveedor/proveedorId
// Borra el proveedorId
exports.delete = function (req, res) {
  var proveedor = Model.Proveedor.build();

 proveedor.removeById(req.params.proveedorId, function (proveedor) {
    if (proveedor) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/proveedor');      
    } else {
      res.send(401, 'Proveedor no encontrado');
    }
  }, function (error) {
    res.send('Proveedor no encontrado');
  });
};