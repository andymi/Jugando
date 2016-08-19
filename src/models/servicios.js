module.exports = function (sequelize, DataTypes) {
  var Servicios = sequelize.define(
    'Servicios',
    {
      idServicios: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID servicios'
      },
      servicios: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Descripcion de los Servicios',
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
          Servicios.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (serviciosId, onSuccess, onError) {
          Servicios.find( { where: { idServicios: serviciosId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByCategoria: function (servicios, onSuccess, onError) {
          Servicios.find( { where: { servicios: servicios} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var servicios = this.servicios;

          Servicios.build({ servicios: servicios })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (serviciosId, onSuccess, onError) {
          Servicios.update( 
            { servicios: this.servicios },
            { where: { idServicios: serviciosId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (serviciosId, onSuccess, onError) {
          Servicios.destroy( { where: { idServicios:serviciosId } })
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
      tableName: 'Servicios',
      comment: 'Servicios del Animal',
      indexes: [
        {
          name: 'idxRaza',
          method: 'BTREE',
          unique: true,
          fields: ['servicios']
        }
      ]
    }
  );
  return Servicios;
};
