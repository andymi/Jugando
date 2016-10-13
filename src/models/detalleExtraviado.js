var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleExtraviado = sequelize.define(
    'DetalleExtraviado',
    {
      idDetalleExtraviado: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Detalle Extraviado',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      observacionExtraviado: {
        type: DataTypes.STRING(250),
        comment: 'observacion Extraviado',
        validate: {
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retriveCount: function(id, onSuccess, onError){
          DetalleExtraviado.findAndCountAll({
            include: [ Model.Animal , Model.Extraviado ],
            where: { ExtraviadoIdExtraviado:id }
          }).then(function (DetalleExtraviado) {
                Model.Extraviado.update( { 
                 cantidadTotal: DetalleExtraviado.count
                },{ where: { idExtraviado: id } })
                .then(onSuccess).catch(onError);
                });
        },
        retrieveAll: function (id, onSuccess, onError) {
          DetalleExtraviado.findAll({
            include: [ Model.Animal , Model.Extraviado ],
            where: { ExtraviadoIdExtraviado:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleExtraviadoId, onSuccess, onError) {
          DetalleExtraviado.find( {
            include: [ Model.Animal ],
            where: { idDetalleExtraviado:detalleExtraviadoId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var observacionExtraviado = this.observacionExtraviado;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var ExtraviadoIdExtraviado = this.ExtraviadoIdExtraviado;

          DetalleExtraviado.build({ 

            observacionExtraviado: observacionExtraviado, 
            AnimalIdAnimal: AnimalIdAnimal, ExtraviadoIdExtraviado:ExtraviadoIdExtraviado 

          }).save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleExtraviadoId, onSuccess, onError) {
          var idDetalleExtraviado = this.idDetalleExtraviado;
          var observacionExtraviado = this.observacionExtraviado;
          var AnimalIdAnimal = this.AnimalIdAnimal;

          console.log('idDetalleExtraviado',idDetalleExtraviado); 
          console.log('observacionExtraviado',observacionExtraviado);          
          console.log('AnimalIdAnimal',AnimalIdAnimal);
          DetalleExtraviado.update( { 

            observacionExtraviado: observacionExtraviado, AnimalIdAnimal: AnimalIdAnimal

          },{ where: { idDetalleExtraviado: detalleExtraviadoId} })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleExtraviadoId, onSuccess, onError) {
          DetalleExtraviado.destroy( { where: { idDetalleExtraviado: detalleExtraviadoId } })
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
      tableName: 'detalleExtraviado',
      comment: 'Detalle Extraviado',
    }
  );
  return DetalleExtraviado;
};
