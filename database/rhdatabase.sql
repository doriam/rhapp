-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema rh
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema rh
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rh` DEFAULT CHARACTER SET utf8 ;
USE `rh` ;

-- -----------------------------------------------------
-- Table `rh`.`worker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rh`.`worker` (
  `id_worker` INT NOT NULL,
  `w_firstname` VARCHAR(45) NOT NULL,
  `w_lastname` VARCHAR(45) NOT NULL,
  `w_address` VARCHAR(50) NOT NULL,
  `w_cell` VARCHAR(10) NOT NULL,
  `w_email` VARCHAR(30) NOT NULL,
  `w_bday` DATE NOT NULL,
  `w_date_start` DATE NOT NULL,
  PRIMARY KEY (`id_worker`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rh`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rh`.`user` (
  `id_user` INT NOT NULL,
  `id_worker` INT NULL,
  `u_name` VARCHAR(45) NULL,
  `u_password` VARCHAR(45) NULL,
  `u_state` VARCHAR(45) NULL,
  `u_last_connection` DATETIME NULL,
  PRIMARY KEY (`id_user`),
  INDEX `id_worker_idx` (`id_worker` ASC) VISIBLE,
  CONSTRAINT `user_worker`
    FOREIGN KEY (`id_worker`)
    REFERENCES `rh`.`worker` (`id_worker`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rh`.`job`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rh`.`job` (
  `id_job` INT NOT NULL,
  `j_name` VARCHAR(45) NULL,
  `j_description` VARCHAR(45) NULL,
  PRIMARY KEY (`id_job`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rh`.`job_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rh`.`job_user` (
  `id_worker` INT NOT NULL,
  `id_job` INT NOT NULL,
  `ju_date_start` DATE NULL,
  INDEX `jobs_user_idx` (`id_worker` ASC) VISIBLE,
  INDEX `jobs_jobs_idx` (`id_job` ASC) VISIBLE,
  CONSTRAINT `jobs_worker`
    FOREIGN KEY (`id_worker`)
    REFERENCES `rh`.`worker` (`id_worker`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `jobs_jobs`
    FOREIGN KEY (`id_job`)
    REFERENCES `rh`.`job` (`id_job`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rh`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rh`.`department` (
  `id_department` INT NOT NULL,
  `d_name` VARCHAR(45) NULL,
  `d_function` VARCHAR(45) NULL,
  PRIMARY KEY (`id_department`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `rh`.`department_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rh`.`department_user` (
  `id_worker` INT NOT NULL,
  `id_department` INT NOT NULL,
  `d_date_start` DATE NULL,
  INDEX `dept_worker_idx` (`id_worker` ASC) VISIBLE,
  INDEX `dept_dept_idx` (`id_department` ASC) VISIBLE,
  CONSTRAINT `dept_worker`
    FOREIGN KEY (`id_worker`)
    REFERENCES `rh`.`worker` (`id_worker`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `dept_dept`
    FOREIGN KEY (`id_department`)
    REFERENCES `rh`.`department` (`id_department`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
