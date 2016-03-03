var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Ciudad = sequelize.define(
    'Ciudad',
    {
      idCiudad: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID ciudad'
      },
      ciudad: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Descripcion de la Ciudad',
        validate: {
          is: ['[a-z]','i']         
          //notNull: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Ciudad.findAll( {
            include: [ Model.Departamento ]
           } )
          .then(onSuccess).catch(onError);
        },
        retrievePag: function (initial, offsetPage, limitPage, currentPage, onSuccess, onError) {
          console.log('estoy dentro de retrievePag');
          Ciudad.findAndCountAll( {
            include: [ Model.Departamento ],
            offset: initial,
            limit: offsetPage
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (ciudadId, onSuccess, onError) {
          Ciudad.find( {
            include: [ Model.Departamento ],
            where: { idCiudad:ciudadId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByCiudad: function (ciudad, onSuccess, onError) {
          Ciudad.find( { where: { ciudad: ciudad} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var ciudad = this.ciudad;
          var DepartamentoIdDepartamento = this.DepartamentoIdDepartamento;

          Ciudad.build({ ciudad: ciudad, DepartamentoIdDepartamento: DepartamentoIdDepartamento })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (ciudadId, onSuccess, onError) {
          console.log('dentro de updateById', ciudadId);
          Ciudad.update( 
          { 
            ciudad: this.ciudad,
            DepartamentoIdDepartamento: this.DepartamentoIdDepartamento
          },
          { where: { idCiudad: ciudadId} })
          .then(onSuccess).catch(onError);
        },
        removeById: function (ciudadId, onSuccess, onError) {
          Ciudad.destroy( { where: { idCiudad: ciudadId } })
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
      tableName: 'Ciudad',
      comment: 'Ciudades',
      indexes: [
        {
          name: 'idxCiudad',
          method: 'BTREE',
          unique: true,
          fields: ['ciudad']
        }
      ]
    }
  );
  return Ciudad;
};
