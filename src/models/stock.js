var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Stock = sequelize.define(
    'Stock',
    {
      idStock: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID stock',
        validate: {
          isNumeric:true
        }
      },
      cantidad: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad en Stock',
        validate: {
          //notNull: true,
          isNumeric:true
        }
      },
      cantidadMinima: {
        type: DataTypes.INTEGER(11),
        //allowNull: false,
        comment: 'Cantidad Minima del Stock',
        validate: {
          //notNull: true,
          isNumeric:true
        }
      }      
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Model.Insumo.find({
            attributes: ['idInsumo'],
            where:{tipoInsumo:'Balanceado'}
          }).then(function (Insumoi) {
              Stock.findAll({
                attributes:[[sequelize.fn('SUM', sequelize.col('cantidad')),'cantidad']],
                where: { InsumoIdInsumo: Insumoi.idInsumo }
              })
              .then(onSuccess).catch(onError);
          });
        },
        retrieveAll2: function (onSuccess, onError) {
          Model.Insumo.find({
            attributes: ['idInsumo'],
            where:{tipoInsumo:'Sal Mineral'}
          }).then(function (Insumoi) {
              Stock.findAll({
                attributes:[[sequelize.fn('SUM', sequelize.col('cantidad')),'cantidad']],
                where: { InsumoIdInsumo: Insumoi.idInsumo }
              })
              .then(onSuccess).catch(onError);
          });
        },
        retrieveAll3: function (onSuccess, onError) {
          Model.Insumo.find({
            attributes: ['idInsumo'],
            where:{tipoInsumo:'Medicamento'}
          }).then(function (Insumoi) {
              Stock.findAll({
                attributes:[[sequelize.fn('SUM', sequelize.col('cantidad')),'cantidad']],
                where: { InsumoIdInsumo: Insumoi.idInsumo }
              })
              .then(onSuccess).catch(onError);
          });
        },
        retrieveAll4: function (onSuccess, onError) {
          Model.Insumo.find({
            attributes: ['idInsumo'],
            where:{tipoInsumo:'Varios'}
          }).then(function (Insumoi) {
              Stock.findAll({
                attributes:[[sequelize.fn('SUM', sequelize.col('cantidad')),'cantidad']],
                where: { InsumoIdInsumo: Insumoi.idInsumo }
              })
              .then(onSuccess).catch(onError);
          });
        },
        //***************************
        retrieveStock: function (onSuccess, onError) {
          Stock.findAll( {
            include: [  Model.Insumo ],
            where: {
              RazaIdRaza: null              
            }
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveSAnimal: function (onSuccess, onError) {
          Stock.findAll( {
            include: [  Model.Raza ],
            where: {
              InsumoIdInsumo: null              
            }
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveSAnimal2: function (onSuccess, onError) {
          Stock.findAll({
            attributes:[[sequelize.fn('SUM', sequelize.col('cantidad')),'cantidad']],            
            where: {
              InsumoIdInsumo: null              
            }
           }).then(onSuccess).catch(onError);
        },
        retrieveByInsumo: function (consumoId, cantidad, onSuccess, onError) {
          console.log("dentro de model*****************");
          Model.Consumo.find({
            attributes: ['InsumoIdInsumo'],
            where: { idConsumo: consumoId } 
          }).then(function (InsumoD){
              console.log("dentro de model2*****************", InsumoD.InsumoIdInsumo);
              Stock.find({
                attributes:['idStock','cantidad'],            
                where: {
                  InsumoIdInsumo: InsumoD.InsumoIdInsumo           
                }
               }).then(function (idinsumo) {
                  console.log("dentro de model3*****************", idinsumo.idStock);
                  
                  var a = idinsumo.cantidad;
                  console.log("dentro de model3*****************", a);
                  
                  var b = cantidad;
                  console.log("dentro de model3*****************", b);
                  
                  var resta = a - b;
                  console.log("RESTA**********", resta);
                  var redondeado= Math.round(resta);
                  console.log("REDONDEADO**********", redondeado);
                  Stock.update({
                    cantidad: redondeado
                  },{ where: { idStock: idinsumo.idStock } })
                  .then(onSuccess).catch(onError);
               });
          });
        },
        retrieveByAnimal: function (animal, onSuccess, onError) {
          console.log("dentro de model*****************");
          Model.Animal.find({
            attributes: ['RazaIdRaza'],
            where: { idAnimal: animal } 
          }).then(function (InsumoD){
              console.log("dentro de model2*****************", InsumoD.RazaIdRaza);
              Stock.find({
                attributes:['idStock','cantidad'],            
                where: {
                  RazaIdRaza: InsumoD.RazaIdRaza           
                }
               }).then(function (idinsumo) {
                  console.log("dentro de model3*****************", idinsumo.idStock);
                  
                  var a = idinsumo.cantidad;
                  console.log("dentro de model3*****************", a);
                  
                  var b = 1;
                  console.log("dentro de model3*****************", b);
                  
                  var resta = a - b;
                  Stock.update({
                    cantidad: resta
                  },{ where: { idStock: idinsumo.idStock } })
                  .then(onSuccess).catch(onError);
               });
          });
        },
        retrieveByVenta: function (id, cantidad, onSuccess, onError) {
          console.log("dentro de model*****************");          
          Stock.find({
            attributes:['idStock','cantidad'],            
            where: {
              RazaIdRaza: id          
            }
           }).then(function (idinsumo) {
              console.log("dentro de model3*****************", idinsumo.idStock);
              
              var a = idinsumo.cantidad;
              console.log("dentro de model3*****************", a);
              
              var b = cantidad;
              console.log("dentro de model3*****************", b);
              
              var resta = a - b;
              Stock.update({
                cantidad: resta
              },{ where: { idStock: idinsumo.idStock } })
              .then(onSuccess).catch(onError);
           });          
        },
        retrieveByCompra: function (id, onSuccess, onError) {
          console.log("dentro de model*****************");          
          Stock.find({
            attributes:['idStock','cantidad'],            
            where: {
              RazaIdRaza: id          
            }
           }).then(onSuccess).catch(onError);                     
        },
        retrieveByCompraInsumo: function (id, onSuccess, onError) {
          console.log("dentro de model*****************");          
          Stock.find({
            attributes:['idStock','cantidad'],            
            where: {
              InsumoIdInsumo: id          
            }
           }).then(onSuccess).catch(onError);                     
        },
        retrieveByActualizarCompra: function (id, cantidad1, cantidad, onSuccess, onError) {
          console.log("dentro de model3*****************", id);
              
              var a = parseInt(cantidad1);
              console.log("dentro de model3*****************", a);
              
              var b = parseInt(cantidad);
              console.log("dentro de model3*****************", b);
              
              var suma = a + b;
              Stock.update({
                cantidad: suma
              },{ where: { idStock: id } })
              .then(onSuccess).catch(onError);                     
        },
        /********************************************************/
        retrieveByVacunacion: function (insumo, cantidad, onSuccess, onError) {
          console.log("dentro de model*****************");          
          Stock.find({
            attributes:['idStock','cantidad'],            
            where: {
              InsumoIdInsumo: insumo           
            }
          }).then(function (idinsumo) {
              console.log("dentro de model3*****************", idinsumo.idStock);
              
              var a = idinsumo.cantidad;
              console.log("dentro de model3*****************", a);
              
              var b = cantidad;
              console.log("dentro de model3*****************", b);
              
              var resta = a - b;
              Stock.update({
                cantidad: resta
              },{ where: { idStock: idinsumo.idStock } })
              .then(onSuccess).catch(onError);
          });
         
        },
        /*************************************************************/
        add: function (onSuccess, onError) {
          var cantidad = this.cantidad;
          var RazaIdRaza = this.RazaIdRaza;          
          Stock.build({
            cantidad: cantidad, RazaIdRaza: RazaIdRaza            
          })
          .save().then(onSuccess).catch(onError);
        },
        addInsumo: function (onSuccess, onError) {
          var cantidad = this.cantidad;
          var cantidadMinima = this.cantidadMinima;
          var InsumoIdInsumo = this.InsumoIdInsumo;          
          Stock.build({
            cantidad: cantidad, cantidadMinima:cantidadMinima, InsumoIdInsumo: InsumoIdInsumo            
          })
          .save().then(onSuccess).catch(onError);
        },
        addInsumo2: function (resultado, onSuccess, onError) {
          var cantidad = resultado;
          var cantidadMinima = this.cantidadMinima;
          var InsumoIdInsumo = this.InsumoIdInsumo;          
          Stock.build({
            cantidad: cantidad, cantidadMinima:cantidadMinima, InsumoIdInsumo: InsumoIdInsumo            
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (stockId, onSuccess, onError) {
          var idStock = this.idStock;
          var cantidad = this.cantidad;
          var cantidadMinima = this.cantidadMinima;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var DetalleCompraIdDetalleCompra = this.DetalleCompraIdDetalleCompra;

          Stock.update({
            cantidad: cantidad, cantidadMinima: cantidadMinima,
            InsumoIdInsumo: InsumoIdInsumo, DetalleCompraIdDetalleCompra: DetalleCompraIdDetalleCompra
          },{ where: { idStock: idStock } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (stockId, onSuccess, onError) {
          Stock.destroy({ where: { idStock: stockId }})
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid: true,
      createdAt: 'fechaCreacion',
      updatedAt: 'fechaModificacion',     
      deletedAt: 'fechaBorrado',
      underscore: false,
      freezeTableName:true,
      tableName: 'Stock',
      comment: 'Stock registrado',
      indexes: [
        {
          name: 'idxcantidad',
          method: 'BTREE',
          unique: false,
          fields: ['cantidad']
        }
      ]
    }
  );
  return Stock;
};
