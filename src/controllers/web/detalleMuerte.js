'use strict';

// USUARIOS CRUD

// Importar rutas
// =============================================================================
var Model = require('../../models/jugando.js');

/* Rutas que terminan en /detalleMuerte
// router.route('/detalleMuerte') */
exports.getForm1 = function (req, res) {
  var animal = Model.Animal.build();
  var detalleMuerte = Model.DetalleMuerte.build();
  var muerte = Model.Muertes.build();
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
      muerte.retrieveId(function (muerteQ) {
          if (muerteQ) {      
            console.log('soy muerte retrieveId',muerteQ);
            res.render('web/detalleMuerte/index', {
                            muerteJ:muerteQ,
                            detalleMuerteJ: detalleMuerte,
                            selectJ: animalQ
            });    
          } else {
            res.send(401, 'No se encontraron Muertes');
          }
      });
    }else {
      res.send(401, 'No se Eencontraron Muertes');
    }
  }, function (error) {
    res.send('Detalle Muerte no encontrado');
    }
  );
};
// POST /detalleMuerte
exports.create1 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var muertes =Model.Muertes.build();

  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var MuerteIdMuerte = req.body.id;

  var index = Model.DetalleMuerte.build({
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    MuerteIdMuerte: MuerteIdMuerte
  });

  index.add(function (success) {
    index.retriveCount(MuerteIdMuerte, function (detalleMuertes) {
      if (detalleMuertes) {
        res.redirect('/web/detalleMuerte/cargar'); 
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa');
    });
  },
  function (err) {
    res.send('errores ooooo');
  });
};
/* (trae todos los detalleMuerte)
// GET /detalleMuerte */
exports.readId = function (req, res) {
  var detalleMuerte = Model.DetalleMuerte.build();
  console.log('dentro de get /',req.body);
  detalleMuerte.retrieveAll(req.params.id, function (detalleMuertes) {
    if (detalleMuertes) {
      console.log('dentro de if');
      res.render('web/detalleMuerte/success', { detalleMuertes:detalleMuertes});
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    res.send('DetalleMuertesss no encontrado');
  });
};
//******************************************
exports.getForm2 = function (req, res) {
  var animal =Model.Animal.build();
  var detalleMuerte =Model.DetalleMuerte.build();
  var muerteId = req.params.muerteId;
  animal.retrieveAll(function (animalQ) {
    console.log('animalQ',animalQ);
    if (animalQ) {
            console.log('soy muerte retrieveId',muerteId);
            res.render('web/detalleMuerte/indexa', {
                            muerteJ:muerteId,
                            detalleMuerteJ: detalleMuerte,
                            selectJ: animalQ
            });   
    }else {
      res.send(401, 'No se Eencontraron Muertes');
    }
  }, function (error) {
    res.send('Detalle Muerte no encontrado');
    }
  );
};
// POST /detalleMuerte
exports.create2 = function (req, res) {
  console.log(req.body);
  // bodyParser debe hacer la magia
  var observacion = req.body.observacion; 
  var AnimalIdAnimal = req.body.selectJ;
  var MuerteIdMuerte = req.body.id;

  var index = Model.DetalleMuerte.build({
    observacion: observacion,
    AnimalIdAnimal: AnimalIdAnimal,
    MuerteIdMuerte: MuerteIdMuerte
  });

  index.add(function (success) {
    index.retriveCount(MuerteIdMuerte, function (detalleMuertes) {
      if (detalleMuertes) {
        res.redirect('/web/muertes');
      } else {
        res.send(401, 'No anda tu count amigo');
      }
    },function (err) {
        res.send('errores aaaa');
    });
  },
  function (err) {
    res.send(err);
  });
};
//******************************************
/* Rutas que terminan en /detalleMuerte/:detalleMuerteId
// router.route('/detalleMuerte/:detalleMuerteId')
// PUT /detalleMuerte/:detalleMuerteId
// Actualiza detalleMuerte*/
exports.update = function (req, res) {
  var detalleMuerte = Model.DetalleMuerte.build();

  detalleMuerte.observacion = req.body.observacion;
  detalleMuerte.AnimalIdAnimal = req.body.animalSele;

 detalleMuerte.updateById(req.params.detalleMuerteId, function (success) {
    if (success) {
      res.redirect('/web/muertes');
    } else {
      res.send(401, 'Detalle Muerte Animal no encontrado');
    }
  }, function (error) {
    res.send('Detalle Muerte Animal no encontrado');
  });
};

// GET /detalleMuerte/:detalleMuerteId
// Toma un detalleMuerte por id
exports.read = function (req, res) {
  var detalleMuerte = Model.DetalleMuerte.build();
  var animal = Model.Animal.build();
  animal.retrieveAll(function (animal) {
    if (animal) {  
      detalleMuerte.retrieveById(req.params.detalleMuerteId, function (detalleMuerte) {
        if (detalleMuerte) {
          res.render('web/detalleMuerte/edit', {
                      detalleMuerte:detalleMuerte,
                      select: animal
                    });
        } else {
          res.send(401, 'Detalle Muerte Animal no encontrado');
        }
      }, function (error) {
        res.send('Detalle Muerte Animal no encontrado');
      });
    } else {
      res.send(401, 'No se encontraron Detalles');
    }
  }, function (error) {
    console.log(error);
    res.send('desDetalles no encontrado');
  });

};

// DELETE /detalleMuerte/detalleMuerteId
// Borra el detalleMuerteId
exports.delete = function (req, res) {
  var detalleMuerte = Model.DetalleMuerte.build();
  var variable = req.params.detalleMuerteId;
  console.log("estoy adentro");
  detalleMuerte.retriveCount2(variable, function (detalle) {
    console.log("dentro de count",detalle.MuerteIdMuerte);
    detalleMuerte.removeById(variable, function (eliminar) {
      console.log("dentro de delete");
      detalleMuerte.retriveCount(detalle.MuerteIdMuerte, function (contar) {
        console.log("actualizando");
        res.redirect('/web/muertes');
      }, function (error) {
        res.send('Detalle Muerte Animal no encontrado');
      });
    }, function (error) {
        res.send('mmmmDetalle Muerte Animal no encontrado');
    });
  }, function (error) {
    res.send('Detalle no encontrado');
  });
};