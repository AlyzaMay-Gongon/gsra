-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2021 at 07:12 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gsra`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminID` int(11) NOT NULL,
  `AdminName` varchar(50) NOT NULL,
  `AdminUser` varchar(50) NOT NULL,
  `AdminPassword` varchar(50) NOT NULL,
  `RecordsID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer_accounts`
--

CREATE TABLE `customer_accounts` (
  `AccountID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `EmailAddress` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `customer_information`
--

CREATE TABLE `customer_information` (
  `CustomerID` int(11) NOT NULL,
  `CustomerName` varchar(50) NOT NULL,
  `AccountID` int(11) NOT NULL,
  `CustomerAddress` varchar(50) NOT NULL,
  `Age` int(11) NOT NULL,
  `Gender` varchar(50) NOT NULL,
  `ContactNo` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `store_accounts`
--

CREATE TABLE `store_accounts` (
  `AccountID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `EmailAddress` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `store_information`
--

CREATE TABLE `store_information` (
  `StoreID` int(11) NOT NULL,
  `AccountID` int(11) NOT NULL,
  `StoreName` varchar(50) NOT NULL,
  `StoreAddress` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `store_records`
--

CREATE TABLE `store_records` (
  `RecordsID` int(11) NOT NULL,
  `StoreID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `Date&TimeIn` datetime NOT NULL,
  `Date&TimeOut` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`),
  ADD KEY `RecordsID` (`RecordsID`);

--
-- Indexes for table `customer_accounts`
--
ALTER TABLE `customer_accounts`
  ADD PRIMARY KEY (`AccountID`);

--
-- Indexes for table `customer_information`
--
ALTER TABLE `customer_information`
  ADD PRIMARY KEY (`CustomerID`),
  ADD KEY `AccountID` (`AccountID`);

--
-- Indexes for table `store_accounts`
--
ALTER TABLE `store_accounts`
  ADD PRIMARY KEY (`AccountID`);

--
-- Indexes for table `store_information`
--
ALTER TABLE `store_information`
  ADD PRIMARY KEY (`StoreID`),
  ADD KEY `StoreAccountID` (`AccountID`);

--
-- Indexes for table `store_records`
--
ALTER TABLE `store_records`
  ADD PRIMARY KEY (`RecordsID`),
  ADD KEY `StoreID` (`StoreID`),
  ADD KEY `CustomerID` (`CustomerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `store_records`
--
ALTER TABLE `store_records`
  MODIFY `RecordsID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`RecordsID`) REFERENCES `store_records` (`RecordsID`);

--
-- Constraints for table `customer_information`
--
ALTER TABLE `customer_information`
  ADD CONSTRAINT `AccountID` FOREIGN KEY (`AccountID`) REFERENCES `customer_accounts` (`AccountID`);

--
-- Constraints for table `store_information`
--
ALTER TABLE `store_information`
  ADD CONSTRAINT `StoreAccountID` FOREIGN KEY (`AccountID`) REFERENCES `store_accounts` (`AccountID`);

--
-- Constraints for table `store_records`
--
ALTER TABLE `store_records`
  ADD CONSTRAINT `store_records_ibfk_1` FOREIGN KEY (`StoreID`) REFERENCES `store_information` (`StoreID`),
  ADD CONSTRAINT `store_records_ibfk_2` FOREIGN KEY (`CustomerID`) REFERENCES `customer_information` (`CustomerID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
