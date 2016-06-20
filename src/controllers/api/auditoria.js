'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /auditoria
// router.route('/auditoria') */

// POST /auditoria
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var tabla = req.body.tabla;
  var ipMaquina = req.body.ipMaquina;
  var descripcionAuditoria = req.body.descripcionAuditoria;
  var fechaAuditoria = req.body.fechaAuditoria;
  var horaAuditoria = req.body.horaAuditoria;
  

  var auditoria = Museo.Auditoria.build({
    tabla: tabla,
    ipMaquina: ipMaquina,    
    descripcionAuditoria: descripcionAuditoria,
    fechaAuditoria: fechaAuditoria,
    horaAuditoria: horaAuditoria
  });

  auditoria.add(function (success) {
    res.render('./auditoria/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los auditoria)
// GET /auditoria */


router.get('/cargar', function (req, res) {
  var auditoria = Museo.Auditoria.build();
  res.render('./auditoria/index',{auditoria: auditoria});
});

/* Rutas que terminan en /auditoria/:auditoriaId
// router.route('/auditoria/:auditoriaId')
// PUT /auditoria/:auditoriaId
// Actualiza auditoria */

router.put('/:auditoriaId', function (req, res) {
  var auditoria = Museo.Auditoria.build();

  auditoria.tabla = req.body.tabla;
  auditoria.ipMaquina = req.body.ipMaquina;
  auditoria.descripcionAuditoria = req.body.descripcionAuditoria;
  auditoria.fechaAuditoria = req.body.fechaAuditoria;
  auditoria.horaAuditoria = req.body.horaAuditoria;
  

  auditoria.updateById(req.params.auditoriaId, function (success) {
    if (success) {
      res.json({ message: 'Auditoria actualizado!' });
    } else {
      res.send(401, 'Auditoria no encontrado');
    }
  }, function (error) {
    res.send('Auditoria no encontrado');
  });
});

// GET /auditoria/:auditoriaId
// Toma un auditoria por id
router.get('/:auditoriaId', function (req, res) {
  var auditoria = Museo.Auditoria.build();

  auditoria.retrieveById(req.params.auditoriaId, function (auditoria) {
    if (auditoria) {
      res.json(auditoria);
    } else {
      res.send(401, 'Auditoria no encontrado');
    }
  }, function (error) {
    res.send('Auditoria no encontrado');
  });
});

// DELETE /auditoria/auditoriaId
// Borra el auditoriaId
router.delete('/:auditoriaId', function (req, res) {
  var auditoria = Museo.Auditoria.build();

 auditoria.removeById(req.params.auditoriaId, function (auditoria) {
    if (auditoria) {
      res.json({ message: 'Auditoria borrado!' });
    } else {
      res.send(401, 'Auditoria no encontrado');
    }
  }, function (error) {
    res.send('Auditoria no encontrado');
  });
});

module.exports = router;