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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (1,'01/01/2022','oscar vanegas','barranquilla','cra 44','presencial','pendiente','no','llegar con anticipacion 1 hora antes',1,'1:30pm'),(2,'01/02/2022','andrea lopez','barranquilla','cra 55 b','virtual','pendiente','no','ninguna',1,'11:00am'),(6,'02/05/2022','maria gomez quevedo','barranquilla','sede centro','presencial','pendiente','si','ninguna',3,'5:00pm'),(7,'2022-07-30','gonzalo de feliche','clinica general del norte','cll 76 # 20b','presencial','pendiente','no','niguna',1,'1pm'),(12,'2022-07-06','omar pulgarin','clinica san vicente|','sede centro','presencial','pendiente','si','niguna',3,'4:00 pm'),(13,'2022-07-08','alfonso matos','paso de la manga','cra 9l 70c','presencial','pendiente','no','niguna',5,'6:30 am'),(14,'2022-07-14','prueba','prueba','prueba','presencial','pendiente','si','niguna',1,'prueba');
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'daniel steven','de avila peñate','cedula','150515436','1980-08-06','Bogota'),(3,'erika patricia','de la hoz','cedula','102518541','1961-09-04','barranquilla'),(5,'juan ','lozano','cedula','102518515','1979-01-31','barranquilla'),(10,'carlos','guerra','cedula','102518541','02/02/1988','barranquilla'),(11,'dedd','a','a','1232652185','2022-08-04','w');
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

-- Dump completed on 2022-08-04 12:33:49
