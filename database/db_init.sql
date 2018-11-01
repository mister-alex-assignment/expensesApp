CREATE DATABASE IF NOT EXISTS  `expenses_schema` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

CREATE TABLE `expenses_schema`.`Currencies` (
  `ISO` VARCHAR(3) NOT NULL COMMENT 'Currency ISO Code',
  `Name` VARCHAR(45) NOT NULL COMMENT 'Currency Name',
  PRIMARY KEY (`ISO`),
  UNIQUE INDEX `ISO_UNIQUE` (`ISO` ASC) VISIBLE,
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE);

insert into Currencies(ISO, Name) values('CHF', 'Swiss Franc');
insert into Currencies(ISO, Name) values('EUR', 'Euro');
insert into Currencies(ISO, Name) values('USD', 'US Dollar');

CREATE TABLE `expenses_schema`.`ExpenseTypes` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Expense Type Id',
  `Name` VARCHAR(60) NOT NULL COMMENT 'Expense Type Name',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE);

insert into ExpenseTypes (Name) values('Accomodation');
insert into ExpenseTypes (Name) values('Gifts');
insert into ExpenseTypes (Name) values('Meals');
insert into ExpenseTypes (Name) values('Meals with externals');
insert into ExpenseTypes (Name) values('Parking expense');
insert into ExpenseTypes (Name) values('Events, Conferences');
insert into ExpenseTypes (Name) values('FX (a proof of foreign exch rate)');
insert into ExpenseTypes (Name) values('Others');

CREATE TABLE `expenses_schema`.`Expenses` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'Id',
  `TimeCreated` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'timestamp',
  `ExpenseDate` DATETIME NULL COMMENT 'Date of the Expense.\nCould be null for convenience.',
  `Amount` DECIMAL(9,4) NOT NULL DEFAULT 0 COMMENT 'Amount of the Expense.',
  `Recipient` VARCHAR(100) NULL COMMENT 'Who’s got paid',
  `Currency` VARCHAR(3) NOT NULL COMMENT 'Currency ISO code',
  `ExpenseTypeId` INT NOT NULL COMMENT 'Type of the expense',
  `ReportId` INT NULL DEFAULT 0 COMMENT 'ReportId',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `ExpenseTypesFK_idx` (`ExpenseTypeId` ASC) VISIBLE,
  INDEX `CurrenciesFK_idx` (`Currency` ASC) VISIBLE,
  CONSTRAINT `ExpenseTypesFK`
    FOREIGN KEY (`ExpenseTypeId`)
    REFERENCES `expenses_schema`.`ExpenseTypes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `CurrenciesFK`
    FOREIGN KEY (`Currency`)
    REFERENCES `expenses_schema`.`Currencies` (`ISO`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


ALTER USER root IDENTIFIED WITH mysql_native_password BY 'password';