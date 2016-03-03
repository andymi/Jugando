'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var express = require('express');
var router = express.Router();

var Museo = require('../../models/jugando.js');

/* Rutas que terminan en /usuario
// router.route('/usuario') */

// POST /usuario
router.post('/cargar', function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var usuario = req.body.usuario;
  var pass = req.body.pass; 
  var NivelIdNivel = req.body.NivelIdNivel; 

  console.log('soy post usuario',usuario);
  console.log('soy post pass',pass);
  console.log('soy post NivelIdNivel',NivelIdNivel);

  var usuario = Museo.Usuario.build({
    usuario: usuario,
    pass: pass,
    NivelIdNivel: NivelIdNivel
  });

  usuario.add(function (success) {
    res.render('./usuario/success');
  },
  function (err) {
    res.send(err);
  });
});

/* (trae todos los usuario)
// GET /usuario */


router.get('/cargar', function (req, res) {
  var usuario = Museo.Usuario.build();
  res.render('./usuario/index',{usuario: usuario});
});

/* Rutas que terminan en /usuario/:usuarioId
// router.route('/usuario/:usuarioId')
// PUT /usuario/:usuarioId
// Actualiza usuario */

router.put('/:usuarioId', function (req, res) {
  var usuario = Museo.Usuario.build();

  usuario.usuario = req.body.usuario;
  usuario.pass = req.body.pass;
  usuario.NivelIdNivel = req.body.NivelIdNivel;
  

  usuario.updateById(req.params.usuarioId, function (success) {
    if (success) {
      res.json({ message: 'Usuario actualizado!' });
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
});

// GET /usuario/:usuarioId
// Toma un usuario por id
router.get('/:usuarioId', function (req, res) {
  var usuario = Museo.Usuario.build();

  usuario.retrieveById(req.params.usuarioId, function (usuario) {
    if (usuario) {
      res.json(usuario);
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
});

// DELETE /usuario/usuarioId
// Borra el usuarioId
router.delete('/:usuarioId', function (req, res) {
  var usuario = Museo.Usuario.build();

 usuario.removeById(req.params.usuarioId, function (usuario) {
    if (usuario) {
      res.json({ message: 'Usuario borrado!' });
    } else {
      res.send(401, 'Usuario no encontrado');
    }
  }, function (error) {
    res.send('Usuario no encontrado');
  });
});

module.exports = router;