'use strict';

var express = require('express');
var RutasAPI = express.Router();

var animal = require('./API/animal');
var auditoria = require('./API/auditoria');
var ciudad = require('./API/ciudad');
var cliente = require('./API/cliente');
var consumo = require('./API/consumo');
var departamento = require('./API/departamento');
var detalleCompra = require('./API/detalleCompra');
var detalleConsumo = require('./API/detalleConsumo');
var detalleExtraviado = require('./API/detalleExtraviado');
var detalleIngresoAnimal = require('./API/detalleIngresoAnimal');
var detalleMuerte = require('./API/detalleMuerte');
var detallePesaje = require('./API/detallePesaje');
var detalleSanitacion = require('./API/detalleSanitacion');
var detalleSanitacionInsumo = require('./API/detalleSanitacionInsumo');
var detalleTraslado = require('./API/detalleTraslado');
var detalleVacunacion = require('./API/detalleVacunacion');
var detalleVacunacionInsumo = require('./API/detalleVacunacionInsumo');
var detalleVenta = require('./API/detalleVenta');
var empleado = require('./API/empleado');
var extraviado = require('./API/extraviado');
var facturaCompra = require('./API/facturaCompra');
var facturaVenta = require('./API/facturaVenta');
var ingresoAnimal = require('./API/ingresoAnimal');
var ingresoCorral = require('./API/ingresoCorral');
var insumo = require('./API/insumo');
var muertes = require('./API/muertes');
var nivel = require('./API/nivel');
var pesaje = require('./API/pesaje');
var proveedor = require('./API/proveedor');
var sanitacion = require('./API/sanitacion');
var stock = require('./API/stock');
var traslado = require('./API/traslado');
var usuario = require('./API/usuario');
var vacunacion = require('./API/vacunacion');


