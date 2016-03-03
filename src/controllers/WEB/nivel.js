'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /nivel
// router.route('/nivel') */

exports.getForm =  function (req, res) {
  var nivel = Model.Nivel.build();
  res.render('web/nivel/index',{nivel: nivel});
};

// POST /nivel
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nivel = req.body.nivel; 

  var index = Model.Nivel.build({
    nivel: nivel
  });

  index.add(function (success) {
    res.redirect('/web/nivel');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los nivel)
// GET /nivel */


exports.listPag =  function (req, res) {
  var nivel = Model.Nivel.build();
  console.log(req.body);
  nivel.retrieveAll(function (niveles) {
    if (niveles) {
      res.render('web/nivel/success', { niveles: niveles});
    } else {
      res.send(401, 'No se encontraron Niveles');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};
/* Rutas que terminan en /nivel/:nivelId
// router.route('/nivel/:nivelId')
// PUT /nivel/:nivelId
// Actualiza nivel */

exports.update =  function (req, res) {
  var nivel = Model.Nivel.build();

  nivel.nivel = req.body.nivel;

  nivel.updateById(req.params.nivelId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/nivel');
      res.redirect('/web/nivel');
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};

// GET /nivel/:nivelId
// Toma un nivel por id
exports.read = function (req, res) {
  var nivel = Model.Nivel.build();

  nivel.retrieveById(req.params.nivelId, function (niveloq) {
    if (niveloq) {
      console.log('dentro de editar:*****************');
      res.render('web/nivel/edit', {nivel:niveloq});
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};

// DELETE /nivel/nivelId
// Borra el nivelId
exports.delete = function (req, res) {
  var nivel = Model.Nivel.build();

 nivel.removeById(req.params.nivelId, function (nivel) {
    if (nivel) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/nivel');
    } else {
      res.send(401, 'Nivel no encontrado');
    }
  }, function (error) {
    res.send('Nivel no encontrado');
  });
};
