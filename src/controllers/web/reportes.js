'use strict';

// WEB PUBLICO
// =============================================================================
var express = require('express');
var router = express.Router();
var Model = require('../../models/jugando.js');
//==============================================================================
var fs = require('fs');
var PDFDocument = require('pdfkit');
//==============================================================================
var animals = Model.Animal.build();
var cliente = Model.Cliente.build();
var pesajes = Model.Pesaje.build();
var detallePesajes = Model.DetallePesaje.build();
var sanitacion = Model.Sanitacion.build();
var detalleSanitacion = Model.DetalleSanitacion.build();
var consumo = Model.Consumo.build();
var detalleConsumo = Model.DetalleConsumo.build();
var extraviado = Model.Extraviado.build();
var empleado = Model.Empleado.build();
var muertes = Model.Muertes.build();
var vacunacion = Model.Vacunacion.build();
var detalleVacunacion = Model.DetalleVacunacion.build();
var compras = Model.FacturaCompra.build();
var ventas = Model.FacturaVenta.build();
var insumo = Model.Insumo.build();
var herramienta = Model.Herramienta.build();
var proveedor = Model.Proveedor.build();
var stock = Model.Stock.build();
var ingresoA = Model.IngresoAnimal.build();
var salidaA = Model.SalidaAnimal.build();
var ingresoC = Model.IngresoCorral.build();
var traslado = Model.Traslado.build();
var detalleIngresoAnimal = Model.DetalleIngresoAnimal.build();
var detalleSalidaAnimal = Model.DetalleSalidaAnimal.build();

