-- Criação da tabela usuario
CREATE TABLE IF NOT EXISTS usuario (
    ID_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela especie
CREATE TABLE IF NOT EXISTS especie (
    ID_especie INT AUTO_INCREMENT PRIMARY KEY,
    especie VARCHAR(50) NOT NULL
);

-- Criação da tabela animal
CREATE TABLE IF NOT EXISTS animal (
    ID_animal INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    raca VARCHAR(50) NOT NULL,
    idade INT NOT NULL,
    genero VARCHAR(20) NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    id_usuario INT NOT NULL,
    id_especie INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(ID_usuario),
    FOREIGN KEY (id_especie) REFERENCES especie(ID_especie)
);

-- Criação da tabela alergia
CREATE TABLE IF NOT EXISTS alergia (
    ID_alergia INT AUTO_INCREMENT PRIMARY KEY,
    ID_animal INT NOT NULL,
    descricao TEXT NOT NULL,
    FOREIGN KEY (ID_animal) REFERENCES animal(ID_animal)
);

-- Criação da tabela catalogo_vacinas
CREATE TABLE IF NOT EXISTS catalogo_vacinas (
    ID_catalogo INT AUTO_INCREMENT PRIMARY KEY,
    nome_vacina VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL
);

-- Criação da tabela vacinas_aplicadas
CREATE TABLE IF NOT EXISTS vacinas_aplicadas (
    ID_vacina INT AUTO_INCREMENT PRIMARY KEY,
    ID_catalogo INT NOT NULL,
    dose VARCHAR(50) NOT NULL,
    ID_animal INT NOT NULL,
    data_aplicacao DATE NOT NULL,
    FOREIGN KEY (ID_catalogo) REFERENCES catalogo_vacinas(ID_catalogo),
    FOREIGN KEY (ID_animal) REFERENCES animal(ID_animal)
);

-- Criação da tabela historico
CREATE TABLE IF NOT EXISTS historico (
    ID_historico INT AUTO_INCREMENT PRIMARY KEY,
    data_historico DATE NOT NULL,
    ID_animal INT NOT NULL,
    observacoes TEXT NOT NULL,
    FOREIGN KEY (ID_animal) REFERENCES animal(ID_animal)
);

-- Criação da tabela compromissos
CREATE TABLE IF NOT EXISTS compromissos (
    ID_compromissos INT AUTO_INCREMENT PRIMARY KEY,
    data_compromissos DATETIME NOT NULL,
    ID_animal INT NOT NULL,
    observacoes TEXT NOT NULL,
    FOREIGN KEY (ID_animal) REFERENCES animal(ID_animal)
); 