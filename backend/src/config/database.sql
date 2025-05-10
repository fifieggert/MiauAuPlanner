-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS miauauplanner;
USE miauauplanner;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create especies table
CREATE TABLE IF NOT EXISTS especies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create animals table
CREATE TABLE IF NOT EXISTS animals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    raca VARCHAR(50) NOT NULL,
    idade INT NOT NULL,
    genero VARCHAR(10) NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    id_usuario INT NOT NULL,
    id_especie INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES users(id),
    FOREIGN KEY (id_especie) REFERENCES especies(id)
);

-- Create vacinas table
CREATE TABLE IF NOT EXISTS vacinas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_aplicacao DATE NOT NULL,
    data_proxima DATE,
    id_animal INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_animal) REFERENCES animals(id)
);

-- Create alergias table
CREATE TABLE IF NOT EXISTS alergias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    id_animal INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_animal) REFERENCES animals(id)
);

-- Create historico table
CREATE TABLE IF NOT EXISTS historico (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE NOT NULL,
    descricao TEXT NOT NULL,
    id_animal INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_animal) REFERENCES animals(id)
);

-- Create compromissos table
CREATE TABLE IF NOT EXISTS compromissos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_hora DATETIME NOT NULL,
    id_animal INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_animal) REFERENCES animals(id)
);

-- Insert some default especies
INSERT INTO especies (nome) VALUES 
('Cachorro'),
('Gato'),
('Pássaro'),
('Peixe'),
('Hamster'),
('Coelho');

SHOW TABLES; 