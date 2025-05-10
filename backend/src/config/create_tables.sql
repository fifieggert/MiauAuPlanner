USE miauauplanner;

-- Create usuario table
CREATE TABLE IF NOT EXISTS usuario (
    ID_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create especie table
CREATE TABLE IF NOT EXISTS especie (
    ID_especie INT AUTO_INCREMENT PRIMARY KEY,
    especie VARCHAR(100) NOT NULL
);

-- Create animal table
CREATE TABLE IF NOT EXISTS animal (
    ID_animal INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    raca VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    genero VARCHAR(20) NOT NULL,
    peso DECIMAL(5,2) NOT NULL,
    id_usuario INT NOT NULL,
    id_especie INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(ID_usuario),
    FOREIGN KEY (id_especie) REFERENCES especie(ID_especie)
);

-- Create alergia table
CREATE TABLE IF NOT EXISTS alergia (
    ID_alergia INT AUTO_INCREMENT PRIMARY KEY,
    animal_ID INT NOT NULL,
    descricao TEXT NOT NULL,
    FOREIGN KEY (animal_ID) REFERENCES animal(ID_animal)
);

-- Create historico table
CREATE TABLE IF NOT EXISTS historico (
    ID_historico INT AUTO_INCREMENT PRIMARY KEY,
    data_historico DATETIME NOT NULL,
    ID_animal INT NOT NULL,
    observacoes TEXT NOT NULL,
    FOREIGN KEY (ID_animal) REFERENCES animal(ID_animal)
);

-- Create vacinas table
CREATE TABLE IF NOT EXISTS vacinas (
    ID_vacina INT AUTO_INCREMENT PRIMARY KEY,
    nome_vacina VARCHAR(255) NOT NULL,
    dose VARCHAR(50) NOT NULL,
    fabricante VARCHAR(255) NOT NULL,
    ID_animal INT NOT NULL,
    ID_historico INT NOT NULL,
    FOREIGN KEY (ID_animal) REFERENCES animal(ID_animal),
    FOREIGN KEY (ID_historico) REFERENCES historico(ID_historico)
);

-- Create compromissos table
CREATE TABLE IF NOT EXISTS compromissos (
    ID_compromissos INT AUTO_INCREMENT PRIMARY KEY,
    data_compromissos DATETIME NOT NULL,
    id_animal INT NOT NULL,
    observacoes TEXT NOT NULL,
    id_vacina INT NOT NULL,
    FOREIGN KEY (id_animal) REFERENCES animal(ID_animal),
    FOREIGN KEY (id_vacina) REFERENCES vacinas(ID_vacina)
); 