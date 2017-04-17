'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /extraviado
// router.route('/extraviado') */
exports.getForm = function (req, res) {
  var empleado = Museo.Empleado.build();
  var extraviado = Museo.Extraviado.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Museo.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          empleado.retrieveAll(function (empleadoQ) {
            //console.log('empleadoQ',empleadoQ);
            if (empleadoQ) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      res.render('web/extraviado/index', {
                              extraviadoJ: extraviado,
                              selectJ: empleadoQ,
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
            }
          },function (error) {
            res.send('Extraviado no encontrado');
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
// POST /extraviado
exports.create = function (req, res) {
  console.log('pasee*********',req.body);
  // bodyParser debe hacer la magia
  var fechaExtraviado = req.body.fechaExtraviado;
  var horaExtraviado = req.body.horaExtraviado;
  var lugarExtraviado = req.body.lugarExtraviado;
  var EmpleadoIdEmpleado = req.body.selectJ;

  console.log('paso ina**************************');
   
  var index = Museo.Extraviado.build({
    fechaExtraviado: fechaExtraviado,
    horaExtraviado: horaExtraviado,    
    lugarExtraviado: lugarExtraviado,
    EmpleadoIdEmpleado: EmpleadoIdEmpleado
  });
  console.log('pasara**************************');
   
  index.add(function (success) {
    res.redirect('/web/detalleExtraviado/cargar');
  },
  function (err) {
    res.send('soy un error------------',err);
    console.log('dentro de error**************************');    
  });
};

/* (trae todos los extraviado)
// GET /extraviado */
exports.listPag = function (req, res) {
  var extraviado = Museo.Extraviado.build();
  console.log('request body',req.body);
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Museo.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          extraviado.retrieveAll(function (extraviado) {
            if (extraviado) {    
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);  
                      res.render('web/extraviado/success', { 
                        extraviado: extraviado,
                        mensajes: mensaje1,
                        mensajeria: mensaje2,
                        alarmas1: alarma1,
                        alarmas2: alarma2
                      });
                      console.log('soy extraviado retrieveAll',extraviado);
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
              res.send(401, 'No se encontraron Pesajes');
            }
          }, function (error) {
            res.send('Extraviado no encontrado');
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

/* Rutas que terminan en /extraviado/:extraviadoId
// router.route('/extraviado/:extraviadoId')
// PUT /extraviado/:extraviadoId
// Actualiza extraviado */

exports.update = function (req, res) {
  var extraviado = Museo.Extraviado.build();

  extraviado.fechaExtraviado = req.body.fechaExtraviado;
  extraviado.horaExtraviado = req.body.horaExtraviado;
  extraviado.lugarExtraviado = req.body.lugarExtraviado;
  extraviado.EmpleadoIdEmpleado = req.body.empleadoSele;
  

  extraviado.updateById(req.params.extraviadoId, function (success) {
    if (success) {
      res.redirect('/web/extraviado');
    } else {
      res.send(401, 'Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });
};

// GET /extraviado/:extraviadoId
// Toma un extraviado por id
exports.read = function (req, res) {
  var extraviado = Museo.Extraviado.build();
  var empleado = Museo.Empleado.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Museo.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          empleado.retrieveAll(function (empleado) {
            if (empleado) {
              extraviado.retrieveById(req.params.extraviadoId, function (extraviado) {
                if (extraviado) {
                  alarma.retriveCount(function (alarma1) { 
                    console.log('alarma1', alarma1);
                    if (alarma1) {     
                      alarma.retrieveAll(function (alarma2) {
                        console.log('alarma2', alarma2);
                        if (alarma2) {  
                          console.log(req.body);
                          res.render('web/extraviado/edit', {
                              extraviado:extraviado,
                              select: empleado,
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
                  res.send(401, 'Extraviado no encontrado');
                }
              }, function (error) {
                res.send('Extraviado no encontrado');
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
  var extraviado = Museo.Extraviado.build();
  //************************************
  var alarma = Model.Alarma.build();
  //************************************
  var mensaje = Museo.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          extraviado.retrieveVerId(req.params.id, function (extraviadoq) {
            if (extraviadoq) {
              alarma.retriveCount(function (alarma1) { 
                console.log('alarma1', alarma1);
                if (alarma1) {     
                  alarma.retrieveAll(function (alarma2) {
                    console.log('alarma2', alarma2);
                    if (alarma2) {  
                      console.log(req.body);
                      res.render('web/detalleExtraviado/success', {
                          extraviado:extraviadoq,
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
              res.send(401, 'Extraviado no encontrado');
            }
          }, function (error) {
            res.send('Extraviado no encontrado',error);
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
// DELETE /extraviado/extraviadoId
// Borra el extraviadoId
exports.delete = function (req, res) {
  var extraviado = Museo.Extraviado.build();

 extraviado.removeById(req.params.extraviadoId, function (extraviado) {
    if (extraviado) {
      res.redirect('/web/extraviado');
    } else {
      res.send(401, 'Extraviado no encontrado');
    }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });
};
