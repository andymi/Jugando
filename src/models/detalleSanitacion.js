var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleSanitacion = sequelize.define(
    'DetalleSanitacion',
    {
      idDetalleSanitacion: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Detalle Sanitacion',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      observacionSanitacion: {
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
          DetalleSanitacion.findAll({
            include: [ Model.Animal , Model.Sanitacion ],
            where: { SanitacionIdSanitacion:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveByRp: function (id, onSuccess, onError) {
          Model.Animal.find({ 
            where:{ rpAnimal: id }
          }).then(function (DetalleSanitacions) {
            DetalleSanitacion.findAll({
              include: [ Model.Animal , Model.Sanitacion ],
              where: { AnimalIdAnimal:DetalleSanitacions.idAnimal}
            })
            .then(onSuccess).catch(onError);
          });
        },
        retrieveAnimal: function (id, onSuccess, onError) {
          DetalleSanitacion.findAll({
            include: [ Model.Animal , Model.Sanitacion ],
            where: { AnimalIdAnimal:id }
          })
          .then(onSuccess).catch(onError);
        },
        retriveCount: function(id, onSuccess, onError){
          DetalleSanitacion.findAndCountAll({
            include: [ Model.Animal , Model.Sanitacion ],
            where: { SanitacionIdSanitacion:id }
          }).then(function (DetalleSanitacion) {
                Model.Sanitacion.update( { 
                 cantidadTotal: DetalleSanitacion.count
                },{ where: { idSanitacion: id } })
                .then(onSuccess).catch(onError);
                });
        },
        retrieveId: function (onSuccess, onError) {
          DetalleSanitacion.findAll( {
            attributes: ['idDetalleSanitacion'],
            order: 'idDetalleSanitacion DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleSanitacionId, onSuccess, onError) {
          DetalleSanitacion.find( {
            include: [ Model.Animal ],
            where: { idDetalleSanitacion:detalleSanitacionId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var observacionSanitacion = this.observacionSanitacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var SanitacionIdSanitacion = this.SanitacionIdSanitacion;
          console.log('estoy dentro de model y AnimalIdAnimal es--------',AnimalIdAnimal);
  
          DetalleSanitacion.build({ observacionSanitacion: observacionSanitacion,
           AnimalIdAnimal: AnimalIdAnimal,SanitacionIdSanitacion:SanitacionIdSanitacion })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleSanitacionId, onSuccess, onError) {
          var idDetalleSanitacion = this.idDetalleSanitacion;
          var observacionSanitacion = this.observacionSanitacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var SanitacionIdSanitacion = this.SanitacionIdSanitacion;
          
          DetalleSanitacion.update( { 
            observacionSanitacion: observacionSanitacion, AnimalIdAnimal: AnimalIdAnimal,
            SanitacionIdSanitacion:SanitacionIdSanitacion
          },{ where: { idDetalleSanitacion: detalleSanitacionId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleSanitacionId, onSuccess, onError) {
          DetalleSanitacion.destroy( { where: { idDetalleSanitacion: detalleSanitacionId } })
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
      tableName: 'detalleSanitacion',
      comment: 'Detalle Sanitacion',
     /* indexes: [
        {
          name: 'idxobservacion',
          method: 'BTREE',
          unique: true,
          fields: ['observacion']
        }
      ]*/
    }
  );
  return DetalleSanitacion;
};
