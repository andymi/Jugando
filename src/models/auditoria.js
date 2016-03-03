module.exports = function (sequelize, DataTypes) {
  var Auditoria = sequelize.define(
    'Auditoria',
    {
      idAuditoria: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID auditoria',
        validate: {
          isNumeric:true,
          notNull: true
        }
      },
      tabla: {
        type: DataTypes.STRING(45),
        allowNull: false,
        hasComment: { comment: 'Nombre de la Tabla' },      
        //validate: {
          //notNull: true
        //}
      },
      ipMaquina: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'IP de la Maquina',
        //validate: {
          //notNull: true
        //}
      },
      descripcionAuditoria: {
        type: DataTypes.STRING(250),
        allowNull: false,
        comment: 'Descripcion de la Auditoria',
        //validate: {
         // notNull: true
        //}
      },
      fechaAuditoria: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha de la Auditoria',
        //validate: {
          //notNull: true
        //}
      },
      horaAuditoria: {
        type: DataTypes.TIME,
        allowNull: false,
        comment: 'Hora de la Auditoria',
        //validate: {
          //notNull: true
        //}
      }
    },
    {
      instanceMethods: {
        retrieveAll: function (onSuccess, onError) {
          Auditoria.findAll( { } )
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (auditoriaId, onSuccess, onError) {
          Auditoria.find( { where: { id: auditoriaId } }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var tabla = this.tabla;
          var ipMaquina = this.ipMaquina;
          var descripcionAuditoria = this.descripcionAuditoria;
          var fechaAuditoria = this.fechaAuditoria;
          var horaAuditoria = this.horaAuditoria;

          Auditoria.build({
            tabla: tabla, ipMaquina: ipMaquina, descripcionAuditoria: descripcionAuditoria,
            fechaAuditoria: fechaAuditoria, horaAuditoria: horaAuditoria
          })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (auditoriaId, onSuccess, onError) {
          var idAuditoria = auditoriaId;
          var tabla = this.tabla;
          var ipMaquina = this.ipMaquina;
          var descripcionAuditoria = this.descripcionAuditoria;
          var fechaAuditoria = this.fechaAuditoria;
          var horaAuditoria = this.horaAuditoria;

          Auditoria.update({
            tabla: tabla, ipMaquina: ipMaquina, descripcionAuditoria: descripcionAuditoria,
            fechaAuditoria: fechaAuditoria, horaAuditoria: horaAuditoria
          },{ where: { idAuditoria: idAuditoria } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (auditoriaId, onSuccess, onError) {
          Auditoria.destroy({ where: { idAuditoria: auditoriaId }})
          .then(onSuccess).catch(onError);
        }
      },
      timestamps: true,
      paranoid: true,
      createdAt: 'fechaCreacion',
      updatedAt: 'fechaModificacion',     
      deletedAt: 'fechaBorrado',
      underscore: false,
      freezeTableName:true,
      tableName: 'Auditoria',
      comment: 'Auditoria registrada',
      indexes: [        
        {
          name: 'idxfechaAuditoria',
          method: 'BTREE',
          unique: false,
          fields: ['fechaAuditoria']
        },
        {
          name: 'idxhoraAuditoria',
          method: 'BTREE',
          unique: false,
          fields: ['horaAuditoria']
        }
      ]
    }
  );
  return Auditoria;
};
