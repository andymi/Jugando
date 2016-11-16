var express = require('express');
var RoutesWEB = express.Router();

/*controlador web*/
var animal = require('./web/animal');
var ciudad = require('./web/ciudad');
var cliente = require('./web/cliente');
var departamento = require('./web/departamento');
var empleado = require('./web/empleado');
var insumo = require('./web/insumo');
var nivel = require('./web/nivel');
var proveedor = require('./web/proveedor');
var usuario = require('./web/usuario');
var pesaje = require('./web/pesaje');
var detallePesaje = require('./web/detallePesaje');
var consumo = require('./web/consumo');
var detalleConsumo = require('./web/detalleConsumo');
var extraviado = require('./web/extraviado');
var detalleExtraviado = require('./web/detalleExtraviado');
var ingresoCorral = require('./web/ingresoCorral');
var vacunacion = require('./web/vacunacion');
var detalleVacunacionInsumo = require('./web/detalleVacunacionInsumo');
var facturaCompra = require('./web/facturaCompra');
var detalleCompra = require('./web/detalleCompra');
var facturaCompraInsumo = require('./web/facturaCompraInsumo');
var detalleCompraInsumo = require('./web/detalleCompraInsumo');
var facturaCompraServicios = require('./web/facturaCompraServicios');
var detalleCompraServicios = require('./web/detalleCompraServicios');
var facturaVenta = require('./web/facturaVenta');
var detalleVenta = require('./web/detalleVenta');
var ingresoAnimal = require('./web/ingresoAnimal');
var detalleIngresoAnimal = require('./web/detalleIngresoAnimal');
var muertes = require('./web/muertes');
var mensaje = require('./web/mensaje');
var login = require('./web/sesion');
var detalleMuerte = require('./web/detalleMuerte');
var sanitacion = require('./web/sanitacion');
var detalleSanitacionInsumo = require('./web/detalleSanitacionInsumo');
var detalleSanitacion = require('./web/detalleSanitacion');
var traslado = require('./web/traslado');
var stock = require('./web/stock');
var servicios = require('./web/servicios');
var raza = require('./web/raza');
var salidaAnimal = require('./web/salidaAnimal');
var detalleSalidaAnimal = require('./web/detalleSalidaAnimal');

/*
  este router va a estar montado bajo /api, es decir router.use( '/usuario', usuario )
  va a montar el controlador usuario bajo /api/usuario.
*/
RoutesWEB.get('/animal/cargar', animal.getForm);
RoutesWEB.get('/animal/', animal.listPag);
RoutesWEB.post('/animal/cargar', animal.create);
RoutesWEB.get('/animal/:animalId', animal.read);
RoutesWEB.put('/animal/:animalId', animal.update);
RoutesWEB.delete('/animal/:animalId', animal.delete);

RoutesWEB.get('/ciudad/cargar', ciudad.getForm);
RoutesWEB.get('/ciudad/', ciudad.listPag);
RoutesWEB.post('/ciudad/cargar', ciudad.create);
RoutesWEB.get('/ciudad/:ciudadId', ciudad.read);
RoutesWEB.put('/ciudad/:ciudadId', ciudad.update);
RoutesWEB.delete('/ciudad/:ciudadId', ciudad.delete);

RoutesWEB.get('/cliente/cargar', cliente.getForm);
RoutesWEB.get('/cliente/', cliente.listPag);
RoutesWEB.post('/cliente/cargar', cliente.create);
RoutesWEB.get('/cliente/:clienteId', cliente.read);
RoutesWEB.put('/cliente/:clienteId', cliente.update);
RoutesWEB.delete('/cliente/:clienteId', cliente.delete);

RoutesWEB.get('/consumo/cargar',consumo.getForm);
RoutesWEB.get('/consumo/',consumo.listPag);
RoutesWEB.post('/consumo/add',consumo.create);
RoutesWEB.get('/consumo/:consumoId',consumo.read);
RoutesWEB.put('/consumo/:consumoId',consumo.update);
RoutesWEB.get('/consumo/:id',consumo.readId);
RoutesWEB.delete('/consumo/:consumoId',consumo.delete);

RoutesWEB.get('/departamento/cargar', departamento.getForm);
RoutesWEB.get('/departamento/', departamento.listPag);
RoutesWEB.post('/departamento/cargar', departamento.create);
RoutesWEB.get('/departamento/:departamentoId', departamento.read);
RoutesWEB.put('/departamento/:departamentoId', departamento.update);
RoutesWEB.delete('/departamento/:departamentoId', departamento.delete);

