module.exports = function (sequelize, DataTypes) {
  var Raza = sequelize.define(
    'Raza',
    {
      idRaza: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID raza'
      },
      raza: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Descripcion del Raza',
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
          Raza.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (razaId, onSuccess, onError) {
          Raza.find( { where: { idRaza: razaId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByCategoria: function (raza, onSuccess, onError) {
          Raza.find( { where: { raza: raza} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var raza = this.raza;

          Raza.build({ raza: raza })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (razaId, onSuccess, onError) {
          Raza.update( 
            { raza: this.raza },
            { where: { idRaza: razaId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (razaId, onSuccess, onError) {
          Raza.destroy( { where: { idRaza:razaId } })
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
      tableName: 'Raza',
      comment: 'Raza del Animal',
      indexes: [
        {
          name: 'idxRaza',
          method: 'BTREE',
          unique: true,
          fields: ['raza']
        }
      ]
    }
  );
  return Raza;
};
