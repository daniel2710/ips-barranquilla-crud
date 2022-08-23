-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: ips_crud
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `idcita` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(45) DEFAULT NULL,
  `doctor` varchar(45) NOT NULL,
  `lugar` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `prioritaria` varchar(45) NOT NULL DEFAULT 'no',
  `observacion` varchar(255) NOT NULL DEFAULT 'ninguna',
  `idpaciente` int NOT NULL,
  `hora` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcita`),
  KEY `id_pacientes_idx` (`idpaciente`),
  CONSTRAINT `id_pacientes` FOREIGN KEY (`idpaciente`) REFERENCES `pacientes` (`idpaciente`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (26,'2022-08-09','lombardo humberto lopez','clinica del sur','sede centro','presencial','pendiente','no','ninguna',24,'8:30am'),(27,'2022-10-13','jose perez agustiniano','clinica porto azul','sede via salgar','presencial','pendiente','no','ninguna',24,'1:30pm'),(30,'2022-08-09','prueba','prueba','prueba','presencial','pendiente','si','ninguna',24,'prueba'),(31,'2022-08-09','cita de prueba','cita de prueba','cita de prueba','presencial','pendiente','si','ninguna',31,'cita de prueba'),(32,'2022-08-09','cita 2','cita 2','cita 2','presencial','pendiente','no','ninguna',31,'cita 2'),(33,'2022-08-11','gonzalo de feliche','clinica del atlantico','sede via salgar','presencial','pendiente','no','ninguna',24,'2:30pm'),(34,'2022-08-11','alvaro morata','clinica san jorge','sede centro','presencial','pendiente','no','ninguna',26,'5:30am'),(35,'2022-08-11','gustavo bolaños','paso del pueblito','barrio pueblito','presencial','pendiente','no','ninguna',26,'2:30pm'),(37,'2022-08-11','prueba spring','prueba spring','prueba spring','prueba spring','prueba spring','prueba spring','prueba spring',24,'prueba spring'),(38,'2022-08-11','prueba spring','prueba spring','prueba spring','prueba spring','prueba spring','prueba spring','prueba spring',24,'prueba spring');
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `idpaciente` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(45) NOT NULL,
  `apellidos` varchar(45) NOT NULL,
  `tipo_doc` varchar(45) NOT NULL,
  `documento` varchar(45) NOT NULL,
  `fecha_nac` varchar(45) NOT NULL,
  `lugar_nac` varchar(45) NOT NULL,
  PRIMARY KEY (`idpaciente`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (24,'daniel','de avila','cedula','12248489','2022-08-09','barranquilla'),(26,'jorge','peñate','cedula','12248489','2022-08-09','soledad'),(27,'carlos','guerra','tarjeta de identidad','102518541','2022-08-09','baranoa'),(31,'andrea','caballero','cedula','12248489','2022-08-09','prueba'),(32,'monica','orozco','cedula','12248489','02/02/1988','barranquilla'),(33,'juliana','guzman','cedula','12248489','2022-08-09','barranquilla'),(34,'federico','gutierrez','cedula','120515151','2022-08-11','bogota'),(35,'gustavo','petro','cedula','120201515','2022-08-11','bogota'),(36,'teofilo','gutierrez','tarjeta de identidad','15125155','2022-08-11','barranquilla');
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-22 23:09:58
