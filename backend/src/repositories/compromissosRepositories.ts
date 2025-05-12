import { Compromisso } from "../models/compromisso";
import connection from "../config/bd";

const CompromissoRepositorie = {
    create: (data_compromissos: any, ID_animal: number, observacoes: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO compromissos (data_compromissos, ID_animal, observacoes) VALUES (?, ?, ?)';
        connection.query(query, [data_compromissos, ID_animal, observacoes], (err: Error | null, results?: any) =>{
            if(err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM compromissos';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback(null, results);
        });
    },
    findById: (ID_compromissos: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM compromissos WHERE ID_compromissos = ?';
        connection.query(query, [ID_compromissos], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback(null, results);
        });
    }, 
    update: (ID_compromissos: any, data_compromissos: any, observacoes: string, callback: (err: Error | null, results?: any) =>void) => {
        console.log("Valores recebidos no update:", { data_compromissos, observacoes });

        const query = 'UPDATE compromissos SET  data_compromissos = ?, observacoes = ? WHERE ID_compromissos = ?';
        connection.query(query, [ID_compromissos, data_compromissos, observacoes], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback(null, results);
        });
    },
    delete: (ID_compromissos: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM compromissos WHERE ID_compromissos = ?';
        connection.query(query, [ID_compromissos], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback(null, results);
        });
    }
};

export default CompromissoRepositorie;

