'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /herramienta
// router.route('/herramienta') */

exports.getForm = function (req, res) {
  var herramienta = Model.Herramienta.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');            
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) {  
                  console.log(req.body);
                  var usuario = req.session.user.usuario;
                  var pass = req.session.user.pass;
                  var fechaCreacion = req.session.user.fechaCreacion;                  
                  res.render('web/herramienta/index',{
                    herramienta: herramienta,
                    mensajes: mensaje1,
                    mensajeria: mensaje2,
                    alarmas1: alarma1,
                    alarmas2: alarma2,
                    usuarios: usuario,
                    passs: pass,
                    fechaCreacions: fechaCreacion
                  });
                }else {
                  res.send(401, 'No se encontraron Alarmas');
                }
              }, function (error) {
                res.send('Alarma no encontrado');
              });
            } else {
              res.send(401, 'No se encontraron Alarmas');
            }
          }, function (error) {
            res.send('Alarma no encontrado');
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

// POST /herramienta
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nombre = req.body.nombre;
  var vidaUtil = req.body.vidaUtil;
  var mantenimiento = req.body.mantenimiento; 

  var index = Model.Herramienta.build({
    nombre: nombre,
    vidaUtil: vidaUtil,
    mantenimiento: mantenimiento
  });

  index.add(function (success) {
    res.redirect('/web/herramienta');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los herramienta)
// GET /herramienta */
exports.listPag = function (req, res) {
  var herramienta = Model.Herramienta.build();
  console.log(req.body);
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');              
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          herramienta.retrieveAll(function (herramientas) {
            if (herramientas) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body); 
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;                 
                      res.render('web/herramienta/success', { 
                        herramientas: herramientas,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2,
                        usuarios: usuario,
                        passs: pass,
                        fechaCreacions: fechaCreacion
                      });
                    }else {
                      res.send(401, 'No se encontraron Alarmas');
                    }
                  }, function (error) {
                    res.send('Alarma no encontrado');
                  });
                } else {
                  res.send(401, 'No se encontraron Alarmas');
                }
              }, function (error) {
                res.send('Alarma no encontrado');
              });              
            } else {
              res.send(401, 'No se encontraron Herramientas');
            }
          }, function (error) {
            res.send('Raza no encontrado');
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
/* Rutas que terminan en /herramientas/:herramientaId
// router.route('/herramientas/:herramientaId')
// PUT /herramientas/:herramientaId
// Actualiza herramientas */

exports.update = function (req, res) {
  var herramienta = Model.Herramienta.build();

  herramienta.nombre = req.body.nombre;
  herramienta.vidaUtil = req.body.vidaUtil;
  herramienta.mantenimiento = req.body.mantenimiento;

  herramienta.updateById(req.params.herramientaId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/herramienta');
      res.redirect('/web/herramienta');
    } else {
      res.send(401, 'Herramienta no encontrado');
    }
  }, function (error) {
    res.send('Herramienta no encontrado');
  });
};

// GET /herramienta/:herramientaId
// Toma un herramienta por id
exports.read = function (req, res) {
  var herramienta = Model.Herramienta.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');              
  }
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          herramienta.retrieveById(req.params.herramientaId, function (herramientaoq) {
            if (herramientaoq) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body); 
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;                 
                      console.log('dentro de editar:*****************');
                      res.render('web/herramienta/edit', {
                        herramienta:herramientaoq,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2,
                        usuarios: usuario,
                        passs: pass,
                        fechaCreacions: fechaCreacion
                      });
                    }else {
                      res.send(401, 'No se encontraron Alarmas');
                    }
                  }, function (error) {
                    res.send('Alarma no encontrado');
                  });
                } else {
                  res.send(401, 'No se encontraron Alarmas');
                }
              }, function (error) {
                res.send('Alarma no encontrado');
              });              
            } else {
              res.send(401, 'Herramienta no encontrado');
            }
          }, function (error) {
            res.send('Herramienta no encontrado');
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

// DELETE /herramienta/herramientaId
// Borra el herramientaId
exports.delete = function (req, res) {
  var herramienta = Model.Herramienta.build();

 herramienta.removeById(req.params.herramientaId, function (herramienta) {
    if (herramienta) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/herramienta');
    } else {
      res.send(401, 'Herramienta no encontrado');
    }
  }, function (error) {
    res.send('Herramienta no encontrado');
  });
};
