var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleCompra = sequelize.define(
    'DetalleCompra',
    {
      idDetalleCompra: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID detalle compra',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      descripcionCompra: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Descripcion de la Compra',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      precioCompra: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Precio de la Compra',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      cantidadCompra: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad de la Compra',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (id, onSuccess, onError) {
          DetalleCompra.findAll({
            include: [ Model.Insumo , Model.FacturaCompra],
            where: { FacturaCompraIdCompra:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          DetalleCompra.findAll( {
            attributes: ['idDetalleCompra'],
            order: 'idDetalleCompra DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleCompraId, onSuccess, onError) {
          DetalleCompra.find( {
            include: [ Model.Insumo ],
            where: { idDetalleCompra:detalleCompraId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var descripcionCompra = this.descripcionCompra;
          var precioCompra = this.precioCompra;
          var cantidadCompra = this.cantidadCompra;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var FacturaCompraIdCompra = this.FacturaCompraIdCompra;

          DetalleCompra.build({ descripcionCompra: descripcionCompra, precioCompra: precioCompra, 
          cantidadCompra: cantidadCompra, InsumoIdInsumo: InsumoIdInsumo, FacturaCompraIdCompra: FacturaCompraIdCompra})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleCompraId, onSuccess, onError) {
          var idDetalleCompra = this.idDetalleCompra;
          var descripcionCompra = this.descripcionCompra;
          var precioCompra = this.precioCompra;
          var cantidadCompra = this.cantidadCompra;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var FacturaCompraIdCompra = this.FacturaCompraIdCompra;
          
          DetalleCompra.update( { 
            descripcionCompra: descripcionCompra, precioCompra: precioCompra, cantidadCompra: cantidadCompra,
            InsumoIdInsumo: InsumoIdInsumo, FacturaCompraIdCompra: FacturaCompraIdCompra
          },{ where: { idDetalleCompra: detalleCompraId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleCompraId, onSuccess, onError) {
          DetalleCompra.destroy( { where: { idDetalleCompra: detalleCompraId } })
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid:true,
      createdAt: 'fechaCreacion',
      updatedAt: 'fechaModificacion',     
      deletedAt: 'fechaBorrado',
      underscore: false,
      freezeTableName:true,
      tableName: 'detalleCompra',
      comment: 'Detalle Compra',
      indexes: [
        {
          name: 'idxdescripcionCompra',
          method: 'BTREE',
          unique: false,
          fields: ['descripcionCompra']
        }
      ]
    }
  );
  return DetalleCompra;
};
