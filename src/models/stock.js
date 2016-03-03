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
      lote: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Lote del insumo',
        validate: {
          //notNull: true,
          isNumeric:true
        }
      }, 
      cantidadMinima: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
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
          Stock.findAll({
            include: [ Model.Insumo , Model.DetalleCompra]
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (stockId, onSuccess, onError) {
          Stock.find( { 
            include: [ Model.Insumo, Model.DetalleCompra],
            where: { id: stockId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var cantidad = this.cantidad;
          var lote = this.lote;
          var cantidadMinima = this.cantidadMinima;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var DetalleCompraIdDetalleCompra = this.DetalleCompraIdDetalleCompra;
          
          Stock.build({
            cantidad: cantidad, lote: lote, cantidadMinima: cantidadMinima, 
            InsumoIdInsumo: InsumoIdInsumo, DetalleCompraIdDetalleCompra: DetalleCompraIdDetalleCompra
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (stockId, onSuccess, onError) {
          var idStock = this.idStock;
          var cantidad = this.cantidad;
          var lote = this.lote;
          var cantidadMinima = this.cantidadMinima;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var DetalleCompraIdDetalleCompra = this.DetalleCompraIdDetalleCompra;

          Stock.update({
            cantidad: cantidad, lote: lote, cantidadMinima: cantidadMinima,
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
