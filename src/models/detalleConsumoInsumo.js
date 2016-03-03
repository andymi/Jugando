var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleConsumoInsumo = sequelize.define(
    'DetalleConsumoInsumo',
    {
      idDetalleConsumoInsumo: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID DetalleConsumoInsumo',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      cantidad: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'cantidad',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (id, onSuccess, onError) {
          DetalleConsumoInsumo.findAll({
            include: [ Model.Insumo , Model.DetalleConsumo ],
            where: { DetalleConsumoIdDetalleConsumo:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleConsumoInsumoId, onSuccess, onError) {
          DetalleConsumoInsumo.find( {
            include: [ Model.Insumo ],
            where: { idDetalleConsumoInsumo:detalleConsumoInsumoId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var cantidad = this.cantidad;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var DetalleConsumoIdDetalleConsumo = this.DetalleConsumoIdDetalleConsumo;

          DetalleConsumoInsumo.build({ cantidad: cantidad, InsumoIdInsumo:InsumoIdInsumo, 
            DetalleConsumoIdDetalleConsumo: DetalleConsumoIdDetalleConsumo })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleConsumoInsumoId, onSuccess, onError) {
          var idDetalleConsumoInsumo = this.idDetalleConsumoInsumo;
          var cantidad = this.cantidad;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          console.log('valores',idDetalleConsumoInsumo, cantidad, InsumoIdInsumo);
          
          DetalleConsumoInsumo.update( { 
            cantidad: cantidad, InsumoIdInsumo: InsumoIdInsumo
          },{ where: { idDetalleConsumoInsumo: detalleConsumoInsumoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleConsumoInsumoId, onSuccess, onError) {
          DetalleConsumoInsumo.destroy( { where: { idDetalleConsumoInsumo: detalleConsumoInsumoId } })
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
      tableName: 'detalleConsumoInsumo',
      comment: 'Detalle Consumo Insumo',
      /*indexes: [
        {
          name: 'idxCantidadConsumo',
          method: 'BTREE',
          unique: true,
          fields: ['cantidadConsumo']
        }
      ]*/
    }
  );
  return DetalleConsumoInsumo;
};
