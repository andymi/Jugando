var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleMuerte = sequelize.define(
    'DetalleMuerte',
    {
      idDetalleMuerte: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID detalle Muerte',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      observacion: {
        type: DataTypes.STRING(250),
        comment: 'observacion',
        validate: {
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (id, onSuccess, onError) {
          DetalleMuerte.findAll({
            include: [ Model.Animal , Model.Muertes ],
            where: { MuerteIdMuerte:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleMuerteId, onSuccess, onError) {
          DetalleMuerte.find( {
            include: [ Model.Animal ],
            where: { idDetalleMuerte:detalleMuerteId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var MuerteIdMuerte = this.MuerteIdMuerte;

          DetalleMuerte.build({ observacion: observacion,AnimalIdAnimal: AnimalIdAnimal, MuerteIdMuerte: MuerteIdMuerte })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleMuerteId, onSuccess, onError) {
          var idDetalleMuerte = this.idDetalleMuerte;
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var MuerteIdMuerte = this.MuerteIdMuerte;
          
          DetalleMuerte.update( { 
            observacion: observacion, AnimalIdAnimal: AnimalIdAnimal, MuerteIdMuerte: MuerteIdMuerte
          },{ where: { idDetalleMuerte: detalleMuerteId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleMuerteId, onSuccess, onError) {
          DetalleMuerte.destroy( { where: { idDetalleMuerte: detalleMuerteId } })
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
      tableName: 'detalleMuerte',
      comment: 'Detalle Muerte',
      /*indexes: [
        {
          name: 'idxobservacion',
          method: 'BTREE',
          unique: true,
          fields: ['observacion']
        }
      ]*/
    }
  );
  return DetalleMuerte;
};
