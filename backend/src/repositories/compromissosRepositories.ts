import { Compromisso } from "../models/compromisso";
import connection from "../config/bd";

const CompromissoRepositorie = {
    create: (data_compromissos: any, horario_compromissos: string, ID_animal: number, ID_tipo: number, observacoes: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO compromissos (data_compromissos, horario_compromissos, ID_animal, ID_tipo, observacoes) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [data_compromissos, horario_compromissos, ID_animal, ID_tipo, observacoes], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = `
            SELECT c.*, t.nome_tipo 
            FROM compromissos c 
            JOIN tipo_compromisso t ON c.ID_tipo = t.ID_tipo
        `;
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID_compromissos: any, callback: (err: Error | null, results?: any) => void) => {
        const query = `
            SELECT c.*, t.nome_tipo 
            FROM compromissos c 
            JOIN tipo_compromisso t ON c.ID_tipo = t.ID_tipo 
            WHERE c.ID_compromissos = ?
        `;
        connection.query(query, [ID_compromissos], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (ID_compromissos: any, data_compromissos: any, horario_compromissos: string, ID_tipo: number, observacoes: string, callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { data_compromissos, horario_compromissos, ID_tipo, observacoes });

        const query = 'UPDATE compromissos SET data_compromissos = ?, horario_compromissos = ?, ID_tipo = ?, observacoes = ? WHERE ID_compromissos = ?';
        connection.query(query, [data_compromissos, horario_compromissos, ID_tipo, observacoes, ID_compromissos], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_compromissos: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM compromissos WHERE ID_compromissos = ?';
        connection.query(query, [ID_compromissos], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

export default CompromissoRepositorie;

