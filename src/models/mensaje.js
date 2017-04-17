module.exports = function (sequelize, DataTypes) {
  var Mensaje = sequelize.define(
    'Mensaje',
    {
      idMensaje: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID nivel'
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Nombre del remitente',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Correo del remitente',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      mensaje: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Mensaje del remitente',
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
          Mensaje.findAll({
            order: 'idMensaje DESC'
          })
          .then(onSuccess).catch(onError);
        },

        retriveCount: function(onSuccess, onError){
          Mensaje.findAll({
              attributes: [[sequelize.fn('COUNT', sequelize.col('email')), 'email']]
          }).then(onSuccess).catch(onError);
        },

        retrieveById: function (mensajeId, onSuccess, onError) {
          Mensaje.find( { where: { idMensaje: mensajeId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByCategoria: function (email, onSuccess, onError) {
          Mensaje.find( { where: { email: email} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          console.log('estoy dentro del modelo');  
          var nombre = this.nombre;
          var email = this.email;
          var mensaje = this.mensaje;
          Mensaje.build({ nombre: nombre, email: email, mensaje: mensaje})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (mensajeId, onSuccess, onError) {
          Mensaje.update( 
            { nombre: this.nombre, email: this.email, mensaje: this.mensaje },
            { where: { idMensaje: mensajeId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (mensajeId, onSuccess, onError) {
          Mensaje.destroy( { where: { idMensaje: mensajeId } })
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
      tableName: 'Mensaje',
      comment: 'Mensaje del Usuario al administrador'
    }
  );
  return Mensaje;
};