//listado completo 
/******************************imprimir listado de animales*************************************************/
router.get('/animal', function (req, res) {  
  animals.retrieveAll(function (animales) {
    if (animales) {
      console.log('dentro de 1 if'); 
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Listado Completo de Animales',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Listado Completo de Animales', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
      
      for (var i in animales) {
        console.log('id-------------', animales[i].idAnimal);
        console.log('peso-------------',animales[i].pesoInicial);
        console.log('rpAnimal-------------',animales[i].rpAnimal);
        console.log('cuernos-------------',animales[i].cuernos);
        console.log('sexo-------------',animales[i].sexoAnimal);
        console.log('tag-------------',animales[i].numeroTag);      
        console.log('fecha-------------',animales[i].fechaIngreso);
        console.log('raza-------------',animales[i].Raza.raza);
        
       pdf.font('Times-Roman', 11)
           .moveDown(0.8)
           .text('Número de Etiqueta:');

        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales[i].numeroTag, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
           .text('Raza:');

        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales[i].Raza.raza, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
         .text('Rp del Animal:'); 

        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales[i].rpAnimal, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
         .text('Peso Inicial:');
      
        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales[i].pesoInicial, {
            align: 'left',
            indent: 100
        });   

        pdf.font('Times-Roman', 11)
         .text('Cuernos:');
         
        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales[i].cuernos, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
         .text('Sexo:');
       
        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales[i].sexoAnimal, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
         .text('Fecha de Ingreso:'); 

        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales[i].fechaIngreso, {
            align: 'left',
            indent: 100
        });
        pdf.font('Times-Roman', 15)
         .text('----------------------------------------------------------------------------------');
      }
      // Stream contents to a file
      pdf.pipe(res);
      

      // Close PDF and write file.
      pdf.end();

    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
});
/******************************imprimir listado de pesajes*************************************************/
router.get('/pesaje', function (req, res) { 
  console.log('dentro de pesaje'); 
  pesajes.retrieveReporteTodo(function (pesajess) {
    if (pesajess) {
      console.log('dentro de 1 if'); 
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Listado Completo de Pesajes',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Listado Completo de Pesajes', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
      
      for (var i in pesajess) {
          console.log('fechaPesaje-------------', pesajess[i].fechaPesaje);
          console.log('horaPesaje-------------',pesajess[i].horaPesaje);        
          console.log('nombreEmpleado-------------',pesajess[i].Empleado.nombreEmpleado);
          console.log('pesajeTotal-------------',pesajess[i].pesajeTotal);
          
          

          pdf.font('Times-Roman', 11)
             .text('Fecha:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(pesajess[i].fechaPesaje, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Hora:'); 

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(pesajess[i].horaPesaje, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Pesaje Total:');
           
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(pesajess[i].pesajeTotal, {
              align: 'left',
              indent: 100
          });  

          pdf.font('Times-Roman', 11)
           .text('Empleado:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(pesajess[i].Empleado.nombreEmpleado, {
              align: 'left',
              indent: 100
          }); 

          pdf.font('Times-Roman', 15)
           .text('----------------------------------------------------------------------------------');
      }
      // Stream contents to a file
      pdf.pipe(res);

      // Close PDF and write file.
      pdf.end();
    }
  }, function (error) {
    res.send('Pesaje no encontrado');
  });
});
/******************************imprimir listado de sanitacion*************************************************/
router.get('/sanitacion', function (req, res) { 
  console.log('dentro de sanitacion'); 
  sanitacion.retrieveTodo(function (sanitacionss) {
    if (sanitacionss) {
      console.log('dentro de 1 if'); 
      
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Sanitaciones',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });

          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });


          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Sanitaciones', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });
          
          for (var i in sanitacionss) {
              console.log('fechaSanitacion-------------', sanitacionss[i].fechaSanitacion);
              console.log('horaSanitacion-------------',sanitacionss[i].horaSanitacion);
              console.log('horaSanitacion-------------',sanitacionss[i].observacion);        
              console.log('cantidadTotal-------------',sanitacionss[i].cantidadTotal);      
              console.log('nombreEmpleado-------------',sanitacionss[i].Empleado.nombreEmpleado);              
              console.log('nombreProveedor-------------',sanitacionss[i].Proveedor.nombreProveedor);
              
              

              pdf.font('Times-Roman', 11)
                 .text('Fecha:');

              pdf.font('Times-Roman', 10)
                 .moveUp()
                 .text(sanitacionss[i].fechaSanitacion, {
                  align: 'left',
                  indent: 100
              });

              pdf.font('Times-Roman', 11)
               .text('Hora:'); 

              pdf.font('Times-Roman', 10)
                 .moveUp()
                 .text(sanitacionss[i].horaSanitacion, {
                  align: 'left',
                  indent: 100
              });

              pdf.font('Times-Roman', 11)
               .text('Observación:'); 

              pdf.font('Times-Roman', 10)
                 .moveUp()
                 .text(sanitacionss[i].observacion, {
                  align: 'left',
                  indent: 100
              }); 

              pdf.font('Times-Roman', 11)
               .text('Cantidad Total:'); 

              pdf.font('Times-Roman', 10)
                 .moveUp()
                 .text(sanitacionss[i].cantidadTotal, {
                  align: 'left',
                  indent: 100
              });  

              pdf.font('Times-Roman', 11)
               .text('Empleado:');
            
              pdf.font('Times-Roman', 10)
                 .moveUp()
                 .text(sanitacionss[i].Empleado.nombreEmpleado, {
                  align: 'left',
                  indent: 100
              });

              pdf.font('Times-Roman', 11)
               .text('Veterinario:');
            
              pdf.font('Times-Roman', 10)
                 .moveUp()
                 .text(sanitacionss[i].Proveedor.nombreProveedor, {
                  align: 'left',
                  indent: 100
              }); 

              pdf.font('Times-Roman', 15)
               .text('----------------------------------------------------------------------------------');
          }
          
          // Stream contents to a file
          pdf.pipe(res);

          // Close PDF and write file.
          pdf.end();
        }
      }, function (error) {
        res.send('Sanitacion no encontrado');
      });
});
/******************************imprimir listado de consumos*************************************************/
router.get('/consumo', function (req, res) { 
  console.log('dentro de consumo'); 
    consumo.retrieveTodo(function (consumoss) {
      if (consumoss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Consumos',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Consumos', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in consumoss) {
  
            pdf.font('Times-Roman', 11)
               .text('Fecha:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(consumoss[i].fechaConsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(consumoss[i].horaConsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Kilos Consumidos:'); 

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(consumoss[i].cantidadTotal, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Insumo:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(consumoss[i].Insumo.nombreInsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Consumo no encontrado');
  });    
});
/******************************imprimir listado de extraviados*************************************************/
router.get('/extraviado', function (req, res) { 
  console.log('dentro de extraviado'); 
    extraviado.retrieveAll(function (extraviadoss) {
      if (extraviadoss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Animales Extraviados',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Animales Extraviados', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in extraviadoss) {
  
            pdf.font('Times-Roman', 11)
               .text('Fecha:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(extraviadoss[i].fechaExtraviado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(extraviadoss[i].horaExtraviado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Lugar del Extravío:'); 

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(extraviadoss[i].lugarExtraviado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Cantidad Extraviada:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(extraviadoss[i].cantidadTotal, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Empleado a Cargo:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(extraviadoss[i].Empleado.nombreEmpleado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Extraviado no encontrado');
  });    
});
/******************************imprimir listado de muertos*************************************************/
router.get('/muertes', function (req, res) { 
  console.log('dentro de muertes'); 
    muertes.retrieveAll(function (muertess) {
      if (muertess) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Animales Muertos',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Animales Muertos', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in muertess) {
  
            pdf.font('Times-Roman', 11)
               .text('Fecha:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(muertess[i].fechaMuerte, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(muertess[i].horaMuerte, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Cantidad de Muertos:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(muertess[i].cantidadTotal, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Empleado a Cargo:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(muertess[i].Empleado.nombreEmpleado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Veterinario:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(muertess[i].Proveedor.nombreProveedor, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Muertos no encontrado');
  });    
});
/******************************imprimir listado de vacunacion*************************************************/
router.get('/vacunacion', function (req, res) { 
  console.log('dentro de vacunacion'); 
    vacunacion.retrieveAll(function (vacunacionss) {
      if (vacunacionss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Animales Vacunados',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Animales Vacunados', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in vacunacionss) {
  
            pdf.font('Times-Roman', 11)
               .text('Fecha:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(vacunacionss[i].fechaVacunacion, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(vacunacionss[i].horaVacunacion, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Cantidad:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(vacunacionss[i].cantidadTotal, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Veterinario:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(vacunacionss[i].Proveedor.nombreProveedor, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });    
});
/******************************imprimir listado de compras*************************************************/
router.get('/compras', function (req, res) { 
  console.log('dentro de compras'); 
    compras.retrieveTodo(function (comprass) {
      if (comprass) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Compras Realizadas',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Compras Realizadas', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in comprass) {
            pdf.font('Times-Roman', 11)
             .text('Nº de Compra:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(comprass[i].numeroCompra, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Fecha:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(comprass[i].fechaCompra, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(comprass[i].horaCompra, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Monto Total:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(comprass[i].totalCompra, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Condición:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(comprass[i].condicionCompra, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Forma de Pago:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(comprass[i].formaPago, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Proveedor:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(comprass[i].Proveedor.nombreProveedor, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Compras no encontrado');
  });    
});
/******************************imprimir listado de ventas*************************************************/
router.get('/ventas', function (req, res) { 
  console.log('dentro de ventas'); 
    ventas.retrieveAll(function (ventass) {
      if (ventass) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Ventas Emitidas',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Ventas Emitidas', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in ventass) {
            pdf.font('Times-Roman', 11)
             .text('Nº de Venta:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ventass[i].numeroVenta, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Fecha:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ventass[i].fechaVenta, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ventass[i].horaVenta, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Monto Total:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ventass[i].totalVenta, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Condición:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ventass[i].condicionVenta, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Forma de Pago:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ventass[i].formaCobro, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Cliente:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ventass[i].Cliente.nombreCliente, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Ventas no encontrado');
  });    
});
/******************************imprimir listado de clientes*************************************************/
router.get('/cliente', function (req, res) { 
  console.log('dentro de cliente'); 
    cliente.retrieveAll(function (clientess) {
      if (clientess) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Clientes',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Clientes', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in clientess) {
            pdf.font('Times-Roman', 11)
             .text('R.U.C.:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(clientess[i].rucCliente, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Nombre:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(clientess[i].nombreCliente, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Dirección:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(clientess[i].direccionCliente, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Ciudad:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(clientess[i].Ciudad.ciudad, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Cliente no encontrado');
  });    
});
/******************************imprimir listado de clientes*************************************************/
router.get('/empleado', function (req, res) { 
  console.log('dentro de empleado'); 
    empleado.retrieveAll(function (empleadoss) {
      if (empleadoss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Empleados',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Empleados', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in empleadoss) {
            pdf.font('Times-Roman', 11)
             .text('Código de la Llave:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(empleadoss[i].codigoLlave, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Nombre:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(empleadoss[i].nombreEmpleado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Dirección:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(empleadoss[i].direccionEmpleado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Ciudad:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(empleadoss[i].Ciudad.ciudad, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Empleado no encontrado');
  });    
});
/******************************imprimir listado de insumos*************************************************/
router.get('/insumo', function (req, res) { 
  console.log('dentro de insumo'); 
    insumo.retrieveAll(function (insumoss) {
      if (insumoss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Insumos',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Insumos', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in insumoss) {
            pdf.font('Times-Roman', 11)
             .text('Código de Barra:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(insumoss[i].codigoBarra, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Nombre:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(insumoss[i].nombreInsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Contenido:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(insumoss[i].contenidoInsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Tipo de Insumo:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(insumoss[i].tipoInsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Presentación:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(insumoss[i].presentacionInsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
             .text('Precio de Compra:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(insumoss[i].precioCompra, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Insumo no encontrado');
  });    
});
/******************************imprimir listado de herramientas*************************************************/
router.get('/herramienta', function (req, res) { 
  console.log('dentro de herramienta'); 
    herramienta.retrieveAll(function (herramientass) {
      if (herramientass) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Herramientas',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Herramientas', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in herramientass) {
            pdf.font('Times-Roman', 11)
             .text('Nombre:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(herramientass[i].nombre, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Vida Útil:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(herramientass[i].vidaUtil, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Mantenimiento:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(herramientass[i].mantenimiento, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Herramienta no encontrado');
  });    
});
/******************************imprimir listado de proveedor*************************************************/
router.get('/proveedor', function (req, res) { 
  console.log('dentro de proveedor'); 
    proveedor.retrieveAll(function (proveedorss) {
      if (proveedorss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de Proveedores',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de Proveedores', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in proveedorss) {
            pdf.font('Times-Roman', 11)
             .text('R.U.C.:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(proveedorss[i].rucProveedor, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Nombre:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(proveedorss[i].nombreProveedor, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Dirección:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(proveedorss[i].direccionProveedor, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Tipo de Proveedor:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(proveedorss[i].tipoProveedor, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Ciudad:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(proveedorss[i].Ciudad.ciudad, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Proveedor no encontrado');
  });    
});
/******************************imprimir listado de stock de insumos*************************************************/
router.get('/stock', function (req, res) { 
  console.log('dentro de stock'); 
    stock.retrieveStock(function (stockss) {
      if (stockss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Stock Completo de Insumos',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Stock Completo de Insumos', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in stockss) {
            pdf.font('Times-Roman', 11)
             .text('Insumo:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(stockss[i].Insumo.nombreInsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Cantidad:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(stockss[i].cantidad, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Cantidad Mínima:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(stockss[i].cantidadMinima, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Stock no encontrado');
  });    
});
/******************************imprimir listado de stock de Animales*************************************************/
router.get('/stockAnimal', function (req, res) { 
  console.log('dentro de stock'); 
    stock.retrieveSAnimal(function (stockss) {
      if (stockss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Stock Completo de Animales',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Stock Completo de Animales', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in stockss) {
            pdf.font('Times-Roman', 11)
             .text('Raza:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(stockss[i].Raza.raza, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Cantidad:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(stockss[i].cantidad, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Stock no encontrado');
  });    
});
/******************************imprimir listado de ingreso de Animales*************************************************/
router.get('/ingresoAnimal', function (req, res) { 
  console.log('dentro de ingreso'); 
    ingresoA.retrieveAll(function (ingresoss) {
      if (ingresoss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo del Ingreso de Animales',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo del Ingreso de Animales', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in ingresoss) {
            pdf.font('Times-Roman', 11)
             .text('Fecha:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ingresoss[i].fechaEntrada, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ingresoss[i].horaEntrada, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Cantidad:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ingresoss[i].cantidadEntrada, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Observación:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ingresoss[i].observacion, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Ingreso no encontrado');
  });    
});
/******************************imprimir listado de salida de Animales*************************************************/
router.get('/salidaAnimal', function (req, res) { 
  console.log('dentro de salida'); 
    salidaA.retrieveAll(function (salidass) {
      if (salidass) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo de la Salida de Animales',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo de la Salida de Animales', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in salidass) {
            pdf.font('Times-Roman', 11)
             .text('Fecha:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(salidass[i].fechaSalida, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(salidass[i].horaSalida, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Cantidad:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(salidass[i].cantidadSalida, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Observación:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(salidass[i].observacion, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Salida no encontrado');
  });    
});
/******************************imprimir listado de ingreso de Empleadoss*************************************************/
router.get('/ingresoEmpleado', function (req, res) { 
  console.log('dentro de ingreso'); 
    ingresoC.retrieveAll(function (ingresoss) {
      if (ingresoss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo del Ingreso de Empleados',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo del Ingreso de Empleados', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in ingresoss) {
            pdf.font('Times-Roman', 11)
             .text('Fecha:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ingresoss[i].fechaIngreso, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Hora:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ingresoss[i].horaIngreso, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Empleado:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ingresoss[i].Empleado.nombreEmpleado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Observación:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(ingresoss[i].observacionIngreso, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Ingreso no encontrado');
  });    
});
/******************************imprimir listado de traslados*************************************************/
router.get('/traslado', function (req, res) { 
  console.log('dentro de traslado'); 
    traslado.retrieveAll(function (trasladoss) {
      if (trasladoss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Listado Completo del Traslado',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Listado Completo del Traslado', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in trasladoss) {
            pdf.font('Times-Roman', 11)
             .text('Fecha:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(trasladoss[i].fechaTraslado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Nº de RUA:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(trasladoss[i].numeroRUA, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Marca:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(trasladoss[i].marcaAuto, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Empleado:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(trasladoss[i].Empleado.nombreEmpleado, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Traslado no encontrado');
  });    
});
/******************************imprimir listado de stock minimo*************************************************/
router.get('/stockMinimo', function (req, res) { 
  console.log('dentro de stock'); 
    stock.retrieveMinimo(function (stockss) {
      if (stockss) {
          console.log('dentro de 1 if');       
          var pdf = new PDFDocument({
            size: 'LEGAL', 
              info: {
              Title: 'Stock Mínimo de Insumos',
              Author: 'AndyFor',
              CreationDate: new Date().toJSON().slice(0,10)
            }
          });
              
          pdf.font('Times-Roman', 8)
             .moveUp(2.0)
             .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
               align: 'right'
          });
          pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
            width: 75
          });
          pdf.font('Times-Roman', 20)
             .moveDown(0.5)
             .text('GANADERA BONANZA', {
               align: 'center'
             });
          pdf.font('Times-Roman', 10)
             .moveDown(0.5)
             .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('San Ignacio Misiones, Paraguay', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 10)
             .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
             });
          pdf.font('Times-Roman', 15)
             .moveDown(1.0)
             .text('Stock Mínimo de Insumos', {
               width: 412,
               align: 'center',
               indent: 30,
               height: 300,
               underline: true
             });          
          for (var i in stockss) {
            pdf.font('Times-Roman', 11)
             .text('Insumo:');
          
            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(stockss[i].Insumo.nombreInsumo, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Cantidad:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(stockss[i].cantidad, {
                align: 'left',
                indent: 100
            });

            pdf.font('Times-Roman', 11)
               .text('Presentación:');

            pdf.font('Times-Roman', 10)
               .moveUp()
               .text(stockss[i].Insumo.presentacionInsumo, {
                align: 'left',
                indent: 100
            });


            pdf.font('Times-Roman', 15)
             .text('----------------------------------------------------------------------------------'); 
          } 
          pdf.pipe(res);
          pdf.end();                  
      }
  }, function (error) {
    res.send('Stock no encontrado');
  });    
});

//listado individual
/******************************imprimir registro del animal*************************************************/
router.get('/animal/:animalId', function (req, res) {  
  animals.retrieveByRp(req.params.animalId, function (animales) {
    if (animales) {
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Registro del Animal',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Registro del Animal', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
      
        console.log('id-------------', animales.idAnimal);
        console.log('peso-------------',animales.pesoInicial);
        console.log('rpAnimal-------------',animales.rpAnimal);
        console.log('cuernos-------------',animales.cuernos);
        console.log('sexo-------------',animales.sexoAnimal);
        console.log('tag-------------',animales.numeroTag);      
        console.log('fecha-------------',animales.fechaIngreso);
        console.log('raza-------------',animales.Raza.raza);
        
        pdf.font('Times-Roman', 11)
           .moveDown(0.8)
           .text('Número de Etiqueta:');

        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales.numeroTag, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
           .text('Raza:');

        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales.Raza.raza, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
         .text('Rp del Animal:'); 

        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales.rpAnimal, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
         .text('Peso Inicial:');
      
        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales.pesoInicial, {
            align: 'left',
            indent: 100
        });   

        pdf.font('Times-Roman', 11)
         .text('Cuernos:');
         
        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales.cuernos, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
         .text('Sexo:');
       
        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales.sexoAnimal, {
            align: 'left',
            indent: 100
        });

        pdf.font('Times-Roman', 11)
         .text('Fecha de Ingreso:'); 

        pdf.font('Times-Roman', 10)
           .moveUp()
           .text(animales.fechaIngreso, {
            align: 'left',
            indent: 100
        });
        pdf.font('Times-Roman', 12)
         .text('-------------------------------------Fin del Registro---------------------------------------------');
      // Stream contents to a file
      pdf.pipe(res);

      // Close PDF and write file.
      pdf.end();

    }
  }, function (error) {
    res.send('Animal no encontrado');
  });
});
/******************************imprimir registro de pesaje por animal*************************************************/
router.get('/pesaje/:animalId', function (req, res) {  
  detallePesajes.retrieveByRp(req.params.animalId, function (animales) {
    if (animales) {
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Registro de pesajes del Animal',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Registro de pesajes del Animal', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
        for (var i in animales) {
          console.log('id-------------', animales);
          
          pdf.font('Times-Roman', 11)
             .moveDown(0.8)
             .text('Fecha:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Pesaje.fechaPesaje, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
             .text('Hora:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Pesaje.horaPesaje, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Rp del Animal:'); 

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Animal.rpAnimal, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Peso Inicial:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Animal.pesoInicial, {
              align: 'left',
              indent: 100
          });   

          pdf.font('Times-Roman', 11)
           .text('Pesaje del Dia:');
           
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].peso, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 15)
           .text('----------------------------------------------------------------------------------');
        }
      // Stream contents to a file
      pdf.pipe(res);

      // Close PDF and write file.
      pdf.end();

    }
  }, function (error) {
    res.send('Pesaje no encontrado');
  });
});
/******************************imprimir registro de sanitacion por animal*************************************************/
router.get('/sanitacion/:animalId', function (req, res) {  
  detalleSanitacion.retrieveByRp(req.params.animalId, function (animales) {
    if (animales) {
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Registro de sanitación del Animal',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Registro de sanitación del Animal', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
        for (var i in animales) {
          console.log('id-------------', animales);
          
          pdf.font('Times-Roman', 11)
             .moveDown(0.8)
             .text('Fecha:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Sanitacion.fechaSanitacion, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
             .text('Hora:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Sanitacion.horaSanitacion, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Rp del Animal:'); 

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Animal.rpAnimal, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Observación:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].observacionSanitacion, {
              align: 'left',
              indent: 100
          });   

          pdf.font('Times-Roman', 15)
           .text('----------------------------------------------------------------------------------');
        }
      // Stream contents to a file
      pdf.pipe(res);

      // Close PDF and write file.
      pdf.end();

    }
  }, function (error) {
    res.send('Sanitacion no encontrado');
  });
});
/******************************imprimir registro de consumo por animal*************************************************/
router.get('/consumo/:animalId', function (req, res) {  
  detalleConsumo.retrieveByRp(req.params.animalId, function (animales) {
    if (animales) {
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Registro de consumo del Animal',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Registro de consumo del Animal', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
        for (var i in animales) {
          console.log('id-------------', animales);
          
          pdf.font('Times-Roman', 11)
             .moveDown(0.8)
             .text('Fecha:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Consumo.fechaConsumo, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
             .text('Hora:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Consumo.horaConsumo, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Rp del Animal:'); 

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Animal.rpAnimal, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Cantidad Consumida:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].cantidad, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Observación:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].observacion, {
              align: 'left',
              indent: 100
          });  

          pdf.font('Times-Roman', 15)
           .text('----------------------------------------------------------------------------------');
        }
      // Stream contents to a file
      pdf.pipe(res);

      // Close PDF and write file.
      pdf.end();

    }
  }, function (error) {
    res.send('Consumo no encontrado');
  });
});
/******************************imprimir registro de vacunacion por animal*************************************************/
router.get('/vacunacion/:animalId', function (req, res) {  
  detalleVacunacion.retrieveByRp(req.params.animalId, function (animales) {
    if (animales) {
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Registro de vacunacion del Animal',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Registro de vacunación del Animal', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
        for (var i in animales) {
          console.log('id-------------', animales);
          
          pdf.font('Times-Roman', 11)
             .moveDown(0.8)
             .text('Fecha:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Vacunacion.fechaVacunacion, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
             .text('Hora:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Vacunacion.horaVacunacion, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Rp del Animal:'); 

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Animal.rpAnimal, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Nº del Certificado:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].numeroCertificado, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Observación:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].observacion, {
              align: 'left',
              indent: 100
          });  

          pdf.font('Times-Roman', 15)
           .text('----------------------------------------------------------------------------------');
        }
      // Stream contents to a file
      pdf.pipe(res);

      // Close PDF and write file.
      pdf.end();

    }
  }, function (error) {
    res.send('Vacunacion no encontrado');
  });
});
/******************************imprimir registro de ingreso por animal*************************************************/
router.get('/ingresoA/:animalId', function (req, res) {  
  detalleIngresoAnimal.retrieveByRp(req.params.animalId, function (animales) {
    if (animales) {
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Registro de ingresos del Animal',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Registro de ingresos del Animal', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
        for (var i in animales) {
          console.log('id-------------', animales);
          
          pdf.font('Times-Roman', 11)
             .moveDown(0.8)
             .text('Fecha:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].IngresoAnimal.fechaEntrada, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
             .text('Hora:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].IngresoAnimal.horaEntrada, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Rp del Animal:'); 

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Animal.rpAnimal, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Observación:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].observacion, {
              align: 'left',
              indent: 100
          });  

          pdf.font('Times-Roman', 15)
           .text('----------------------------------------------------------------------------------');
        }
      // Stream contents to a file
      pdf.pipe(res);

      // Close PDF and write file.
      pdf.end();

    }
  }, function (error) {
    res.send('Ingreso Animal no encontrado');
  });
});
/******************************imprimir registro de salida por animal*************************************************/
router.get('/salidaA/:animalId', function (req, res) {  
  detalleSalidaAnimal.retrieveByRp(req.params.animalId, function (animales) {
    if (animales) {
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Registro de salidas del Animal',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
          
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Registro de salidas del Animal', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
        for (var i in animales) {
          console.log('id-------------', animales);
          
          pdf.font('Times-Roman', 11)
             .moveDown(0.8)
             .text('Fecha:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].SalidaAnimal.fechaSalida, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
             .text('Hora:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].SalidaAnimal.horaSalida, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Rp del Animal:'); 

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Animal.rpAnimal, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Observación:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].observacion, {
              align: 'left',
              indent: 100
          });  

          pdf.font('Times-Roman', 15)
           .text('----------------------------------------------------------------------------------');
        }
      // Stream contents to a file
      pdf.pipe(res);

      // Close PDF and write file.
      pdf.end();

    }
  }, function (error) {
    res.send('Salida Animal no encontrado');
  });
});
/******************************imprimir registro de ingreso por empleado*************************************************/
router.get('/ingresoC/:empleadoId', function (req, res) {  
  ingresoC.retrieveByEmpleado(req.params.empleadoId, function (animales) {
    if (animales) {
      var pdf = new PDFDocument({
        size: 'LEGAL', 
          info: {
          Title: 'Registro de ingresos del Empleado',
          Author: 'AndyFor',
          CreationDate: new Date().toJSON().slice(0,10)
        }
      });
      
      pdf.font('Times-Roman', 8)
         .moveUp(2.0)
         .text('Fecha de Impresión:' + ' '+ new Date().toJSON().slice(0,10), {
           align: 'right'
      });

      pdf.image('C:/Users/andru/Documents/Jugando/Jugando/src/public/img/logos.png', 75, 60, {
        width: 75
      });


      pdf.font('Times-Roman', 20)
         .moveDown(0.5)
         .text('GANADERA BONANZA', {
           align: 'center'
         });
      pdf.font('Times-Roman', 10)
         .moveDown(0.5)
         .text('14 de Mayo entre Félix Bogado y Estero Bellaco', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('San Ignacio Misiones, Paraguay', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 10)
         .text('Tel.:0985- 387789, Email:bonanzacomercial@hotmail.com', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
         });
      pdf.font('Times-Roman', 15)
         .moveDown(1.0)
         .text('Registro de ingresos del Empleado', {
           width: 412,
           align: 'center',
           indent: 30,
           height: 300,
           underline: true
         });
        for (var i in animales) {
          console.log('id-------------', animales);
          
          pdf.font('Times-Roman', 11)
             .moveDown(0.8)
             .text('Fecha:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].fechaIngreso, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
             .text('Hora:');

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].horaIngreso, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Empleado:'); 

          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].Empleado.nombreEmpleado, {
              align: 'left',
              indent: 100
          });

          pdf.font('Times-Roman', 11)
           .text('Observación:');
        
          pdf.font('Times-Roman', 10)
             .moveUp()
             .text(animales[i].observacionIngreso, {
              align: 'left',
              indent: 100
          });  

          pdf.font('Times-Roman', 15)
           .text('----------------------------------------------------------------------------------');
        }
      // Stream contents to a file
      pdf.pipe(res);  
      // Close PDF and write file.
      pdf.end();
    }
  }, function (error) {
    res.send('Ingreso Empleado no encontrado');
  });
});

module.exports = router;
