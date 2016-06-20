'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /insumo
// router.route('/insumo') */

// POST /insumo
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var nombreInsumo = req.body.nombreInsumo;
  var contenidoInsumo = req.body.contenidoInsumo;
  var precioCompra = req.body.precioCompra;  
  var tipoInsumo = req.body.tipoInsumo; 
  var presentacionInsumo = req.body.presentacionInsumo; 
  var estadoInsumo = req.body.estadoInsumo; 

  var index = Museo.Insumo.build({
    nombreInsumo: nombreInsumo,
    contenidoInsumo: contenidoInsumo,    
    precioCompra: precioCompra,
    tipoInsumo : tipoInsumo,
    presentacionInsumo : presentacionInsumo,
    estadoInsumo : estadoInsumo
  });

  index.add(function (success) {
    res.render('./insumo/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los insumo)
// GET /insumo */


router.get('/cargar', function (req, res) {
  var index = Museo.Insumo.build();
  res.render('./insumo/index',{index: index});
});

/* Rutas que terminan en /insumo/:insumoId
// router.route('/insumo/:insumoId')
// PUT /insumo/:insumoId
// Actualiza insumo */

router.put('/:insumoId', function (req, res) {
  var insumo = Museo.Insumo.build();

  insumo.nombreInsumo = req.body.nombreInsumo;
  insumo.contenidoInsumo = req.body.contenidoInsumo;
  insumo.precioCompra = req.body.precioCompra;
  insumo.tipoInsumo = req.body.tipoInsumo;
  insumo.presentacionInsumo = req.body.presentacionInsumo;
  insumo.estadoInsumo = req.body.estadoInsumo;
  

  insumo.updateById(req.params.insumoId, function (success) {
    if (success) {
      res.json({ message: 'Insumo actualizado!' });
    } else {
      res.send(401, 'Insumo no encontrado');
    }
  }, function (error) {
    res.send('Insumo no encontrado');
  });
});

// GET /insumo/:insumoId
// Toma un insumo por id
router.get('/:insumoId', function (req, res) {
  var insumo = Museo.Insumo.build();

  insumo.retrieveById(req.params.insumoId, function (insumo) {
    if (insumo) {
      res.json(insumo);
    } else {
      res.send(401, 'Insumo no encontrado');
    }
  }, function (error) {
    res.send('Insumo no encontrado');
  });
});

// DELETE /insumo/insumoId
// Borra el insumoId
router.delete('/:insumoId', function (req, res) {
  var insumo = Museo.Insumo.build();

 insumo.removeById(req.params.insumoId, function (insumo) {
    if (insumo) {
      res.json({ message: 'Insumo borrado!' });
    } else {
      res.send(401, 'Insumo no encontrado');
    }
  }, function (error) {
    res.send('Insumo no encontrado');
  });
});

module.exports = router;