RoutesWEB.get('/detalleCompra/cargar', detalleCompra.getForm);
RoutesWEB.get('/detalleCompra/:id', detalleCompra.listPag);
RoutesWEB.post('/detalleCompra/cargar', detalleCompra.create);
RoutesWEB.get('/detalleCompra/editar/:detalleCompraId', detalleCompra.read);
RoutesWEB.put('/detalleCompra/:detalleCompraId', detalleCompra.update);
RoutesWEB.delete('/detalleCompra/:detalleCompraId', detalleCompra.delete);

RoutesWEB.get('/detalleCompraInsumo/cargar', detalleCompraInsumo.getForm);
RoutesWEB.get('/detalleCompraInsumo/:id', detalleCompraInsumo.listPag);
RoutesWEB.post('/detalleCompraInsumo/cargar', detalleCompraInsumo.create);

RoutesWEB.get('/detalleCompraServicios/cargar', detalleCompraServicios.getForm);
RoutesWEB.get('/detalleCompraServicios/:id', detalleCompraServicios.listPag);
RoutesWEB.post('/detalleCompraServicios/cargar', detalleCompraServicios.create);

RoutesWEB.get('/detalleConsumo/cargar', detalleConsumo.getForm1);
RoutesWEB.get('/detalleConsumo/animal/:id', detalleConsumo.listPag1);
RoutesWEB.post('/detalleConsumo/cargar', detalleConsumo.create1);
RoutesWEB.get('/detalleConsumo/add/:consumoId', detalleConsumo.getForm2);
RoutesWEB.post('/detalleConsumo/add', detalleConsumo.create2);
RoutesWEB.get('/detalleConsumo/editar/:detalleConsumoId', detalleConsumo.read);
RoutesWEB.put('/detalleConsumo/:detalleConsumoId', detalleConsumo.update);
RoutesWEB.delete('/detalleConsumo/:detalleConsumoId', detalleConsumo.delete);

RoutesWEB.get('/detalleExtraviado/cargar', detalleExtraviado.getForm1);
RoutesWEB.get('/detalleExtraviado/:id', detalleExtraviado.listPag1);
RoutesWEB.post('/detalleExtraviado/cargar', detalleExtraviado.create1);
RoutesWEB.get('/detalleExtraviado/editar/:detalleExtraviadoId', detalleExtraviado.read);
RoutesWEB.put('/detalleExtraviado/:detalleExtraviadoId', detalleExtraviado.update);
RoutesWEB.delete('/detalleExtraviado/:detalleExtraviadoId', detalleExtraviado.delete);
RoutesWEB.get('/detalleExtraviado/add/:extraviadoId', detalleExtraviado.getForm2);
RoutesWEB.post('/detalleExtraviado/add', detalleExtraviado.create2);

RoutesWEB.get('/detalleIngresoAnimal/cargar', detalleIngresoAnimal.getForm1);
RoutesWEB.post('/detalleIngresoAnimal/cargar', detalleIngresoAnimal.create1);
RoutesWEB.get('/detalleIngresoAnimal/editar/:idDetalleIAS', detalleIngresoAnimal.read);
RoutesWEB.put('/detalleIngresoAnimal/:idDetalleIAS', detalleIngresoAnimal.update);
RoutesWEB.delete('/detalleIngresoAnimal/:idDetalleIA', detalleIngresoAnimal.delete);
RoutesWEB.get('/detalleIngresoAnimal/add/:ingresoId', detalleIngresoAnimal.getForm2);
RoutesWEB.post('/detalleIngresoAnimal/add', detalleIngresoAnimal.create2);
RoutesWEB.get('/detalleIngresoAnimal/:id', detalleIngresoAnimal.readId);

RoutesWEB.get('/detalleMuerte/cargar', detalleMuerte.getForm1);
RoutesWEB.post('/detalleMuerte/cargar', detalleMuerte.create1);
RoutesWEB.get('/detalleMuerte/editar/:detalleMuerteId', detalleMuerte.read);
RoutesWEB.put('/detalleMuerte/:detalleMuerteId', detalleMuerte.update);
RoutesWEB.delete('/detalleMuerte/:detalleMuerteId', detalleMuerte.delete);
RoutesWEB.get('/detalleMuerte/add/:muerteId', detalleMuerte.getForm2);
RoutesWEB.post('/detalleMuerte/add', detalleMuerte.create2);
RoutesWEB.get('/detalleMuerte/:id', detalleMuerte.readId);

