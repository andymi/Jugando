'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detallePesaje
// router.route('/detallePesaje') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detallePesaje = Model.DetallePesaje.build();
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
          animal.retrieveAll(function (animalQ) {
            console.log('animalQ',animalQ);
            if (animalQ) {
              pesaje.retrieveId(function (pesajeQ) {
                  if (pesajeQ) {      
                    console.log('soy pesaje retrieveId',pesajeQ);
                    res.render('web/detallePesaje/index', {
                                    pesajeJ:pesajeQ,
                                    detallePesajeJ: detallePesaje,
                                    selectJ: animalQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });    
                  } else {
                    res.send(401, 'No se encontraron Pesajes');
                  }
              });
            }else {
              res.send(401, 'No se Eencontraron Pesajes');
            }
          }, function (error) {
            res.send('Detalle Pesaje no encontrado');
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

// POST /detallePesaje
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var peso = req.body.peso;
  var observacion = req.body.observacion;  
  var AnimalIdAnimal = req.body.selectJ;
  var PesajeIdPesaje = req.body.id;

  var index = Model.DetallePesaje.build({
    peso:peso,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    PesajeIdPesaje: PesajeIdPesaje
  });

  index.add(function (success) {
    res.redirect('/web/detallePesaje/cargar');
  },
  function (err) {
    res.send(err);
  });
};
//**************************************************************
exports.readId = function (req, res) {
  var detallePesaje = Model.DetallePesaje.build();
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
          detallePesaje.retrieveAll(req.params.id, function (detallePesajes) {
            if (detallePesajes) {
              res.render('web/detallePesaje/success', { 
                detallePesajes:detallePesajes,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Detalles');
            }
          }, function (error) {
            res.send('DetallePesaje no encontrado');
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
//***************************************************************
exports.getForm2 = function (req, res) {
  var animal = Model.Animal.build();
  var detallePesaje = Model.DetallePesaje.build();
  var pesajeId = req.params.pesajeId;
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
                    console.log('soy add pesajeId',pesajeId);
                    res.render('web/detallePesaje/indexa', {
                                    pesajeN:pesajeId,
                                    detallesajeJ: detallePesaje,
                                    selectJ: animalQ,
                                    mensajes: mensaje1,
                                    mensajeria: mensaje2
                    });             
            }else {
              res.send(401, 'No se Eencontraron Pesajes');
            }
          }, function (error) {
            res.send('Detalle Pesaje no encontrado');
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
// POST /detallePesaje
exports.create2 = function (req, res) {
  console.log('DENTRO DE ADD',req.body);
  // bodyParser debe hacer la magia
  var peso = req.body.peso;
  var observacion = req.body.observacion;  
  var AnimalIdAnimal = req.body.selectJ;
  var PesajeIdPesaje = req.body.id;

  var index = Model.DetallePesaje.build({
    peso:peso,
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    PesajeIdPesaje: PesajeIdPesaje
  });

  index.add(function (success) {
    res.redirect('/web/pesaje');
  },
  function (err) {
    res.send(err);
  });
};
//*************************************************************
/* (trae todos los detallePesaje)
// GET /detallePesaje */

/* Rutas que terminan en /detallePesaje/:detallePesajeId
// router.route('/detallePesaje/:detallePesajeId')
// PUT /detallePesaje/:detallePesajeId
// Actualiza detallePesaje */

exports.update = function (req, res) {
  var detallePesaje = Model.DetallePesaje.build();

  detallePesaje.peso = req.body.peso;
  detallePesaje.observacion = req.body.observacion;
  detallePesaje.AnimalIdAnimal = req.body.animalSele;
  

  detallePesaje.updateById(req.params.detallePesajeId, function (success) {
    if (success) {
      //res.json({ message: 'Detalle Pesaje actualizado!' });
       res.redirect('/web/pesaje');
    } else {
      res.send(401, 'Detalle Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Detalle Pesaje no encontrado');
  });
};

// GET /detallePesaje/:detallePesajeId
// Toma un detallePesaje por id
exports.read = function (req, res) {
  var animal =Model.Animal.build();
  var detallePesaje = Model.DetallePesaje.build();
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
              detallePesaje.retrieveById(req.params.detallePesajeId, function (detallePesajeQ) {
                if (detallePesajeQ) {
                  res.render('web/detallePesaje/edit', {
                              detallePesaje:detallePesajeQ,
                              select: animal,
                              mensajes: mensaje1,
                              mensajeria: mensaje2
                            });
                } else {
                  res.send(401, 'arDetalles no encontrado');
                }
              }, function (error) {
                res.send('esDetalles no encontrado',error);
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

// DELETE /detallePesaje/detallePesajeId
// Borra el detallePesajeId
exports.delete = function (req, res) {
  var detallePesaje = Model.DetallePesaje.build();

 detallePesaje.removeById(req.params.detallePesajeId, function (detallePesaje) {
    if (detallePesaje) {
       res.redirect('/web/pesaje');
    } else {
      res.send(401, 'Detalle Pesaje no encontrado');
    }
  }, function (error) {
    res.send('Detalle Pesaje no encontrado');
  });
};
