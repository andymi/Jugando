var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Sanitacion = sequelize.define(
    'Sanitacion',
    {
      idSanitacion: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Sanitacion'
      },
      fechaSanitacion: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'fecha de la Sanitacion',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaSanitacion: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de la Sanitacion',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      cantidadTotal: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad total de Sanitacion',
        defaultValue: '0',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Sanitacion.findAll({
            include: [ Model.Proveedor, Model.Empleado ]
          })
          .then(onSuccess).catch(onError);
        },
        retrieveSanitacion: function (onSuccess, onError) {
          Sanitacion.findAll({
            attributes:[[sequelize.fn('SUM', sequelize.col('cantidadTotal')),'cantidadTotal']]
          }).then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          Sanitacion.findAll( {
            attributes: ['idSanitacion'],
            order: 'idSanitacion DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          Sanitacion.findAll( {
            attributes: ['idSanitacion'],
            where: { idSanitacion:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (sanitacionId, onSuccess, onError) {
         Sanitacion.find( { 
          include: [ Model.Proveedor, Model.Empleado ],
          where: { idSanitacion: sanitacionId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveBySanitacion: function (sanitacion, onSuccess, onError) {
          Sanitacion.find( { where: { fechaSanitacion: sanitacion} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaSanitacion = this.fechaSanitacion;
          var horaSanitacion = this.horaSanitacion;
          var ProveedorIdProveedor = this.ProveedorIdProveedor;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          Sanitacion.build({ fechaSanitacion: fechaSanitacion, horaSanitacion: horaSanitacion, 
            ProveedorIdProveedor: ProveedorIdProveedor, EmpleadoIdEmpleado: EmpleadoIdEmpleado })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (sanitacionId, onSuccess, onError) {
          var idSanitacion = sanitacionId;
          var fechaSanitacion = this.fechaSanitacion;
          var horaSanitacion = this.horaSanitacion;
          var ProveedorIdProveedor = this.ProveedorIdProveedor;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          Sanitacion.update( { 
            fechaSanitacion: fechaSanitacion, horaSanitacion: horaSanitacion, 
            ProveedorIdProveedor: ProveedorIdProveedor, EmpleadoIdEmpleado: EmpleadoIdEmpleado
          },{ where: { idSanitacion:  sanitacionId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (sanitacionId, onSuccess, onError) {
          Sanitacion.destroy( { where: { idSanitacion: sanitacionId } })
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
      tableName: 'Sanitacion',
      comment: 'Sanitacion',
      indexes: [
        {
          name: 'idxfechaSanitacion',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaSanitacion']
        }
      ]
    }
  );
  return Sanitacion;
};