/*
  este router va a estar montado bajo /api, es decir router.use( '/usuario', usuario )
  va a montar el controlador usuario bajo /api/usuario.

RutasAPI.get('/accesorio/', accesorio.list);
RutasAPI.post('/accesorio/', accesorio.create);
RutasAPI.get('/accesorio/:accesorioId', accesorio.read);
RutasAPI.put('/accesorio/:accesorioId', accesorio.update);
RutasAPI.delete('/accesorio/:accesorioId', accesorio.delete);

RutasAPI.get('/adquisicion/', adquisicion.list);
RutasAPI.post('/adquisicion/', adquisicion.create);
RutasAPI.get('/adquisicion/:adquisicionId', adquisicion.read);
RutasAPI.put('/adquisicion/:adquisicionId', adquisicion.update);
RutasAPI.delete('/adquisicion/:adquisicionId', adquisicion.delete);

RutasAPI.get('/analisis/', analisis.list);
RutasAPI.post('/analisis/', analisis.create);
RutasAPI.get('/analisis/:analisisId', analisis.read);
RutasAPI.put('/analisis/:analisisId', analisis.update);
RutasAPI.delete('/analisis/:analisisId', analisis.delete);

RutasAPI.get('/conservacion/', conservacion.list);
RutasAPI.post('/conservacion/', conservacion.create);
RutasAPI.get('/conservacion/:conservacionId', conservacion.read);
RutasAPI.put('/conservacion/:conservacionId', conservacion.update);
RutasAPI.delete('/conservacion/:conservacionId', conservacion.delete);

RutasAPI.get('/descripcion/', descripcion.list);
RutasAPI.post('/descripcion/', descripcion.create);
RutasAPI.get('/descripcion/:descripcionId', descripcion.read);
RutasAPI.put('/descripcion/:descripcionId', descripcion.update);
RutasAPI.delete('/descripcion/:descripcionId', descripcion.delete);

RutasAPI.get('/espacio/', espacio.list);
RutasAPI.post('/espacio/', espacio.create);
RutasAPI.get('/espacio/:espacioId', espacio.read);
RutasAPI.put('/espacio/:espacioId', espacio.update);
RutasAPI.delete('/espacio/:espacioId', espacio.delete);

RutasAPI.get('/especialidad/', especialidad.list);
RutasAPI.post('/especialidad/', especialidad.create);
RutasAPI.get('/especialidad/:especialidadId', especialidad.read);
RutasAPI.put('/especialidad/:especialidadId', especialidad.update);
RutasAPI.delete('/especialidad/:especialidadId', especialidad.delete);

RutasAPI.get('/estructura/', estructura.list);
RutasAPI.post('/estructura/', estructura.create);
RutasAPI.get('/estructura/:estructuraId', estructura.read);
RutasAPI.put('/estructura/:estructuraId', estructura.update);
RutasAPI.delete('/estructura/:estructuraId', estructura.delete);

RutasAPI.get('/fotografia/', fotografia.list);
RutasAPI.post('/fotografia/', fotografia.create);
RutasAPI.get('/fotografia/:fotografiaId', fotografia.read);
RutasAPI.put('/fotografia/:fotografiaId', fotografia.update);
RutasAPI.delete('/fotografia/:fotografiaId', fotografia.delete);

RutasAPI.get('/intervencion/', intervencion.list);
RutasAPI.post('/intervencion/', intervencion.create);
RutasAPI.get('/intervencion/:intervencionId', intervencion.read);
RutasAPI.put('/intervencion/:intervencionId', intervencion.update);
RutasAPI.delete('/intervencion/:intervencionId', intervencion.delete);

RutasAPI.get('/lugar/', lugar.list);
RutasAPI.post('/lugar/', lugar.create);
RutasAPI.get('/lugar/:lugarId', lugar.read);
RutasAPI.put('/lugar/:lugarId', lugar.update);
RutasAPI.delete('/lugar/:lugarId', lugar.delete);

RutasAPI.get('/museo/', museo.list);
RutasAPI.post('/museo/', museo.create);
RutasAPI.get('/museo/:museoId', museo.read);
RutasAPI.put('/museo/:museoId', museo.update);
RutasAPI.delete('/museo/:museoId', museo.delete);

RutasAPI.get('/naturaleza/', naturaleza.list);
RutasAPI.post('/naturaleza/', naturaleza.create);
RutasAPI.get('/naturaleza/:naturalezaId', naturaleza.read);
RutasAPI.put('/naturaleza/:naturalezaId', naturaleza.update);
RutasAPI.delete('/naturaleza/:naturalezaId', naturaleza.delete);

RutasAPI.get('/nivel/', nivel.list);
RutasAPI.post('/nivel/', nivel.create);
RutasAPI.get('/nivel/:nivelId', nivel.read);
RutasAPI.put('/nivel/:nivelId', nivel.update);
RutasAPI.delete('/nivel/:nivelId', nivel.delete);

RutasAPI.get('/obra/', obra.list);
RutasAPI.post('/obra/', obra.create);
RutasAPI.get('/obra/:obraId', obra.read);
RutasAPI.put('/obra/:obraId', obra.update);
RutasAPI.delete('/obra/:obraId', obra.delete);

RutasAPI.get('/relevamiento/', relevamiento.list);
RutasAPI.post('/relevamiento/', relevamiento.create);
RutasAPI.get('/relevamiento/:relevamientoId', relevamiento.read);
RutasAPI.put('/relevamiento/:relevamientoId', relevamiento.update);
RutasAPI.delete('/relevamiento/:relevamientoId', relevamiento.delete);

RutasAPI.get('/tecnicas/', tecnicas.list);
RutasAPI.post('/tecnicas/', tecnicas.create);
RutasAPI.get('/tecnicas/:tecnicasId', tecnicas.read);
RutasAPI.put('/tecnicas/:tecnicasId', tecnicas.update);
RutasAPI.delete('/tecnicas/:tecnicasId', tecnicas.delete);

RutasAPI.get('/tecnicasArte/', tecnicasArte.list);
RutasAPI.post('/tecnicasArte/', tecnicasArte.create);
RutasAPI.get('/tecnicasArte/:tecnicasArteId', tecnicasArte.read);
RutasAPI.put('/tecnicasArte/:tecnicasArteId', tecnicasArte.update);
RutasAPI.delete('/tecnicasArte/:tecnicasArteId', tecnicasArte.delete);

RutasAPI.get('/tipoAnalisis/', tipoAnalisis.list);
RutasAPI.post('/tipoAnalisis/', tipoAnalisis.create);
RutasAPI.get('/tipoAnalisis/:tipoAnalisisId', tipoAnalisis.read);
RutasAPI.put('/tipoAnalisis/:tipoAnalisisId', tipoAnalisis.update);
RutasAPI.delete('/tipoAnalisis/:tipoAnalisisId', tipoAnalisis.delete);

RutasAPI.get('/ubicacion/', ubicacion.list);
RutasAPI.post('/ubicacion/', ubicacion.create);
RutasAPI.get('/ubicacion/:ubicacionId', ubicacion.read);
RutasAPI.put('/ubicacion/:ubicacionId', ubicacion.update);
RutasAPI.delete('/ubicacion/:ubicacionId', ubicacion.delete);

RutasAPI.get('/usuario/', usuario.list);
RutasAPI.post('/usuario/', usuario.create);
RutasAPI.get('/usuario/:usuarioId', usuario.read);
RutasAPI.put('/usuario/:usuarioId', usuario.update);
RutasAPI.delete('/usuario/:usuarioId', usuario.delete);*/

module.exports = RutasAPI;
