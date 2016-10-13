var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Extraviado = sequelize.define(
    'Extraviado',
    {
      idExtraviado: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID extraviado',
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      fechaExtraviado: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha en que se extravio el animal',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaExtraviado: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora en el que se extravio el animal',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      lugarExtraviado: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Lugar del Extravio',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      cantidadTotal: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad Total de Extravio',
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
          Extraviado.findAll({
            include: [ Model.Empleado ]
          })
          .then(onSuccess).catch(onError);
        },
        retrieveExtraviado: function (onSuccess, onError) {
          Extraviado.findAll({
            attributes:[[sequelize.fn('SUM', sequelize.col('cantidadTotal')),'cantidadTotal']]
          }).then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          Extraviado.findAll( {
            attributes: ['idExtraviado'],
            order: 'idExtraviado DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          Extraviado.findAll( {
            attributes: ['idExtraviado'],
            where: { idExtraviado:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (extraviadoId, onSuccess, onError) {
          Extraviado.find( {
           include: [ Model.Empleado ],
           where: { idExtraviado: extraviadoId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByExtraviado: function (extraviado, onSuccess, onError) {
         Extraviado.find( { where: { fechaExtraviado: extraviado} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaExtraviado = this.fechaExtraviado;
          var horaExtraviado = this.horaExtraviado;
          var lugarExtraviado = this.lugarExtraviado;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;
          console.log('estoy dentro de add:',fechaExtraviado, horaExtraviado, lugarExtraviado, EmpleadoIdEmpleado);
          Extraviado.build({ fechaExtraviado: fechaExtraviado, horaExtraviado: horaExtraviado, 
          lugarExtraviado: lugarExtraviado, EmpleadoIdEmpleado: EmpleadoIdEmpleado })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (extraviadoId, onSuccess, onError) {
          var idExtraviado = extraviadoId;
          var fechaExtraviado = this.fechaExtraviado;
          var horaExtraviado = this.horaExtraviado;
          var lugarExtraviado = this.lugarExtraviado;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          Extraviado.update( { 
            fechaExtraviado: fechaExtraviado, horaExtraviado: horaExtraviado, lugarExtraviado: lugarExtraviado,
            EmpleadoIdEmpleado: EmpleadoIdEmpleado
          },{ where: { idExtraviado:  extraviadoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (extraviadoId, onSuccess, onError) {
          Extraviado.destroy( { where: { idExtraviado: extraviadoId } })
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
      tableName: 'Extraviado',
      comment: 'Extraviado',
      indexes: [
        {
          name: 'idxfechaExtraviado',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaExtraviado']
        }
      ]
    }
  );
  return Extraviado;
};
