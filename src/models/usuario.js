var crypto = require('crypto');
var config = require('../config/config');

var key = config.key;
var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Usuario = sequelize.define(
    'Usuario',
    {
      idUsuario: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID Usuario',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      usuario: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'correo',
        comment: 'Correo electrónico del usuario, se utilizará como username',
        validate: {
          notEmpty: { msg: '-> Falta username' },
          // hay que devolver un mensaje de error si el username ya existe
          isUnique: function (value, next) {
            var self = this;
            Usuario.find({ where: { usuario: value } })
            .then(function (user) {
              if (user && self.id !== user.id) {
                return next('Username ya utilizado');
              }
              return next();
            })
            .catch(function (err) {
              return next(err);
            });
          }
        }
      },
      pass: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'none',
        comment: 'Password del usuario para ingresar al sistema',
        validate: {
          notEmpty: { msg: '-> Falta password' },
          set: function (pass) {
            var encripted = crypto.createHmac('sha1', key).update(pass).digest('hex');
            // Evita passwords vacíos
            if (pass === '') {
              encripted = '';
            }
            this.setDataValue('pass', encripted);
            console.log(pass);
          }
        }
      }
    },
    {
      instanceMethods: {
        autenticar: function (usuario, pass, onSuccess, onError) {
          console.log('estoy dentro de autenticar');
          var encripted = crypto.createHmac('sha1', key).update(pass).digest('hex');
          console.log('soy encripted', encripted);
          
          Usuario.find({
            where: {
              usuario: usuario,
              $and: {pass: encripted} 
            }
          }).then(onSuccess).catch(onError);  
        },

        retrieveAll: function (onSuccess, onError) {
          Usuario.findAll( {
            include: [ Model.Nivel, Model.Empleado ]
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (userId, onSuccess, onError) {
          Usuario.find( { 
            include: [ Model.Nivel, Model.Empleado ],
            where: { idUsuario: userId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveUser: function (usuario, onSuccess, onError) {
          console.log('estoy adentro de retrieveUser');
          Usuario.find( { 
            where: { usuario: usuario}
          }, { raw: true }).then(onSuccess).catch(onError);          
        },
        add: function (onSuccess, onError) {
          var usuario = this.usuario;
          var pass = this.pass;
          var NivelIdNivel = this.NivelIdNivel;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          var shasum = crypto.createHash('sha1');
          shasum.update(pass);
          pass = shasum.digest('hex');

          console.log('soy post usuario',usuario);
          console.log('soy post pass',pass);
          console.log('soy post NivelIdNivel',NivelIdNivel);

          Usuario.build({ usuario: usuario, pass: pass , NivelIdNivel: NivelIdNivel, EmpleadoIdEmpleado: EmpleadoIdEmpleado})
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (userId, onSuccess, onError) {
          var idUsuario = userId;
          var usuario = this.usuario;
          var pass = this.pass;
          var NivelId = this.NivelId;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          var shasum = crypto.createHash('sha1');
          shasum.update(pass);
          pass = shasum.digest('hex');

          Usuario.update({ usuario: usuario, pass: pass, NivelId: NivelId, EmpleadoIdEmpleado: EmpleadoIdEmpleado },{ where: { idUsuario: idUsuario } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (userId, onSuccess, onError) {
          Usuario.destroy({ where: { idUsuario: userId }})
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
      tableName: 'Usuario',
      comment: 'Usuario registrado para ingresar datos al sistema',
      indexes: [
        {
          name: 'idxUsuario',
          method: 'BTREE',
          unique: true,
          fields: ['usuario']
        }
      ]
    }
  );
  return Usuario;
};
