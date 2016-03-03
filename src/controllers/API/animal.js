'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /animal
// router.route('/animal') */

// POST /animal
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var razaAnimal = req.body.razaAnimal;
  var pesoInicial = req.body.pesoInicial;
  var rpAnimal = req.body.rpAnimal;
  var cuernos = req.body.cuernos;
  var sexoAnimal = req.body.sexoAnimal;
  var estado = req.body.estado;
  var numeroTag = req.body.numeroTag;
  var fechaIngreso = req.body.fechaIngreso;

  console.log('soy post razaAnimal',razaAnimal);
  console.log('soy post pesoInicial',pesoInicial);
  console.log('soy post rpAnimal',rpAnimal);
  console.log('soy post cuernos',cuernos);
  console.log('soy post sexoAnimal',sexoAnimal);
  console.log('soy post estado',estado);
  console.log('soy post numeroTag',numeroTag);
  console.log('soy post fechaIngreso',fechaIngreso);

  var animal = Museo.Animal.build({
    razaAnimal: razaAnimal,
    pesoInicial: pesoInicial,    
    rpAnimal: rpAnimal,
    cuernos: cuernos,
    sexoAnimal: sexoAnimal,
    estado : estado,
    numeroTag : numeroTag,
    fechaIngreso : fechaIngreso
  });

  animal.add(function (success) {
    res.render('./animal/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los animales)
// GET /animal */


router.get('/cargar', function (req, res) {
  var animal = Museo.Animal.build();
  res.render('./animal/index',{animal: animal});
});

/* Rutas que terminan en /animal/:animalId
// router.route('/animal/:animalId')
// PUT /animal/:animalId
// Actualiza animal */

router.put('/:animalId', function (req, res) {
  var animal = Museo.Animal.build();

  animal.razaAnimal = req.body.razaAnimal;
  animal.pesoInicial = req.body.pesoInicial;
  animal.rpAnimal = req.body.rpAnimal;
  animal.cuernos = req.body.cuernos;
  animal.sexoAnimal = req.body.sexoAnimal;
  animal.estado = req.body.estado;
  animal.numeroTag = req.body.numeroTag;
  animal.fechaIngreso = req.body.fechaIngreso;

  animal.updateById(req.params.animalId, function (success) {
    if (success) {
      res.json({ message: 'Animal actualizado!' });
    } else {
      res.send(401, 'Animal no encontrado');
    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
});

// GET /animal/:animalId
// Toma un animal por id
router.get('/:animalId', function (req, res) {
  var animal = Museo.Animal.build();

  animal.retrieveById(req.params.animalId, function (animal) {
    if (animal) {
      res.json(animal);
    } else {
      res.send(401, 'Animal no encontrado');
    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
});

// DELETE /animal/animalId
// Borra el animalId
router.delete('/:animalId', function (req, res) {
  var animal = Museo.Animal.build();

 animal.removeById(req.params.animalId, function (animal) {
    if (animal) {
      res.json({ message: 'Animal borrado!' });
    } else {
      res.send(401, 'Animal no encontrado');
    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
});

module.exports = router;