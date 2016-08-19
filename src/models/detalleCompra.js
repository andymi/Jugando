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
        //allowNull: false,
        comment: 'Descripcion de la Compra',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          //notEmpty: true
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
      },
      subtotalCompra: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Subtotal de la Compra',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retriveSum: function(id, onSuccess, onError){
          DetalleCompra.findAll({
            attributes:[[sequelize.fn('SUM', sequelize.col('subtotalCompra')),'TOTAL']],
            where: { FacturaCompraIdCompra:id }
          }).then(function (detalleCompra) {
            console.log('dentro de update',detalleCompra[0].dataValues['TOTAL']);
            Model.FacturaCompra.update( { 
             totalCompra: detalleCompra[0].dataValues['TOTAL']
            },{ where: { idCompra: id } })
            .then(onSuccess).catch(onError);
            });
        },
        retriveCan: function(id, onSuccess, onError){
          DetalleCompra.findAll({
            attributes:[[sequelize.fn('SUM', sequelize.col('cantidadCompra')),'TOTAL']],
            where: { FacturaCompraIdCompra:id }
          }).then(function (detalleCompra) {
            console.log('dentro de update',detalleCompra[0].dataValues['TOTAL']);
            Model.FacturaCompra.update( { 
             cantidadTotalCompra: detalleCompra[0].dataValues['TOTAL']
            },{ where: { idCompra: id } })
            .then(onSuccess).catch(onError);
            });
        },
        retrieveAll: function (id, onSuccess, onError) {
          DetalleCompra.findAll({
            include: [ Model.FacturaCompra, Model.Insumo],
            where: { FacturaCompraIdCompra:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveAll2: function (id, onSuccess, onError) {
          DetalleCompra.findAll({
            include: [ Model.FacturaCompra],
            where: { FacturaCompraIdCompra:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveAll3: function (id, onSuccess, onError) {
          DetalleCompra.findAll({
            include: [ Model.FacturaCompra, Model.Servicios],
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
            where: { idDetalleCompra:detalleCompraId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },

        add: function (onSuccess, onError) {
          var descripcionCompra = this.descripcionCompra;
          var precioCompra = this.precioCompra;
          var cantidadCompra = this.cantidadCompra;
          var subtotalCompra = this.subtotalCompra;
          var FacturaCompraIdCompra = this.FacturaCompraIdCompra;

          DetalleCompra.build({ descripcionCompra: descripcionCompra, precioCompra: precioCompra, 
          cantidadCompra: cantidadCompra, subtotalCompra:subtotalCompra, FacturaCompraIdCompra: FacturaCompraIdCompra})
          .save().then(onSuccess).catch(onError);
        },
        add2: function (onSuccess, onError) {
          var precioCompra = this.precioCompra;
          var cantidadCompra = this.cantidadCompra;
          var subtotalCompra = this.subtotalCompra;
          var FacturaCompraIdCompra = this.FacturaCompraIdCompra;
          var InsumoIdInsumo = this.InsumoIdInsumo;

          DetalleCompra.build({ precioCompra: precioCompra, cantidadCompra: cantidadCompra, subtotalCompra:subtotalCompra, FacturaCompraIdCompra: FacturaCompraIdCompra, InsumoIdInsumo: InsumoIdInsumo})
          .save().then(onSuccess).catch(onError);
        },
        add3: function (onSuccess, onError) {
          var precioCompra = this.precioCompra;
          var cantidadCompra = this.cantidadCompra;
          var subtotalCompra = this.subtotalCompra;
          var FacturaCompraIdCompra = this.FacturaCompraIdCompra;
          var ServiciosIdServicios = this.ServiciosIdServicios;

          DetalleCompra.build({ precioCompra: precioCompra, cantidadCompra: cantidadCompra, subtotalCompra:subtotalCompra, FacturaCompraIdCompra: FacturaCompraIdCompra, ServiciosIdServicios: ServiciosIdServicios})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleCompraId, onSuccess, onError) {
          var idDetalleCompra = this.idDetalleCompra;
          var descripcionCompra = this.descripcionCompra;
          var precioCompra = this.precioCompra;
          var cantidadCompra = this.cantidadCompra;
          var subtotalCompra = this.subtotalCompra;
          var FacturaCompraIdCompra = this.FacturaCompraIdCompra;
          
          DetalleCompra.update( { 
            descripcionCompra: descripcionCompra, precioCompra: precioCompra, cantidadCompra: cantidadCompra,
            subtotalCompra: subtotalCompra, FacturaCompraIdCompra: FacturaCompraIdCompra
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
