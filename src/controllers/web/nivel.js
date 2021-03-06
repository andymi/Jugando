'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /nivel
// router.route('/nivel') */

exports.getForm =  function (req, res) {
  var nivel = Model.Nivel.build();
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
                  res.render('web/nivel/index',{
                    nivel: nivel,
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

// POST /nivel
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nivel = req.body.nivel; 

  var index = Model.Nivel.build({
    nivel: nivel
  });

  index.add(function (success) {
    res.redirect('/web/nivel');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los nivel)
// GET /nivel */


exports.listPag =  function (req, res) {
  var nivel = Model.Nivel.build();
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
          nivel.retrieveAll(function (niveles) {
            if (niveles) {
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
                      res.render('web/nivel/success', { 
                        niveles: niveles,
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
              res.send(401, 'No se encontraron Niveles');
            }
          }, function (error) {
            res.send('Nivel no encontrado');
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
/* Rutas que terminan en /nivel/:nivelId
// router.route('/nivel/:nivelId')
// PUT /nivel/:nivelId
// Actualiza nivel */

exports.update =  function (req, res) {
  var nivel = Model.Nivel.build();

  nivel.nivel = req.body.nivel;

  nivel.updateById(req.params.nivelId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/nivel');
      res.redirect('/web/nivel');
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};

// GET /nivel/:nivelId
// Toma un nivel por id
exports.read = function (req, res) {
  var nivel = Model.Nivel.build();
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
          nivel.retrieveById(req.params.nivelId, function (niveloq) {
            if (niveloq) {
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
                      res.render('web/nivel/edit', {
                        nivel:niveloq,
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
              res.send(401, 'Nivel no encontrado');
            }
          }, function (error) {
            res.send('Nivel no encontrado');
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

// DELETE /nivel/nivelId
// Borra el nivelId
exports.delete = function (req, res) {
  var nivel = Model.Nivel.build();

 nivel.removeById(req.params.nivelId, function (nivel) {
    if (nivel) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/nivel');
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};
