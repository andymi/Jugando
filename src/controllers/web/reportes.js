'use strict';

// WEB PUBLICO
// =============================================================================
var express = require('express');
var router = express.Router();
var request = require('request');
var Model = require('../../models/jugando.js');
/*******************************************************************************/
router.get('/animal/:animalId', function (req, res) {
  var animals = Model.Animal.build();
  //************************************
  animals.retrieveById(req.params.animalId, function (animales) {
    if (animales) {
        console.log('razaQ',animales);
        console.log('id-------------',animales.idAnimal);
        console.log('peso-------------',animales.pesoInicial);
        console.log('rpAnimal-------------',animales.rpAnimal);
        console.log('cuernos-------------',animales.cuernos);
        console.log('sexo-------------',animales.sexoAnimal);
        console.log('tag-------------',animales.numeroTag);      
        console.log('fecha-------------',animales.fechaIngreso);
      
        var peso = animales.pesoInicial;
        var rpAnimal = animales.rpAnimal;
        var cuernos = animales.cuernos;
        var sexo = animales.sexoAnimal;
        var tag = animales.numeroTag;      
        var fecha = animales.fechaIngreso;
      
        var report={
            template:{'shortid':'S1TxyveMl'},
            data:{
              "animal": [
                {"rp": rpAnimal, "cuerno": cuernos, "peso": peso,"sexo": sexo,"tag": tag,"fecha": fecha}
              ]
            },
            options:{
              preview:true
            }
        }
        var options ={
          uri: 'http://localhost:2000/api/report',
          method:'POST',
          json: report
        }
        request(options).pipe(res);
      
    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
});
/*******************************************************************************/
router.get('/compra/:facturaCompraId', function (req, res) {
  var compras = Model.FacturaCompra.build();
  //************************************
  compras.retrieveById(req.params.facturaCompraId, function (comprando) {
    if (comprando) {
        console.log('razaQ',comprando);
        console.log('id-------------',comprando.fechaCompra);
        console.log('peso-------------',comprando.horaCompra);
        console.log('rpAnimal-------------',comprando.totalCompra);
        console.log('cuernos-------------',comprando.condicionCompra);
        console.log('sexo-------------',comprando.formaPago);
        console.log('tag-------------',comprando.numeroCompra);
      
        var fecha = comprando.fechaCompra;        
        var condicion = comprando.condicionCompra;        
        var forma = comprando.formaPago;  
        var cantidad = comprando.cantidadTotalCompra;
        var total = comprando.totalCompra;    

        var id = comprando.numeroCompra;
      
        var report={
            template:{'shortid':'rJC_QZMzg'},
            data:{
              "compra": [
                {"fecha": fecha, "condicion": condicion, "forma": forma,"total": cantidad,"monto": total}
              ],
              "id": id
            },
            options:{
              preview:true
            }
        }
        var options ={
          uri: 'http://localhost:2000/api/report',
          method:'POST',
          json: report
        }
        request(options).pipe(res);
      
    }
  }, function (error) {
    res.send('Compra no encontrado');
  });
});
/*******************************************************************************/
router.get('/venta/:facturaVentaId', function (req, res) {
  var ventas = Model.FacturaVenta.build();
  //************************************
  ventas.retrieveById(req.params.facturaVentaId, function (facturaVenta) {
      if (facturaVenta) {
        console.log('razaQ',facturaVenta);
        console.log('id-------------',facturaVenta.fechaVenta);
        console.log('peso-------------',facturaVenta.horaVenta);
        console.log('rpAnimal-------------',facturaVenta.totalVenta);
        console.log('cuernos-------------',facturaVenta.condicionVenta);
        console.log('sexo-------------',facturaVenta.formaCobro);
        console.log('tag-------------',facturaVenta.numeroVenta);
      
        var fecha = facturaVenta.fechaVenta;        
        var condicion = facturaVenta.condicionVenta;        
        var forma = facturaVenta.formaCobro;  
        var cantidad = facturaVenta.cantidadTotalVenta;
        var total = facturaVenta.totalVenta;    

        var id = facturaVenta.numeroVenta;
      
        var report={
            template:{'shortid':'BkTibGfGl'},
            data:{
              "venta": [
                {"fecha": fecha, "condicion": condicion, "forma": forma,"total": cantidad,"monto": total}
              ],
              "id": id
            },
            options:{
              preview:true
            }
        }
        var options ={
          uri: 'http://localhost:2000/api/report',
          method:'POST',
          json: report
        }
        request(options).pipe(res);
      
    }
  }, function (error) {
    res.send('Venta no encontrado');
  });
});
/*******************************************************************************/
router.get('/consumo', function (req, res, next) {
  var consumo = Model.Consumo.build();
  var detalleConsumo = Model.DetalleConsumo.build();
  /************************************/
  consumo.retrieveAll(function (consumo) {
    if (consumo) {
      console.log('consumo----------------',consumo);
      detalleConsumo.retrieveAll(consumo[0].idConsumo, function (detalleConsumos) {
        if (detalleConsumos) {
          for (var i in detalleConsumos) {
            console.log('detalleConsumo----------------',detalleConsumos);
            var a= consumo[0].fechaConsumo; 
            var d= consumo[0].horaConsumo;               
            var c= consumo[0].Insumo.nombreInsumo; 
            var b= detalleConsumos[i].cantidad; 

            var report={
                template:{'shortid':'S1oQ3SQfl'},
                data:{
                  "consumo": [
                    {"fecha":a , "hora":d,  "insumo": c, "cantidad": b}
                  ]
                },
                options:{
                  preview:true
                }
            }
            var options ={
              uri: 'http://localhost:2000/api/report',
              method:'POST',
              json: report
            }
          }
        }
        request(options).pipe(res); 
      }, function (error) {
        res.send('Detalle no encontrado');
      });
    }
  }, function (error) {
    res.send('Consumo no encontrado');
  });
});
module.exports = router;
