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
        //**************************
         retrieveVacunacion: function (id, cantidad, onSuccess, onError) {
          Stock.findAll( {
            attributes:['idStock',[sequelize.fn('SUM', sequelize.col('cantidad')),'total']],
            where: { InsumoIdInsumo: id }
           }).then(function (idinsu) {
              console.log('valor de idinsuuuuuuu', idinsu);
              var a = idinsu[1].dataValues['total'] ;
              var b = this.cantidad;
              var resta = a - b;
              console.log('soy la aaaaaaaaaa', a);
              console.log('soy la bbbbbbbbbb', b);
              console.log('soy la restaaaaaaaaaa', resta);
              Stock.update({
                cantidad: resta
              },{ where: { idStock: idinsu[0].dataValues['idStock'] } })
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
