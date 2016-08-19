'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /vacunacion
// router.route('/vacunacion') */
exports.getForm = function (req, res) {
  var proveedor = Model.Proveedor.build();
  var vacunacion = Model.Vacunacion.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          proveedor.retrieveByProveedor3(function (proveedorQ) {
            console.log('proveedorQ',proveedorQ);
            if (proveedorQ) {
                res.render('web/vacunacion/index', {
                        vacunacionJ: vacunacion,
                        selectJ: proveedorQ,
                        mensajes: mensaje1,
                        mensajeria: mensaje2
                });
              }
          },function (error) {
            res.send('Vacunacion no encontrado');
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
// POST /vacunacion
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaVacunacion = req.body.fechaVacunacion;
  var horaVacunacion = req.body.horaVacunacion;
  var ProveedorIdProveedor = req.body.selectJ;

  var index = Model.Vacunacion.build({
    fechaVacunacion : fechaVacunacion,
    horaVacunacion: horaVacunacion,    
    ProveedorIdProveedor: ProveedorIdProveedor
  });

  index.add(function (success) {
    res.redirect('/web/detalleVacunacion/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los vacunacion)
// GET /vacunacion */

exports.listPag = function (req, res) {
  var vacunacion = Model.Vacunacion.build();
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
          vacunacion.retrieveAll(function (vacunacion) {
            if (vacunacion) {      
              res.render('web/vacunacion/success', { 
                vacunacion: vacunacion,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
              console.log('soy vacunacion retrieveAll',vacunacion);
            } else {
              res.send(401, 'No se encontraron Pesajes');
            }
          }, function (error) {
            res.send('Vacunacion no encontrado');
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


/* Rutas que terminan en /vacunacion/:vacunacionId
// router.route('/vacunacion/:vacunacionId')
// PUT /vacunacion/:vacunacionId
// Actualiza vacunacion */
exports.update = function (req, res) {
  var vacunacion = Model.Vacunacion.build();

  vacunacion.fechaVacunacion = req.body.fechaVacunacion;
  vacunacion.horaVacunacion = req.body.horaVacunacion;  
  vacunacion.ProveedorIdProveedor = req.body.proveedorSele;

  vacunacion.updateById(req.params.vacunacionId, function (success) {
    if (success) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
};

// GET /vacunacion/:vacunacionId
// Toma un vacunacion por id
exports.read = function (req, res) {
  var vacunacion = Model.Vacunacion.build();
  var proveedor = Model.Proveedor.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          proveedor.retrieveAll(function (proveedor) {
            if (proveedor) {
              vacunacion.retrieveById(req.params.vacunacionId, function (vacunacion) {
                if (vacunacion) {
                  res.render('web/vacunacion/edit', {
                              vacunacion:vacunacion,
                              select: proveedor,
                              mensajes: mensaje1,
                              mensajeria: mensaje2
                            });
                } else {
                  res.send(401, 'Vacunacion no encontrado');
                }
              }, function (error) {
                res.send('Vacunacion no encontrado');
              });
            } else {
              res.send(401, 'No se encontraron Vacunaciones');
            }
          }, function (error) {
            console.log(error);
            res.send('Vacunacion no encontrado');
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


exports.listPag1 = function (req, res) {
  var vacunacion = Model.Vacunacion.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          vacunacion.retrieveVerId(req.params.id, function (vacunacionQ) {
            if (vacunacionQ) {
              res.render('web/detalleVacunacion/success', {
                          vacunacion:vacunacionQ,
                          mensajes: mensaje1,
                          mensajeria: mensaje2
                        });
            } else {
              res.send(401, 'Vacunacion no encontrado');
            }
          }, function (error) {
            res.send('Vacunacion no encontrado',error);
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

exports.listPag2 = function (req, res) {
  var vacunacion = Model.Vacunacion.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          vacunacion.retrieveVerId(req.params.id, function (vacunacionQ) {
            if (vacunacionQ) {
              res.render('web/detalleVacunacionInsumo/success', {
                          vacunacion:vacunacionQ,
                          mensajes: mensaje1,
                          mensajeria: mensaje2
                        });
            } else {
              res.send(401, 'Vacunacion no encontrado');
            }
          }, function (error) {
            res.send('Vacunacion no encontrado',error);
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
// DELETE /vacunacion/vacunacionId
// Borra el vacunacionId
exports.delete = function (req, res) {
  var vacunacion = Model.Vacunacion.build();

 vacunacion.removeById(req.params.vacunacionId, function (vacunacion) {
    if (vacunacion) {
      res.redirect('/web/vacunacion');
    } else {
      res.send(401, 'Vacunacion no encontrado');
    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
};
