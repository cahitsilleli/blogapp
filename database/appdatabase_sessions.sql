-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: appdatabase
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('-dng1VvSZs5fiChi8lTR2YoxMUex7xB1','2024-07-23 02:23:36','{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-07-23T02:23:36.205Z\",\"httpOnly\":true,\"path\":\"/\"},\"csrfSecret\":\"ZX2QA9jjUuwMzPZmerTcctDX\"}'),('HMSra5PprpVR-YXff49cHMN3v4hP1hRq','2024-07-23 02:23:36','{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-07-23T02:23:36.221Z\",\"httpOnly\":true,\"path\":\"/\"},\"csrfSecret\":\"9AGHqDEnhEJXii41IVHYLoN5\"}'),('jrSaswXZ_w6t-SorqiyjiV9MZ1d74GU3','2024-07-23 02:23:36','{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-07-23T02:23:36.222Z\",\"httpOnly\":true,\"path\":\"/\"},\"csrfSecret\":\"xVEcbgVgZV1zQBPW1VByxjCB\"}'),('PW3q3IngYEU8u4N_Kjr-gVOYf4bD-G_q','2024-07-23 02:23:36','{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-07-23T02:23:36.222Z\",\"httpOnly\":true,\"path\":\"/\"},\"csrfSecret\":\"4ByCozzsoyH6uzsosdiJq_2U\"}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-22  5:32:56