RoutesWEB.get('/detallePesaje/cargar', detallePesaje.getForm1);
RoutesWEB.post('/detallePesaje/cargar', detallePesaje.create1);
RoutesWEB.get('/detallePesaje/editar/:detallePesajeId', detallePesaje.read);
RoutesWEB.put('/detallePesaje/:detallePesajeId', detallePesaje.update);
RoutesWEB.delete('/detallePesaje/:detallePesajeId', detallePesaje.delete);
RoutesWEB.get('/detallePesaje/add/:pesajeId', detallePesaje.getForm2);
RoutesWEB.post('/detallePesaje/add', detallePesaje.create2);
RoutesWEB.get('/detallePesaje/:id', detallePesaje.readId);

RoutesWEB.get('/detalleSalidaAnimal/cargar', detalleSalidaAnimal.getForm1);
RoutesWEB.post('/detalleSalidaAnimal/cargar', detalleSalidaAnimal.create1);
RoutesWEB.get('/detalleSalidaAnimal/editar/:idDetalleSAS', detalleSalidaAnimal.read);
RoutesWEB.put('/detalleSalidaAnimal/:idDetalleSAS', detalleSalidaAnimal.update);
RoutesWEB.delete('/detalleSalidaAnimal/:idDetalleSAS', detalleSalidaAnimal.delete);
RoutesWEB.get('/detalleSalidaAnimal/add/:salidaId', detalleSalidaAnimal.getForm2);
RoutesWEB.post('/detalleSalidaAnimal/add', detalleSalidaAnimal.create2);
RoutesWEB.get('/detalleSalidaAnimal/:id', detalleSalidaAnimal.readId);
/*******************************************************************************************/

RoutesWEB.get('/detalleSanitacion/cargar', detalleSanitacion.getForm1);
RoutesWEB.get('/detalleSanitacion/animal/:id', detalleSanitacion.listPag1);
RoutesWEB.post('/detalleSanitacion/cargar', detalleSanitacion.create1);
RoutesWEB.get('/detalleSanitacion/add/:sanitacionId', detalleSanitacion.getForm2);
RoutesWEB.post('/detalleSanitacion/add', detalleSanitacion.create2);
RoutesWEB.get('/detalleSanitacion/editar/:detalleSanitacionId', detalleSanitacion.read);
RoutesWEB.put('/detalleSanitacion/:detalleSanitacionId', detalleSanitacion.update);
RoutesWEB.delete('/detalleSanitacion/:detalleSanitacionId', detalleSanitacion.delete);

RoutesWEB.get('/detalleVacunacion/cargar', detalleSanitacion.getFormV1);
RoutesWEB.get('/detalleVacunacion/animal/:id', detalleSanitacion.listPagV1);
RoutesWEB.post('/detalleVacunacion/cargar', detalleSanitacion.createV1);
RoutesWEB.get('/detalleVacunacion/add/:vacunacionId', detalleSanitacion.getFormV2);
RoutesWEB.post('/detalleVacunacion/add', detalleSanitacion.createV2);
RoutesWEB.get('/detalleVacunacion/editar/:detalleVacunacionId', detalleSanitacion.readV);
RoutesWEB.put('/detalleVacunacion/:detalleVacunacionId', detalleSanitacion.updateV);
RoutesWEB.delete('/detalleVacunacion/:detalleVacunacionId', detalleSanitacion.deleteV);


RoutesWEB.get('/detalleTraslado/cargar', detalleSanitacion.getForm1T);
RoutesWEB.post('/detalleTraslado/cargar', detalleSanitacion.create1T);
RoutesWEB.get('/detalleTraslado/editar/:detalleTrasladoId', detalleSanitacion.readT);
RoutesWEB.put('/detalleTraslado/:detalleTrasladoId', detalleSanitacion.updateT);
RoutesWEB.delete('/detalleTraslado/:detalleTrasladoId', detalleSanitacion.deleteT);
RoutesWEB.get('/detalleTraslado/add/:trasladoId', detalleSanitacion.getForm2T);
RoutesWEB.post('/detalleTraslado/add', detalleSanitacion.create2T);
RoutesWEB.get('/detalleTraslado/:id', detalleSanitacion.readIdT);

/**************************************************************************************************/




