import { Especie } from "../models/especie";
import connection from "../config/bd";

const EspecieRepositorie = {
    create: (especie: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO especies (nome) values (?)';
        connection.query(query, [especie], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM especies';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID_especie: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM especies WHERE id = ?';
        connection.query(query, [ID_especie], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (ID_especie: any, especie: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'UPDATE especies SET nome = ? WHERE id = ?';
        connection.query(query, [especie, ID_especie], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_especie: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM especies WHERE id = ?';
        connection.query(query, [ID_especie], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

export default EspecieRepositorie;