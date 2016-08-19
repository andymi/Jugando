'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /pesaje
// router.route('/pesaje') */

exports.getForm = function (req, res) {
  var empleado = Model.Empleado.build();
  var pesaje = Model.Pesaje.build();
   //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          empleado.retrieveAll(function (empleadoQ) {
            console.log('empleadoQ',empleadoQ);
            if (empleadoQ) {
                res.render('web/pesaje/index', {
                        pesajeJ: pesaje,
                        selectJ: empleadoQ,
                        mensajes: mensaje1,
                        mensajeria: mensaje2
                });
              }
          },function (error) {
            res.send('Pesaje no encontrado');
          }
          );    
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

exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaPesaje = req.body.fechaPesaje;
  var horaPesaje = req.body.horaPesaje; 
  var EmpleadoIdEmpleado = req.body.selectJ;
  
  var indexA = Model.Pesaje.build({
    fechaPesaje: fechaPesaje,
    horaPesaje: horaPesaje,
    EmpleadoIdEmpleado: EmpleadoIdEmpleado
  });
  indexA.add(function (success) {
    console.log('ya agregue amigo la cabecera'); 
    res.redirect('/web/detallePesaje/cargar');
    //next();
  },function (err) {
    console.log('soy error s',err);
    res.send(err);
  });
};

/* (trae todos los pesaje)
// GET /pesaje */

exports.listPag = function (req, res) {
  var pesaje = Model.Pesaje.build();
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
          pesaje.retrieveAll(function (pesaje) {
            if (pesaje) {      
              res.render('web/pesaje/success', { 
                pesaje: pesaje,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
              console.log('soy pesaje retrieveAll',pesaje);
            } else {
              res.send(401, 'No se encontraron Pesajes');
            }
          }, function (error) {
            res.send('Pesaje no encontrado');
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
/* Rutas que terminan en /pesaje/:pesajeId
// router.route('/pesaje/:pesajeId')
// PUT /pesaje/:pesajeId
// Actualiza pesaje */

exports.update = function (req, res) {
  var pesaje = Model.Pesaje.build();

  pesaje.fechaPesaje = req.body.fechaPesaje;
  pesaje.horaPesaje = req.body.horaPesaje;
  pesaje.EmpleadoIdEmpleado = req.body.empleadoSele;
  

  pesaje.updateById(req.params.pesajeId, function (success) {
    if (success) {
      res.redirect('/web/pesaje');
    } else {
      res.send(401, 'Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Pesaje no encontrado');
  });
};

// GET /pesaje/:pesajeId
// Toma un pesaje por id
exports.read = function (req, res) {
  var pesaje = Model.Pesaje.build();
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
          empleado.retrieveAll(function (empleado) {
            if (empleado) {
              pesaje.retrieveById(req.params.pesajeId, function (pesajeq) {
                if (pesajeq) {
                  res.render('web/pesaje/edit', {
                              pesaje:pesajeq,
                              select: empleado,
                              mensajes: mensaje1,
                              mensajeria: mensaje2
                            });
                } else {
                  res.send(401, 'arPesaje no encontrado');
                }
              }, function (error) {
                res.send('esPesaje no encontrado',error);
              });
            } else {
              res.send(401, 'No se encontraron Pesajes');
            }
          }, function (error) {
            console.log(error);
            res.send('desPesaje no encontrado');
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

exports.readId = function (req, res) {
  var pesaje = Model.Pesaje.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          pesaje.retrieveVerId(req.params.id, function (pesajeq) {
            if (pesajeq) {
              res.render('web/detallePesaje/success', {
                          pesaje:pesajeq,
                          mensajes: mensaje1,
                          mensajeria: mensaje2
                        });
            } else {
              res.send(401, 'arPesaje no encontrado');
            }
          }, function (error) {
            res.send('esPesaje no encontrado',error);
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



// DELETE /pesaje/pesajeId
// Borra el pesajeId
exports.delete = function (req, res) {
  var pesaje = Model.Pesaje.build();

  pesaje.removeById(req.params.pesajeId, function (pesaje) {
    if (pesaje) {
      res.redirect('/web/pesaje');
    } else {
      res.send(401, 'Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Pesaje no encontrado');
  });
};
