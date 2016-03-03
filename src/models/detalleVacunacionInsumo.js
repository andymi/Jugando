var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleVacunacionInsumo = sequelize.define(
    'DetalleVacunacionInsumo',
    {
      idDetalleVacunacionInsumo: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Detalle Vacunacion Insumo ',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      cantidadInsumo: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'cantidad Insumo',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (id, onSuccess, onError) {
          DetalleVacunacionInsumo.findAll({
            include: [ Model.Insumo , Model.DetalleVacunacion ],
            where: { DetalleVacunacionIdDetalleVacunacion:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleVacunacionInsumoId, onSuccess, onError) {
          DetalleVacunacionInsumo.find( {
            include: [ Model.Insumo ],
            where: { idDetalleVacunacionInsumo:detalleVacunacionInsumoId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var cantidadInsumo = this.cantidadInsumo;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var DetalleVacunacionIdDetalleVacunacion = this.DetalleVacunacionIdDetalleVacunacion;
          
          DetalleVacunacionInsumo.build({ cantidadInsumo: cantidadInsumo, InsumoIdInsumo: InsumoIdInsumo,
          DetalleVacunacionIdDetalleVacunacion: DetalleVacunacionIdDetalleVacunacion })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleVacunacionInsumoId, onSuccess, onError) {
          var idDetalleVacunacionInsumo = this.idDetalleVacunacionInsumo;
          var cantidadInsumo = this.cantidadInsumo;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          var DetalleVacunacionIdDetalleVacunacion = this.DetalleVacunacionIdDetalleVacunacion;
          
          
          DetalleVacunacionInsumo.update( { 
            cantidadInsumo: cantidadInsumo, InsumoIdInsumo: InsumoIdInsumo, DetalleVacunacionIdDetalleVacunacion: DetalleVacunacionIdDetalleVacunacion
          },{ where: { idDetalleVacunacionInsumo: detalleVacunacionInsumoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleVacunacionInsumoId, onSuccess, onError) {
          DetalleVacunacionInsumo.destroy( { where: { idDetalleVacunacionInsumo: detalleVacunacionInsumoId } })
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
      tableName: 'detalleVacunacionInsumo',
      comment: 'Detalle VacunacionInsumo',
      indexes: [
        {
          name: 'idxcantidadInsumo',
          method: 'BTREE',
          unique:  false,
          fields: ['cantidadInsumo']
        }
      ]
    }
  );
  return DetalleVacunacionInsumo;
};
