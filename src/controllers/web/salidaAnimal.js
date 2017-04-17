'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /salidaAnimal
// router.route('/salidaAnimal') */
exports.getForm = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
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
                  res.render('web/salidaAnimal/index',{
                    salidaAnimal: salidaAnimal,
                    mensajes: mensaje1,
                    mensajeria: mensaje2,
                    alarmas1: alarma1,
                    alarmas2: alarma2
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
// POST /salidaAnimal
exports.create =  function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var horaSalida = req.body.horaSalida;
  var fechaSalida = req.body.fechaSalida;
  var observacion = req.body.observacion;

  var index = Model.SalidaAnimal.build({
    horaSalida: horaSalida,
    fechaSalida: fechaSalida,
    observacion: observacion,
  });

  index.add(function (success) {
    res.redirect('/web/detalleSalidaAnimal/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los salidaAnimal)
// GET /salidaAnimal */

exports.listPag = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  console.log(req.body);
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          salidaAnimal.retrieveAll(function (salidaAnimales) {
            if (salidaAnimales) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      res.render('web/salidaAnimal/success', { 
                        salidaAnimales: salidaAnimales,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2
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
              res.send(401, 'No se encontraron Animales');
            }
          }, function (error) {
            res.send('Animal no encontrado');
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

/* Rutas que terminan en /salidaAnimal/:salidaAnimalId
// router.route('/salidaAnimal/:salidaAnimalId')
// PUT /salidaAnimal/:salidaAnimalId
// Actualiza salidaAnimal */

exports.update = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();

  salidaAnimal.horaSalida = req.body.horaSalida;
  salidaAnimal.fechaSalida = req.body.fechaSalida;
  salidaAnimal.observacion = req.body.observacion;

  salidaAnimal.updateById(req.params.salidaAnimalId, function (success) {
    if (success) {
      res.redirect('/web/salidaAnimal');
    } else {
      res.send(401, 'SalidaAnimal no encontrado');
    }
  }, function (error) {
    res.send('SalidaAnimal no encontrado');
  });
};

// GET /salidaAnimal/:salidaAnimalId
// Toma un salidaAnimal por id
exports.read = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  console.log('soy get edit',req.body);
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          salidaAnimal.retrieveById(req.params.salidaAnimalId, function (salidaAnimal) {
            if (salidaAnimal) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);                  
                      res.render('web/salidaAnimal/edit', {
                        salidaAnimal:salidaAnimal,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2
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
              res.send(401, 'SalidaAnimal no encontrado');
            }
          }, function (error) {
            res.send('SalidaAnimal no encontrado');
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
  var salidaAnimal = Model.SalidaAnimal.build();
  console.log('dentro de get id', req.body);
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          salidaAnimal.retrieveVerId(req.params.id, function (salidaAnimalq) {
            if (salidaAnimalq) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      res.render('web/detalleSalidaAnimal/success', {
                          salidaAnimal:salidaAnimalq,
                          mensajes: mensaje1,
                          mensajeria: mensaje2,
                          alarmas1: alarma1,
                          alarmas2: alarma2
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
              res.send(401, 'SalidaAnimal no encontrado');
            }
          }, function (error) {
            res.send('SalidaAnimal no encontrado',error);
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

// DELETE /salidaAnimal/salidaAnimalId
// Borra el salidaAnimalId
exports.delete = function (req, res) {
  var salidaAnimal = Model.SalidaAnimal.build();
  salidaAnimal.removeById(req.params.salidaAnimalId, function (salidaAnimal) {
    if (salidaAnimal) {
      res.redirect('/web/salidaAnimal');
    } else {
      res.send(401, 'SalidaAnimal no encontrado');
    }
  }, function (error) {
    res.send('SalidaAnimal no encontrado');
  });
};
