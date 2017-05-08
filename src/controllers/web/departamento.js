'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /departamento
// router.route('/departamento') */

exports.getForm = function (req, res) {
  var index = Model.Departamento.build();
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
                  res.render('web/departamento/index',{
                    index: index,
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

// POST /departamento
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var departamento = req.body.departamento; 

  var index = Model.Departamento.build({
    departamento: departamento
  });

  index.add(function (success) {
    res.redirect('/web/departamento');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los departamento)
// GET /departamento */

exports.listPag = function (req, res) {
  var departamento = Model.Departamento.build();
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
          departamento.retrieveAll(function (departamentos) {
            if (departamentos) {
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
                      res.render('web/departamento/success', { 
                        departamentos: departamentos,
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
              res.send(401, 'No se encontraron Departamentos');
            }
          }, function (error) {
            res.send('Departamento no encontrado');
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


/* Rutas que terminan en /departamento/:departamentoId
// router.route('/departamento/:departamentoId')
// PUT /departamento/:departamentoId
// Actualiza departamento */

exports.update = function (req, res) {
  var departamento =Model.Departamento.build();
  console.log('dentro del put');
  departamento.departamento = req.body.departamento;
  console.log('soy departamento.departamento',departamento.departamento);
  departamento.updateById(req.params.departamentoId, function (success) {
    if (success) {
      //res.json({ message: 'Departamento actualizado!' });
      res.redirect('/web/departamento');
    } else {
      res.send(401, 'Departamento no encontrado');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
};
// GET /departamento/:departamentoId
// Toma un departamento por id
exports.read = function (req, res) {
  var departamento = Model.Departamento.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************ 
  var alarma = Model.Alarma.build();
  //************************************
  if(!req.session.user){
    res.render('web/index/404.jade');            
  }
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          departamento.retrieveById(req.params.departamentoId, function (departamentooq) {
            if (departamentooq) {
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
                      res.render('web/departamento/edit', {
                        departamento:departamentooq,
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
              res.send(401, 'Departamento no encontrado');
            }
          }, function (error) {
            res.send('Departamento no encontrado');
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

// DELETE /departamento/departamentoId
// Borra el departamentoId
exports.delete = function (req, res) {
  var departamento = Model.Departamento.build();

  departamento.removeById(req.params.departamentoId, function (departamento) {
    if (departamento) {
      //res.json({ message: 'Departamento borrado!' });
      res.redirect('/web/departamento');
    } else {
      res.send(401, 'Departamento no encontrado');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
};
