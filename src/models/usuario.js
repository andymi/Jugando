var crypto = require('crypto');
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
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Nombre del usuario',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      pass: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Password del usuario para ingresar al sistema',
        validate: {
          //notNull: true,
          isAlphanumeric: true
          
        }
      }
    },
    {
      instanceMethods: {
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
        retrieveByEmail: function (userUsuario, onSuccess, onError) {
          Usuario.find( { where: { usuario: userUsuario } }, { raw: true })
          .then(onSuccess).catch(onError);
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
      getterMethods: {
        nombreCompleto : function () { return this.usuario + ' ' + this.pass; }
      },
      setterMethods: {
        nombreCompleto: function (valor) {
          var nombres = valor.split(' ');
          this.setDataValue('usuario', nombres.slice(0,-1).join(' '));
          this.setDataValue('pass', nombres.slice(-1).join(' '));
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
