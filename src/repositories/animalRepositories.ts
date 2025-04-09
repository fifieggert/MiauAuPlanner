import { Animal } from "../models/animal";
import connection from "../config/bd";

const AnimalRepositorie = {
    create: (nome: string, raca: string, idade: number, genero: string, peso: number, id_usuario: number, id_especie: number,
        callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO animal (nome, raca, idade, genero, peso, id_usuario, id_especie) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [nome, raca, idade, genero, peso, id_usuario, id_especie], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM animal';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID_animal: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM animal WHERE ID_animal = ?';
        connection.query(query, [ID_animal], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (ID_animal: number, nome: string, raca: string, idade: number, genero: string, peso: number,
        callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { ID_animal, nome, raca, idade, genero, peso });

        const query = 'UPDATE animal SET nome = ?, raca = ?, idade = ?, genero = ?, peso = ? WHERE ID_animal = ?';
        connection.query(query, [nome, raca, idade, genero, peso, ID_animal], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_animal: any, callback: (err: Error | null, results?: any) => void) => {
        const query =  'DELETE FROM animal WHERE ID_animal = ?'; 
        connection.query(query, [ID_animal], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback(null, results);
        });
    }
};

export default AnimalRepositorie;