RoutesWEB.get('/detalleSanitacionInsumo/cargar',  detalleSanitacionInsumo.getForm);
RoutesWEB.get('/detalleSanitacionInsumo/insumo/:id',  detalleSanitacionInsumo.listPag1);
RoutesWEB.post('/detalleSanitacionInsumo/cargar',  detalleSanitacionInsumo.create1);
RoutesWEB.get('/detalleSanitacionInsumo/add/:sanitacionId',  detalleSanitacionInsumo.getForm2);
RoutesWEB.post('/detalleSanitacionInsumo/add',  detalleSanitacionInsumo.create2);
RoutesWEB.get('/detalleSanitacionInsumo/editar/:detalleSanitacionInsumoId',  detalleSanitacionInsumo.read);
RoutesWEB.put('/detalleSanitacionInsumo/:detalleSanitacionInsumoId', detalleSanitacionInsumo.update);
RoutesWEB.delete('/detalleSanitacionInsumo/:detalleSanitacionInsumoId',  detalleSanitacionInsumo.delete);


RoutesWEB.get('/detalleVacunacionInsumo/cargar',  detalleVacunacionInsumo.getForm);
RoutesWEB.get('/detalleVacunacionInsumo/insumo/:id',  detalleVacunacionInsumo.listPag1);
RoutesWEB.post('/detalleVacunacionInsumo/cargar',  detalleVacunacionInsumo.create1);
RoutesWEB.get('/detalleVacunacionInsumo/add/:vacunacionId',  detalleVacunacionInsumo.getForm2);
RoutesWEB.post('/detalleVacunacionInsumo/add',  detalleVacunacionInsumo.create2);
RoutesWEB.get('/detalleVacunacionInsumo/editar/:detalleVacunacionInsumoId',  detalleVacunacionInsumo.read);
RoutesWEB.put('/detalleVacunacionInsumo/:detalleVacunacionInsumoId', detalleVacunacionInsumo.update);
RoutesWEB.delete('/detalleVacunacionInsumo/:detalleVacunacionInsumoId',  detalleVacunacionInsumo.delete);

RoutesWEB.get('/detalleVenta/cargar', detalleVenta.getForm1);
RoutesWEB.get('/detalleVenta/:id', detalleVenta.listPag1);
RoutesWEB.post('/detalleVenta/cargar', detalleVenta.create1);
RoutesWEB.get('/detalleVenta/editar/:detalleVentaId', detalleVenta.read);
RoutesWEB.put('/detalleVenta/:detalleVentaId',detalleVenta.update);
RoutesWEB.delete('/detalleVenta/:detalleVentaId', detalleVenta.delete);
RoutesWEB.get('/detalleVenta/add/:ventaId', detalleVenta.getForm2);
RoutesWEB.post('/detalleVenta/add', detalleVenta.create2);

RoutesWEB.get('/empleado/cargar', empleado.getForm);
RoutesWEB.get('/empleado/', empleado.listPag);
RoutesWEB.post('/empleado/cargar',  empleado.create);
RoutesWEB.get('/empleado/:empleadoId',  empleado.read);
RoutesWEB.put('/empleado/:empleadoId',  empleado.update);
RoutesWEB.delete('/empleado/:empleadoId',  empleado.delete);

RoutesWEB.get('/extraviado/cargar',  extraviado.getForm);
RoutesWEB.get('/extraviado/',  extraviado.listPag);
RoutesWEB.post('/extraviado/add', extraviado.create);
RoutesWEB.get('/extraviado/:extraviadoId',  extraviado.read);
RoutesWEB.put('/extraviado/:extraviadoId',  extraviado.update);
RoutesWEB.get('/extraviado/:id',  extraviado.readId);
RoutesWEB.delete('/extraviado/:extraviadoId', extraviado.delete);

RoutesWEB.get('/facturaCompra/cargar', facturaCompra.getForm);
RoutesWEB.get('/facturaCompra/', facturaCompra.listPag);
RoutesWEB.post('/facturaCompra/add', facturaCompra.create);
RoutesWEB.get('/facturaCompra/:facturaCompraId', facturaCompra.read);
RoutesWEB.put('/facturaCompra/:facturaCompraId', facturaCompra.update);
RoutesWEB.delete('/facturaCompra/:facturaCompraId', facturaCompra.delete);
RoutesWEB.get('/facturaCompra/:id', facturaCompra.readId);

RoutesWEB.get('/facturaCompraInsumo/cargar', facturaCompraInsumo.getForm);
RoutesWEB.get('/facturaCompraInsumo/', facturaCompraInsumo.listPag);
RoutesWEB.post('/facturaCompraInsumo/add', facturaCompraInsumo.create);

