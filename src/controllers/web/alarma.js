'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');
// POST /alarma
exports.create = function (req, res) {
  console.log('estoy dentro de create',req.body);
  // bodyParser debe hacer la magia
  var nombre = req.body.nombre; 
  var alarma = req.body.alarma; 

  var index = Model.Alarma.build({
    nombre: nombre,
    alarma: alarma
  });

  index.add(function (success) {
      console.log('estoy dentro de add');  
      res.redirect('/web/alarma');
  },
  function (err) {
    res.send(err);
  });
};
//publico/home/indexa.jade

/* (trae todos los nivel)
// GET /nivel */


exports.listPag =  function (req, res) {
 var alarma = Model.Alarma.build();
 var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          console.log(req.body);
          alarma.retriveCount(function (alarma1) { 
            console.log('alarma1', alarma1);
            if (alarma1) {     
              alarma.retrieveAll(function (alarma2) {
                console.log('alarma2', alarma2);
                if (alarma2) {  
                  console.log(req.body);          
                  res.render('web/alarma/success', { 
                    alarmas1: alarma1,
                    alarmas2: alarma2,
                    mensajes: mensaje1,
                    mensajeria: mensaje2
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
        res.send('Alarma no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Mensajes');
    }
  }, function (error) {
    res.send('Alarma no encontrado');
  });
};

// GET /nivel/:alarmaId
// Toma un nivel por id
exports.read = function (req, res) {
  var alarma = Model.Alarma.build();

  alarma.retrieveById(req.params.alarmaId, function (alarmaoq) {
    if (alarmaoq) {
      console.log('dentro de editar:*****************');
      res.render('web/alarma/edit', {alarma:alarmaoq});
    } else {
      res.send(401, 'Alarma no encontrado');
    }
  }, function (error) {
    res.send('Alarma no encontrado');
  });
};

// DELETE /nivel/alarmaId
// Borra el alarmaId
exports.delete = function (req, res) {
 var alarma = Model.Alarma.build();
 console.log('dentro de delete:*****************');
 alarma.removeById(req.params.alarmaId, function (alarma) {
    if (alarma) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/alarma');
    } else {
      res.send(401, 'Alarma no encontrado');
    }
  }, function (error) {
    res.send('Alarma no encontrado');
  });
};
    