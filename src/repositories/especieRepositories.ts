import { Especie } from "../models/especie";
import connection from "../config/bd";

const EspecieRepositorie = {
    create: (especie: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO especie (especie) values (?)';
        connection.query(query, [especie], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM especie';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID_especie: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM especie WHERE ID_especie = ?';
        connection.query(query, [ID_especie], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    },
    update: (ID_especie: any, especie: string, callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { especie, ID_especie });

        const query = 'UPDATE especie SET especie = ? WHERE ID_especie = ?';
        connection.query(query, [especie, ID_especie], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_especie: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM especie WHERE ID_especie = ? ';
        connection.query(query, [ID_especie], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

export default EspecieRepositorie;