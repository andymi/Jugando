'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================


var Model = require('../../models/jugando.js');

/* Rutas que terminan en /cliente
// router.route('/cliente') */
exports.getForm =  function (req, res) {
  var cliente = Model.Cliente.build();
  var ciudad = Model.Ciudad.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************ 
  var alarma = Model.Alarma.build();
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
                  ciudad.retrieveAll(function (ciudadQ) {
                    console.log('ciudadQ',ciudadQ);
                    if (ciudadQ) {
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;
                        res.render('web/cliente/index',{
                            selectJ: ciudadQ,
                            cliente: cliente,
                            mensajes: mensaje1,
                            mensajeria: mensaje2,
                            alarmas1: alarma1,
                            alarmas2: alarma2,
                            usuarios: usuario,
                            passs: pass,
                            fechaCreacions: fechaCreacion
                        });
                    }
                  }, function (error) {
                    res.send('Usuario no encontrado');
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

// POST /cliente
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nombreCliente = req.body.nombreCliente;
  var direccionCliente = req.body.direccionCliente;
  var rucCliente = req.body.rucCliente;
  var CiudadIdCiudad = req.body.selectJ;

  var index = Model.Cliente.build({
    nombreCliente: nombreCliente,
    direccionCliente: direccionCliente,    
    rucCliente: rucCliente,
    CiudadIdCiudad: CiudadIdCiudad
  });

  index.add(function (success) {
    res.redirect('/web/cliente');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los cliente)
// GET /cliente */
exports.listPag =  function (req, res) {
  var cliente = Model.Cliente.build();
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
          alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) {  
                  console.log(req.body);          
                  cliente.retrieveAll(function (clientes) {
                    if (clientes) {
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;
                      res.render('web/cliente/success', { 
                        clientes: clientes,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2,
                        usuarios: usuario,
                        passs: pass,
                        fechaCreacions: fechaCreacion
                      });
                    } else {
                      res.send(401, 'No se encontraron Clientes');
                    }
                  }, function (error) {
                    res.send('Cliente no encontrado');
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
/* Rutas que terminan en /cliente/:clienteId
// router.route('/cliente/:clienteId')
// PUT /cliente/:clienteId
// Actualiza cliente */

exports.update =  function (req, res) {
  var cliente = Model.Cliente.build();

  cliente.nombreCliente = req.body.nombreCliente;
  cliente.direccionCliente = req.body.direccionCliente;
  cliente.rucCliente = req.body.rucCliente;
  cliente.CiudadIdCiudad = req.body.ciudadSele;

  cliente.updateById(req.params.clienteId, function (success) {
    if (success) {
     //res.json({ message: 'Cliente actualizado!' });
      res.redirect('/web/cliente');
    } else {
      res.send(401, 'Cliente no encontrado');
    }
  }, function (error) {
    res.send('Cliente no encontrado');
  });
};

// GET /cliente/:clienteId
// Toma un cliente por id
exports.read = function (req, res) {
  var cliente = Model.Cliente.build();
  var ciudad = Model.Ciudad.build();
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
          ciudad.retrieveAll(function (ciudad) {
            if (ciudad) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      cliente.retrieveById(req.params.clienteId, function (clienteq) {
                        if (clienteq) {
                          var usuario = req.session.user.usuario;
                          var pass = req.session.user.pass;
                          var fechaCreacion = req.session.user.fechaCreacion;
                          res.render('web/cliente/edit', {
                              cliente:clienteq,
                              select: ciudad,
                              mensajes: mensaje1,
                              mensajeria: mensaje2,
                              alarmas1: alarma1,
                              alarmas2: alarma2,
                              usuarios: usuario,
                              passs: pass,
                              fechaCreacions: fechaCreacion
                          });
                        } else {
                          res.send(401, 'arCliente no encontrado');
                        }
                      }, function (error) {
                        res.send('esCliente no encontrado',error);
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
              res.send(401, 'No se encontraron Clientes');
            }
          }, function (error) {
            console.log(error);
            res.send('desCliente no encontrado');
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

// DELETE /cliente/clienteId
// Borra el clienteId
exports.delete = function (req, res) {
  var cliente = Model.Cliente.build();

 cliente.removeById(req.params.clienteId, function (cliente) {
    if (cliente) {
      //res.json({ message: 'Cliente borrado!' });
      res.redirect('/web/cliente');
    } else {
      res.send(401, 'Cliente no encontrado');
    }
  }, function (error) {
    res.send('Cliente no encontrado');
  });
};
