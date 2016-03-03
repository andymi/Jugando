module.exports = function (sequelize, DataTypes) {
  var Insumo = sequelize.define(
    'Insumo',
    {
      idInsumo: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Insumo'
      },
      codigoBarra: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Codigo de Barra',
        validate: {
          //is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      nombreInsumo: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Nombre del Insumo',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      contenidoInsumo: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Contenido del Insumo',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      precioCompra: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Precio de compra del Insumo',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      tipoInsumo: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Tipo de Insumo',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      presentacionInsumo: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Presentacion del Insumo',
        validate: {
          is: ['[a-z]','i'],
          notEmpty: true
        }
      },
      estadoInsumo: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Estado del Insumo',
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
          Insumo.findAll({})
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (insumoId, onSuccess, onError) {
          Insumo.find( { where: { idInsumo: insumoId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByInsumo: function (insumo, onSuccess, onError) {
          Insumo.find( { where: { nombreInsumo: insumo} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var codigoBarra = this.codigoBarra;
          var nombreInsumo = this.nombreInsumo;
          var contenidoInsumo = this.contenidoInsumo;
          var precioCompra = this.precioCompra;
          var tipoInsumo = this.tipoInsumo;
          var presentacionInsumo = this.presentacionInsumo;
          var estadoInsumo = this.estadoInsumo;

          Insumo.build({ codigoBarra: codigoBarra, nombreInsumo: nombreInsumo, contenidoInsumo: contenidoInsumo, precioCompra: precioCompra,
          tipoInsumo: tipoInsumo, presentacionInsumo: presentacionInsumo, estadoInsumo: estadoInsumo })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (insumoId, onSuccess, onError) {
          var idInsumo = insumoId;
          var codigoBarra = this.codigoBarra;
          var nombreInsumo = this.nombreInsumo;
          var contenidoInsumo = this.contenidoInsumo;
          var precioCompra = this.precioCompra;
          var tipoInsumo = this.tipoInsumo;
          var presentacionInsumo = this.presentacionInsumo;
          var estadoInsumo = this.estadoInsumo;

          Insumo.update( { 
           codigoBarra: codigoBarra, nombreInsumo: nombreInsumo, contenidoInsumo: contenidoInsumo, precioCompra: precioCompra,
           tipoInsumo: tipoInsumo, presentacionInsumo: presentacionInsumo, estadoInsumo: estadoInsumo
          },{ where: { idInsumo:  insumoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (insumoId, onSuccess, onError) {
          Insumo.destroy( { where: { idInsumo: insumoId } })
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
      tableName: 'Insumo',
      comment: 'Insumo',
      indexes: [
        {
          name: 'idxnombreInsumo',
          method: 'BTREE',
          unique: true,
          fields: ['nombreInsumo']
        }
      ]
    }
  );
  return Insumo;
};
