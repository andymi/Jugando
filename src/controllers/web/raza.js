'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /raza
// router.route('/raza') */

exports.getForm = function (req, res) {
  var raza = Model.Raza.build();
  res.render('web/raza/index',{raza: raza});
};

// POST /raza
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var raza = req.body.raza; 

  var index = Model.Raza.build({
    raza: raza
  });

  index.add(function (success) {
    res.redirect('/web/raza');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los raza)
// GET /raza */
exports.listPag = function (req, res) {
  var raza = Model.Raza.build();
  console.log(req.body);
  raza.retrieveAll(function (razas) {
    if (razas) {
      res.render('web/raza/success', { razas: razas});
    } else {
      res.send(401, 'No se encontraron Razas');
    }
  }, function (error) {
    res.send('Raza no encontrado');
  });
};
/* Rutas que terminan en /raza/:razaId
// router.route('/raza/:razaId')
// PUT /raza/:razaId
// Actualiza raza */

exports.update = function (req, res) {
  var raza = Model.Raza.build();

  raza.raza = req.body.raza;

  raza.updateById(req.params.razaId, function (success) {
    if (success) {
      console.log('redirigiendo a /web/raza');
      res.redirect('/web/raza');
    } else {
      res.send(401, 'Raza no encontrado');
    }
  }, function (error) {
    res.send('Raza no encontrado');
  });
};

// GET /raza/:razaId
// Toma un raza por id
exports.read = function (req, res) {
  var raza = Model.Raza.build();

  raza.retrieveById(req.params.razaId, function (razaoq) {
    if (razaoq) {
      console.log('dentro de editar:*****************');
      res.render('web/raza/edit', {raza:razaoq});
    } else {
      res.send(401, 'Raza no encontrado');
    }
  }, function (error) {
    res.send('Raza no encontrado');
  });
};

// DELETE /raza/razaId
// Borra el razaId
exports.delete = function (req, res) {
  var raza = Model.Raza.build();

 raza.removeById(req.params.razaId, function (raza) {
    if (raza) {
      console.log('dentro de borrar:*****************');
      res.redirect('/web/raza');
    } else {
      res.send(401, 'Raza no encontrado');
    }
  }, function (error) {
    res.send('Raza no encontrado');
  });
};
