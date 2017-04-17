var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var FacturaCompra = sequelize.define(
    'FacturaCompra',
    {
      idCompra: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID compra',
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      fechaCompra: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha de la Compra',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      horaCompra: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de la Compra',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      totalCompra: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Total de la Compra',
        defaultValue: '0',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      condicionCompra: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Condicion de la Compra',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      formaPago: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Fomra de pago',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      numeroCompra: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Numero de la Factura Compra',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      cantidadTotalCompra: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad total de Animales Comprados',
        defaultValue: '0',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        retrieveTodo: function (onSuccess, onError) {
          FacturaCompra.findAll({
            include: [ Model.Proveedor ]
          }).then(onSuccess).catch(onError);          
        },
        retrieveAll: function (onSuccess, onError) {
          Model.Proveedor.find({
            attributes: ['idProveedor'],
            where:{tipoProveedor:'Insumo'}
          }).then(function (Proveedori) {
              FacturaCompra.findAll({
                include: [ Model.Proveedor ],
                where: { ProveedorIdProveedor: Proveedori.idProveedor }
              })
              .then(onSuccess).catch(onError);
          });
        },
        retrieveAll2: function (onSuccess, onError) {
          Model.Proveedor.find({
            attributes: ['idProveedor'],
            where:{tipoProveedor:'Animal'}
          }).then(function (Proveedori) {
              FacturaCompra.findAll({
                include: [ Model.Proveedor ],
                where: { ProveedorIdProveedor: Proveedori.idProveedor }
              })
              .then(onSuccess).catch(onError);
          });
        },
        retrieveAll3: function (onSuccess, onError) {
          Model.Proveedor.find({
            attributes: ['idProveedor'],
            where:{tipoProveedor:'Servicio'}
          }).then(function (Proveedori) {
              FacturaCompra.findAll({
                include: [ Model.Proveedor ],
                where: { ProveedorIdProveedor: Proveedori.idProveedor }
              })
              .then(onSuccess).catch(onError);
          });
        },
        retrieveId: function (onSuccess, onError) {
          FacturaCompra.findAll( {
            attributes: ['idCompra'],
            order: 'idCompra DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          FacturaCompra.findAll( {
            attributes: ['idCompra'],
            where: { idCompra:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (compraId, onSuccess, onError) {
          FacturaCompra.find( { 
            include: [ Model.Proveedor ],
            where: { idCompra: compraId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },        

        add: function (onSuccess, onError) {

          var fechaCompra = this.fechaCompra;
          var horaCompra = this.horaCompra;
          var condicionCompra = this.condicionCompra;
          var formaPago = this.formaPago;
          var numeroCompra = this.numeroCompra;
          var ProveedorIdProveedor = this.ProveedorIdProveedor;

          console.log('soy postadd fechaCompra',fechaCompra);
          console.log('soy postadd horaCompra',horaCompra);
          console.log('soy postadd condicionCompra',condicionCompra);
          console.log('soy postadd formaPago',formaPago);
          console.log('soy postadd numeroCompra',numeroCompra);
          console.log('soy postadd ProveedorIdProveedor',ProveedorIdProveedor);

          FacturaCompra.build({ fechaCompra: fechaCompra,
           horaCompra: horaCompra, 
           condicionCompra:condicionCompra,
          formaPago: formaPago,numeroCompra: numeroCompra, ProveedorIdProveedor: ProveedorIdProveedor})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (facturaCompraId, onSuccess, onError) {
          var idCompra = facturaCompraId; 
          var fechaCompra = this.fechaCompra;
          var horaCompra = this.horaCompra;
          var condicionCompra = this.condicionCompra;
          var formaPago = this.formaPago;
          var numeroCompra = this.numeroCompra;
          var ProveedorIdProveedor = this.ProveedorIdProveedor;
          console.log('dentro de update',idCompra, fechaCompra, 
            horaCompra, 
            condicionCompra, 
            formaPago, numeroCompra, horaCompra, ProveedorIdProveedor);

          FacturaCompra.update( { 
            fechaCompra: fechaCompra, 
            horaCompra: horaCompra, 
            condicionCompra:condicionCompra,
            formaPago: formaPago,numeroCompra: numeroCompra, ProveedorIdProveedor: ProveedorIdProveedor
          },{ where: { idCompra: facturaCompraId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (facturaCompraId, onSuccess, onError) {
          FacturaCompra.destroy( { where: { idCompra: facturaCompraId} })
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
      tableName: 'facturacompra',
      comment: 'Factura Compra',
      indexes: [
        {
          name: 'idxfechaCompra',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaCompra']
        }
      ]
    }
  );
  return FacturaCompra;
};
