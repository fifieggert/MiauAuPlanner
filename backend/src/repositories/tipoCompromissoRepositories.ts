import { TipoCompromisso } from "../models/tipoCompromisso";
import connection from "../config/bd";

const tipoCompromissoRepositorie = {
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM tipo_compromisso ORDER BY nome_tipo';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID_tipo: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM tipo_compromisso WHERE ID_tipo = ?';
        connection.query(query, [ID_tipo], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    create: (nome_tipo: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO tipo_compromisso (nome_tipo) VALUES (?)';
        connection.query(query, [nome_tipo], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (ID_tipo: any, nome_tipo: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'UPDATE tipo_compromisso SET nome_tipo = ? WHERE ID_tipo = ?';
        connection.query(query, [nome_tipo, ID_tipo], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_tipo: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM tipo_compromisso WHERE ID_tipo = ?';
        connection.query(query, [ID_tipo], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

export default tipoCompromissoRepositorie; 