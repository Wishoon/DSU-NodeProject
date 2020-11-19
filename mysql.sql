-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema allergy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema allergy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `allergy` DEFAULT CHARACTER SET utf8 ;
USE `allergy` ;

-- -----------------------------------------------------
-- Table `allergy`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`USER` (
  `seq` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `birth` VARCHAR(45) NULL,
  `milk` ENUM("Y", "N") NULL DEFAULT 'N',
  `egg` ENUM("Y", "N") NULL DEFAULT 'N',
  `bean` ENUM("Y", "N") NULL DEFAULT 'N',
  `wheat` ENUM("Y", "N") NULL DEFAULT 'N',
  `mackerel` ENUM("Y", "N") NULL DEFAULT 'N',
  `crab` ENUM("Y", "N") NULL DEFAULT 'N',
  `shrimp` ENUM("Y", "N") NULL DEFAULT 'N',
  `peach` ENUM("Y", "N") NULL DEFAULT 'N',
  `tomato` ENUM("Y", "N") NULL DEFAULT 'N',
  `sulfurous_acids` ENUM("Y", "N") NULL DEFAULT 'N',
  `walnut` ENUM("Y", "N") NULL DEFAULT 'N',
  `beef` ENUM("Y", "N") NULL DEFAULT 'N',
  `chicken` ENUM("Y", "N") NULL DEFAULT 'N',
  `squid` ENUM("Y", "N") NULL DEFAULT 'N',
  `shellfish` ENUM("Y", "N") NULL DEFAULT 'N',
  `pinenute` ENUM("Y", "N") NULL DEFAULT 'N',
  PRIMARY KEY (`seq`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allergy`.`COMPANY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`COMPANY` (
  `seq` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `business` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  PRIMARY KEY (`seq`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allergy`.`PRODUCT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`PRODUCT` (
  `seq` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `img` VARCHAR(45) NULL,
  `price` INT NULL,
  `detail` VARCHAR(45) NULL,
  `milk` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `egg` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `bean` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `wheat` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `mackerel` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `crab` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `shrimp` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `peach` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `tomato` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `sulfurous_acids` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `walnut` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `beef` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `chicken` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `squid` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `shellfish` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `pinenute` ENUM("M", "Y", "N") NULL DEFAULT 'N',
  `COMPANY_seq` INT NOT NULL,
  PRIMARY KEY (`seq`),
  INDEX `fk_PRODUCT_COMPANY_idx` (`COMPANY_seq` ASC) ,
  CONSTRAINT `fk_PRODUCT_COMPANY`
    FOREIGN KEY (`COMPANY_seq`)
    REFERENCES `allergy`.`COMPANY` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allergy`.`USERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`USERS` (
  `seq` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `name` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `birth` VARCHAR(45) NULL,
  PRIMARY KEY (`seq`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allergy`.`PRODUCTS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`PRODUCTS` (
  `seq` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `img` VARCHAR(45) NULL,
  `price` INT NULL,
  `detail` VARCHAR(45) NULL,
  `COMPANY_seq` INT NOT NULL,
  PRIMARY KEY (`seq`),
  INDEX `fk_PRODUCTS_COMPANY1_idx` (`COMPANY_seq` ASC) ,
  CONSTRAINT `fk_PRODUCTS_COMPANY1`
    FOREIGN KEY (`COMPANY_seq`)
    REFERENCES `allergy`.`COMPANY` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allergy`.`ORDERS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`ORDERS` (
  `seq` INT NOT NULL AUTO_INCREMENT,
  `Allprice` VARCHAR(45) NULL,
  `USERS_seq` INT NOT NULL,
  `PRODUCTS_seq` INT NOT NULL,
  PRIMARY KEY (`seq`),
  INDEX `fk_ORDERS_USERS1_idx` (`USERS_seq` ASC) ,
  INDEX `fk_ORDERS_PRODUCTS1_idx` (`PRODUCTS_seq` ASC) ,
  CONSTRAINT `fk_ORDERS_USERS1`
    FOREIGN KEY (`USERS_seq`)
    REFERENCES `allergy`.`USERS` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ORDERS_PRODUCTS1`
    FOREIGN KEY (`PRODUCTS_seq`)
    REFERENCES `allergy`.`PRODUCTS` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allergy`.`ALLERGY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`ALLERGY` (
  `seq` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`seq`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allergy`.`USER_ALLERGY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`USER_ALLERGY` (
  `USERS_seq` INT NOT NULL,
  `ALLERGY_seq` INT NOT NULL,
  PRIMARY KEY (`USERS_seq`, `ALLERGY_seq`),
  INDEX `fk_USER_ALLERGY_ALLERGY1_idx` (`ALLERGY_seq` ASC) ,
  CONSTRAINT `fk_USER_ALLERGY_USERS1`
    FOREIGN KEY (`USERS_seq`)
    REFERENCES `allergy`.`USERS` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_USER_ALLERGY_ALLERGY1`
    FOREIGN KEY (`ALLERGY_seq`)
    REFERENCES `allergy`.`ALLERGY` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `allergy`.`PRODUCT_ALLERGY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `allergy`.`PRODUCT_ALLERGY` (
  `ALLERGY_seq` INT NOT NULL,
  `PRODUCTS_seq` INT NOT NULL,
  `main_yn` ENUM("Y", "N") NULL DEFAULT 'N',
  PRIMARY KEY (`ALLERGY_seq`, `PRODUCTS_seq`),
  INDEX `fk_PRODUCT_ALLERGY_PRODUCTS1_idx` (`PRODUCTS_seq` ASC) ,
  CONSTRAINT `fk_PRODUCT_ALLERGY_ALLERGY1`
    FOREIGN KEY (`ALLERGY_seq`)
    REFERENCES `allergy`.`ALLERGY` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRODUCT_ALLERGY_PRODUCTS1`
    FOREIGN KEY (`PRODUCTS_seq`)
    REFERENCES `allergy`.`PRODUCTS` (`seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
