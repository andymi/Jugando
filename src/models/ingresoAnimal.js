module.exports = function (sequelize, DataTypes) {
  var IngresoAnimal = sequelize.define(
    'IngresoAnimal',
    {
      idIngresoAnimal: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID ingreso'
      },
      fechaEntrada: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha de la Entrada de los animales al corral',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaEntrada: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de Entrada de los animales al corral',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      cantidadEntrada: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad de animales que ingreso al corral',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      observacion: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'observacion sobre la Entrada',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          console.log('dentro de retrieveAll');
          IngresoAnimal.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          console.log('dentro de retrieveid');
          IngresoAnimal.findAll( {
            attributes: ['idIngresoAnimal'],
            order: 'idIngresoAnimal DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          console.log('dentro de retrieveVerId');
          IngresoAnimal.findAll( {
            attributes: ['idIngresoAnimal'],
            where: { idIngresoAnimal:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (ingresoAnimalId, onSuccess, onError) {
          console.log('dentro de retrieveById');
          IngresoAnimal.find( { where: { idIngresoAnimal: ingresoAnimalId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          
          var fechaEntrada = this.fechaEntrada;
          var horaEntrada = this.horaEntrada;
          var cantidadEntrada = this.cantidadEntrada;
          var observacion = this.observacion;

          IngresoAnimal.build({ fechaEntrada: fechaEntrada, horaEntrada: horaEntrada, cantidadEntrada: cantidadEntrada, observacion: observacion })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (ingresoAnimalId, onSuccess, onError) {
          var idIngresoAnimal = ingresoAnimalId;
          var fechaEntrada = this.fechaEntrada;
          var horaEntrada = this.horaEntrada;
          var cantidadEntrada = this.cantidadEntrada;
          var observacion = this.observacion;

          IngresoAnimal.update( { 
            fechaEntrada: fechaEntrada, horaEntrada: horaEntrada, cantidadEntrada: cantidadEntrada, observacion: observacion
          },{ where: { idIngresoAnimal:  ingresoAnimalId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (ingresoAnimalId, onSuccess, onError) {
          IngresoAnimal.destroy( { where: { idIngresoAnimal: ingresoAnimalId } })
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
      tableName: 'IngresoAnimal',
      comment: 'IngresoAnimal',
      indexes: [
        {
          name: 'idxfechaEntrada',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaEntrada']
        }
      ]
    }
  );
  return IngresoAnimal;
};
