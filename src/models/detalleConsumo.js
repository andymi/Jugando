var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var DetalleConsumo = sequelize.define(
    'DetalleConsumo',
    {
      idDetalleConsumo: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID DetalleConsumo',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      cantidad: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'cantidad',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      observacion: {
        type: DataTypes.STRING(250),
        comment: 'observacion',
        validate: {
          notEmpty: true
        }
      },
      sobra: {
        type: DataTypes.STRING(50),
        comment: 'sobra',
        defaultValue: '0',
        validate: {
          notEmpty: true
        }
      }
    },
    {
      instanceMethods: {
        guardar: function(id, onSuccess, onError){
          DetalleConsumo.findAll({
            attributes:[[sequelize.fn('SUM', sequelize.col('cantidad')),'TOTAL']],
            where: { ConsumoIdConsumo:id }
          }).then(function (detalleConsumo){
            console.log('dentro de update',detalleConsumo[0].dataValues['TOTAL']);
            Model.Consumo.update( { 
             cantidadTotal: detalleConsumo[0].dataValues['TOTAL']
            },{ where: { idConsumo: id } })
            .then(onSuccess).catch(onError);
            });
        },
        retrieveAll: function (id, onSuccess, onError) {
          DetalleConsumo.findAll({
            include: [ Model.Animal , Model.Consumo ],
            where: { ConsumoIdConsumo:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveByRp: function (id, onSuccess, onError) {
          Model.Animal.find({ 
            where:{ rpAnimal: id }
          }).then(function (DetalleSalida) {
            DetalleConsumo.findAll({
              include: [ Model.Animal , Model.Consumo ],
              where: { AnimalIdAnimal:DetalleSalida.idAnimal }
            })
            .then(onSuccess).catch(onError);
          });
        },
        retrieveAnimal: function (id, onSuccess, onError) {
          DetalleConsumo.findAll({
            include: [ Model.Animal , Model.Consumo ],
            where: { AnimalIdAnimal:id }
          })
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          DetalleConsumo.findAll( {
            attributes: ['idDetalleConsumo'],
            order: 'idDetalleConsumo DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (detalleConsumoId, onSuccess, onError) {
          DetalleConsumo.find( {
            include: [ Model.Animal ],
            where: { idDetalleConsumo:detalleConsumoId }
          }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var cantidad = this.cantidad;
          var observacion = this.observacion;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          var ConsumoIdConsumo = this.ConsumoIdConsumo;

          DetalleConsumo.build({ cantidad: cantidad, observacion: observacion, 
            AnimalIdAnimal:AnimalIdAnimal, ConsumoIdConsumo: ConsumoIdConsumo })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (detalleConsumoId, onSuccess, onError) {
          var idDetalleConsumo = this.idDetalleConsumo;          
          var cantidad = this.cantidad;
          var observacion = this.observacion;
          var sobra = this.sobra;
          var AnimalIdAnimal = this.AnimalIdAnimal;
          
          DetalleConsumo.update( { 
            cantidad: cantidad, observacion: observacion, sobra: sobra, AnimalIdAnimal: AnimalIdAnimal
          },{ where: { idDetalleConsumo: detalleConsumoId } })
          .then(onSuccess).catch(onError);
        },
        updateById2: function (detalleConsumoId,sobra, onSuccess, onError) {
          console.log('soy la sobraaaaa',sobra);
          var idDetalleConsumo = this.idDetalleConsumo;          
          var sobra = sobra;
          
          DetalleConsumo.update( { 
            sobra: sobra
          },{ where: { idDetalleConsumo: detalleConsumoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (detalleConsumoId, onSuccess, onError) {
          DetalleConsumo.destroy( { where: { idDetalleConsumo: detalleConsumoId } })
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
      tableName: 'detalleConsumo',
      comment: 'Detalle Consumo',
      /*indexes: [
        {
          name: 'idxCantidadConsumo',
          method: 'BTREE',
          unique: true,
          fields: ['cantidadConsumo']
        }
      ]*/
    }
  );
  return DetalleConsumo;
};
