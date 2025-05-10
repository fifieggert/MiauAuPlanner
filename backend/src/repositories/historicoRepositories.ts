import { Historico } from "../models/historico";
import connection from "../config/bd";

const HistoricoRepositorie = {
    create: (data_historico: any, ID_animal: number, observacoes: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO historico (data_historico, ID_animal, obrservacoes) values (?, ?, ?)';
        connection.query(query, [data_historico, ID_animal, observacoes], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results); 
        });
    }, 
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM historico';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    },
    findById: (ID_historico: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT FROM historico WHERE ID_historico = ?';
        connection.query(query, [ID_historico], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    },
    update: (data_historico: any, observacoes: string, ID_historico: any, callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { data_historico, observacoes });

        const query = 'UPDATE historico SET  data_historico = ?, observacoes = ? WHERE ID_historico = ?';
        connection.query(query, [data_historico, observacoes, ID_historico], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_historico: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM vacinas WHERE ID_vacina = ?';
        connection.query(query, [ID_historico], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    }
};

export default HistoricoRepositorie;