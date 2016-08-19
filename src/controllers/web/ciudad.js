'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================


var Model = require('../../models/jugando.js');

/* Rutas que terminan en /ciudad
// router.route('/ciudad') */
exports.getForm = function (req, res) {
  var departamento = Model.Departamento.build();
  var ciudad = Model.Ciudad.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          departamento.retrieveAll(function (departamentoQ) {
            console.log('departamentoQ',departamentoQ);
            if (departamentoQ) {
                res.render('web/ciudad/index', {
                    ciudadJ: ciudad,
                    selectJ: departamentoQ,
                    mensajes: mensaje1,
                    mensajeria: mensaje2
                });
            }
          }, function (error) {
            res.send('Usuario no encontrado');
          });
        }else {
          res.send(401, 'No se encontraron Mensajes');
        }
      }, function (error) {
        res.send('Mensaje no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Mensajes');
    }
  }, function (error) {
    res.send('Mensaje no encontrado');
  });
};
// POST /ciudad
exports.create = function (req, res) {
  console.log(req.body);
  var ciudad = req.body.ciudad;
  var DepartamentoIdDepartamento = req.body.selectJ;

  var index = Model.Ciudad.build({
    ciudad : ciudad,
    DepartamentoIdDepartamento : DepartamentoIdDepartamento
  });

  index.add(function (success) {
    res.redirect('/web/ciudad');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los ciudad)
// GET /ciudad */
exports.listPag = function (req, res) {
  var ciudad = Model.Ciudad.build();
  console.log('dentro de get /',req.body);
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          ciudad.retrieveAll(function (ciudades) {
            if (ciudades) {
              res.render('web/ciudad/success', { 
                ciudades: ciudades,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Ciudades');
            }
          }, function (error) {
            res.send('Ciudad no encontrado');
          });
        }else {
          res.send(401, 'No se encontraron Mensajes');
        }
      }, function (error) {
        res.send('Mensaje no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Mensajes');
    }
  }, function (error) {
    res.send('Mensaje no encontrado');
  });
};
/* Rutas que terminan en /ciudad/:ciudadId
// router.route('/ciudad/:ciudadId')
// PUT /ciudad/:ciudadId
// Actualiza ciudad */
exports.update = function (req, res) {
  var ciudad = Model.Ciudad.build();
  console.log('dentro del put');
  ciudad.ciudad = req.body.ciudad;
  ciudad.DepartamentoIdDepartamento = req.body.departamentoSele;
  console.log('soy ciudad.ciudad',ciudad.ciudad);
  console.log('soy ciudad.DepartamentoIdDepartamento',ciudad.DepartamentoIdDepartamento);

  ciudad.updateById(req.params.ciudadId, function (success) {
    if (success) {
      //res.json({ message: 'Ciudad actualizado!' });
      res.redirect('/web/ciudad');
    } else {
      res.send(401, 'Ciudad no encontrado');
    }
  }, function (error) {
    res.send('Ciudad no encontrado');
  });
};
// GET /ciudad/:ciudadId
// Toma un ciudad por id
exports.read = function (req, res) {
  var departamento = Model.Departamento.build();
  var ciudad = Model.Ciudad.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          departamento.retrieveAll(function (departamento) {
            if (departamento) {
              ciudad.retrieveById(req.params.ciudadId, function (ciudadq) {
                if (ciudadq) {
                  res.render('web/ciudad/edit', {
                              ciudad:ciudadq,
                              select: departamento,
                              mensajes: mensaje1,
                              mensajeria: mensaje2
                            });
                } else {
                  res.send(401, 'arCiudad no encontrado');
                }
              }, function (error) {
                res.send('esCiudad no encontrado',error);
              });
            } else {
              res.send(401, 'No se encontraron Ciudades');
            }
          }, function (error) {
            console.log(error);
            res.send('desCiudad no encontrado');
          });
        }else {
          res.send(401, 'No se encontraron Mensajes');
        }
      }, function (error) {
        res.send('Mensaje no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Mensajes');
    }
  }, function (error) {
    res.send('Mensaje no encontrado');
  });
};
// DELETE /ciudad/ciudadId
// Borra el ciudadId
exports.delete = function (req, res) {
  var ciudad = Model.Ciudad.build();

 ciudad.removeById(req.params.ciudadId, function (ciudad) {
    if (ciudad) {
      //res.json({ message: 'Ciudad borrado!' });
      res.redirect('/web/ciudad');
    } else {
      res.send(401, 'Ciudad no encontrado');
    }
  }, function (error) {
    res.send('Ciudad no encontrado');
  });
};
