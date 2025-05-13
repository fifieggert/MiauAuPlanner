import { Alergia } from "../models/alergia";
import connection from "../config/bd";

const AlergiaRepositorie = {
    create: (ID_animal: number, descricao: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO alergia (ID_animal, descricao) values (?, ?)';
        connection.query(query, [ID_animal, descricao], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM alergia';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID_alergia: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM alergia WHERE ID_alergia = ?';
        connection.query(query, [ID_alergia], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (ID_alergia: any, descricao: string, callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { descricao, ID_alergia });

        const query = 'UPDATE alergia SET descricao = ? WHERE ID_alergia = ?';
        connection.query(query, [descricao, ID_alergia], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_alergia: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM alergia WHERE ID_alergia = ?';
        connection.query(query, [ID_alergia], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

export default AlergiaRepositorie;