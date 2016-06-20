'use strict';

var path = require('path');
var config = require('../config/config');

/*
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var dbName  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABASE_STORAGE;
*/
var dbName   = config.db.name;
var user     = config.db.user;
var pwd      = config.db.pwd;
var protocol = config.db.protocol;
var dialect  = config.db.dialect;
var port     = config.db.port;
var host     = config.db.host;
var storage  = config.db.storage;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(dbName, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true,      // solo Postgres
    maxConcurrentQueries: 100,
    define: {
      timestamps: true,
      paranoid: true
    },
    pool: { maxConnections:5, maxIdleTime: 30 }
  }
);
// Importar definicion de la tabla Forum
var animalPath = path.join(__dirname,'animal');
var Animal = sequelize.import(animalPath);
// Importar definicion de la tabla Forum
var auditoriaPath = path.join(__dirname,'auditoria');
var Auditoria = sequelize.import(auditoriaPath);
// Importar definicion de la tabla Forum
var ciudadPath = path.join(__dirname,'ciudad');
var Ciudad = sequelize.import(ciudadPath);
// Importar definicion de la tabla Forum
var clientePath = path.join(__dirname,'cliente');
var Cliente = sequelize.import(clientePath);
// Importar definicion de la tabla Forum
var consumoPath = path.join(__dirname,'consumo');
var Consumo = sequelize.import(consumoPath);
// Importar definicion de la tabla Forum
var departamentoPath = path.join(__dirname,'departamento');
var Departamento = sequelize.import(departamentoPath);
// Importar definicion de la tabla Forum
var detalleCompraPath = path.join(__dirname,'detalleCompra');
var DetalleCompra = sequelize.import(detalleCompraPath);
// Importar definicion de la tabla Forum
var detalleConsumoPath = path.join(__dirname,'detalleConsumo');
var DetalleConsumo = sequelize.import(detalleConsumoPath);
// Importar definicion de la tabla Forum
var detalleExtraviadoPath = path.join(__dirname,'detalleExtraviado');
var DetalleExtraviado = sequelize.import(detalleExtraviadoPath);
// Importar definicion de la tabla Forum
var detalleIngresoAnimalPath = path.join(__dirname,'detalleIngresoAnimal');
var DetalleIngresoAnimal = sequelize.import(detalleIngresoAnimalPath);
// Importar definicion de la tabla Forum
var detalleMuertePath = path.join(__dirname,'detalleMuerte');
var DetalleMuerte = sequelize.import(detalleMuertePath);
// Importar definicion de la tabla Forum
var detallePesajePath = path.join(__dirname,'detallePesaje');
var DetallePesaje = sequelize.import(detallePesajePath);
// Importar definicion de la tabla Forum
var detalleSanitacionPath = path.join(__dirname,'detalleSanitacion');
var DetalleSanitacion = sequelize.import(detalleSanitacionPath);
// Importar definicion de la tabla Forum
var detalleSanitacionInsumoPath = path.join(__dirname,'detalleSanitacionInsumo');
var DetalleSanitacionInsumo = sequelize.import(detalleSanitacionInsumoPath);
// Importar definicion de la tabla Forum
var detalleTrasladoPath = path.join(__dirname,'detalleTraslado');
var DetalleTraslado = sequelize.import(detalleTrasladoPath);
// Importar definicion de la tabla Forum
var detalleVacunacionPath = path.join(__dirname,'detalleVacunacion');
var DetalleVacunacion = sequelize.import(detalleVacunacionPath);
// Importar definicion de la tabla Forum
var detalleVacunacionInsumoPath = path.join(__dirname,'detalleVacunacionInsumo');
var DetalleVacunacionInsumo = sequelize.import(detalleVacunacionInsumoPath);
// Importar definicion de la tabla Forum
var detalleVentaPath = path.join(__dirname,'detalleVenta');
var DetalleVenta = sequelize.import(detalleVentaPath);
// Importar definicion de la tabla Forum
var empleadoPath = path.join(__dirname,'empleado');
var Empleado = sequelize.import(empleadoPath);
// Importar definicion de la tabla Forum
var extraviadoPath = path.join(__dirname,'extraviado');
var Extraviado = sequelize.import(extraviadoPath);
// Importar definicion de la tabla Forum
var facturaCompraPath = path.join(__dirname,'facturaCompra');
var FacturaCompra = sequelize.import(facturaCompraPath);
// Importar definicion de la tabla Forum
var facturaVentaPath = path.join(__dirname,'facturaVenta');
var FacturaVenta = sequelize.import(facturaVentaPath);
// Importar definicion de la tabla Forum
var ingresoAnimalPath = path.join(__dirname,'ingresoAnimal');
var IngresoAnimal = sequelize.import(ingresoAnimalPath);
// Importar definicion de la tabla Forum
var ingresoCorralPath = path.join(__dirname,'ingresoCorral');
var IngresoCorral = sequelize.import(ingresoCorralPath);
// Importar definicion de la tabla Forum
var insumoPath = path.join(__dirname,'insumo');
var Insumo = sequelize.import(insumoPath);
// Importar definicion de la tabla Forum
var muertesPath = path.join(__dirname,'muertes');
var Muertes = sequelize.import(muertesPath);
// Importar definicion de la tabla Forum
var nivelPath = path.join(__dirname,'nivel');
var Nivel = sequelize.import(nivelPath);
// Importar definicion de la tabla Forum
var pesajePath = path.join(__dirname,'pesaje');
var Pesaje = sequelize.import(pesajePath);
// Importar definicion de la tabla Forum
var proveedorPath = path.join(__dirname,'proveedor');
var Proveedor = sequelize.import(proveedorPath);
// Importar definicion de la tabla Forum
var sanitacionPath = path.join(__dirname,'sanitacion');
var Sanitacion = sequelize.import(sanitacionPath);
// Importar definicion de la tabla Forum
var stockPath = path.join(__dirname,'stock');
var Stock = sequelize.import(stockPath);
// Importar definicion de la tabla Forum
var trasladoPath = path.join(__dirname,'traslado');
var Traslado = sequelize.import(trasladoPath);
// Importar definicion de la tabla Forum
var usuarioPath = path.join(__dirname,'usuario');
var Usuario= sequelize.import(usuarioPath);
// Importar definicion de la tabla Forum
var vacunacionPath = path.join(__dirname,'vacunacion');
var Vacunacion = sequelize.import(vacunacionPath);
// Importar definicion de la tabla Forum
var razaPath = path.join(__dirname,'raza');
var Raza = sequelize.import(razaPath);
// Importar definicion de la tabla Forum
var salidaAnimalPath = path.join(__dirname,'salidaAnimal');
var SalidaAnimal = sequelize.import(salidaAnimalPath);
// Importar definicion de la tabla Forum
var detalleSalidaAnimalPath = path.join(__dirname,'detalleSalidaAnimal');
var DetalleSalidaAnimal = sequelize.import(detalleSalidaAnimalPath);
/**********************relacionar las tablas**************************************/
// Usuario - Nivel 
Usuario.belongsTo(Nivel);
Nivel.hasMany(Usuario);
// Usuario - Nivel 
Animal.belongsTo(Raza);
Raza.hasMany(Animal);
//auditoria - usuario
Auditoria.belongsTo(Usuario);
Usuario.hasMany(Auditoria);
//ingreso animal - detalleingresoanimal
DetalleIngresoAnimal.belongsTo(IngresoAnimal);
IngresoAnimal.hasMany(DetalleIngresoAnimal);
//animal - detalleingresoanimal
DetalleIngresoAnimal.belongsTo(Animal);
Animal.hasMany(DetalleIngresoAnimal);
//empleado - usuario
Usuario.belongsTo(Empleado);
Empleado.hasMany(Usuario);
//ciudad - empleado
Empleado.belongsTo(Ciudad);
Ciudad.hasMany(Empleado);
//pesaje - detallepesaje
DetallePesaje.belongsTo(Pesaje);
Pesaje.hasMany(DetallePesaje);
//empleado - pesaje
Pesaje.belongsTo(Empleado);
Empleado.hasMany(Pesaje);
//animal - detallepesaje
DetallePesaje.belongsTo(Animal);
Animal.hasMany(DetallePesaje);
//ciudad - Proveedor
Proveedor.belongsTo(Ciudad);
Ciudad.hasMany(Proveedor);
//ciudad - Cliente
Cliente.belongsTo(Ciudad);
Ciudad.hasMany(Cliente);
//ciudad - Traslado
Traslado.belongsTo(Ciudad);
Ciudad.hasMany(Traslado);
//departamento - Ciudad
Ciudad.belongsTo(Departamento);
Departamento.hasMany(Ciudad);
//Empleado - IngresoCorral
IngresoCorral.belongsTo(Empleado);
Empleado.hasMany(IngresoCorral);
//Empleado - Traslado
Traslado.belongsTo(Empleado);
Empleado.hasMany(Traslado);
//Empleado - Sanitacion
Sanitacion.belongsTo(Empleado);
Empleado.hasMany(Sanitacion);
//Empleado - Muertes
Muertes.belongsTo(Empleado);
Empleado.hasMany(Muertes);
//Empleado - Extraviado
Extraviado.belongsTo(Empleado);
Empleado.hasMany(Extraviado);
//Raza - Stock
Stock.belongsTo(Raza);
Raza.hasMany(Stock);
//Animal - DetalleSanitacion
DetalleSanitacion.belongsTo(Animal);
Animal.hasMany(DetalleSanitacion);
//Animal - DetalleTraslado
DetalleTraslado.belongsTo(Animal);
Animal.hasMany(DetalleTraslado);
//Animal - DetalleMuerte
DetalleMuerte.belongsTo(Animal);
Animal.hasMany(DetalleMuerte);
//Animal - DetalleConsumo
DetalleConsumo.belongsTo(Animal);
Animal.hasMany(DetalleConsumo);
//Animal - DetalleExtraviado
DetalleExtraviado.belongsTo(Animal);
Animal.hasMany(DetalleExtraviado);
//Animal - DetalleVacunacion
DetalleVacunacion.belongsTo(Animal);
Animal.hasMany(DetalleVacunacion);
//Vacunacion - DetalleVacunacion
DetalleVacunacion.belongsTo(Vacunacion);
Vacunacion.hasMany(DetalleVacunacion);
//Vacunacion - DetalleVacunacionInsumo
DetalleVacunacionInsumo.belongsTo(DetalleVacunacion);
DetalleVacunacion.hasMany(DetalleVacunacionInsumo);
//Proveedor - Vacunacion
Vacunacion.belongsTo(Proveedor);
Proveedor.hasMany(Vacunacion);
//FacturaVenta - DetalleVenta
DetalleVenta.belongsTo(FacturaVenta ,{foreignKey: 'FacturaVentaIdVenta'});
//FacturaVenta.hasMany(DetalleVenta);
//FacturaVenta - Traslado
Traslado.belongsTo(FacturaVenta);
FacturaVenta.hasMany(Traslado);
//Cliente - FacturaVenta
FacturaVenta.belongsTo(Cliente);
Cliente.hasMany(FacturaVenta);
//Proveedor - Sanitacion
Sanitacion.belongsTo(Proveedor);
Proveedor.hasMany(Sanitacion);
//Proveedor - Muertes
Muertes.belongsTo(Proveedor);
Proveedor.hasMany(Muertes);
//Proveedor - FacturaCompra
FacturaCompra.belongsTo(Proveedor);
Proveedor.hasMany(FacturaCompra);
//FacturaCompra - DetalleCompra
DetalleCompra.belongsTo(FacturaCompra);
FacturaCompra.hasMany(DetalleCompra);
//FacturaCompra - Traslado
Traslado.belongsTo(FacturaCompra);
FacturaCompra.hasMany(Traslado);
//Insumo - DetalleCompra 
DetalleCompra.belongsTo(Insumo);
Insumo.hasMany(DetalleCompra);
//Insumo - DetalleVacunacionInsumo 
DetalleVacunacionInsumo.belongsTo(Insumo);
Insumo.hasMany(DetalleVacunacionInsumo);
//Insumo - Stock 
Stock.belongsTo(Insumo);
Insumo.hasMany(Stock);
//Insumo - DetalleSanitacionInsumo 
DetalleSanitacionInsumo.belongsTo(Insumo);
Insumo.hasMany(DetalleSanitacionInsumo);
//Extraviado - DetalleExtraviado 
DetalleExtraviado.belongsTo(Extraviado);
Extraviado.hasMany(DetalleExtraviado);
//Insumo - Consumo 
Consumo.belongsTo(Insumo);
Insumo.hasMany(Consumo);
//Consumo  - DetalleConsumo
DetalleConsumo.belongsTo(Consumo);
Consumo.hasMany(DetalleConsumo);
//Muertes  - DetalleMuerte
DetalleMuerte.belongsTo(Muertes);
Muertes.hasMany(DetalleMuerte);
//Sanitacion  - DetalleSanitacion
DetalleSanitacion.belongsTo(Sanitacion);
Sanitacion.hasMany(DetalleSanitacion);
//Sanitacion  - DetalleSanitacionInsumo
DetalleSanitacionInsumo.belongsTo(DetalleSanitacion);
DetalleSanitacion.hasMany(DetalleSanitacionInsumo);
//Traslado - DetalleTraslado
DetalleTraslado.belongsTo(Traslado);
Traslado.hasMany(DetalleTraslado);
//salida animal - detallesalidaanimal
DetalleSalidaAnimal.belongsTo(SalidaAnimal);
SalidaAnimal.hasMany(DetalleSalidaAnimal);
//animal - detallesalidaanimal
DetalleSalidaAnimal.belongsTo(Animal);
Animal.hasMany(DetalleSalidaAnimal);

