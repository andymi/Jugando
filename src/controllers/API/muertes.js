'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /muertes
// router.route('/muertes') */

// POST /muertes
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var fechaMuerte = req.body.fechaMuerte;
  var horaMuerte = req.body.horaMuerte;
  var cantidadTotal = req.body.cantidadTotal;  

  var index = Museo.Muertes.build({
    fechaMuerte: fechaMuerte,
    horaMuerte: horaMuerte,    
    cantidadTotal: cantidadTotal
  });

  index.add(function (success) {
    res.render('./muertes/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los muertes)
// GET /muertes */


router.get('/cargar', function (req, res) {
  var index = Museo.Muertes.build();
  res.render('./muertes/index',{index: index});
});

/* Rutas que terminan en /muertes/:muertesId
// router.route('/muertes/:muertesId')
// PUT /muertes/:muertesId
// Actualiza muertes */

router.put('/:muertesId', function (req, res) {
  var muertes = Museo.Muertes.build();

  muertes.fechaMuerte = req.body.fechaMuerte;
  muertes.horaMuerte = req.body.horaMuerte;
  muertes.cantidadTotal = req.body.cantidadTotal;
  
  

  muertes.updateById(req.params.muertesId, function (success) {
    if (success) {
      res.json({ message: 'Muertes actualizado!' });
    } else {
      res.send(401, 'Muertes no encontrado');
    }
  }, function (error) {
    res.send('Muertes no encontrado');
  });
});

// GET /muertes/:muertesId
// Toma un muertes por id
router.get('/:muertesId', function (req, res) {
  var muertes = Museo.Muertes.build();

  muertes.retrieveById(req.params.muertesId, function (muertes) {
    if (muertes) {
      res.json(muertes);
    } else {
      res.send(401, 'Muertes no encontrado');
    }
  }, function (error) {
    res.send('Muertes no encontrado');
  });
});

// DELETE /muertes/muertesId
// Borra el muertesId
router.delete('/:muertesId', function (req, res) {
  var muertes = Museo.Muertes.build();

 muertes.removeById(req.params.muertesId, function (muertes) {
    if (muertes) {
      res.json({ message: 'Muertes borrado!' });
    } else {
      res.send(401, 'Muertes no encontrado');
    }
  }, function (error) {
    res.send('Muertes no encontrado');
  });
});

module.exports = router;