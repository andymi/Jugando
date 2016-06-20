'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /ciudad
// router.route('/ciudad') */

// POST /ciudad
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var ciudad = req.body.ciudad; 

  var index = Museo.Ciudad.build({
    ciudad: ciudad
  });

  index.add(function (success) {
    res.render('./ciudad/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los ciudad)
// GET /ciudad */


router.get('/cargar', function (req, res) {
  var index = Museo.Ciudad.build();
  res.render('./ciudad/index',{index: index});
});

/* Rutas que terminan en /ciudad/:ciudadId
// router.route('/ciudad/:ciudadId')
// PUT /ciudad/:ciudadId
// Actualiza ciudad */

router.put('/:ciudadId', function (req, res) {
  var ciudad = Museo.Ciudad.build();

  ciudad.ciudad = req.body.ciudad;

  ciudad.updateById(req.params.ciudadId, function (success) {
    if (success) {
      res.json({ message: 'Ciudad actualizado!' });
    } else {
      res.send(401, 'Ciudad no encontrado');
    }
  }, function (error) {
    res.send('Ciudad no encontrado');
  });
});

// GET /ciudad/:ciudadId
// Toma un ciudad por id
router.get('/:ciudadId', function (req, res) {
  var ciudad = Museo.Ciudad.build();

  ciudad.retrieveById(req.params.ciudadId, function (ciudad) {
    if (ciudad) {
      res.json(ciudad);
    } else {
      res.send(401, 'Ciudad no encontrado');
    }
  }, function (error) {
    res.send('Ciudad no encontrado');
  });
});

// DELETE /ciudad/ciudadId
// Borra el ciudadId
router.delete('/:ciudadId', function (req, res) {
  var ciudad = Museo.Ciudad.build();

 ciudad.removeById(req.params.ciudadId, function (ciudad) {
    if (ciudad) {
      res.json({ message: 'Ciudad borrado!' });
    } else {
      res.send(401, 'Ciudad no encontrado');
    }
  }, function (error) {
    res.send('Ciudad no encontrado');
  });
});

module.exports = router;