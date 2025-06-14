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
    }
};

export default tipoCompromissoRepositorie; 