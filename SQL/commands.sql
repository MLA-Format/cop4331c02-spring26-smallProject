-- Gabriel Moody | Spring 2026 | POOSD Small Project

-- Here are all the commands I'll use to set up our database.
-- Heavily based on code given for Colors lab.
-- Documentation is near the bottom.

-- Create database.
CREATE DATABASE COP4331;
USE COP4331;

--  TABLES  --

-- Users table.
CREATE TABLE `COP4331`.`Users` 
( 
	`ID` INT NOT NULL AUTO_INCREMENT , 
	`firstName` VARCHAR(50) NOT NULL DEFAULT '' , 
	`lastName` VARCHAR(50) NOT NULL DEFAULT '' , 
	`login` VARCHAR(50) NOT NULL DEFAULT '' , 
	`password` VARCHAR(50) NOT NULL DEFAULT '' , 
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

-- Contacts table.
CREATE TABLE `COP4331`.`Contacts` 
( 
	`ID` INT NOT NULL AUTO_INCREMENT , 
	`firstName` VARCHAR(50) NOT NULL DEFAULT '' , 
	`lastName` VARCHAR(50) NOT NULL DEFAULT '' , 
	`phone` VARCHAR(50) NOT NULL DEFAULT '' , 
	`email` VARCHAR(50) NOT NULL DEFAULT '' , 
	`userID` INT NOT NULL DEFAULT '0' , 
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB;


--  INSERT COMMANDS --
-- Namely testing purposes for now.
-- Insert users.
insert into Users (firstName,lastName,login,password) VALUES ('John','Smith','JSmith','5832a71366768098cceb7095efb774f2'); -- Using the example hash given in Colors lab.
insert into Users (firstName,lastName,login,password) VALUES ('Mary','Doe','MDoe','unhashedpass');
insert into Users (firstName,lastName,login,password) VALUES ('Gabriel','Moody','moody','4331');
-- Insert contacts. 
insert into Contacts (firstName,lastName,phone,email,userID) VALUES ('Gabriel', 'Moody', '1234567890', 'fake@mail.com', '0');
insert into Contacts (firstName,lastName,phone,email,userID) VALUES ('Gumball', 'Watterson', '11111111111', 'amazing@world.com', '1');
insert into Contacts (firstName,lastName,phone,email,userID) VALUES ('Alexander', 'Cartwright', '3213213213', 'ac@ucf.edu', '2');

-- Sort users by first name.
SELECT * FROM Users;
ORDER BY firstName ASC;

-- Sort contacts by first name.
SELECT * FROM Contacts;
ORDER BY firstName ASC;

--	ADMIN COMMANDS	-
--Use COP4331;
--create user 'admin' identified by 'admin';
--grant all privileges on COP4331.* to 'admin'@'%';

-- DOCUMENTATION --
-- Order of Attributes --
-- User: ID (auto), First Name, Last Name, Login, Password
-- Contacs: ID (auto), First Name, Last Name, Phone, Email, User ID
-- User ID will default to 0 if nothing is entered.
-- Regular IDs automatically increment.

--	LAB 1 COMMANDS --
-- These are the commands the TA will run in the lab, just fyi.
--show databases;
--use COP4331;
--show tables;
--select * from contacts;
--select * from users;
--select * from contacts where ID=1;
--select * from users where ID=1;