RoutesWEB.get('/facturaCompraServicios/cargar', facturaCompraServicios.getForm);
RoutesWEB.get('/facturaCompraServicios/', facturaCompraServicios.listPag);
RoutesWEB.post('/facturaCompraServicios/add', facturaCompraServicios.create);

RoutesWEB.get('/facturaVenta/cargar', facturaVenta.getForm);
RoutesWEB.get('/facturaVenta/', facturaVenta.listPag);
RoutesWEB.post('/facturaVenta/add', facturaVenta.create);
RoutesWEB.get('/facturaVenta/:facturaVentaId', facturaVenta.read);
RoutesWEB.put('/facturaVenta/:facturaVentaId', facturaVenta.update);
RoutesWEB.delete('/facturaVenta/:facturaVentaId', facturaVenta.delete);
RoutesWEB.get('/facturaVenta/:id', facturaVenta.readId);

RoutesWEB.get('/ingresoAnimal/cargar', ingresoAnimal.getForm);
RoutesWEB.get('/ingresoAnimal/', ingresoAnimal.listPag);
RoutesWEB.post('/ingresoAnimal/add', ingresoAnimal.create);
RoutesWEB.get('/ingresoAnimal/:ingresoAnimalId', ingresoAnimal.read);
RoutesWEB.put('/ingresoAnimal/:ingresoAnimalId', ingresoAnimal.update);
RoutesWEB.delete('/ingresoAnimal/:ingresoAnimalId', ingresoAnimal.delete);
RoutesWEB.get('/ingresoAnimal/:id', ingresoAnimal.readId);

RoutesWEB.get('/ingresoCorral/cargar', ingresoCorral.getForm);
RoutesWEB.get('/ingresoCorral/', ingresoCorral.listPag);
RoutesWEB.post('/ingresoCorral/cargar', ingresoCorral.create);
RoutesWEB.get('/ingresoCorral/:ingresoCorralId', ingresoCorral.read);
RoutesWEB.put('/ingresoCorral/:ingresoCorralId', ingresoCorral.update);
RoutesWEB.delete('/ingresoCorral/:ingresoCorralId', ingresoCorral.delete);

RoutesWEB.get('/insumo/cargar', insumo.getForm);
RoutesWEB.get('/insumo/', insumo.listPag);
RoutesWEB.post('/insumo/cargar', insumo.create);
RoutesWEB.get('/insumo/:insumoId', insumo.read);
RoutesWEB.put('/insumo/:insumoId', insumo.update);
RoutesWEB.delete('/insumo/:insumoId', insumo.delete);

RoutesWEB.get('/muertes/cargar', muertes.getForm);
RoutesWEB.get('/muertes/', muertes.listPag);
RoutesWEB.post('/muertes/add', muertes.create);
RoutesWEB.get('/muertes/:muertesId', muertes.read);
RoutesWEB.put('/muertes/:muertesId', muertes.update);
RoutesWEB.delete('/muertes/:muertesId', muertes.delete);
RoutesWEB.get('/muertes/:id', muertes.readId);

RoutesWEB.get('/nivel/cargar', nivel.getForm);
RoutesWEB.get('/nivel/', nivel.listPag);
RoutesWEB.post('/nivel/cargar', nivel.create);
RoutesWEB.get('/nivel/:nivelId', nivel.read);
RoutesWEB.put('/nivel/:nivelId', nivel.update);
RoutesWEB.delete('/nivel/:nivelId', nivel.delete);

RoutesWEB.get('/pesaje/cargar', pesaje.getForm);
RoutesWEB.get('/pesaje/', pesaje.listPag);
RoutesWEB.post('/pesaje/add', pesaje.create);
RoutesWEB.get('/pesaje/:pesajeId', pesaje.read);
RoutesWEB.put('/pesaje/:pesajeId', pesaje.update);
RoutesWEB.delete('/pesaje/:pesajeId', pesaje.delete);
RoutesWEB.get('/pesaje/:id', pesaje.readId);

RoutesWEB.get('/proveedor/cargar', proveedor.getForm);
RoutesWEB.get('/proveedor/', proveedor.listPag);
RoutesWEB.post('/proveedor/cargar', proveedor.create);
RoutesWEB.get('/proveedor/:proveedorId', proveedor.read);
RoutesWEB.put('/proveedor/:proveedorId', proveedor.update);
RoutesWEB.delete('/proveedor/:proveedorId', proveedor.delete);

