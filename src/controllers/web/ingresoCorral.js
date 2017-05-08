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
          console.log(req.body);  
          alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) {  
                  console.log(req.body);                  
                  empleado.retrieveAll(function (empleadoQ) {
                    console.log('empleadoQ',empleadoQ);
                    if (empleadoQ) {
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;
                      res.render('web/ingresoCorral/index', {
                          ingresoCorralJ: ingresoCorral,
                          selectJ: empleadoQ,
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
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
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
                  ingresoCorral.retrieveAll(function (ingresoCorrales) {
                    if (ingresoCorrales) {
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;
                          res.render('web/ingresoCorral/success', { 
                            ingresoCorrales: ingresoCorrales,
                            mensajes: mensaje1,
                            mensajeria: mensaje2,
                            alarmas1: alarma1,
                            alarmas2: alarma2,
                            usuarios: usuario,
                            passs: pass,
                            fechaCreacions: fechaCreacion
                          });
                    } else {
                      res.send(401, 'No se encontraron Ingresos');
                    }
                  }, function (error) {
                    res.send('IngresoCorral no encontrado');
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
                  empleado.retrieveAll(function (empleado) {
                    if (empleado) {
                      console.log('dentro de empleado',empleado);
                      ingresoCorral.retrieveById(req.params.ingresoCorralId, function (ingresoCorralq) {
                        console.log('dentro de ingresoCorral',ingresoCorralq);
                        if (ingresoCorralq) {
                          var usuario = req.session.user.usuario;
                          var pass = req.session.user.pass;
                          var fechaCreacion = req.session.user.fechaCreacion;
                            res.render('web/ingresoCorral/edit', {
                                ingresoCorral:ingresoCorralq,
                                mensajes: mensaje1,
                                mensajeria: mensaje2,
                                alarmas1: alarma1,
                                alarmas2: alarma2,
                                select: empleado,
                                usuarios: usuario,
                                passs: pass,
                                fechaCreacions: fechaCreacion
                            });
                        } else {
                          res.send(401, 'IngresoCorral no encontrado');
                        }
                      }, function (error) {
                        res.send('IngresoCorralES no encontrado');
                      });
                    } else {
                      res.send(401, 'No se encontraron empleados');
                    }
                  }, function (error) {
                    console.log(error);
                    res.send('Empleado no encontrado');
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
