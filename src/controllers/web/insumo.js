'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /insumo
// router.route('/insumo') */
exports.getForm = function (req, res) {
  var insumo = Model.Insumo.build();
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
                  res.render('web/insumo/index',{
                    insumo: insumo,
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
// POST /insumo
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var codigoBarra = req.body.codigoBarra;
  var nombreInsumo = req.body.nombreInsumo;
  var contenidoInsumo = req.body.contenidoInsumo;
  var precioCompra = req.body.precioCompra;  
  var tipoInsumo = req.body.tipoInsumo; 
  var presentacionInsumo = req.body.presentacionInsumo; 

  var index = Model.Insumo.build({
    codigoBarra: codigoBarra,
    nombreInsumo: nombreInsumo,
    contenidoInsumo: contenidoInsumo,    
    precioCompra: precioCompra,
    tipoInsumo : tipoInsumo,
    presentacionInsumo : presentacionInsumo
  });

  index.add(function (success) {
    res.redirect('/web/insumo');
  },
  function (err) {
    res.send(err);
  });
};
/* (trae todos los insumo)
// GET /insumo */
exports.listPag = function (req, res) {
  var insumo = Model.Insumo.build();
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
          insumo.retrieveAll(function (insumos) {
            if (insumos) {
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
                      res.render('web/insumo/success', { 
                        insumos: insumos,
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
              res.send(401, 'No se encontraron Insumos');
            }
          }, function (error) {
            res.send('Insumo no encontrado');
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
/* Rutas que terminan en /insumo/:insumoId
// router.route('/insumo/:insumoId')
// PUT /insumo/:insumoId
// Actualiza insumo */
exports.update = function (req, res) {
  var insumo = Model.Insumo.build();
  insumo.codigoBarra = req.body.codigoBarra;
  insumo.nombreInsumo = req.body.nombreInsumo;
  insumo.contenidoInsumo = req.body.contenidoInsumo;
  insumo.precioCompra = req.body.precioCompra;
  insumo.tipoInsumo = req.body.tipoInsumo;
  insumo.presentacionInsumo = req.body.presentacionInsumo;
  

  insumo.updateById(req.params.insumoId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/insumo');

      res.redirect('/web/insumo');
    } else {
      res.send(401, 'Insumo no encontrado');
    }
  }, function (error) {
    res.send('Insumo no encontrado');
  });
};
// GET /insumo/:insumoId
// Toma un insumo por id
exports.read = function (req, res) {
  var insumo = Model.Insumo.build();
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
          insumo.retrieveById(req.params.insumoId, function (insumooq) {
            if (insumooq) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);                  
                      console.log('dentro de editar:*****************');
                      var usuario = req.session.user.usuario;
                      var pass = req.session.user.pass;
                      var fechaCreacion = req.session.user.fechaCreacion;
                      res.render('web/insumo/edit', {
                        insumo:insumooq,
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
              res.send(401, 'Insumo no encontrado');
            }
          }, function (error) {
            res.send('Insumo no encontrado');
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
// DELETE /insumo/insumoId
// Borra el insumoId
exports.delete = function (req, res) {
  var insumo = Model.Insumo.build();

 insumo.removeById(req.params.insumoId, function (insumo) {
    if (insumo) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/insumo');
    } else {
      res.send(401, 'Insumo no encontrado');
    }
  }, function (error) {
    res.send('Insumo no encontrado');
  });
};
