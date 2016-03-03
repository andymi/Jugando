var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var FacturaVenta = sequelize.define(
    'FacturaVenta',
    {
      idVenta: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Venta',
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      fechaVenta: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha de la Venta',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      totalVenta: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Total de la Venta',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      condicionVenta: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Condicion de la Venta',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      formaCobro: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Fomra de cobro',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      numeroVenta: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Numero de la Factura Venta',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaVenta: {
        type: DataTypes.TIME,
        comment: 'Hora de la Venta',
        validate: {
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          FacturaVenta.findAll({
            include: [ Model.Cliente ]
          })
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          FacturaVenta.findAll( {
            attributes: ['idVenta'],
            order: 'idVenta DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          FacturaVenta.findAll( {
            attributes: ['idVenta'],
            where: { idVenta:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (ventaId, onSuccess, onError) {
          FacturaVenta.find( { 
            include: [ Model.Cliente ],
            where: { idVenta: ventaId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByVenta: function (fecha, onSuccess, onError) {
         FacturaVenta.find( { where: { fechaVenta: fecha} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {

          var fechaVenta = this.fechaVenta;
          var totalVenta = this.totalVenta;
          var condicionVenta = this.condicionVenta;
          var formaCobro = this.formaCobro;
          var numeroVenta = this.numeroVenta;
          var horaVenta = this.horaVenta;
          var ClienteIdCliente = this.ClienteIdCliente;

          FacturaVenta.build({ fechaVenta: fechaVenta, totalVenta: totalVenta, condicionVenta:condicionVenta,
          formaCobro: formaCobro,numeroVenta: numeroVenta,horaVenta: horaVenta, ClienteIdCliente: ClienteIdCliente})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (ventaId, onSuccess, onError) {
          var idVenta = this.idVenta; 
          var fechaVenta = this.fechaVenta;
          var totalVenta = this.totalVenta;
          var condicionVenta = this.condicionVenta;
          var formaCobro = this.formaCobro;
          var numeroVenta = this.numeroVenta;
          var horaVenta = this.horaVenta;
          var ClienteIdCliente = this.ClienteIdCliente;


          FacturaVenta.update( { 
            fechaVenta: fechaVenta, totalVenta: totalVenta, condicionVenta:condicionVenta,
            formaCobro: formaCobro,numeroVenta: numeroVenta,horaVenta: horaVenta, ClienteIdCliente: ClienteIdCliente
          },{ where: { idVenta: ventaId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (ventaId, onSuccess, onError) {
          FacturaVenta.destroy( { where: { idVenta: ventaId } })
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
      tableName: 'facturaventa',
      comment: 'Factura Venta',
      indexes: [
        {
          name: 'idxfechaVenta',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaVenta']
        }
      ]
    }
  );
  return FacturaVenta;
};
