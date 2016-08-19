'use strict';

// USUARIOS CRUD

// Importar rutas
// ==============================

var Model = require('../../models/jugando.js');

//******************************************
exports.listPag = function (req, res) {
  var stock = Model.Stock.build();
  console.log(req.body);
   //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
         stock.retrieveStock(function (stock) {
            if (stock) {
              res.render('web/stock/success', { 
                stocks: stock,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Insumos');
            }
          }, function (error) {
            res.send('Stock no encontrado');
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
};

//******************************************
exports.listPag2 = function (req, res) {
  var stock = Model.Stock.build();
  console.log(req.body);
   //************************************
  var mensaje = Model.Mensaje.build();
  //************************************
  mensaje.retriveCount(function (mensaje1) { 
    console.log('mensaje1', mensaje1);
    if (mensaje1) {     
      mensaje.retrieveAll(function (mensaje2) {
        console.log('mensaje2', mensaje2);
        if (mensaje2) { 
         stock.retrieveSAnimal(function (stock) {
            if (stock) {
              res.render('web/stock/lista', { 
                stocks: stock,
                mensajes: mensaje1,
                mensajeria: mensaje2
              });
            } else {
              res.send(401, 'No se encontraron Animales');
            }
          }, function (error) {
            res.send('Stock no encontrado');
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
};





/* (trae todos los stock)
// GET /stock */

/* Rutas que terminan en /stock/:stockId
// router.route('/stock/:stockId')
// PUT /stock/:stockId
// Actualiza stock */
/*
router.put('/:stockId', function (req, res) {
  var stock = Museo.Stock.build();

  stock.cantidad = req.body.cantidad;
  stock.lote = req.body.lote;
  stock.cantidadMinima = req.body.cantidadMinima;
  stock.InsumoIdInsumo = req.body.insumoSele;
  

  stock.updateById(req.params.stockId, function (success) {
    if (success) {
      res.redirect('/web/stock');
    } else {
      res.send(401, 'Stock no encontrado');
    }
  }, function (error) {
    res.send('Stock no encontrado');
  });
});

// GET /stock/:stockId
// Toma un stock por id
router.get('/:stockId', function (req, res) {
  var stock = Museo.Stock.build();
  var insumo = Museo.Insumo.build();
  insumo.retrieveAll(function (insumo) {
  if (insumo) {
      stock.retrieveById(req.params.stockId, function (stock) {
        if (stock) {
            res.render('web/stock/edit', {
                          stock:stock,
                          select: insumo
                        });
        } else {
          res.send(401, 'Stock no encontrado');
        }
      }, function (error) {
        res.send('Stock no encontrado');
      });
  } else {
      res.send(401, 'Stock no encontrado');
  }
  }, function (error) {
    res.send('Stock no encontrado');
  });
});

// DELETE /stock/stockId
// Borra el stockId
router.delete('/:stockId', function (req, res) {
  var stock = Museo.Stock.build();

 stock.removeById(req.params.stockId, function (stock) {
    if (stock) {
      res.redirect('/web/stock');
    } else {
      res.send(401, 'Stock no encontrado');
    }
  }, function (error) {
    res.send('Stock no encontrado');
  });
});
*/