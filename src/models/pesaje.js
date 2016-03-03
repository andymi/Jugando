var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Pesaje = sequelize.define(
    'Pesaje',
    {
      idPesaje: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Pesaje'
      },
      fechaPesaje: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'fecha de la Pesaje',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaPesaje: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de la Pesaje',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Pesaje.findAll( {
            include: [ Model.Empleado ]
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          Pesaje.findAll( {
            attributes: ['idPesaje'],
            order: 'idPesaje DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          Pesaje.findAll( {
            attributes: ['idPesaje'],
            where: { idPesaje:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (pesajeId, onSuccess, onError) {
          Pesaje.find( {
            include: [ Model.Empleado ],
            where: { idPesaje:pesajeId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByPesaje: function (pesaje, onSuccess, onError) {
          Pesaje.find( { where: { fechaPesaje: pesaje} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaPesaje = this.fechaPesaje;
          var horaPesaje = this.horaPesaje;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          Pesaje.build({ fechaPesaje: fechaPesaje, horaPesaje: horaPesaje, EmpleadoIdEmpleado: EmpleadoIdEmpleado })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (pesajeId, onSuccess, onError) {
          var idPesaje = pesajeId;
          var fechaPesaje = this.fechaPesaje;
          var horaPesaje = this.horaPesaje;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          Pesaje.update( { 
            fechaPesaje: fechaPesaje, horaPesaje: horaPesaje, EmpleadoIdEmpleado: EmpleadoIdEmpleado
          },{ where: { idPesaje:  pesajeId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (pesajeId, onSuccess, onError) {
         Pesaje.destroy( { where: { idPesaje: pesajeId } })
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
      tableName: 'Pesaje',
      comment: 'Pesaje',
      indexes: [
        {
          name: 'idxfechaPesaje',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaPesaje']
        }
      ]
    }
  );
  return Pesaje;
};
