CREATE DATABASE IF NOT EXISTS tagless;

USE tagless;

SHOW TABLES;

CREATE TABLE IF NOT EXISTS _user (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50),
    username VARCHAR(20),
    pass VARCHAR(20),
);

INSERT IF NOT EXISTS INTO _user (email,username,pass    ) values ('a@g.com','xX_no_puedo_jugar_a_spiderman_Xx','qwerty');