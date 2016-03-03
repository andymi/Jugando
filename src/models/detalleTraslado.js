var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleTraslado = sequelize.define(
    'DetalleTraslado',
    {
      idDetalleTraslado: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Detalle Traslado',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      descripcion: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'descripcion',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (id, onSuccess, onError) {
          DetalleTraslado.findAll( {
            include: [ Model.Animal , Model.Traslado ],
            where: { TrasladoIdTraslado:id }
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleTrasladoId, onSuccess, onError) {
          DetalleTraslado.find( {
            include: [ Model.Animal ],
            where: { idDetalleTraslado:detalleTrasladoId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var descripcion = this.descripcion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var TrasladoIdTraslado = this.TrasladoIdTraslado;

          DetalleTraslado.build({ descripcion: descripcion, AnimalIdAnimal: AnimalIdAnimal, TrasladoIdTraslado: TrasladoIdTraslado })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleTrasladoId, onSuccess, onError) {
          var idDetalleTraslado = this.idDetalleTraslado;
          var descripcion = this.descripcion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var TrasladoIdTraslado = this.TrasladoIdTraslado;
          
          DetalleTraslado.update( { 
            descripcion: descripcion, AnimalIdAnimal: AnimalIdAnimal, TrasladoIdTraslado: TrasladoIdTraslado 
          },{ where: { idDetalleTraslado: detalleTrasladoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleTrasladoId, onSuccess, onError) {
          DetalleTraslado.destroy( { where: { idDetalleTraslado: detalleTrasladoId } })
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
      tableName: 'detalletraslado',
      comment: 'Detalle Traslado',
      indexes: [
        {
          name: 'idxdescripcion',
          method: 'BTREE',
          unique: false,
          fields: ['descripcion']
        }
      ]
    }
  );
  return DetalleTraslado;
};
