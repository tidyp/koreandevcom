-- VSCode Mysql 접속: mysql.exe -uroot -p
-- SQL CLI COMMAND: mysql -u root -p devko < userdb.sql

CREATE DATABASE IF NOT EXISTS devko;
SHOW DATABASES;

-- USERS 테이블
DROP TABLE IF EXISTS devko.users;
CREATE TABLE IF NOT EXISTS users (
     id VARCHAR(64),
     userName VARCHAR(45),
     profileImage TEXT,
     workPosition VARCHAR(64),
     interestArea VARCHAR(64),
     selfDescription TEXT,
     createdAt DATETIME,
     updatedAt DATETIME,
     grade INT,
     notification INT
);

SELECT * FROM devko.users;

-- GOOGLE USERS 테이블
DROP TABLE IF EXISTS devko.usersgoogle;
CREATE TABLE IF NOT EXISTS usersgoogle (
     id VARCHAR(64),
     googleId VARCHAR(45),
     googleEmail VARCHAR(45),
     googleImage TEXT
);

SELECT * FROM devko.usersgoogle;

-- NAVER USERS 테이블
DROP TABLE IF EXISTS devko.usersnaver;
CREATE TABLE IF NOT EXISTS usersnaver (
     id VARCHAR(64),
     naverId VARCHAR(45),
     naverEmail VARCHAR(45),
     naverImage TEXT
);

SELECT * FROM devko.usersnaver;
