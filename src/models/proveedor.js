var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Proveedor = sequelize.define(
    'Proveedor',
    {
      idProveedor: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID proveedor'
      },
      nombreProveedor: {
        type: DataTypes.STRING(55),
        allowNull: false,
        comment: 'Descripcion del Proveedor',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      direccionProveedor: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Direccion del Proveedor',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      rucProveedor: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'RUC del Proveedor',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      tipoProveedor: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Tipo de Proveedor',
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
          Proveedor.findAll({
            include: [ Model.Ciudad ] 
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (proveedorId, onSuccess, onError) {
          Proveedor.find( { 
           include: [ Model.Ciudad ],
           where: { idProveedor: proveedorId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByProveedor: function (proveedor, onSuccess, onError) {
          Proveedor.find( { where: { nombreProveedor: proveedor} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var nombreProveedor = this.nombreProveedor;
          var direccionProveedor = this.direccionProveedor;
          var rucProveedor = this.rucProveedor;
          var tipoProveedor = this.tipoProveedor;
          var CiudadIdCiudad = this.CiudadIdCiudad;


          Proveedor.build({ nombreProveedor: nombreProveedor, direccionProveedor: direccionProveedor, 
          rucProveedor:rucProveedor, tipoProveedor:tipoProveedor, CiudadIdCiudad:CiudadIdCiudad })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (proveedorId, onSuccess, onError) {
          var nombreProveedor = this.nombreProveedor;
          var direccionProveedor = this.direccionProveedor;
          var rucProveedor = this.rucProveedor;
          var tipoProveedor = this.tipoProveedor;
          var CiudadIdCiudad = this.CiudadIdCiudad;

          Proveedor.update( { 
            nombreProveedor: nombreProveedor, direccionProveedor: direccionProveedor, 
            rucProveedor: rucProveedor, tipoProveedor: tipoProveedor, CiudadIdCiudad:CiudadIdCiudad
          },{ where: { idProveedor: proveedorId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (proveedorId, onSuccess, onError) {
          Proveedor.destroy( { where: { idProveedor: proveedorId } })
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
      tableName: 'Proveedor',
      comment: 'Proveedor',
      indexes: [
        {
          name: 'idxnombreProveedor',
          method: 'BTREE',
          unique:  false,
          fields: ['nombreProveedor']
        }
      ]
    }
  );
  return Proveedor;
};
