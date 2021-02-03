DROP DATABASE IF EXISTS players_db;

CREATE DATABASE players_db;

USE players_db;

CREATE TABLE players (
    player_id INT NOT NULL AUTO_INCREMENT,
    player_name VARCHAR(100) NOT NULL,
    player_position VARCHAR(30) DEFAULT 'Benched',
    user VARCHAR(50) NOT NULL,
    PRIMARY KEY (player_id)
);

