var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleVenta = sequelize.define(
    'DetalleVenta',
    {
      idDetalleVenta: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Detalle Venta',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      descripcionVenta: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Descripcion de la Venta',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      precioVenta: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Precio de la Venta',
        validate: {
         //notNull: true,
          notEmpty: true
        }
      },
      cantidadVenta: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad de la Venta',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },      
      subtotalVenta: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Subtotal de la Venta',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retriveSum: function(id, onSuccess, onError){
          DetalleVenta.findAll({
            attributes:[[sequelize.fn('SUM', sequelize.col('subtotalVenta')),'TOTAL']],
            where: { FacturaVentaIdVenta:id }
          }).then(function (detalleVenta) {
            console.log('dentro de update',detalleVenta[0].dataValues['TOTAL']);
            Model.FacturaVenta.update( { 
             totalVenta: detalleVenta[0].dataValues['TOTAL']
            },{ where: { idVenta: id } })
            .then(onSuccess).catch(onError);
            });
        },
        retrieveAll: function (id, onSuccess, onError) {
          DetalleVenta.findAll({
            include: [ Model.FacturaVenta],
            where: { FacturaVentaIdVenta:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleVentaId, onSuccess, onError) {
          DetalleVenta.find( {
            where: { idDetalleVenta:detalleVentaId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var descripcionVenta = this.descripcionVenta;
          var precioVenta = this.precioVenta;
          var cantidadVenta = this.cantidadVenta;
          var subtotalVenta = this.subtotalVenta;
          var FacturaVentaIdVenta = this.FacturaVentaIdVenta;

          DetalleVenta.build({ descripcionVenta: descripcionVenta, precioVenta: precioVenta, 
          cantidadVenta: cantidadVenta, subtotalVenta:subtotalVenta,
          FacturaVentaIdVenta: FacturaVentaIdVenta })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleVentaId, onSuccess, onError) {
          var idDetalleVenta = this.idDetalleVenta;
          var descripcionVenta = this.descripcionVenta;
          var precioVenta = this.precioVenta;
          var cantidadVenta = this.cantidadVenta;
          var subtotalVenta = this.subtotalVenta;
          var FacturaVentaIdVenta = this.FacturaVentaIdVenta;
          
          DetalleVenta.update( { 
            descripcionVenta: descripcionVenta, precioVenta: precioVenta, 
            cantidadVenta: cantidadVenta, subtotalVenta:subtotalVenta, FacturaVentaIdVenta:FacturaVentaIdVenta
          },{ where: { idDetalleVenta: detalleVentaId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleVentaId, onSuccess, onError) {
          DetalleVenta.destroy( { where: { idDetalleVenta: detalleVentaId } })
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
      tableName: 'detalleVenta',
      comment: 'Detalle Venta',
      indexes: [
        {
          name: 'idxdescripcionVenta',
          method: 'BTREE',
          unique:  false,
          fields: ['descripcionVenta']
        }
      ]
    }
  );
  return DetalleVenta;
};
