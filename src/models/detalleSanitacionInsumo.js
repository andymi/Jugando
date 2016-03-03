var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleSanitacionInsumo = sequelize.define(
    'DetalleSanitacionInsumo',
    {
      idDetalleSanitacionInsumo: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Detalle Sanitacion Insumo',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      cantidadUtilizada: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'cantidad Utilizada',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (id, onSuccess, onError) {
          DetalleSanitacionInsumo.findAll({
            include: [ Model.Insumo , Model.DetalleSanitacion ],
            where: { DetalleSanitacionIdDetalleSanitacion:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleSanitacionInsumoId, onSuccess, onError) {
          DetalleSanitacionInsumo.find( {
            include: [ Model.Insumo ],
            where: { idDetalleSanitacionInsumo:detalleSanitacionInsumoId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var cantidadUtilizada = this.cantidadUtilizada;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var DetalleSanitacionIdDetalleSanitacion = this.DetalleSanitacionIdDetalleSanitacion;

          DetalleSanitacionInsumo.build({ cantidadUtilizada: cantidadUtilizada, InsumoIdInsumo: InsumoIdInsumo,
            DetalleSanitacionIdDetalleSanitacion: DetalleSanitacionIdDetalleSanitacion})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleSanitacionInsumoId, onSuccess, onError) {
          var idDetalleSanitacionInsumo = this.idDetalleSanitacionInsumo;
          var cantidadUtilizada = this.cantidadUtilizada;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var DetalleSanitacionIdDetalleSanitacion = this.DetalleSanitacionIdDetalleSanitacion;
          
          DetalleSanitacionInsumo.update( { 
            cantidadUtilizada: cantidadUtilizada, InsumoIdInsumo: InsumoIdInsumo, DetalleSanitacionIdDetalleSanitacion: DetalleSanitacionIdDetalleSanitacion
          },{ where: { idDetalleSanitacionInsumo: detalleSanitacionInsumoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleSanitacionInsumoId, onSuccess, onError) {
          DetalleSanitacionInsumo.destroy( { where: { idDetalleSanitacionInsumo: detalleSanitacionInsumoId } })
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid:true,
      createdAt:'fechaCreacion',
      updatedAt:'fechaModificacion',   
      deletedAt:'fechaBorrado',
      underscore:false,
      freezeTableName:true,
      tableName: 'detalleSanitacionInsumo',
      comment: 'Detalle Sanitacion Insumo',
      indexes: [
        {
          name: 'idxcantidadUtilizada',
          method: 'BTREE',
          unique: false,
          fields: ['cantidadUtilizada']
        }
      ]
    }
  );
  return DetalleSanitacionInsumo;
};
