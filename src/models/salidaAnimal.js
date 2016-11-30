module.exports = function (sequelize, DataTypes) {
  var SalidaAnimal = sequelize.define(
    'SalidaAnimal',
    {
      idSalidaAnimal: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID salida'
      },
      horaSalida: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de la Salida de los animales',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      cantidadSalida: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad de animales que salieron del corral',
        defaultValue: '0',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      fechaSalida: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha de la salida de los animales',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      observacion: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'observacion sobre la salida',
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
          SalidaAnimal.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          console.log('dentro de retrieveid');
          SalidaAnimal.findAll( {
            attributes: ['idSalidaAnimal'],
            order: 'idSalidaAnimal DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          console.log('dentro de retrieveVerId');
          SalidaAnimal.findAll( {
            attributes: ['idSalidaAnimal'],
            where: { idSalidaAnimal:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (salidaAnimalId, onSuccess, onError) {
          console.log('dentro de retrieveById');
          SalidaAnimal.find( { where: { idSalidaAnimal: salidaAnimalId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var horaSalida = this.horaSalida;
          var fechaSalida = this.fechaSalida;
          var observacion = this.observacion;

          SalidaAnimal.build({ horaSalida: horaSalida, fechaSalida: fechaSalida, observacion: observacion })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (salidaAnimalId, onSuccess, onError) {
          var idSalidaAnimal = salidaAnimalId;
          var horaSalida = this.horaSalida;
          var fechaSalida = this.fechaSalida;
          var observacion = this.observacion;

          SalidaAnimal.update( { 
            horaSalida: horaSalida, fechaSalida: fechaSalida, observacion: observacion
          },{ where: { idSalidaAnimal:  salidaAnimalId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (salidaAnimalId, onSuccess, onError) {
          SalidaAnimal.destroy( { where: { idSalidaAnimal: salidaAnimalId } })
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
      tableName: 'SalidaAnimal',
      comment: 'SalidaAnimal',
      indexes: [
        {
          name: 'idxfechaSalida',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaSalida']
        }
      ]
    }
  );
  return SalidaAnimal;
};
