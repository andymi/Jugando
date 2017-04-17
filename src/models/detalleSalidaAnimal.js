var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleSalidaAnimal = sequelize.define(
    'DetalleSalidaAnimal',
    {
      idDetalleSA: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID DetalleSA',
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
        retriveCount: function(id, onSuccess, onError){
          DetalleSalidaAnimal.findAndCountAll({
            include: [ Model.Animal , Model.SalidaAnimal ],
            where: { SalidaAnimalIdSalidaAnimal:id }
          }).then(function (DetalleSalidaAnimal) {
                Model.SalidaAnimal.update( { 
                 cantidadSalida: DetalleSalidaAnimal.count
                },{ where: { idSalidaAnimal: id } })
                .then(onSuccess).catch(onError);
                });
        },
        retrieveAll: function (id, onSuccess, onError) {
          DetalleSalidaAnimal.findAll({
            include: [ Model.Animal , Model.SalidaAnimal ],
            where: { SalidaAnimalIdSalidaAnimal:id }
          })
          .then(onSuccess).catch(onError);
        },

        retrieveByRp: function (id, onSuccess, onError) {
          Model.Animal.find({ 
            where:{ rpAnimal: id }
          }).then(function (DetalleSalida) {
            DetalleSalidaAnimal.findAll({
              include: [ Model.Animal , Model.SalidaAnimal ],
              where: { AnimalIdAnimal: DetalleSalida.idAnimal }
            }).then(onSuccess).catch(onError);
          });
        },
        retrieveAnimal: function (id, onSuccess, onError) {
          DetalleSalidaAnimal.findAll({
            include: [ Model.Animal , Model.SalidaAnimal ],
            where: { AnimalIdAnimal:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (idDetalleSAS, onSuccess, onError) {
          DetalleSalidaAnimal.find( {
            include: [ Model.Animal ],
            where: { idDetalleSA:idDetalleSAS}
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var SalidaAnimalIdSalidaAnimal = this.SalidaAnimalIdSalidaAnimal;

          DetalleSalidaAnimal.build({ observacion: observacion, AnimalIdAnimal: AnimalIdAnimal, 
            SalidaAnimalIdSalidaAnimal: SalidaAnimalIdSalidaAnimal })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (idDetalleSAS, onSuccess, onError) {
          var idDetalleSA = this.idDetalleSA;
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var SalidaAnimalIdSalidaAnimal = this.SalidaAnimalIdSalidaAnimal;
          console.log('idDetalleSA', idDetalleSA,'observacion',observacion, 
            'AnimalIdAnimal', AnimalIdAnimal, 'SalidaAnimalIdSalidaAnimal', SalidaAnimalIdSalidaAnimal);
          
          DetalleSalidaAnimal.update( { 
            observacion: observacion, AnimalIdAnimal: AnimalIdAnimal, SalidaAnimalIdSalidaAnimal: SalidaAnimalIdSalidaAnimal
          },{ where: { idDetalleSA: idDetalleSAS } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (idDetalleSAS, onSuccess, onError) {
          DetalleSalidaAnimal.destroy( { where: { idDetalleSA: idDetalleSAS } })
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
      tableName: 'detalleSalidaAnimal',
      comment: 'Detalle Salida Animal',
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
  return DetalleSalidaAnimal;
};
