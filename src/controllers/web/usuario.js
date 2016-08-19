'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /usuario
// router.route('/usuario') */
exports.getForm = function (req, res) {
  var nivel = Model.Nivel.build();
  var usuario = Model.Usuario.build();
  var empleado = Model.Empleado.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          nivel.retrieveAll(function (nivelesQ) {
            if (nivelesQ) {
              empleado.retrieveAll(function (empleadosQ) {
                 if (empleadosQ) {
              
                  res.render('web/usuario/index', {
                      usuarioJ: usuario,
                      selectJ: nivelesQ,
                      selectJN: empleadosQ,
                      mensajes: mensaje1,
                      mensajeria: mensaje2
                    });
                }

              }, function (error) {
                res.send('Usuario no encontrado');
              }
              );
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
// POST /usuario
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var usuario = req.body.usuario;
  var pass = req.body.pass; 
  var NivelIdNivel = req.body.selectJ; 
  var EmpleadoIdEmpleado = req.body.selectJN;

  console.log('soy post usuario',usuario);
  console.log('soy post pass',pass);
  console.log('soy post NivelIdNivel',NivelIdNivel);

  var index = Model.Usuario.build({
    usuario: usuario,
    pass: pass,
    NivelIdNivel: NivelIdNivel,
    EmpleadoIdEmpleado: EmpleadoIdEmpleado
  });

  index.add(function (success) {
     res.redirect('/web/usuario');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los usuario)
// GET /usuario */
exports.listPag = function (req, res) {
  var usuario = Model.Usuario.build();
  console.log('request body',req.body);
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          usuario.retrieveAll(function (usuarios) {
            if (usuarios) {              
              res.render('web/usuario/success', { 
                usuarios: usuarios,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Usuarios');
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
/* Rutas que terminan en /usuario/:usuarioId
// router.route('/usuario/:usuarioId')
// PUT /usuario/:usuarioId
// Actualiza usuario */
exports.update = function (req, res) {
  var usuario = Model.Usuario.build();

  usuario.usuario = req.body.usuario;
  usuario.pass = req.body.pass;
  usuario.NivelIdNivel = req.body.nivelSele;
  usuario.EmpleadoIdEmpleado = req.body.nivelSeleN;

  usuario.updateById(req.params.usuarioId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/usuario');
      res.redirect('/web/usuario');
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
};
// GET /usuario/:usuarioId
// Toma un usuario por id
exports.read = function (req, res) {
  var usuario = Model.Usuario.build();
  var nivel = Model.Nivel.build();
  var empleado = Model.Empleado.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          nivel.retrieveAll(function (niveles) {
            if (niveles) {
              empleado.retrieveAll(function (empleados) {
                if (empleados) {      
                  usuario.retrieveById(req.params.usuarioId, function (usuarioq) {
                    if (usuarioq) {
                      res.render('web/usuario/edit', {
                                  usuario:usuarioq,
                                  select: niveles,
                                  selectN: empleados,
                                  mensajes: mensaje1,
                                  mensajeria: mensaje2
                                });
                    } else {
                      res.send(401, 'Usuario no encontrado');
                    }
                  }, function (error) {
                    res.send('Usuario no encontrado');
                  });
                } else {
                  res.send(401, 'No se encontraron Usuario');
                }
              }, function (error) {
                console.log(error);
                res.send('Usuario no encontrado');
              });
            } else {
              res.send(401, 'No se encontraron Usuario');
            }
          }, function (error) {
            console.log(error);
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
// DELETE /usuario/usuarioId
// Borra el usuarioId
exports.delete =  function (req, res) {
  var usuario = Model.Usuario.build();

 usuario.removeById(req.params.usuarioId, function (usuario) {
    if (usuario) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/usuario');
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
};
