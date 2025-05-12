import { CompromissosVacinas } from "../models/compromissosVacinas";
import connection from "../config/bd";

const compromissosVacinasRepositorie = {
    create: (ID_compromissos: number, ID_catalogo: number, dose_prevista: string ,callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO compromissos_vacinas (ID_compromissos, ID_catalogo, dose_prevista) VALUES (?, ?, ?)';
        connection.query(query, [ID_compromissos, ID_catalogo, dose_prevista], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM compromissos_vacinas';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM compromissos_vacinas WHERE ID = ?';
        connection.query(query, [ID], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (ID: any, dose_prevista: string, callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { dose_prevista, ID });

        const query = 'UPDATE compromissos_vacinas SET dose_prevista = ? WHERE ID = ?';
        connection.query(query, [dose_prevista, ID], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID: any, callback: (err: Error | null, results?: any) => void) => {
        const query =  'DELETE FROM compromissos_vacinas WHERE ID = ?'; 
        connection.query(query, [ID], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback(null, results);
        });
    }
};

export default compromissosVacinasRepositorie;