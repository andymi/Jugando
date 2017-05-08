'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /servicios
// router.route('/servicios') */

exports.getForm = function (req, res) {
  var servicios = Model.Servicios.build();
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
                  res.render('web/servicios/index',{
                    servicios: servicios,
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

// POST /servicios
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var servicios = req.body.servicios; 

  var index = Model.Servicios.build({
    servicios: servicios
  });

  index.add(function (success) {
    res.redirect('/web/servicios');
  },
  function (err) {
    res.send(err);
  });
};

exports.listPag = function (req, res) {
  var servicio = Model.Servicios.build();
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
          servicio.retrieveAll(function (result) {
            if (result) {
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
                      res.render('web/servicios/success', { 
                        service: result,
                        mensajes: mensaje1,
                        alarmas1: alarma1,
                        alarmas2: alarma2,
                        mensajeria: mensaje2,
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
              res.send(401, 'No se encontraron Proveedores');
            }
          }, function (error) {
            res.send('Servicios no encontrado');
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
/* Rutas que terminan en /servicios/:serviciosId
// router.route('/servicios/:serviciosId')
// PUT /servicios/:serviciosId
// Actualiza servicios */

exports.update = function (req, res) {
  var servicios = Model.Servicios.build();

  servicios.servicios = req.body.servicios;

  servicios.updateById(req.params.serviciosId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/servicios');
      res.redirect('/web/servicios');
    } else {
      res.send(401, 'Servicios no encontrado');
    }
  }, function (error) {
    res.send('Servicios no encontrado');
  });
};

// GET /servicios/:serviciosId
// Toma un servicios por id
exports.read = function (req, res) {
  var servicios = Model.Servicios.build();
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
          servicios.retrieveById(req.params.serviciosId, function (serviciosoq) {
            if (serviciosoq) {
              console.log('dentro de editar:*****************');
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
                      res.render('web/servicios/edit', {
                        servicios:serviciosoq,
                        mensajes: mensaje1,
                        alarmas1: alarma1,
                        alarmas2: alarma2,
                        mensajeria: mensaje2,
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
              res.send(401, 'Servicios no encontrado');
            }
          }, function (error) {
            res.send('Servicios no encontrado');
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

// DELETE /servicios/serviciosId
// Borra el serviciosId
exports.delete = function (req, res) {
  var servicios = Model.Servicios.build();

 servicios.removeById(req.params.serviciosId, function (servicios) {
    if (servicios) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/servicios');
    } else {
      res.send(401, 'Servicios no encontrado');
    }
  }, function (error) {
    res.send('Servicios no encontrado');
  });
};
