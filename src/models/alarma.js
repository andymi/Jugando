module.exports = function (sequelize, DataTypes) {
  var Alarma = sequelize.define(
    'Alarma',
    {
      idAlarma: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID nivel'
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Nombre del encabezado',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      alarma: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Alarma del encabezado',
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
          Alarma.findAll({
            order: 'idAlarma DESC'
          })
          .then(onSuccess).catch(onError);
        },

        retriveCount: function(onSuccess, onError){
          Alarma.findAll({
              attributes: [[sequelize.fn('COUNT', sequelize.col('nombre')), 'nombre']]
          }).then(onSuccess).catch(onError);
        },

        retrieveById: function (alarmaId, onSuccess, onError) {
          Alarma.find( { where: { idAlarma: alarmaId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByAlarma: function (alarma, onSuccess, onError) {
          Alarma.find( { where: { alarma: alarma} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          console.log('estoy dentro del modelo');  
          var nombre = this.nombre;
          var alarma = this.alarma;
          Alarma.build({ nombre: nombre, alarma: alarma})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (alarmaId, onSuccess, onError) {
          Alarma.update( 
            { nombre: this.nombre, alarma: this.alarma },
            { where: { idAlarma: alarmaId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (alarmaId, onSuccess, onError) {
          Alarma.destroy( { where: { idAlarma: alarmaId } })
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
      tableName: 'Alarma',
      comment: 'Alarma del sistema'
    }
  );
  return Alarma;
};
