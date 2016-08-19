'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleSalidaAnimal
// router.route('/detalleSalidaAnimal') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleSalidaAnimal = Model.DetalleSalidaAnimal.build();
  var salidaAnimal = Model.SalidaAnimal.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) {
              salidaAnimal.retrieveId(function (salidaAnimalQ) {
                  if (salidaAnimalQ) {      
                    console.log('soy salidaAnimal retrieveId',salidaAnimalQ);
                    res.render('web/detalleSalidaAnimal/index', {
                                    salidaAnimalJ:salidaAnimalQ,
                                    detalleIngresoAnimalJ: detalleSalidaAnimal,
                                    selectJ: animalQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });    
                  } else {
                    res.send(401, 'No se encontraron detalles');
                  }
              });
            }else {
              res.send(401, 'No se Encontraron detalles');
            }
          }, function (error) {
            res.send('Detalle SalidaAnimal no encontrado');
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
// POST /detalleSalidaAnimal
exports.create1 = function (req, res) {
  console.log('dentro de post 1', req.body);
  // bodyParser debe hacer la magia
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var SalidaAnimalIdSalidaAnimal = req.body.id;  

  var index = Model.DetalleSalidaAnimal.build({
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    SalidaAnimalIdSalidaAnimal: SalidaAnimalIdSalidaAnimal
  });

  index.add(function (success) {
    res.redirect('/web/detalleSalidaAnimal/cargar');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los detalleSalidaAnimal)
// GET /detalleSalidaAnimal */

//*****************************************************
exports.getForm2 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleSalidaAnimal = Model.DetalleSalidaAnimal.build();
  var salidaId = req.params.salidaId;
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {
          animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) {
                    console.log('soy salidaAnimal retrieveId',salidaId);
                    res.render('web/detalleSalidaAnimal/indexa', {
                                    salidaAnimalJ:salidaId,
                                    detalleSalidaAnimalJ: detalleSalidaAnimal,
                                    selectJ: animalQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });   
            }else {
              res.send(401, 'No se Encontraron detalles');
            }
          }, function (error) {
            res.send('Detalle salida Animal no encontrado');
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
// POST /detalleSalidaAnimal
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var SalidaAnimalIdSalidaAnimal = req.body.id;  

  var index = Model.DetalleSalidaAnimal.build({
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    SalidaAnimalIdSalidaAnimal: SalidaAnimalIdSalidaAnimal
  });

  index.add(function (success) {
    res.redirect('/web/salidaAnimal');
  },
  function (err) {
    res.send(err);
  });
};
//***************************************************

/* Rutas que terminan en /detalleSalidaAnimal/:detalleIngresoAnimalId
// router.route('/detalleSalidaAnimal/:detalleIngresoAnimalId')
// PUT /detalleSalidaAnimal/:detalleIngresoAnimalId
// Actualiza detalleSalidaAnimal*/

exports.update = function (req, res) {
  var detalleSalidaAnimal = Model.DetalleSalidaAnimal.build();

  detalleSalidaAnimal.observacion = req.body.observacion;
  detalleSalidaAnimal.AnimalIdAnimal = req.body.animalSele;
  console.log('idDetalleSAS',req.params.idDetalleSAS);
  detalleSalidaAnimal.updateById(req.params.idDetalleSAS, function (success) {
    if (success) {
      res.redirect('/web/salidaAnimal');
    } else {
      res.send(401, 'Detalle salida Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle salida Animal no encontrado');
  });
};

// GET /detalleSalidaAnimal/:idDetalleSAS
// Toma un detalleSalidaAnimal por id
exports.read = function (req, res) {
  var detalleSalidaAnimal = Model.DetalleSalidaAnimal.build();
  var animal = Model.Animal.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
          animal.retrieveAll(function (animal) {
            if (animal) {
              detalleSalidaAnimal.retrieveById(req.params.idDetalleSAS, function (detalleSalidaAnimal) {
                if (detalleSalidaAnimal) {
                  res.render('web/detalleSalidaAnimal/edit', {
                            detalleSalidaAnimal:detalleSalidaAnimal,
                            select: animal,
                            mensajes: mensaje1,
                            mensajeria: mensaje2
                          });
                } else {
                  res.send(401, 'Detalle salida Animal no encontrado');
                }
              }, function (error) {
                res.send('Detalle salida Animal no encontrado');
              });

            } else {
              res.send(401, 'No se encontraron Detalles');
            }
          }, function (error) {
            console.log(error);
            res.send('desDetalles no encontrado');
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
//**************************************************************
exports.readId =  function (req, res) {
  var detalleSalidaAnimal = Model.DetalleSalidaAnimal.build();
  console.log('dentro de get /',req.body);
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          detalleSalidaAnimal.retrieveAll(req.params.id, function (detalleSalidaAnimales) {
            if (detalleSalidaAnimales) {
              res.render('web/detalleSalidaAnimal/success', { 
                detalleSalidaAnimales:detalleSalidaAnimales,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Detalles');
            }
          }, function (error) {
            res.send('DetalleSalidaAnimal no encontrado');
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
// DELETE /detalleSalidaAnimal/detalleIngresoAnimalId
// Borra el detalleIngresoAnimalId
exports.delete = function (req, res) {
  var detalleSalidaAnimal = Model.DetalleSalidaAnimal.build();

 detalleSalidaAnimal.removeById(req.params.idDetalleSAS, function (detalleSalidaAnimal) {
    if (detalleSalidaAnimal) {
      res.redirect('/web/salidaAnimal');
    } else {
      res.send(401, 'Detalle Salida Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Salida Animal no encontrado');
  });
};
