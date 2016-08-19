'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');
// POST /mensaje
exports.create = function (req, res) {
  console.log('estoy dentro de create',req.body);
  // bodyParser debe hacer la magia
  var nombre = req.body.nombre; 
  var email = req.body.email; 
  var mensaje = req.body.mensaje; 

  var index = Model.Mensaje.build({
    nombre: nombre,
    email: email,
    mensaje: mensaje
  });

  index.add(function (success) {
      console.log('estoy dentro de add');  
      res.redirect('/#contact');
  },
  function (err) {
    res.send(err);
  });
};
//publico/home/indexa.jade

/* (trae todos los nivel)
// GET /nivel */


exports.listPag =  function (req, res) {
  var mensaje = Model.Mensaje.build();
  console.log(req.body);
  mensaje.retrieveAll(function (mensajes) {
    if (mensajes) {
      res.render('web/mensaje/success', { mensajes: mensajes});
    } else {
      res.send(401, 'No se encontraron Mensajes');
    }
  }, function (error) {
    res.send('Mensaje no encontrado');
  });
};

// GET /nivel/:mensajeId
// Toma un nivel por id
exports.read = function (req, res) {
  var mensaje = Model.Mensaje.build();

  mensaje.retrieveById(req.params.mensajeId, function (mensajeoq) {
    if (mensajeoq) {
      console.log('dentro de editar:*****************');
      res.render('web/mensaje/edit', {mensaje:mensajeoq});
    } else {
      res.send(401, 'Mensaje no encontrado');
    }
  }, function (error) {
    res.send('Mensaje no encontrado');
  });
};

// DELETE /nivel/mensajeId
// Borra el mensajeId
exports.delete = function (req, res) {
  var mensaje = Model.Mensaje.build();

 mensaje.removeById(req.params.mensajeId, function (mensaje) {
    if (mensaje) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/mensaje');
    } else {
      res.send(401, 'Mensaje no encontrado');
    }
  }, function (error) {
    res.send('Mensaje no encontrado');
  });
};
