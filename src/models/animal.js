var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Animal = sequelize.define(
    'Animal',
    {
      idAnimal: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'Identificador del animal',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      pesoInicial: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Peso inicial del Animal',
        validate: {
          isNumeric:true
          //notNull: true
        }
      },
      rpAnimal: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Rp del Animal'
        //validate: {
          //notNull: true
        //}
      },
      cuernos: {
        type: DataTypes.STRING(45),
        comment: 'Presencia de cuernos'
      },
      sexoAnimal: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'Sexo del Animal'
      },
      numeroTag: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: 'Número de Tag'
        //validate: {
          //notNull: true
        //}
      },
      fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha de Ingreso'
        //validate: {
          //notNull: true
        //}
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Animal.findAll( { 
            include: [ Model.Raza ]
          } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (animalId, onSuccess, onError) {
          Animal.find( { 
            include: [ Model.Raza ],
            where: { idAnimal: animalId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveByRp: function (rp, onSuccess, onError) {
          Animal.find( {
            include: [ Model.Raza ], 
            where: { rpAnimal: rp } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var pesoInicial = this.pesoInicial;
          var rpAnimal = this.rpAnimal;
          var cuernos = this.cuernos;
          var sexoAnimal = this.sexoAnimal;
          var numeroTag = this.numeroTag;
          var fechaIngreso = this.fechaIngreso;
          var RazaIdRaza = this.RazaIdRaza;

          Animal.build({
            pesoInicial: pesoInicial, rpAnimal: rpAnimal, cuernos: cuernos, sexoAnimal: sexoAnimal, 
            numeroTag: numeroTag, fechaIngreso: fechaIngreso, RazaIdRaza: RazaIdRaza
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (animalId, onSuccess, onError) {
          console.log('soy updatemodel',this.idAnimal, this.pesoInicial, this.rpAnimal, 
          this.cuernos, this.sexoAnimal, this.numeroTag, this.fechaIngreso);
          Animal.update(
          { pesoInicial: this.pesoInicial, rpAnimal: this.rpAnimal, 
            cuernos: this.cuernos, sexoAnimal: this.sexoAnimal, 
            numeroTag: this.numeroTag, fechaIngreso: this.fechaIngreso,
            RazaIdRaza: this.RazaIdRaza},
          { where: { idAnimal: this.idAnimal } }
          )
          .then(onSuccess).catch(onError);
        },
        removeById: function (animalId, onSuccess, onError) {
          Animal.destroy({ where: { idAnimal: animalId }})
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
      tableName: 'Animal',
      comment: 'Animal registrado',
      indexes: [
        {
          name: 'idxnumeroTag',
          method: 'BTREE',
          unique: false,
          fields: ['numeroTag']
        }
      ]
    }
  );
  return Animal;
};
