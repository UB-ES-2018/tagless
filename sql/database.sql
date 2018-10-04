CREATE DATABASE tagless;

USE tagless;

SHOW TABLES;

CREATE TABLE _user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    username VARCHAR(20),
    password VARCHAR(20),
);

INSERT INTO _user (email,username,password) values ('a@g.com','xX_no_puedo_jugar_a_spiderman_Xx','qwerty');