// exportar tablas
exports.Animal = Animal;
exports.Auditoria = Auditoria;
exports.Nivel = Nivel;
exports.Usuario = Usuario;
exports.Ciudad = Ciudad;
exports.Cliente = Cliente;
exports.Consumo = Consumo;
exports.Departamento = Departamento;
exports.DetalleCompra = DetalleCompra;
exports.DetalleConsumo = DetalleConsumo;
exports.DetalleExtraviado = DetalleExtraviado;
exports.DetalleIngresoAnimal = DetalleIngresoAnimal;
exports.DetalleMuerte = DetalleMuerte;
exports.DetallePesaje = DetallePesaje;
exports.DetalleSanitacion = DetalleSanitacion;
exports.DetalleSanitacionInsumo = DetalleSanitacionInsumo;
exports.DetalleTraslado = DetalleTraslado;
exports.DetalleVacunacion = DetalleVacunacion;
exports.DetalleVacunacionInsumo = DetalleVacunacionInsumo;
exports.DetalleVenta = DetalleVenta;
exports.Empleado = Empleado;
exports.Extraviado = Extraviado;
exports.FacturaCompra = FacturaCompra;
exports.FacturaVenta = FacturaVenta;
exports.IngresoAnimal = IngresoAnimal;
exports.IngresoCorral = IngresoCorral;
exports.Insumo =Insumo;
exports.Muertes = Muertes;
exports.Stock = Stock;
exports.Pesaje = Pesaje;
exports.Proveedor= Proveedor;
exports.Sanitacion = Sanitacion;
exports.Traslado= Traslado;
exports.Vacunacion = Vacunacion;
exports.Raza = Raza;
exports.SalidaAnimal = SalidaAnimal;
exports.DetalleSalidaAnimal = DetalleSalidaAnimal;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function () {
  console.log ('sequelize SYNC');
  // then(..) ejecuta el manejador una vez creada la tabla
  Nivel.count().then(function (count) {
        if (count === 0) {
          Nivel.bulkCreate(
          [
            { nivel: 'admin' },
            { nivel: 'empleado' },
            { nivel: 'visitante' }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Nivel) inicializada');
          });
        }
      }); // Nivel.count()
  Raza.count().then(function (count) {
        if (count === 0) {
          Raza.bulkCreate(
          [
            { raza: 'angus' },
            { raza: 'brangus' },
            { raza: 'braman' }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Raza) inicializada');
          });
        }
      }); //Raza.count()
  Departamento.count().then(function (count) {
        if (count === 0) {
          Departamento.bulkCreate(
          [
            { departamento: 'Misiones' },
            { departamento: 'Ñeembucu' },
            { departamento: 'Concepcion' }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Departamento) inicializada');
          });
        }
      }); // Departamento.count()
  Ciudad.count().then(function (count) {
        if (count === 0) {
          Ciudad.bulkCreate(
          [
            { ciudad: 'San Ignacio ', DepartamentoIdDepartamento: 1 },
            { ciudad: 'San Juan', DepartamentoIdDepartamento: 1 },
            { ciudad: 'Santa Maria', DepartamentoIdDepartamento: 1 }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Ciudad) inicializada');
          });
        }
      }); // Ciudad.count()
  Insumo.count().then(function (count) {
        if (count === 0) {
          Insumo.bulkCreate(
          [
            { nombreInsumo: 'Neubon' , contenidoInsumo: '500ml', precioCompra: 50000, tipoInsumo:'para engorde', presentacionInsumo:'en bolsa', estadoInsumo:'activo' , codigoBarra: '123456' },
            { nombreInsumo: 'Balanceado ' , contenidoInsumo: '500ml', precioCompra: 50000, tipoInsumo:'para engorde', presentacionInsumo:'en bolsa', estadoInsumo:'activo' , codigoBarra: '123456' },
            { nombreInsumo: 'Sal Mineral' , contenidoInsumo: '500ml', precioCompra: 50000, tipoInsumo:'para engorde', presentacionInsumo:'en bolsa', estadoInsumo:'activo' , codigoBarra: '123456' }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Insumo) inicializada');
          });
        }
      }); // Insumo.count()
  Animal.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Animal.bulkCreate(
        [
          { pesoInicial: 100, rpAnimal: '5444M2KL',cuernos: 'SI', sexoAnimal: 'Hembra', estado: 'activo', numeroTag: 123, fechaIngreso: '2015-01-01' ,RazaIdRaza: 1 },
          { pesoInicial: 150, rpAnimal: '1488KO3I',cuernos: 'SI', sexoAnimal: 'Hembra', estado: 'activo', numeroTag: 111, fechaIngreso: '2015-01-01' ,RazaIdRaza: 2 },
          { pesoInicial: 200, rpAnimal: '244H1J00',cuernos: 'SI', sexoAnimal: 'Hembra', estado: 'activo', numeroTag: 540, fechaIngreso: '2015-01-01' ,RazaIdRaza: 3 }
        ]
      ).then(function () {
      console.log('Base de datos (tabla animal) inicializada');
      });
    }
  }); // Animal.count()
  Empleado.count().then(function (count) {
        if (count === 0) {
          Empleado.bulkCreate(
          [
            { nombreEmpleado: 'Ignacio ', direccionEmpleado:'14 de mayo', cedulaEmpleado:'3818223', CiudadIdCiudad: 1 , codigoLlave: '123456' },
            { nombreEmpleado: 'Juan', direccionEmpleado:'14 de mayo', cedulaEmpleado:'3818222', CiudadIdCiudad: 2 , codigoLlave: '123456' },
            { nombreEmpleado: 'Maria', direccionEmpleado:'14 de mayo', cedulaEmpleado:'3818221', CiudadIdCiudad: 3 , codigoLlave: '123456'}
          ]
          ).then(function () {
            console.log('Base de datos (tabla Empleado) inicializada');
          });
        }
      }); // Empleado.count()
  Cliente.count().then(function (count) {
        if (count === 0) {
          Cliente.bulkCreate(
          [
            { nombreCliente: 'Ignacio ', direccionCliente:'14 de mayo', rucCliente:'3818223', CiudadIdCiudad: 1 },
            { nombreCliente: 'Juan', direccionCliente:'14 de mayo', rucCliente:'3818222', CiudadIdCiudad: 2 },
            { nombreCliente: 'Maria', direccionCliente:'14 de mayo', rucCliente:'3818221', CiudadIdCiudad: 3 }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Cliente) inicializada');
          });
        }
      }); // Cliente.count()
  Proveedor.count().then(function (count) {
        if (count === 0) {
          Proveedor.bulkCreate(
          [
            { nombreProveedor: 'Ganadera la Negra ', direccionProveedor:'14 de mayo', rucProveedor:'3818223', tipoProveedor:'Animal',  CiudadIdCiudad: 1 },
            { nombreProveedor: 'El Toke', direccionProveedor:'14 de mayo', rucProveedor:'3818222', tipoProveedor:'Insumo', CiudadIdCiudad: 2 },
            { nombreProveedor: 'Agustin Chaparro', direccionProveedor:'14 de mayo', rucProveedor:'3818221', tipoProveedor:'Servicio', CiudadIdCiudad: 3 }
          ]
          ).then(function () {
            console.log('Base de datos (tabla Proveedor) inicializada');
          });
        }
      }); // Proveedor.count()

  Usuario.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Usuario.bulkCreate(
        [
          { usuario: 'Ignacio@gmail.com', pass: 'Ignacio', NivelIdNivel: 1 , EmpleadoIdEmpleado: 1 },
          { usuario: 'Juan@gmail.com', pass: 'Juan', NivelIdNivel: 2 , EmpleadoIdEmpleado: 2 },
          { usuario: 'Maria@gmail.com', pass: 'Maria', NivelIdNivel: 3 , EmpleadoIdEmpleado: 3  }
        ]
      ).then(function () {
      console.log('Base de datos (tabla usuario) inicializada');
    });
    }
  }); // Usuario.count()
 /* sequelize.query('CREATE TRIGGER crear_triggerc AFTER INSERT ON detallecompra' +
    ' FOR EACH ROW' +
    ' BEGIN' +
    ' update facturacompra set totalcompra = totalcompra + new.subtotalCompra WHERE facturacompra.idCompra = new.FacturaCompraIdCompra;' +
    'END;')
  sequelize.query('CREATE TRIGGER crear_triggerm AFTER INSERT ON detallemuerte' +
    ' FOR EACH ROW' +
    ' BEGIN' +
    ' update muertes set cantidadTotal = '+
    '  (SELECT count(detallemuerte.MuerteIdMuerte) as valor '+
    '  FROM detallemuerte where detallemuerte.MuerteIdMuerte=new.MuerteIdMuerte)'+ 
    ' WHERE muertes.idMuerte=new.MuerteIdMuerte;' +
    'END;')
  sequelize.query('CREATE TRIGGER crear_triggerv AFTER INSERT ON detalleventa' +
    ' FOR EACH ROW' +
    ' BEGIN' +
    ' update facturaventa set totalventa = totalventa + new.subtotalventa WHERE facturaventa.idVenta = new.FacturaVentaIdVenta;' +
    'END;')*/
  
});
