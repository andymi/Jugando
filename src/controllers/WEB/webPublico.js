'use strict';

// WEB PUBLICO
// =============================================================================
var express = require('express');
var router = express.Router();

/*
Rutas que terminan en /web
GET /
*/
router.get('/', function (req, res) {
  res.render('publico/home/indexa.jade',{ title: 'Bienvenidos' });
});

router.get('/principal', function (req, res) {
  res.render('web/index/PaginaPrincipal',{ title: 'Bienvenidos' });
});
/*
router.get('/fundacion', function (req, res) {
  res.render('publico/museo/fundacion',{ title: 'Bienvenidos' });
});

router.get('/informacion-practica', function (req, res) {
  res.render('./publico/informacion/informacion-practica',{ title: 'Bienvenidos' });
});

router.get('/horarios-tarifas', function (req, res) {
  res.render('./publico/informacion/horarios-tarifas',{ title: 'Bienvenidos' });
});

router.get('/visitas-guiadas', function (req, res) {
  res.render('./publico/informacion/visitas-guiadas',{ title: 'Bienvenidos' });
});

router.get('/planos', function (req, res) {
  res.render('./publico/informacion/planos',{ title: 'Bienvenidos' });
});

router.get('/normas', function (req, res) {
  res.render('./publico/informacion/normas',{ title: 'Bienvenidos' });
});*/
/* (trae todos los usuarios)
// GET /usuario */


module.exports = router;
