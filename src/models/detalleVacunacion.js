var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleVacunacion = sequelize.define(
    'DetalleVacunacion',
    {
      idDetalleVacunacion: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Detalle Vacunacion',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      numeroCertificado: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'numero del Certificado',
        validate: {
          //notNull: true,
          notEmpty: true
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
          DetalleVacunacion.findAndCountAll({
            include: [ Model.Animal , Model.Vacunacion ],
            where: { VacunacionIdVacunacion:id }
          }).then(function (DetalleVacunacion) {
                Model.Vacunacion.update( { 
                 cantidadTotal: DetalleVacunacion.count
                },{ where: { idVacunacion: id } })
                .then(onSuccess).catch(onError);
                });
        },
        retrieveAll: function (id, onSuccess, onError) {
          DetalleVacunacion.findAll( {
            include: [ Model.Animal , Model.Vacunacion],
            where: { VacunacionIdVacunacion:id }
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveAnimal: function (id, onSuccess, onError) {
          DetalleVacunacion.findAll( {
            include: [ Model.Animal , Model.Vacunacion],
            where: { AnimalIdAnimal:id }
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveByRp: function (id, onSuccess, onError) {
          Model.Animal.find({ 
            where:{ rpAnimal: id }
          }).then(function (DetalleSalida) {
            DetalleVacunacion.findAll( {
              include: [ Model.Animal , Model.Vacunacion],
              where: { AnimalIdAnimal:DetalleSalida.idAnimal }
             } )
            .then(onSuccess).catch(onError);
          });
        },
        retrieveId: function (onSuccess, onError) {
          DetalleVacunacion.findAll( {
            attributes: ['idDetalleVacunacion'],
            order: 'idDetalleVacunacion DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleVacunacionId, onSuccess, onError) {
          DetalleVacunacion.find( {
            include: [ Model.Animal ],
            where: { idDetalleVacunacion:detalleVacunacionId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var numeroCertificado = this.numeroCertificado;
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var VacunacionIdVacunacion = this.VacunacionIdVacunacion;

          DetalleVacunacion.build({ numeroCertificado: numeroCertificado, observacion: observacion,
          AnimalIdAnimal: AnimalIdAnimal, VacunacionIdVacunacion: VacunacionIdVacunacion })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleVacunacionId, onSuccess, onError) {
          var idDetalleVacunacion = this.idDetalleVacunacion;
          var numeroCertificado = this.numeroCertificado;
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var VacunacionIdVacunacion = this.VacunacionIdVacunacion;
          
          DetalleVacunacion.update( { 
            numeroCertificado: numeroCertificado, observacion: observacion, AnimalIdAnimal: AnimalIdAnimal, VacunacionIdVacunacion: VacunacionIdVacunacion
          },{ where: { idDetalleVacunacion: detalleVacunacionId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleVacunacionId, onSuccess, onError) {
          DetalleVacunacion.destroy( { where: { idDetalleVacunacion: detalleVacunacionId } })
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
      tableName: 'detalleVacunacion',
      comment: 'Detalle Vacunacion',
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
  return DetalleVacunacion;
};
