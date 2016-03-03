var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleConsumo = sequelize.define(
    'DetalleConsumo',
    {
      idDetalleConsumo: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID DetalleConsumo',
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
          DetalleConsumo.findAll({
            include: [ Model.Animal , Model.Consumo ],
            where: { ConsumoIdConsumo:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          DetalleConsumo.findAll( {
            attributes: ['idDetalleConsumo'],
            order: 'idDetalleConsumo DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleConsumoId, onSuccess, onError) {
          DetalleConsumo.find( {
            include: [ Model.Animal ],
            where: { idDetalleConsumo:detalleConsumoId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var ConsumoIdConsumo = this.ConsumoIdConsumo;

          DetalleConsumo.build({ observacion: observacion, 
            AnimalIdAnimal:AnimalIdAnimal, ConsumoIdConsumo: ConsumoIdConsumo })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleConsumoId, onSuccess, onError) {
          var idDetalleConsumo = this.idDetalleConsumo;          
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          
          DetalleConsumo.update( { 
            observacion: observacion, AnimalIdAnimal: AnimalIdAnimal
          },{ where: { idDetalleConsumo: detalleConsumoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleConsumoId, onSuccess, onError) {
          DetalleConsumo.destroy( { where: { idDetalleConsumo: detalleConsumoId } })
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
      tableName: 'detalleConsumo',
      comment: 'Detalle Consumo',
      /*indexes: [
        {
          name: 'idxCantidadConsumo',
          method: 'BTREE',
          unique: true,
          fields: ['cantidadConsumo']
        }
      ]*/
    }
  );
  return DetalleConsumo;
};
