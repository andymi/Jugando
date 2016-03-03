var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetallePesaje = sequelize.define(
    'DetallePesaje',
    {
      idDetallePesaje: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID detalle Pesaje',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      peso: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'peso',
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
        retrieveAll: function (id, onSuccess, onError) {
          DetallePesaje.findAll( {
            include: [ Model.Animal , Model.Pesaje ],
            where: { PesajeIdPesaje:id }
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detallePesajeId, onSuccess, onError) {
          DetallePesaje.find( {
            include: [ Model.Animal ],
            where: { idDetallePesaje:detallePesajeId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var peso = this.peso;
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var PesajeIdPesaje = this.PesajeIdPesaje;
          console.log('dentro de add imprimiendo valores***********************');
          console.log('peso',peso);
          console.log('observacion',observacion);
          console.log('AnimalIdAnimal',AnimalIdAnimal);
          console.log('PesajeIdPesaje',PesajeIdPesaje);

          DetallePesaje.build({ peso:peso, observacion: observacion, AnimalIdAnimal: AnimalIdAnimal, PesajeIdPesaje: PesajeIdPesaje })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detallePesajeId, onSuccess, onError) {
          var idDetallePesaje = this.iddDetallePesaje;
          var peso = this.peso;
          var observacion = this.observacion;          
          var AnimalIdAnimal = this.AnimalIdAnimal;

          DetallePesaje.update( { 
            peso:peso, observacion: observacion, AnimalIdAnimal: AnimalIdAnimal
          },{ where: { idDetallePesaje: detallePesajeId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detallePesajeId, onSuccess, onError) {
          DetallePesaje.destroy( { where: { idDetallePesaje: detallePesajeId } })
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
      tableName: 'detallePesaje',
      comment: 'Detalle Pesaje',
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
  return DetallePesaje;
};