RoutesWEB.get('/raza/cargar', raza.getForm);
RoutesWEB.get('/raza/', raza.listPag);
RoutesWEB.post('/raza/cargar',raza.create);
RoutesWEB.get('/raza/:razaId', raza.read);
RoutesWEB.put('/raza/:razaId',  raza.update);
RoutesWEB.delete('/raza/:razaId', raza.delete);

RoutesWEB.get('/salidaAnimal/cargar', salidaAnimal.getForm);
RoutesWEB.get('/salidaAnimal/', salidaAnimal.listPag);
RoutesWEB.post('/salidaAnimal/add', salidaAnimal.create);
RoutesWEB.get('/salidaAnimal/:salidaAnimalId', salidaAnimal.read);
RoutesWEB.put('/salidaAnimal/:salidaAnimalId', salidaAnimal.update);
RoutesWEB.delete('/salidaAnimal/:salidaAnimalId', salidaAnimal.delete);
RoutesWEB.get('/salidaAnimal/:id', salidaAnimal.readId);

RoutesWEB.get('/sanitacion/cargar', sanitacion.getForm);
RoutesWEB.get('/sanitacion/', sanitacion.listPag);
RoutesWEB.post('/sanitacion/add', sanitacion.create);
RoutesWEB.get('/sanitacion/:sanitacionId', sanitacion.read);
RoutesWEB.put('/sanitacion/:sanitacionId', sanitacion.update);
RoutesWEB.delete('/sanitacion/:sanitacionId', sanitacion.delete);
RoutesWEB.get('/sanitacion/animal/:id', sanitacion.listPag1);
RoutesWEB.get('/sanitacion/insumo/:id', sanitacion.listPag2);

RoutesWEB.get('/servicios/cargar', servicios.getForm);
RoutesWEB.get('/servicios/', servicios.listPag);
RoutesWEB.post('/servicios/cargar',servicios.create);
RoutesWEB.get('/servicios/:serviciosId', servicios.read);
RoutesWEB.put('/servicios/:serviciosId',  servicios.update);
RoutesWEB.delete('/servicios/:serviciosId', servicios.delete);

RoutesWEB.get('/usuario/cargar', usuario.getForm);
RoutesWEB.get('/usuario/', usuario.listPag);
RoutesWEB.post('/usuario/cargar', usuario.create);
RoutesWEB.get('/usuario/:usuarioId', usuario.read);
RoutesWEB.put('/usuario/:usuarioId', usuario.update);
RoutesWEB.delete('/usuario/:usuarioId', usuario.delete);

RoutesWEB.get('/vacunacion/cargar', vacunacion.getForm);
RoutesWEB.get('/vacunacion/', vacunacion.listPag);
RoutesWEB.post('/vacunacion/add', vacunacion.create);
RoutesWEB.get('/vacunacion/:vacunacionId', vacunacion.read);
RoutesWEB.put('/vacunacion/:vacunacionId', vacunacion.update);
RoutesWEB.delete('/vacunacion/:vacunacionId', vacunacion.delete);
RoutesWEB.get('/vacunacion/animal/:id', vacunacion.listPag1);
RoutesWEB.get('/vacunacion/insumo/:id', vacunacion.listPag2);

RoutesWEB.get('/traslado/cargar', traslado.getForm);
RoutesWEB.get('/traslado/', traslado.listPag);
RoutesWEB.post('/traslado/add', traslado.create);
RoutesWEB.get('/traslado/:trasladoId', traslado.read);
RoutesWEB.put('/traslado/:trasladoId', traslado.update);
RoutesWEB.delete('/traslado/:trasladoId', traslado.delete);
RoutesWEB.get('/traslado/:id', traslado.readId);

/*************************************************/
RoutesWEB.get('/log', login.index);
RoutesWEB.get('/signin', login.signIn);
RoutesWEB.post('/signin/ver', login.signIn);
RoutesWEB.get('/signup', login.signUp);
RoutesWEB.post('/signup/ver', login.signUpPost);
//RoutesWEB.get('/signout', login.signOut);
// 404 not found
//RoutesWEB.use(login.notFound404);
/*************************************************/
/*************************************************/
RoutesWEB.get('/mensaje/', mensaje.listPag);
RoutesWEB.post('/mensaje/cargar', mensaje.create);
RoutesWEB.delete('/mensaje/:mensajeId', mensaje.delete);

RoutesWEB.get('/stock/', stock.listPag);
RoutesWEB.get('/stock/animal', stock.listPag2);
//RoutesWEB.get('/signout', login.signOut);
// 404 not found
//RoutesWEB.use(login.notFound404);
/*************************************************/

module.exports = RoutesWEB;