var Model = require('./jugando');
module.exports = function (sequelize, DataTypes) {
  var Traslado = sequelize.define(
    'Traslado',
    {
      idTraslado: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: 'ID empleado'
      },
      fechaTraslado: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Fecha del traslado',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      nombreConductor: {
        type: DataTypes.STRING(55),
        allowNull: false,
        comment: 'nombre del conductor',
        validate: {
          is: ['[a-z]','i'],
          //notNull: true,
          notEmpty: true
        }
      },
      cedulaConductor: {
        type: DataTypes.STRING(45),
        allowNull: false,
        comment: 'cedula del conductor'
        //validate: {
          //notNull: true
        //}
      },
      cantidadAnimal: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        comment: 'Cantidad de animales que fueron trasladados',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      numeroRUA: {
        type: DataTypes.STRING(55),
        allowNull: false,
        comment: 'numero del registro unico del automotor',
        validate: {
          //notNull: true,
          notEmpty: true
        }
      },
      marcaAuto: {
        type: DataTypes.STRING(55),
        allowNull: false,
        comment: 'Marca del auto',
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
          Traslado.findAll({
            include: [ Model.Ciudad, Model.FacturaCompra, Model.Empleado ] 
          })
          .then(onSuccess).catch(onError);
        },
        retrieveId: function (onSuccess, onError) {
          Traslado.findAll( {
            attributes: ['idTraslado'],
            order: 'idTraslado DESC LIMIT 1'
           } )
          .then(onSuccess).catch(onError);
        },
        retrieveVerId: function (id, onSuccess, onError) {
          Traslado.findAll( {
            attributes: ['idTraslado'],
            where: { idTraslado:id }
           }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        retrieveById: function (trasladoId, onSuccess, onError) {
         Traslado.find( { 
          include: [ Model.Ciudad, Model.FacturaCompra, Model.Empleado ],
          where: { idTraslado: trasladoId } }, { raw: true } )
          .then(onSuccess).catch(onError);
        },
        retrieveByTraslado: function (traslado, onSuccess, onError) {
          Traslado.find( { where: { nombreTraslado: traslado} }, { raw: true })
          .then(onSuccess).catch(onError);
        },
        add: function (onSuccess, onError) {
          var fechaTraslado = this.fechaTraslado;
          var nombreConductor = this.nombreConductor;
          var cedulaConductor = this.cedulaConductor;
          var cantidadAnimal = this.cantidadAnimal;          
          var numeroRUA = this.numeroRUA;
          var marcaAuto = this.marcaAuto;
          var CiudadIdCiudad = this.CiudadIdCiudad;          
          var FacturaCompraIdCompra = this.FacturaCompraIdCompra;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

          Traslado.build({ fechaTraslado: fechaTraslado, nombreConductor: nombreConductor, 
          cedulaConductor:cedulaConductor,cantidadAnimal:cantidadAnimal, numeroRUA:numeroRUA, 
          marcaAuto:marcaAuto, CiudadIdCiudad: CiudadIdCiudad, FacturaCompraIdCompra: FacturaCompraIdCompra,
          EmpleadoIdEmpleado: EmpleadoIdEmpleado })
          .save().then(onSuccess).catch(onError);
        },
        updateById: function (trasladoId, onSuccess, onError) {
          var idTraslado = trasladoId;
          var fechaTraslado = this.fechaTraslado;
          var nombreConductor = this.nombreConductor;
          var cedulaConductor = this.cedulaConductor;
          var cantidadAnimal = this.cantidadAnimal;          
          var numeroRUA = this.numeroRUA;
          var marcaAuto = this.marcaAuto;
          var CiudadIdCiudad = this.CiudadIdCiudad;          
          var FacturaCompraIdCompra = this.FacturaCompraIdCompra;
          var EmpleadoIdEmpleado = this.EmpleadoIdEmpleado;

         Traslado.update( { 
            fechaTraslado: fechaTraslado, nombreConductor: nombreConductor, cedulaConductor:cedulaConductor,
            cantidadAnimal:cantidadAnimal, numeroRUA:numeroRUA, marcaAuto:marcaAuto, CiudadIdCiudad: CiudadIdCiudad,
            FacturaCompraIdCompra: FacturaCompraIdCompra, EmpleadoIdEmpleado: EmpleadoIdEmpleado
          },{ where: { idTraslado:  trasladoId } })
          .then(onSuccess).catch(onError);
        },
        removeById: function (trasladoId, onSuccess, onError) {
          Traslado.destroy( { where: { idTraslado: trasladoId } })
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
      tableName: 'notatraslado',
      comment: 'Traslado',
      indexes: [
        {
          name: 'idxfechaTraslado',
          method: 'BTREE',
          unique:  false,
          fields: ['fechaTraslado']
        }
      ]
    }
  );
  return Traslado;
};
