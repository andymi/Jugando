var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var IngresoCorral = sequelize.define(
    'IngresoCorral',
    {
      idIngresoCorral: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID ingreso'
      },
      fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha de ingreso al corral',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaIngreso: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de ingreso al corral',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      observacionIngreso: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'observacion sobre el ingreso',
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
          IngresoCorral.findAll({
            include: [ Model.Empleado ]
          })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (ingresoCorralId, onSuccess, onError) {
          IngresoCorral.find( { 
            include: [ Model.Empleado ],
            where: { idIngresoCorral: ingresoCorralId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByEmpleado: function (ingresoId, onSuccess, onError) {
          Model.Empleado.find({ 
            where:{ cedulaEmpleado: ingresoId }
          }).then(function (DetalleSalida) {
            IngresoCorral.findAll({ 
              include: [ Model.Empleado ],
              where: { EmpleadoIdEmpleado: DetalleSalida.idEmpleado } 
            }).then(onSuccess).catch(onError);
          });
        },
        retrieveByIngresoCorral: function (ingreso, onSuccess, onError) {
          IngresoCorral.find( { where: { fechaIngreso: ingreso} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaIngreso = this.fechaIngreso;
          var horaIngreso = this.horaIngreso;          
          var observacionIngreso = this.observacionIngreso;
          var EmpleadoIdEmpleado= this.EmpleadoIdEmpleado;

          IngresoCorral.build({ fechaIngreso: fechaIngreso, horaIngreso: horaIngreso, 
            observacionIngreso: observacionIngreso, EmpleadoIdEmpleado: EmpleadoIdEmpleado })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (ingresoCorralId, onSuccess, onError) {
          var idIngresoCorral = ingresoCorralId;
          var fechaIngreso = this.fechaIngreso;
          var horaIngreso = this.horaIngreso;          
          var observacionIngreso = this.observacionIngreso;
          var EmpleadoIdEmpleado= this.EmpleadoIdEmpleado;

          IngresoCorral.update( { 
            fechaIngreso: fechaIngreso, horaIngreso: horaIngreso, observacionIngreso: observacionIngreso,
            EmpleadoIdEmpleado: EmpleadoIdEmpleado
          },{ where: { idIngresoCorral :  ingresoCorralId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (ingresoCorralId, onSuccess, onError) {
          IngresoCorral.destroy( { where: { idIngresoCorral: ingresoCorralId } })
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
      tableName: 'IngresoCorral',
      comment: 'IngresoCorral',
      indexes: [
        {
          name: 'idxfechaIngreso',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaIngreso']
        }
      ]
    }
  );
  return IngresoCorral;
};
