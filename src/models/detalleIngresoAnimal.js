var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleIngresoAnimal = sequelize.define(
    'DetalleIngresoAnimal',
    {
      idDetalleIA: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID DetalleIA',
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
          DetalleIngresoAnimal.findAll({
            include: [ Model.Animal , Model.IngresoAnimal ],
            where: { IngresoAnimalIdIngresoAnimal:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (idDetalleIAS, onSuccess, onError) {
          DetalleIngresoAnimal.find( {
            include: [ Model.Animal ],
            where: { idDetalleIA:idDetalleIAS}
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var IngresoAnimalIdIngresoAnimal = this.IngresoAnimalIdIngresoAnimal;

          DetalleIngresoAnimal.build({ observacion: observacion, AnimalIdAnimal: AnimalIdAnimal, 
            IngresoAnimalIdIngresoAnimal: IngresoAnimalIdIngresoAnimal })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (idDetalleIAS, onSuccess, onError) {
          var idDetalleIA = this.idDetalleIA;
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var IngresoAnimalIdIngresoAnimal = this.IngresoAnimalIdIngresoAnimal;
          console.log('idDetalleIA', idDetalleIA,'observacion',observacion, 
            'AnimalIdAnimal', AnimalIdAnimal, 'IngresoAnimalIdIngresoAnimal', IngresoAnimalIdIngresoAnimal);
          
          DetalleIngresoAnimal.update( { 
          observacion: observacion, AnimalIdAnimal: AnimalIdAnimal, 
          IngresoAnimalIdIngresoAnimal: IngresoAnimalIdIngresoAnimal
          },{ where: { idDetalleIA: idDetalleIAS } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (idDetalleIA, onSuccess, onError) {
          DetalleIngresoAnimal.destroy( { where: { idDetalleIA: idDetalleIA } })
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
      tableName: 'detalleIngresoAnimal',
      comment: 'Detalle Ingreso Animal',
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
  return DetalleIngresoAnimal;
};
