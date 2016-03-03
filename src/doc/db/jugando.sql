# SQL-Front 5.1  (Build 4.16)

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='America/Halifax' */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;


# Host: localhost    Database: jugando
# ------------------------------------------------------
# Server version 5.1.41

#
# Source for table animal
#

DROP TABLE IF EXISTS `animal`;
CREATE TABLE `animal` (
  `idAnimal` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del animal',
  `razaAnimal` varchar(45) DEFAULT NULL COMMENT 'Raza a la que pertenece el animal',
  `pesoInicial` int(11) NOT NULL COMMENT 'Peso inicial del animal',
  `rpAnimal` varchar(45) NOT NULL COMMENT 'Registro personal del animal (Cédula del animal)\n',
  `cuernos` varchar(45) DEFAULT NULL COMMENT 'Si el animal posee cuernos',
  `sexoAnimal` varchar(45) DEFAULT NULL COMMENT 'Sexo del animal',
  `estado` varchar(45) NOT NULL COMMENT 'Estado es un campo donde se especifica si el animal esta vivo, muerto o extraviado',
  `numeroTag` varchar(100) NOT NULL COMMENT 'Número del Tag que seran colocado a los ganados',
  `fechaIngreso` date NOT NULL COMMENT 'Fecha de Ingreso de animal a la Estancia',
  PRIMARY KEY (`idAnimal`),
  UNIQUE KEY `idAnimal_UNIQUE` (`idAnimal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table animal
#


#
# Source for table auditoria
#

DROP TABLE IF EXISTS `auditoria`;
CREATE TABLE `auditoria` (
  `idAuditoria` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de Auditoria',
  `tabla` varchar(45) NOT NULL COMMENT 'Nombre de la tabla en el que se realizaron modificaciones',
  `ipMaquina` varchar(45) NOT NULL COMMENT 'Ip de la maquina en el que se abrio la sesion',
  `descripcionAuditoria` varchar(250) NOT NULL COMMENT 'Descripcion de la Auditoria',
  `fechaAuditoria` date NOT NULL COMMENT 'Fecha del registro de la auditoria',
  `horaAuditoria` time NOT NULL COMMENT 'Hora del registro de la auditoria',
  `usuario_idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idAuditoria`),
  UNIQUE KEY `idAuditoria_UNIQUE` (`idAuditoria`),
  KEY `fk_auditoria_usuario1_idx` (`usuario_idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table auditoria
#


#
# Source for table ciudad
#

DROP TABLE IF EXISTS `ciudad`;
CREATE TABLE `ciudad` (
  `idCiudad` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de la Ciudad',
  `ciudad` varchar(250) NOT NULL COMMENT 'Nombre de la Ciudad',
  `departamento_idDepartamento` int(11) NOT NULL,
  PRIMARY KEY (`idCiudad`),
  UNIQUE KEY `idCiudad_UNIQUE` (`idCiudad`),
  KEY `fk_ciudad_departamento1_idx` (`departamento_idDepartamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table ciudad
#


#
# Source for table cliente
#

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del cliente',
  `nombreCliente` varchar(55) NOT NULL COMMENT 'Nombre del Cliente',
  `direccionCliente` varchar(100) DEFAULT NULL COMMENT 'Direccion del Cliente',
  `rucCliente` varchar(45) NOT NULL COMMENT 'Ruc del Cliente',
  `ciudad_idCiudad` int(11) NOT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `idCliente_UNIQUE` (`idCliente`),
  KEY `fk_cliente_ciudad1_idx` (`ciudad_idCiudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table cliente
#


#
# Source for table consumo
#

DROP TABLE IF EXISTS `consumo`;
CREATE TABLE `consumo` (
  `idConsumo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del registro de consumo animal',
  `fechaConsumo` date NOT NULL COMMENT 'Fecha en el que realizo el consumo de insumos',
  `horaConsumo` time NOT NULL COMMENT 'Hora en el que se realizo el consumo',
  `cantidadTotal` int(11) NOT NULL COMMENT 'Cantidad de balanceados consumidos',
  `insumo_idInsumo` int(11) NOT NULL,
  PRIMARY KEY (`idConsumo`),
  KEY `fk_consumo_insumo1_idx` (`insumo_idInsumo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table consumo
#


#
# Source for table departamento
#

DROP TABLE IF EXISTS `departamento`;
CREATE TABLE `departamento` (
  `idDepartamento` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del Departamento',
  `departamento` varchar(250) NOT NULL COMMENT 'Nombre del Departamento',
  PRIMARY KEY (`idDepartamento`),
  UNIQUE KEY `idDepartamento_UNIQUE` (`idDepartamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table departamento
#


#
# Source for table detallecompra
#

DROP TABLE IF EXISTS `detallecompra`;
CREATE TABLE `detallecompra` (
  `descripcionCompra` varchar(250) NOT NULL COMMENT 'Descripcion de la Compra de los animales',
  `precioCompra` int(11) NOT NULL COMMENT 'Precio de la compra de los animales',
  `cantidadCompra` int(11) NOT NULL COMMENT 'Cantidad de animales que fueron comprados',
  `insumo_idInsumo` int(11) NOT NULL,
  `facturaCompra_idCompra` int(11) NOT NULL,
  KEY `fk_detalleCompra_insumo1_idx` (`insumo_idInsumo`),
  KEY `fk_detalleCompra_facturaCompra1_idx` (`facturaCompra_idCompra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detallecompra
#


#
# Source for table detalleconsumo
#

DROP TABLE IF EXISTS `detalleconsumo`;
CREATE TABLE `detalleconsumo` (
  `cantidadConsumo` int(11) NOT NULL COMMENT 'Cantidad de alimentos consumidos por cada animal',
  `observacion` varchar(250) DEFAULT NULL COMMENT 'Observacion sobre el consumo de los alimentos',
  `animal_idAnimal` int(11) NOT NULL,
  `consumo_idConsumo` int(11) NOT NULL,
  KEY `fk_detalleConsumo_animal1_idx` (`animal_idAnimal`),
  KEY `fk_detalleConsumo_consumo1_idx` (`consumo_idConsumo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detalleconsumo
#


#
# Source for table detalleextraviado
#

DROP TABLE IF EXISTS `detalleextraviado`;
CREATE TABLE `detalleextraviado` (
  `observacionExtraviado` varchar(250) DEFAULT NULL COMMENT 'Observacion sobre el extravio del/los animales',
  `animal_idAnimal` int(11) NOT NULL,
  `extraviado_idExtraviado` int(11) NOT NULL,
  KEY `fk_detalleExtraviado_animal1_idx` (`animal_idAnimal`),
  KEY `fk_detalleExtraviado_extraviado1_idx` (`extraviado_idExtraviado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detalleextraviado
#


#
# Source for table detalleingresoanimal
#

DROP TABLE IF EXISTS `detalleingresoanimal`;
CREATE TABLE `detalleingresoanimal` (
  `animal_idAnimal` int(11) NOT NULL,
  `ingresoAnimal_idIngresoAnimal` int(11) NOT NULL,
  KEY `fk_detalleIngresoAnimal_animal1_idx` (`animal_idAnimal`),
  KEY `fk_detalleIngresoAnimal_ingresoAnimal1_idx` (`ingresoAnimal_idIngresoAnimal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detalleingresoanimal
#


#
# Source for table detallemuerte
#

DROP TABLE IF EXISTS `detallemuerte`;
CREATE TABLE `detallemuerte` (
  `observacion` varchar(250) DEFAULT NULL COMMENT 'Observacion sobre las muertes de los animales',
  `muerte_idMuerte` int(11) NOT NULL,
  `animal_idAnimal` int(11) NOT NULL,
  `muertes_idMuerte` int(11) NOT NULL,
  PRIMARY KEY (`muerte_idMuerte`),
  KEY `fk_detalleMuerte_animal1_idx` (`animal_idAnimal`),
  KEY `fk_detalleMuerte_muertes1_idx` (`muertes_idMuerte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detallemuerte
#


#
# Source for table detallepesaje
#

DROP TABLE IF EXISTS `detallepesaje`;
CREATE TABLE `detallepesaje` (
  `peso` int(11) NOT NULL COMMENT 'Pesaje semanal del animal',
  `observacion` varchar(250) DEFAULT NULL COMMENT 'Observacion que pueda surgir en el pesaje',
  `animal_idAnimal` int(11) NOT NULL,
  `pesaje_idPesaje` int(11) NOT NULL,
  KEY `fk_detallePesaje_animal1_idx` (`animal_idAnimal`),
  KEY `fk_detallePesaje_pesaje1_idx` (`pesaje_idPesaje`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detallepesaje
#


#
# Source for table detallesanitacion
#

DROP TABLE IF EXISTS `detallesanitacion`;
CREATE TABLE `detallesanitacion` (
  `observacionSanitacion` varchar(250) DEFAULT NULL COMMENT 'Observacion que se pueda tener sobre la sanitacion del animal',
  `animal_idAnimal` int(11) NOT NULL,
  `sanitacion_idSanitacion` int(11) NOT NULL,
  KEY `fk_detalleSanitacion_animal1_idx` (`animal_idAnimal`),
  KEY `fk_detalleSanitacion_sanitacion1_idx` (`sanitacion_idSanitacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detallesanitacion
#


#
# Source for table detallesanitacioninsumo
#

DROP TABLE IF EXISTS `detallesanitacioninsumo`;
CREATE TABLE `detallesanitacioninsumo` (
  `cantidadUtilizada` int(11) NOT NULL COMMENT 'Cantidad de Insumos utilizados',
  `insumo_idInsumo` int(11) NOT NULL,
  `sanitacion_idSanitacion` int(11) NOT NULL,
  KEY `fk_detalleSanitacionInsumo_insumo1_idx` (`insumo_idInsumo`),
  KEY `fk_detalleSanitacionInsumo_sanitacion1_idx` (`sanitacion_idSanitacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detallesanitacioninsumo
#


#
# Source for table detalletraslado
#

DROP TABLE IF EXISTS `detalletraslado`;
CREATE TABLE `detalletraslado` (
  `descripcion` varchar(250) NOT NULL COMMENT 'Descripcion sobre los animales que se trasladaron',
  `notaTraslado_idTraslado` int(11) NOT NULL,
  `animal_idAnimal` int(11) NOT NULL,
  `notaTraslado_idTraslado1` int(11) NOT NULL,
  PRIMARY KEY (`notaTraslado_idTraslado`),
  KEY `fk_detalleTraslado_animal1_idx` (`animal_idAnimal`),
  KEY `fk_detalleTraslado_notaTraslado1_idx` (`notaTraslado_idTraslado1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detalletraslado
#


#
# Source for table detallevacunacion
#

DROP TABLE IF EXISTS `detallevacunacion`;
CREATE TABLE `detallevacunacion` (
  `numeroCertificado` int(11) NOT NULL COMMENT 'Numero del Certificado que es expedido por Senacsa luego de las vacunaciones',
  `observacion` varchar(250) DEFAULT NULL COMMENT 'Observacion que se registra a la hora de realizar las vacunaciones',
  `animal_idAnimal` int(11) NOT NULL,
  `vacunacion_idVacunacion` int(11) NOT NULL,
  KEY `fk_detalleVacunacion_animal1_idx` (`animal_idAnimal`),
  KEY `fk_detalleVacunacion_vacunacion1_idx` (`vacunacion_idVacunacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detallevacunacion
#


#
# Source for table detallevacunacioninsumo
#

DROP TABLE IF EXISTS `detallevacunacioninsumo`;
CREATE TABLE `detallevacunacioninsumo` (
  `cantidadInsumo` int(11) NOT NULL COMMENT 'Cantidad de Insumo que se utilizo',
  `insumo_idInsumo` int(11) NOT NULL,
  `vacunacion_idVacunacion` int(11) NOT NULL,
  KEY `fk_detalleVacunacionInsumo_insumo1_idx` (`insumo_idInsumo`),
  KEY `fk_detalleVacunacionInsumo_vacunacion1_idx` (`vacunacion_idVacunacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detallevacunacioninsumo
#


#
# Source for table detalleventa
#

DROP TABLE IF EXISTS `detalleventa`;
CREATE TABLE `detalleventa` (
  `descripcionVenta` varchar(250) NOT NULL COMMENT 'Descripcion de la Venta de los animales',
  `precioVenta` int(11) NOT NULL COMMENT 'Precio de Venta de los animales',
  `cantidadVenta` int(11) NOT NULL COMMENT 'Cantidad de animales vendidos',
  `facturaVenta_idVenta` int(11) NOT NULL,
  KEY `fk_detalleVenta_facturaVenta1_idx` (`facturaVenta_idVenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table detalleventa
#


#
# Source for table empleado
#

DROP TABLE IF EXISTS `empleado`;
CREATE TABLE `empleado` (
  `idEmpleado` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del Empleado',
  `nombreEmpleado` varchar(55) DEFAULT NULL COMMENT 'Nombre del Empleado',
  `direccionEmpleado` varchar(100) DEFAULT NULL COMMENT 'Direccion del Empleado',
  `cedulaEmpleado` varchar(45) DEFAULT NULL COMMENT 'Cedula del Empleado',
  `estadoEmpleado` varchar(45) NOT NULL COMMENT 'Representa que el empleado esta activo o fue dado de baja',
  `ciudad_idCiudad` int(11) NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  UNIQUE KEY `idEmpleado_UNIQUE` (`idEmpleado`),
  KEY `fk_empleado_ciudad1_idx` (`ciudad_idCiudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table empleado
#


#
# Source for table extraviado
#

DROP TABLE IF EXISTS `extraviado`;
CREATE TABLE `extraviado` (
  `idExtraviado` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de la tabla extraviado',
  `fechaExtraviado` date NOT NULL COMMENT 'Fecha en el que se extravio el ganado',
  `horaExtraviado` time DEFAULT NULL COMMENT 'Hora en el que se extravio el animal ',
  `lugarExtraviado` varchar(45) DEFAULT NULL COMMENT 'Lugar de donde se extraviaron los animales',
  `cantidadExtraviado` int(11) NOT NULL COMMENT 'Cantidad total de animales extraviados',
  `empleado_idEmpleado` int(11) NOT NULL,
  PRIMARY KEY (`idExtraviado`),
  KEY `fk_extraviado_empleado1_idx` (`empleado_idEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table extraviado
#


#
# Source for table facturacompra
#

DROP TABLE IF EXISTS `facturacompra`;
CREATE TABLE `facturacompra` (
  `idCompra` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de las Compras realizadas',
  `fechaCompra` date NOT NULL COMMENT 'Fecha de la Compra',
  `totalCompra` int(11) NOT NULL COMMENT 'Monto total de la compra',
  `condicionCompra` varchar(45) NOT NULL COMMENT 'Condicion de la compra',
  `formaPago` varchar(45) NOT NULL COMMENT 'Forma en el que se realizo el pago de la compra',
  `numeroCompra` int(11) NOT NULL COMMENT 'Numero de la Factura compra',
  `horaCompra` time NOT NULL COMMENT 'Hora en que se registro la compra de animales e insumos',
  `proveedor_idProveedor` int(11) NOT NULL,
  PRIMARY KEY (`idCompra`),
  KEY `fk_facturaCompra_proveedor1_idx` (`proveedor_idProveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table facturacompra
#


#
# Source for table facturaventa
#

DROP TABLE IF EXISTS `facturaventa`;
CREATE TABLE `facturaventa` (
  `idVenta` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de la Venta',
  `fechaVenta` date NOT NULL COMMENT 'Fecha en que se realizo la venta de los animales',
  `totalVenta` int(11) NOT NULL COMMENT 'Total de animales vendidos',
  `condicionVenta` varchar(45) NOT NULL COMMENT 'Condicion con el que se vendieron los animales',
  `formaCobro` varchar(45) NOT NULL COMMENT 'Forma en el que se realizo el cobro de la venta',
  `numeroVenta` int(11) NOT NULL COMMENT 'Numero de la venta ',
  `horaVenta` time NOT NULL COMMENT 'Hora en que se registra la venta',
  `cliente_idCliente` int(11) NOT NULL,
  PRIMARY KEY (`idVenta`),
  KEY `fk_facturaVenta_cliente1_idx` (`cliente_idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table facturaventa
#


#
# Source for table ingresoanimal
#

DROP TABLE IF EXISTS `ingresoanimal`;
CREATE TABLE `ingresoanimal` (
  `idIngresoAnimal` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de la tabla ingreso del animal',
  `horaSalida` time NOT NULL COMMENT 'Hora de salida de los animales fuera del corral',
  `cantidadSalida` int(11) NOT NULL COMMENT 'Cantidad de animales que salieron',
  `fechaSalida` date NOT NULL COMMENT 'Fecha de salida del corral',
  `observacion` varchar(250) NOT NULL COMMENT 'Observacion de la fundamentacion que se da por la salida de los animales del corral',
  `fechaEntrada` date NOT NULL COMMENT 'Fecha de entrada de los animales',
  `horaEntrada` time NOT NULL COMMENT 'Hora de entrada de los animales',
  `cantidadEntrada` int(11) NOT NULL COMMENT 'Cantidad de ganados que ingresaron nuevamente al corral',
  PRIMARY KEY (`idIngresoAnimal`),
  UNIQUE KEY `idIngresoAnimal_UNIQUE` (`idIngresoAnimal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table ingresoanimal
#


#
# Source for table ingresocorral
#

DROP TABLE IF EXISTS `ingresocorral`;
CREATE TABLE `ingresocorral` (
  `idingreso` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de la tabla ingreso',
  `fechaIngreso` date NOT NULL COMMENT 'Fecha en el que se ingreso en el corral',
  `horaIngreso` time NOT NULL COMMENT 'Hora en el que se ingreso dentro del corral',
  `observacionIngreso` varchar(250) NOT NULL COMMENT 'Fundamentacion del ingreso al corral por el empleado',
  `empleado_idEmpleado` int(11) NOT NULL,
  PRIMARY KEY (`idingreso`),
  UNIQUE KEY `idingreso_UNIQUE` (`idingreso`),
  KEY `fk_ingresoCorral_empleado1_idx` (`empleado_idEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table ingresocorral
#


#
# Source for table insumo
#

DROP TABLE IF EXISTS `insumo`;
CREATE TABLE `insumo` (
  `idInsumo` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del Insumo',
  `nombreInsumo` varchar(250) NOT NULL COMMENT 'Nombre del Insumo',
  `contenidoInsumo` varchar(45) DEFAULT NULL COMMENT 'Contenido del Insumo',
  `precioCompra` int(11) NOT NULL COMMENT 'Precio de Compra del insumo',
  `tipoInsumo` varchar(45) DEFAULT NULL COMMENT 'Tipo de Insumo',
  `presentacionInsumo` varchar(100) DEFAULT NULL COMMENT 'Presentacion del Insumo',
  `estadoInsumo` varchar(45) NOT NULL COMMENT 'Estado del Insumo',
  PRIMARY KEY (`idInsumo`),
  UNIQUE KEY `idInsumo_UNIQUE` (`idInsumo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table insumo
#


#
# Source for table muertes
#

DROP TABLE IF EXISTS `muertes`;
CREATE TABLE `muertes` (
  `idMuerte` int(11) NOT NULL COMMENT 'Identificador del registro de la tabla muerte',
  `fechaMuerte` date NOT NULL COMMENT 'Fecha de la muerte del animal',
  `horaMuerte` time NOT NULL COMMENT 'Hora de la Muerte del Animal',
  `cantidadTotal` int(11) NOT NULL COMMENT 'Cantidad de Animales muertos',
  `proveedor_idProveedor` int(11) NOT NULL,
  `empleado_idEmpleado` int(11) NOT NULL,
  PRIMARY KEY (`idMuerte`),
  KEY `fk_muertes_proveedor1_idx` (`proveedor_idProveedor`),
  KEY `fk_muertes_empleado1_idx` (`empleado_idEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table muertes
#


#
# Source for table nivel
#

DROP TABLE IF EXISTS `nivel`;
CREATE TABLE `nivel` (
  `idNivel` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del Nivel del usuario',
  `nivel` varchar(100) NOT NULL COMMENT 'Niveles de los usuarios del sistema',
  PRIMARY KEY (`idNivel`),
  UNIQUE KEY `idNivel_UNIQUE` (`idNivel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table nivel
#


#
# Source for table notatraslado
#

DROP TABLE IF EXISTS `notatraslado`;
CREATE TABLE `notatraslado` (
  `idTraslado` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del registro de traslado',
  `fechaTraslado` date NOT NULL COMMENT 'Fecha en el que se realizo el traslado',
  `nombreConductor` varchar(55) NOT NULL COMMENT 'Nombre del conductor',
  `cedulaConductor` varchar(45) NOT NULL COMMENT 'Cedula del conductor',
  `cantidadAnimal` int(11) NOT NULL COMMENT 'Cantidad de animales trasladados',
  `numeroRUA` varchar(55) NOT NULL COMMENT 'Numero del registro unico del automotor que pertenece al automovil que realizo el traslado',
  `marcaAuto` varchar(55) NOT NULL COMMENT 'Marca del automovil en el que se realizo el traslado',
  `proveedor_idProveedor` int(11) NOT NULL,
  `cliente_idCliente` int(11) NOT NULL,
  `empleado_idEmpleado` int(11) NOT NULL,
  `facturaVenta_idVenta` int(11) NOT NULL,
  `facturaCompra_idCompra` int(11) NOT NULL,
  `ciudad_idCiudad` int(11) NOT NULL,
  PRIMARY KEY (`idTraslado`),
  KEY `fk_notaTraslado_proveedor1_idx` (`proveedor_idProveedor`),
  KEY `fk_notaTraslado_cliente1_idx` (`cliente_idCliente`),
  KEY `fk_notaTraslado_empleado1_idx` (`empleado_idEmpleado`),
  KEY `fk_notaTraslado_facturaVenta1_idx` (`facturaVenta_idVenta`),
  KEY `fk_notaTraslado_facturaCompra1_idx` (`facturaCompra_idCompra`),
  KEY `fk_notaTraslado_ciudad1_idx` (`ciudad_idCiudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table notatraslado
#


#
# Source for table pesaje
#

DROP TABLE IF EXISTS `pesaje`;
CREATE TABLE `pesaje` (
  `idPesaje` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de la tabla pesaje del animal',
  `fechaPesaje` date NOT NULL COMMENT 'Fecha en el que se realizo el pesaje del animal',
  `horaPesaje` time NOT NULL COMMENT 'Hora del Pesaje del animal',
  `empleado_idEmpleado` int(11) NOT NULL,
  PRIMARY KEY (`idPesaje`),
  UNIQUE KEY `idPesaje_UNIQUE` (`idPesaje`),
  KEY `fk_pesaje_empleado1_idx` (`empleado_idEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table pesaje
#


#
# Source for table proveedor
#

DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE `proveedor` (
  `idProveedor` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del Proveedor',
  `nombreProveedor` varchar(55) NOT NULL COMMENT 'Nombre del Proveedor',
  `direccionProveedor` varchar(100) NOT NULL COMMENT 'Direccion del Proveedor',
  `rucProveedor` varchar(45) NOT NULL COMMENT 'Ruc del Proveedor',
  `ciudad_idCiudad` int(11) NOT NULL,
  PRIMARY KEY (`idProveedor`),
  UNIQUE KEY `idProveedor_UNIQUE` (`idProveedor`),
  KEY `fk_proveedor_ciudad1_idx` (`ciudad_idCiudad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table proveedor
#


#
# Source for table sanitacion
#

DROP TABLE IF EXISTS `sanitacion`;
CREATE TABLE `sanitacion` (
  `idSanitacion` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador de la Sanitacion',
  `fechaSanitacion` date NOT NULL COMMENT 'Fecha de la Sanitacion',
  `horaSanitacion` time NOT NULL COMMENT 'Hora de la Sanitacion',
  `empleado_idEmpleado` int(11) NOT NULL,
  `proveedor_idProveedor` int(11) NOT NULL,
  PRIMARY KEY (`idSanitacion`),
  KEY `fk_sanitacion_empleado1_idx` (`empleado_idEmpleado`),
  KEY `fk_sanitacion_proveedor1_idx` (`proveedor_idProveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table sanitacion
#


#
# Source for table stock
#

DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `idStock` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del Stock',
  `cantidad` int(11) NOT NULL COMMENT 'Cantidad que se tiene en existencia',
  `lote` varchar(45) NOT NULL COMMENT 'Lote de los insumos que se tiene en existencia',
  `cantidadMinima` int(11) NOT NULL COMMENT 'Cantidad Minima del Insumo',
  `detalleCompra_facturaCompra_idCompra` int(11) NOT NULL,
  `insumo_idInsumo` int(11) NOT NULL,
  `animal_idAnimal` int(11) NOT NULL,
  `detalleTraslado_notaTraslado_idTraslado` int(11) NOT NULL,
  `detalleVacunacionInsumo_vacunacion_idVacunacion` int(11) NOT NULL,
  `detalleSanitacionInsumo_sanitacion_idSanitacion` int(11) NOT NULL,
  `consumo_idConsumo` int(11) NOT NULL,
  PRIMARY KEY (`idStock`),
  UNIQUE KEY `idStock_UNIQUE` (`idStock`),
  KEY `fk_stock_insumo1_idx` (`insumo_idInsumo`),
  KEY `fk_stock_animal1_idx` (`animal_idAnimal`),
  KEY `fk_stock_detalleTraslado1_idx` (`detalleTraslado_notaTraslado_idTraslado`),
  KEY `fk_stock_consumo1_idx` (`consumo_idConsumo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table stock
#


#
# Source for table usuario
#

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del Usuario',
  `usuario` varchar(250) NOT NULL COMMENT 'Nombre del usuario a loguearse',
  `pass` varchar(250) NOT NULL COMMENT 'Contraseña del usuario',
  `empleado_idEmpleado` int(11) NOT NULL,
  `nivel_idNivel` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `idUsuario_UNIQUE` (`idUsuario`),
  KEY `fk_usuario_empleado1_idx` (`empleado_idEmpleado`),
  KEY `fk_usuario_nivel1_idx` (`nivel_idNivel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table usuario
#


#
# Source for table vacunacion
#

DROP TABLE IF EXISTS `vacunacion`;
CREATE TABLE `vacunacion` (
  `idVacunacion` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador del registro de la vacunacion',
  `fechaVacunacion` date NOT NULL COMMENT 'Fecha en el que se realizo la vacunacion de los animales',
  `horaVacunacion` time NOT NULL COMMENT 'Hora en el que se realizo la vacunacion de los animales',
  `cantidadVacunacion` int(11) NOT NULL COMMENT 'Cantidad de animales vacunados',
  `costoVacunacion` int(11) NOT NULL COMMENT 'Costo total de la vacunacion',
  `proveedor_idProveedor` int(11) NOT NULL,
  PRIMARY KEY (`idVacunacion`),
  KEY `fk_vacunacion_proveedor1_idx` (`proveedor_idProveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Dumping data for table vacunacion
#


#
#  Foreign keys for table auditoria
#

ALTER TABLE `auditoria`
ADD CONSTRAINT `fk_auditoria_usuario1` FOREIGN KEY (`usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table ciudad
#

ALTER TABLE `ciudad`
ADD CONSTRAINT `fk_ciudad_departamento1` FOREIGN KEY (`departamento_idDepartamento`) REFERENCES `departamento` (`idDepartamento`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table cliente
#

ALTER TABLE `cliente`
ADD CONSTRAINT `fk_cliente_ciudad1` FOREIGN KEY (`ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table consumo
#

ALTER TABLE `consumo`
ADD CONSTRAINT `fk_consumo_insumo1` FOREIGN KEY (`insumo_idInsumo`) REFERENCES `insumo` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detallecompra
#

ALTER TABLE `detallecompra`
ADD CONSTRAINT `fk_detalleCompra_facturaCompra1` FOREIGN KEY (`facturaCompra_idCompra`) REFERENCES `facturacompra` (`idCompra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleCompra_insumo1` FOREIGN KEY (`insumo_idInsumo`) REFERENCES `insumo` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detalleconsumo
#

ALTER TABLE `detalleconsumo`
ADD CONSTRAINT `fk_detalleConsumo_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleConsumo_consumo1` FOREIGN KEY (`consumo_idConsumo`) REFERENCES `consumo` (`idConsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detalleextraviado
#

ALTER TABLE `detalleextraviado`
ADD CONSTRAINT `fk_detalleExtraviado_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleExtraviado_extraviado1` FOREIGN KEY (`extraviado_idExtraviado`) REFERENCES `extraviado` (`idExtraviado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detalleingresoanimal
#

ALTER TABLE `detalleingresoanimal`
ADD CONSTRAINT `fk_detalleIngresoAnimal_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleIngresoAnimal_ingresoAnimal1` FOREIGN KEY (`ingresoAnimal_idIngresoAnimal`) REFERENCES `ingresoanimal` (`idIngresoAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detallemuerte
#

ALTER TABLE `detallemuerte`
ADD CONSTRAINT `fk_detalleMuerte_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleMuerte_muertes1` FOREIGN KEY (`muertes_idMuerte`) REFERENCES `muertes` (`idMuerte`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detallepesaje
#

ALTER TABLE `detallepesaje`
ADD CONSTRAINT `fk_detallePesaje_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detallePesaje_pesaje1` FOREIGN KEY (`pesaje_idPesaje`) REFERENCES `pesaje` (`idPesaje`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detallesanitacion
#

ALTER TABLE `detallesanitacion`
ADD CONSTRAINT `fk_detalleSanitacion_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleSanitacion_sanitacion1` FOREIGN KEY (`sanitacion_idSanitacion`) REFERENCES `sanitacion` (`idSanitacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detallesanitacioninsumo
#

ALTER TABLE `detallesanitacioninsumo`
ADD CONSTRAINT `fk_detalleSanitacionInsumo_insumo1` FOREIGN KEY (`insumo_idInsumo`) REFERENCES `insumo` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleSanitacionInsumo_sanitacion1` FOREIGN KEY (`sanitacion_idSanitacion`) REFERENCES `sanitacion` (`idSanitacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detalletraslado
#

ALTER TABLE `detalletraslado`
ADD CONSTRAINT `fk_detalleTraslado_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleTraslado_notaTraslado1` FOREIGN KEY (`notaTraslado_idTraslado1`) REFERENCES `notatraslado` (`idTraslado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detallevacunacion
#

ALTER TABLE `detallevacunacion`
ADD CONSTRAINT `fk_detalleVacunacion_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleVacunacion_vacunacion1` FOREIGN KEY (`vacunacion_idVacunacion`) REFERENCES `vacunacion` (`idVacunacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detallevacunacioninsumo
#

ALTER TABLE `detallevacunacioninsumo`
ADD CONSTRAINT `fk_detalleVacunacionInsumo_insumo1` FOREIGN KEY (`insumo_idInsumo`) REFERENCES `insumo` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_detalleVacunacionInsumo_vacunacion1` FOREIGN KEY (`vacunacion_idVacunacion`) REFERENCES `vacunacion` (`idVacunacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table detalleventa
#

ALTER TABLE `detalleventa`
ADD CONSTRAINT `fk_detalleVenta_facturaVenta1` FOREIGN KEY (`facturaVenta_idVenta`) REFERENCES `facturaventa` (`idVenta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table empleado
#

ALTER TABLE `empleado`
ADD CONSTRAINT `fk_empleado_ciudad1` FOREIGN KEY (`ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table extraviado
#

ALTER TABLE `extraviado`
ADD CONSTRAINT `fk_extraviado_empleado1` FOREIGN KEY (`empleado_idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table facturacompra
#

ALTER TABLE `facturacompra`
ADD CONSTRAINT `fk_facturaCompra_proveedor1` FOREIGN KEY (`proveedor_idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table facturaventa
#

ALTER TABLE `facturaventa`
ADD CONSTRAINT `fk_facturaVenta_cliente1` FOREIGN KEY (`cliente_idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table ingresocorral
#

ALTER TABLE `ingresocorral`
ADD CONSTRAINT `fk_ingresoCorral_empleado1` FOREIGN KEY (`empleado_idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table muertes
#

ALTER TABLE `muertes`
ADD CONSTRAINT `fk_muertes_empleado1` FOREIGN KEY (`empleado_idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_muertes_proveedor1` FOREIGN KEY (`proveedor_idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table notatraslado
#

ALTER TABLE `notatraslado`
ADD CONSTRAINT `fk_notaTraslado_ciudad1` FOREIGN KEY (`ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_notaTraslado_cliente1` FOREIGN KEY (`cliente_idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_notaTraslado_empleado1` FOREIGN KEY (`empleado_idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_notaTraslado_facturaCompra1` FOREIGN KEY (`facturaCompra_idCompra`) REFERENCES `facturacompra` (`idCompra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_notaTraslado_facturaVenta1` FOREIGN KEY (`facturaVenta_idVenta`) REFERENCES `facturaventa` (`idVenta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_notaTraslado_proveedor1` FOREIGN KEY (`proveedor_idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table pesaje
#

ALTER TABLE `pesaje`
ADD CONSTRAINT `fk_pesaje_empleado1` FOREIGN KEY (`empleado_idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table proveedor
#

ALTER TABLE `proveedor`
ADD CONSTRAINT `fk_proveedor_ciudad1` FOREIGN KEY (`ciudad_idCiudad`) REFERENCES `ciudad` (`idCiudad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table sanitacion
#

ALTER TABLE `sanitacion`
ADD CONSTRAINT `fk_sanitacion_empleado1` FOREIGN KEY (`empleado_idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_sanitacion_proveedor1` FOREIGN KEY (`proveedor_idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table stock
#

ALTER TABLE `stock`
ADD CONSTRAINT `fk_stock_animal1` FOREIGN KEY (`animal_idAnimal`) REFERENCES `animal` (`idAnimal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stock_consumo1` FOREIGN KEY (`consumo_idConsumo`) REFERENCES `consumo` (`idConsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stock_detalleTraslado1` FOREIGN KEY (`detalleTraslado_notaTraslado_idTraslado`) REFERENCES `detalletraslado` (`notaTraslado_idTraslado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stock_insumo1` FOREIGN KEY (`insumo_idInsumo`) REFERENCES `insumo` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table usuario
#

ALTER TABLE `usuario`
ADD CONSTRAINT `fk_usuario_empleado1` FOREIGN KEY (`empleado_idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_usuario_nivel1` FOREIGN KEY (`nivel_idNivel`) REFERENCES `nivel` (`idNivel`) ON DELETE NO ACTION ON UPDATE NO ACTION;

#
#  Foreign keys for table vacunacion
#

ALTER TABLE `vacunacion`
ADD CONSTRAINT `fk_vacunacion_proveedor1` FOREIGN KEY (`proveedor_idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
