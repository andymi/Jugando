'use strict';

// WEB PUBLICO
// =============================================================================
var express = require('express');
var router = express.Router();
var Model = require('../../models/jugando.js');

/*
Rutas que terminan en /web
GET /
*/
router.get('/', function (req, res) {
  res.render('publico/home/indexa.jade');
});
//página principal del admin, panel de administración
router.get('/principal', function (req, res) {
	var mensaje = Model.Mensaje.build();
  var stock = Model.Stock.build();
  
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) { 		
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) {  
          stock.retrieveAll(function (stockQ) {
            console.log('stockQ', stockQ);
            if (stockQ) {
              stock.retrieveAll2(function (stockN) {
                console.log('stockN', stockN);
                if (stockN) { 
                  stock.retrieveAll3(function (stockL) {
                    console.log('stockL', stockL);
                    if (stockL) { 
                      stock.retrieveAll4(function (stockO) {
                        console.log('stockO', stockO);
                        if (stockO) {              
                          res.render('web/index/PaginaPrincipal',{ 
                            mensajes: mensaje1,
                            mensajeria: mensaje2,
                            stock: stockQ,
                            Stock2: stockN,
                            Vtock3: stockL,
                            Otock4: stockO
                          });
                        } else {
                          res.send(401, 'No se Encontraron Insumos de Medicamento');
                        }
                      }, function (error) {
                        res.send('Insumo de Medicamento no encontrado');
                      });
                    } else {
                      res.send(401, 'No se Encontraron Insumos de Medicamento');
                    }
                  }, function (error) {
                      res.send('Insumo de Medicamento no encontrado');
                  });
                } else {
                  res.send(401, 'No se Encontraron Insumos de Sal');
                }
              }, function (error) {
                res.send('Insumo de Sal no encontrado');
              });
            } else {
              res.send(401, 'No se Encontraron Insumos de Balanceados');
            }
          }, function (error) {
            res.send('Insumo de Balanceado no encontrado');
          });
        }else {
          res.send(401, 'No se encontraron Mensajes');
        }
      }, function (error) {
        res.send('Mensaje no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Mensajes');
    }
  }, function (error) {
    res.send('Mensaje no encontrado');
  });
});

//página principal del capataz
router.get('/capataz', function(req, res) {
 res.send('¡Soy el panel del capataz');
});
/* 
//users page (http://localhost:1337/admin/users)
router.get('/users', function (req, res) {
 res.send('¡Muestro todos los usuarios!');
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
