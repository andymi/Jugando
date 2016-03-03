module.exports = function (sequelize, DataTypes) {
  var Nivel = sequelize.define(
    'Nivel',
    {
      idNivel: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID nivel'
      },
      nivel: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Descripcion del Nivel',
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
          Nivel.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (nivelId, onSuccess, onError) {
          Nivel.find( { where: { idNivel: nivelId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByCategoria: function (nivel, onSuccess, onError) {
          Nivel.find( { where: { nivel: nivel} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var nivel = this.nivel;

          Nivel.build({ nivel: nivel })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (nivelId, onSuccess, onError) {
          Nivel.update( 
            { nivel: this.nivel },
            { where: { idNivel: nivelId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (nivelId, onSuccess, onError) {
          Nivel.destroy( { where: { idNivel: nivelId } })
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
      tableName: 'Nivel',
      comment: 'Nivel de acceso del Usuario al sistema',
      indexes: [
        {
          name: 'idxNivel',
          method: 'BTREE',
          unique: true,
          fields: ['nivel']
        }
      ]
    }
  );
  return Nivel;
};
