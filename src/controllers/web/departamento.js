'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando.js');

/* Rutas que terminan en /departamento
// router.route('/departamento') */

exports.getForm = function (req, res) {
  var index = Model.Departamento.build();
  res.render('web/departamento/index',{index: index});
};

// POST /departamento
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var departamento = req.body.departamento; 

  var index = Model.Departamento.build({
    departamento: departamento
  });

  index.add(function (success) {
    res.redirect('/web/departamento');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los departamento)
// GET /departamento */

exports.listPag = function (req, res) {
  var departamento = Model.Departamento.build();
  console.log(req.body);
  departamento.retrieveAll(function (departamentos) {
    if (departamentos) {
      res.render('web/departamento/success', { departamentos: departamentos});
    } else {
      res.send(401, 'No se encontraron Departamentos');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
};


/* Rutas que terminan en /departamento/:departamentoId
// router.route('/departamento/:departamentoId')
// PUT /departamento/:departamentoId
// Actualiza departamento */

exports.update = function (req, res) {
  var departamento =Model.Departamento.build();
  console.log('dentro del put');
  departamento.departamento = req.body.departamento;
  console.log('soy departamento.departamento',departamento.departamento);
  departamento.updateById(req.params.departamentoId, function (success) {
    if (success) {
      //res.json({ message: 'Departamento actualizado!' });
      res.redirect('/web/departamento');
    } else {
      res.send(401, 'Departamento no encontrado');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
};
// GET /departamento/:departamentoId
// Toma un departamento por id
exports.read = function (req, res) {
  var departamento = Model.Departamento.build();

  departamento.retrieveById(req.params.departamentoId, function (departamentooq) {
    if (departamentooq) {
      //res.json(departamento);
      res.render('web/departamento/edit', {departamento:departamentooq});
    } else {
      res.send(401, 'Departamento no encontrado');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
};

// DELETE /departamento/departamentoId
// Borra el departamentoId
exports.delete = function (req, res) {
  var departamento = Model.Departamento.build();

  departamento.removeById(req.params.departamentoId, function (departamento) {
    if (departamento) {
      //res.json({ message: 'Departamento borrado!' });
      res.redirect('/web/departamento');
    } else {
      res.send(401, 'Departamento no encontrado');
    }
  }, function (error) {
    res.send('Departamento no encontrado');
  });
};
