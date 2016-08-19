'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /consumo
// router.route('/consumo') */
exports.getForm =  function (req, res) {
  var insumo = Model.Insumo.build();
  var consumo = Model.Consumo.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          insumo.retrieveByInsumo(function (insumoQ) {
            console.log('insumoQ',insumoQ);
            if (insumoQ) {
                res.render('web/consumo/index', {
                        pesajeJ: consumo,
                        selectJ: insumoQ,
                        mensajes: mensaje1,
                        mensajeria: mensaje2
                });
              }
          },function (error) {
            res.send('Consumo no encontrado');
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
// POST /consumo
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaConsumo = req.body.fechaConsumo;
  var horaConsumo = req.body.horaConsumo;
  var InsumoIdInsumo = req.body.selectJ; 

  var index = Model.Consumo.build({
    fechaConsumo: fechaConsumo,
    horaConsumo: horaConsumo,
    InsumoIdInsumo: InsumoIdInsumo
  });

  index.add(function (success) {
    res.redirect('/web/detalleConsumo/cargar');
  },
  function (err) {
    res.send(err);
  });
};


exports.listPag = function (req, res) {
  var consumo = Model.Consumo.build();
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
          consumo.retrieveAll(function (consumo) {
            console.log('estoy dentro de consumo retrieveAll');
            if (consumo) {      
              res.render('web/consumo/success', { 
                consumo: consumo,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
              console.log('soy consumo retrieveAll',consumo);
            } else {
              res.send(401, 'No se encontraron Consumo');
            }
          }, function (error) {
            res.send('Consumo no encontrado');
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
/* Rutas que terminan en /consumo/:consumoId
// router.route('/consumo/:consumoId')
// PUT /consumo/:consumoId
// Actualiza consumo */

exports.update = function (req, res) {
  var consumo = Model.Consumo.build();

  consumo.fechaConsumo = req.body.fechaConsumo;
  consumo.horaConsumo = req.body.horaConsumo;
  consumo.InsumoIdInsumo = req.body.insumoSele;
  

  consumo.updateById(req.params.consumoId, function (success) {
    if (success) {
      res.redirect('/web/consumo');
    } else {
      res.send(401, 'Consumo no encontrado');
    }
  }, function (error) {
    res.send('Consumo no encontrado');
  });
};

// GET /consumo/:consumoId
// Toma un consumo por id
exports.read = function (req, res) {
  var consumo = Model.Consumo.build(); 
  var insumo = Model.Insumo.build();
  //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          insumo.retrieveAll(function (insumo) {
            if (insumo) {  
              consumo.retrieveById(req.params.consumoId, function (consumo) {
                if (consumo) {
                  res.render('web/consumo/edit', {
                              consumo:consumo,
                              select: insumo,
                              mensajes: mensaje1,
                              mensajeria: mensaje2
                            });
                } else {
                  res.send(401, 'Consumo no encontrado');
                }
              }, function (error) {
                res.send('Consumo no encontrado');
              });
            } else {
              res.send(401, 'No se encontraron Consumos');
            }
          }, function (error) {
            console.log(error);
            res.send('Consumo no encontrado');
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
  var consumo = Model.Consumo.build();
  consumo.retrieveVerId(req.params.id, function (consumoq) {
    if (consumoq) {
      res.render('web/detalleConsumo/success', {
                  consumo:consumoq
                });
    } else {
      res.send(401, 'Consumo no encontrado');
    }
  }, function (error) {
    res.send('Consumo no encontrado',error);
  });
};
// DELETE /consumo/consumoId
// Borra el consumoId
exports.delete = function (req, res) {
  var consumo = Model.Consumo.build();

 consumo.removeById(req.params.consumoId, function (consumo) {
    if (consumo) {
      res.redirect('/web/consumo');
    } else {
      res.send(401, 'Consumo no encontrado');
    }
  }, function (error) {
    res.send('Consumo no encontrado');
  });
};

