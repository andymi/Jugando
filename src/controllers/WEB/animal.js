'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================

var Model = require('../../models/jugando');

/* Rutas que terminan en /animal
// router.route('/animal') */

exports.getForm = function (req, res) {
  var animal = Model.Animal.build();
  var raza = Model.Raza.build();
  raza.retrieveAll(function (razaQ) {
    console.log('razaQ',razaQ);
    if (razaQ) {
        res.render('web/animal/index',{
            animal: animal,
            selectJ:razaQ
        });
    }
  }, function (error) {
    res.send('Animal no encontrado');
    }
  );
};


// POST /animal
exports.create = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var pesoInicial = req.body.pesoInicial;
  var rpAnimal = req.body.rpAnimal;
  var cuernos = req.body.cuernos;
  var sexoAnimal = req.body.sexoAnimal;
  var estado ="Activo";
  var numeroTag = req.body.numeroTag;
  var fechaIngreso = req.body.fechaIngreso;
  var RazaIdRaza = req.body.selectJ;

  console.log('soy post pesoInicial',pesoInicial);
  console.log('soy post rpAnimal',rpAnimal);
  console.log('soy post cuernos',cuernos);
  console.log('soy post sexoAnimal',sexoAnimal);
  console.log('soy post estado',estado);
  console.log('soy post numeroTag',numeroTag);
  console.log('soy post fechaIngreso',fechaIngreso);
  console.log('soy post RazaIdRaza',RazaIdRaza);

  var animal = Model.Animal.build({
    pesoInicial: pesoInicial,    
    rpAnimal: rpAnimal,
    cuernos: cuernos,
    sexoAnimal: sexoAnimal,
    estado : estado,
    numeroTag : numeroTag,
    fechaIngreso : fechaIngreso,
    RazaIdRaza : RazaIdRaza
  });

  animal.add(function (success) {
    res.redirect('/web/animal');
  },
  function (err) {
    res.send(err);
  });
};

/* (trae todos los animales)
// GET /animal */
exports.listPag = function (req, res) {
  var animal = Model.Animal.build();
  console.log(req.body);
  animal.retrieveAll(function (animales) {
    if (animales) {
      res.render('web/animal/success', { animales: animales});
    } else {
      res.send(401, 'No se encontraron Animales');
    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
};

/* Rutas que terminan en /animal/:animalId
// router.route('/animal/:animalId')
// PUT /animal/:animalId
// Actualiza animal */

exports.update = function (req, res) {
  var animal = Model.Animal.build();
  console.log('ingresa al put', req.body);

  animal.idAnimal = req.body.idAnimal;
  animal.pesoInicial = req.body.pesoInicial;
  animal.rpAnimal = req.body.rpAnimal;
  animal.cuernos = req.body.cuernos;
  animal.sexoAnimal = req.body.sexoAnimal;
  animal.estado = req.body.estado;
  animal.numeroTag = req.body.numeroTag;
  animal.fechaIngreso = req.body.fechaIngreso;  
  animal.RazaIdRaza= req.body.razaSele;

  console.log('soy post idAnimal',req.body.idAnimal);
  console.log('soy post pesoInicial',req.body.pesoInicial);
  console.log('soy post rpAnimal',req.body.rpAnimal);
  console.log('soy post cuernos',req.body.cuernos);
  console.log('soy post sexoAnimal',req.body.sexoAnimal);
  console.log('soy post estado',req.body.estado);
  console.log('soy post numeroTag',req.body.numeroTag);
  console.log('soy post fechaIngreso',req.body.fechaIngreso);
  console.log('soy post RazaIdRaza',req.body.RazaIdRaza);

  console.log('ingresa al put: pre update');

  animal.updateById(req.params.animalId, function (success) {
    console.log('soy success',success);
    if (success) {
      console.log('redirigiendo a /web/animal');

      res.redirect('/web/animal');
      //res.json({ message: 'Animal actualizado!' });
    } else {
      console.log(success);
      res.send(401, 'Animal no encontrado');
    }
  }, function (error) {
    console.log(error);
    res.send('Animal no encontrado');
  });
};

// GET /animal/:animalId
// Toma un animal por id
exports.read = function (req, res) {
  var animal = Model.Animal.build();
  console.log('editar:*****************');
  console.log(req.params);
  var raza = Model.Raza.build();
  raza.retrieveAll(function (raza) {
  if (raza) {
        animal.retrieveById(req.params.animalId, function (animaloq) {
          if (animaloq) {

            console.log('dentro de editar:*****************');
            res.render('web/animal/edit', {
                    animal:animaloq,
                    select: raza
            });

            //res.json(animal);
          } else {
             console.log('dentro de else:*****************');
            res.send(401, 'Animal no encontrado');
          }
        }, function (error) {
          res.send('Animal no encontrado');
        });
      } else {
      res.send(401, 'No se encontraron Razas');
    }
  }, function (error) {
    console.log(error);
    res.send('Raza no encontrado');
  });
};

// DELETE /animal/animalId
// Borra el animalId
exports.delete = function (req, res) {
 var animal = Model.Animal.build();
 console.log('dentro de delete:*****************');
 animal.removeById(req.params.animalId, function (animal) {
    if (animal) {
     // res.json({ message: 'Animal borrado!' });
      console.log('dentro de borrar:*****************');
      res.redirect('/web/animal');
    } else {
      res.send(401, 'Animal no encontrado');
    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
};
