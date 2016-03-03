module.exports = function (sequelize, DataTypes) {
  var Departamento = sequelize.define(
    'Departamento',
    {
      idDepartamento: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID departamento'
      },
      departamento: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Descripcion del Departamento',
        validate: {
          is: ['[a-z]','i']
          //notNull: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          console.log('dentro de retrieveAll departamento');
          Departamento.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (departamentoId, onSuccess, onError) {
          Departamento.find( { where: { idDepartamento: departamentoId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByDepartamento: function (departamento, onSuccess, onError) {
          Departamento.find( { where: { departamento: departamento} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var departamento = this.departamento;

          Departamento.build({ departamento: departamento })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (departamentoId, onSuccess, onError) {
          console.log('dentro de updateById', departamentoId);
          Departamento.update( { departamento: this.departamento },{ where: { idDepartamento: departamentoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (departamentoId, onSuccess, onError) {
          Departamento.destroy( { where: { idDepartamento: departamentoId } })
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
      tableName: 'Departamento',
      comment: 'Departamento',
      indexes: [
        {
          name: 'idxDepartamento',
          method: 'BTREE',
          unique: true,
          fields: ['departamento']
        }
      ]
    }
  );
  return Departamento;
};
