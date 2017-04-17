var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Empleado = sequelize.define(
    'Empleado',
    {
      idEmpleado: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID empleado',
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      nombreEmpleado: {
        type: DataTypes.STRING(55),
        allowNull: false,
        comment: 'Descripcion del Empleado',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      codigoLlave: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'codigo Llave',
        validate: {
          //is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      direccionEmpleado: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Direccion del Empleado',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      cedulaEmpleado: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'RUC del Empleado',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Empleado.findAll({
            include: [ Model.Ciudad ] 
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (empleadoId, onSuccess, onError) {
          Empleado.find( { 
            include: [ Model.Ciudad ],
            where: { idEmpleado: empleadoId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByCodigo: function (codigo, onSuccess, onError) {
          Empleado.find( { 
            attributes:['idEmpleado'],
            where: { codigoLlave: codigo } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByEmpleado: function (empleado, onSuccess, onError) {
          Empleado.find( { where: { nombreEmpleado: empleado} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByCedula: function (empleado, onSuccess, onError) {
          Empleado.find( { where: { cedulaEmpleado: empleado} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var nombreEmpleado = this.nombreEmpleado;
          var codigoLlave = this.codigoLlave;
          var direccionEmpleado = this.direccionEmpleado;
          var cedulaEmpleado = this.cedulaEmpleado;
          var CiudadIdCiudad = this.CiudadIdCiudad;

          Empleado.build({ nombreEmpleado: nombreEmpleado, codigoLlave: codigoLlave, direccionEmpleado: direccionEmpleado, cedulaEmpleado:cedulaEmpleado,
          CiudadIdCiudad:CiudadIdCiudad })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (empleadoId, onSuccess, onError) {
          var idEmpleado = empleadoId;
          var nombreEmpleado = this.nombreEmpleado;
          var codigoLlave = this.codigoLlave;
          var direccionEmpleado = this.direccionEmpleado;
          var cedulaEmpleado = this.cedulaEmpleado;
          var CiudadIdCiudad = this.CiudadIdCiudad;
          
          Empleado.update( { 
            nombreEmpleado: nombreEmpleado, codigoLlave: codigoLlave, direccionEmpleado: direccionEmpleado, cedulaEmpleado:cedulaEmpleado,
            CiudadIdCiudad:CiudadIdCiudad
          },{ where: { idEmpleado:  empleadoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (empleadoId, onSuccess, onError) {
          Empleado.destroy( { where: { idEmpleado: empleadoId } })
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
      tableName: 'Empleado',
      comment: 'Empleado',
     /* indexes: [
        {
          name: 'idxnombreEmpleado',
          method: 'BTREE',
          unique: false,
          fields: ['nombreEmpleado']
        }
      ]*/
    }
  );
  return Empleado;
};
