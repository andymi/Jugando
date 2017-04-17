module.exports = function (sequelize, DataTypes) {
  var Herramienta = sequelize.define(
    'Herramienta',
    {
      idHerramienta: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID nivel'
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Nombre de la Herramienta',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      vidaUtil: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Alarma del encabezado',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      mantenimiento: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Fecha de mantenimiento'
        //validate: {
          //notNull: true
        //}
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Herramienta.findAll({})
          .then(onSuccess).catch(onError);
        },

        retriveCount: function(onSuccess, onError){
          Herramienta.findAll({
              attributes: [[sequelize.fn('COUNT', sequelize.col('nombre')), 'nombre']]
          }).then(onSuccess).catch(onError);
        },

        retrieveById: function (herramientaId, onSuccess, onError) {
          Herramienta.find( { where: { idHerramienta: herramientaId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByAlarma: function (mantenimiento, onSuccess, onError) {
          Herramienta.find( { where: { mantenimiento: mantenimiento} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          console.log('estoy dentro del modelo');  
          var nombre = this.nombre;
          var vidaUtil = this.vidaUtil;
          var mantenimiento = this.mantenimiento;

          Herramienta.build({ nombre: nombre, vidaUtil: vidaUtil, mantenimiento: mantenimiento})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (herramientaId, onSuccess, onError) {
          Herramienta.update( 
            { nombre: this.nombre, vidaUtil: this.vidaUtil, mantenimiento: this.mantenimiento },
            { where: { idHerramienta: herramientaId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (herramientaId, onSuccess, onError) {
          Herramienta.destroy( { where: { idHerramienta: herramientaId } })
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
      tableName: 'Herramienta',
      comment: 'Herramienta del corral'
    }
  );
  return Herramienta;
};
