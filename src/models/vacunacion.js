var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Vacunacion = sequelize.define(
    'Vacunacion',
    {
      idVacunacion: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Vacunacion'
      },
      fechaVacunacion: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'fecha de la Vacunacion',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaVacunacion: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de la Vacunacion',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Vacunacion.findAll({
            include: [ Model.Proveedor ]
          })
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          Vacunacion.findAll( {
            attributes: ['idVacunacion'],
            order: 'idVacunacion DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          Vacunacion.findAll( {
            attributes: ['idVacunacion'],
            where: { idVacunacion:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (vacunacionId, onSuccess, onError) {
          Vacunacion.find( { 
            include: [ Model.Proveedor ],
            where: { idVacunacion: vacunacionId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByVacunacion: function (vacunacion, onSuccess, onError) {
          Vacunacion.find( { where: { fechaVacunacion: vacunacion} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaVacunacion = this.fechaVacunacion;
          var horaVacunacion = this.horaVacunacion;
          var ProveedorIdProveedor = this.ProveedorIdProveedor;

          Vacunacion.build({ fechaVacunacion: fechaVacunacion, horaVacunacion: horaVacunacion, 
           ProveedorIdProveedor:ProveedorIdProveedor })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (vacunacionId, onSuccess, onError) {
          var idVacunacion = vacunacionId;
          var fechaVacunacion = this.fechaVacunacion;
          var horaVacunacion = this.horaVacunacion;
          var ProveedorIdProveedor = this.ProveedorIdProveedor;

          Vacunacion.update( { 
            fechaVacunacion: fechaVacunacion, horaVacunacion: horaVacunacion, 
            ProveedorIdProveedor:ProveedorIdProveedor
          },{ where: { idVacunacion:  vacunacionId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (vacunacionId, onSuccess, onError) {
          Vacunacion.destroy( { where: { idVacunacion: vacunacionId } })
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
      tableName: 'Vacunacion',
      comment: 'Vacunacion',
      indexes: [
        {
          name: 'idxfechaVacunacion',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaVacunacion']
        }
      ]
    }
  );
  return Vacunacion;
};
