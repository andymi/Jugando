var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Cliente = sequelize.define(
    'Cliente',
    {
      idCliente: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID cliente'
      },
      nombreCliente: {
        type: DataTypes.STRING(55),
        allowNull: false,
        comment: 'Nombre del Cliente',
        validate: {
          is: ['[a-z]','i']          
          //notNull: true
        }
      },
      direccionCliente: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Direccion del Cliente',
        validate: {
          is: ['[a-z]','i'],
          notEmpty: true
          //notNull: true
        }
      },
      rucCliente: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'RUC del Cliente'
        //validate: {
          //notNull: true
        //}
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Cliente.findAll({
            include: [ Model.Ciudad ]            
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (clienteId, onSuccess, onError) {
          Cliente.find( { 
            include: [ Model.Ciudad ],
            where: { idCliente: clienteId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByCliente: function (cliente, onSuccess, onError) {
          Cliente.find( { where: { nombreCliente: cliente} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var nombreCliente = this.nombreCliente;
          var direccionCliente = this.direccionCliente;
          var rucCliente = this.rucCliente;
          var CiudadIdCiudad = this.CiudadIdCiudad;

          Cliente.build({ nombreCliente: nombreCliente, direccionCliente: direccionCliente, 
          rucCliente:rucCliente, CiudadIdCiudad:CiudadIdCiudad })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (clienteId, onSuccess, onError) {
          var idCliente = this.idCliente;
          var nombreCliente = this.nombreCliente;
          var direccionCliente = this.direccionCliente;
          var rucCliente = this.rucCliente;
          var CiudadIdCiudad = this.CiudadIdCiudad;

          Cliente.update( { 
            nombreCliente: nombreCliente, direccionCliente: direccionCliente, rucCliente:rucCliente, 
            CiudadIdCiudad:CiudadIdCiudad
          },{ where: { idCliente: clienteId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (clienteId, onSuccess, onError) {
          Cliente.destroy( { where: { idCliente: clienteId } })
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
      tableName: 'Cliente',
      comment: 'Cliente',
      indexes: [
        {
          name: 'idxnombreCliente',
          method: 'BTREE',
          unique: false,
          fields: ['nombrecliente']
        }
      ]
    }
  );
  return Cliente;
};
