var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Consumo = sequelize.define(
    'Consumo',
    {
      idConsumo: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Consumo'
      },
      fechaConsumo: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha del consumo'
        //validate: {
          //notNull: true
        //}
      },
      horaConsumo: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora del consumo'
        //validate: {
          //notNull: true
        //}
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Consumo.findAll({
            include: [ Model.Insumo ]
          })
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          Consumo.findAll( {
            attributes: ['idConsumo'],
            order: 'idConsumo DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          Consumo.findAll( {
            attributes: ['idConsumo'],
            where: { idConsumo:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (consumoId, onSuccess, onError) {
          Consumo.find( {
           include: [ Model.Insumo ],
           where: { idConsumo: consumoId } 
           }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByConsumo: function (consumo, onSuccess, onError) {
          Consumo.find( { where: { fechaConsumo: consumo} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaConsumo = this.fechaConsumo;
          var horaConsumo = this.horaConsumo;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          Consumo.build({ fechaConsumo: fechaConsumo, horaConsumo: horaConsumo, InsumoIdInsumo: InsumoIdInsumo })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (consumoId, onSuccess, onError) {
          var idEmpleado = this.consumoId;
          var fechaConsumo = this.fechaConsumo;
          var horaConsumo = this.horaConsumo;
          var InsumoIdInsumo = this.InsumoIdInsumo;
          Consumo.update( { 
            fechaConsumo: fechaConsumo, horaConsumo: horaConsumo, InsumoIdInsumo: InsumoIdInsumo
          },{ where: { idConsumo:  consumoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (consumoId, onSuccess, onError) {
          Consumo.destroy( { where: { idConsumo: consumoId } })
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
      tableName: 'Consumo',
      comment: 'Consumo',
      indexes: [
        {
          name: 'idxfechaConsumo',
          method: 'BTREE',
          unique: false,
          fields: ['fechaConsumo']
        }
      ]
    }
  );
  return Consumo;
};
