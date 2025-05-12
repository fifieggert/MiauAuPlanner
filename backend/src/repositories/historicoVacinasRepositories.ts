import { HistoricoVacinas } from "../models/historicoVacinas";
import connection from "../config/bd";

const historicoVacinasRepositorie = {
    create: (ID_historico: string, ID_vacina: string ,callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO historico_vacinas (ID_historico, ID_vacina) VALUES (?, ?)';
        connection.query(query, [ID_historico, ID_vacina], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM historico_vacinas';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM historico_vacinas WHERE ID = ?';
        connection.query(query, [ID], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID: any, callback: (err: Error | null, results?: any) => void) => {
        const query =  'DELETE FROM historico_vacinas WHERE ID = ?'; 
        connection.query(query, [ID], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback(null, results);
        });
    }
};

export default historicoVacinasRepositorie;