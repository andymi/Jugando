var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Muertes = sequelize.define(
    'Muertes',
    {
      idMuerte: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Muerte'
      },
      fechaMuerte: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'fecha de la Muerte',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaMuerte: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de la Muerte',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      cantidadTotal: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad total de muertes',
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
          Muertes.findAll({
            include: [ Model.Proveedor, Model.Empleado ]
          })
          .then(onSuccess).catch(onError);
        },
        retrieveSMuerte2: function (onSuccess, onError) {
          Muertes.findAll({
            attributes:[[sequelize.fn('SUM', sequelize.col('cantidadTotal')),'cantidadTotal']]
          }).then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          Muertes.findAll( {
            attributes: ['idMuerte'],
            order: 'idMuerte DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          Muertes.findAll( {
            attributes: ['idMuerte'],
            where: { idMuerte:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (muerteId, onSuccess, onError) {
          Muertes.find( { 
            include: [ Model.Proveedor, Model.Empleado ],
            where: { idMuerte: muerteId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByMuertes: function (muerte, onSuccess, onError) {
          Muertes.find( { where: { fechaMuerte: muerte} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaMuerte = this.fechaMuerte;
          var horaMuerte = this.horaMuerte;
          var ProveedorIdProveedor = this.ProveedorIdProveedor;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          Muertes.build({ fechaMuerte: fechaMuerte, horaMuerte: horaMuerte,
          ProveedorIdProveedor: ProveedorIdProveedor, EmpleadoIdEmpleado: EmpleadoIdEmpleado })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (muerteId, onSuccess, onError) {
          var idMuerte = muerteId;
          var fechaMuerte = this.fechaMuerte;
          var horaMuerte = this.horaMuerte;
          var ProveedorIdProveedor = this.ProveedorIdProveedor;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          Muertes.update( { 
            fechaMuerte: fechaMuerte, horaMuerte: horaMuerte, 
            ProveedorIdProveedor: ProveedorIdProveedor, EmpleadoIdEmpleado: EmpleadoIdEmpleado
          },{ where: { idMuerte:  muerteId } })
          .then(onSuccess).catch(onError);
        },
        /*updateCount: function (muerteId, count , onSuccess, onError) {
          var idMuerte = muerteId;
          var cantidadTotal = this.count;
          Muertes.update( { 
            cantidadTotal: cantidadTotal
          },{ where: { idMuerte:  muerteId } })
          .then(onSuccess).catch(onError);
        },*/
        removeById: function (muerteId, onSuccess, onError) {
          Muertes.destroy( { where: { idMuerte: muerteId } })
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
      tableName: 'Muertes',
      comment: 'Muertes',
      indexes: [
        {
          name: 'idxfechaMuerte',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaMuerte']
        }
      ]
    }
  );
  return Muertes;
};
