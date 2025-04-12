import { Vacina } from "../models/vacinas";
import connection from "../config/bd";

const VacinaRepositorie = {
    create: (nome_vacina: string, dose: string, fabricante: string, ID_animal: number, ID_historico: number, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO vacinas (nome_vacina, dose, fabricante, ID_animal, ID_historico) values (?, ?, ?, ?, ?)';
        connection.query(query, [nome_vacina, dose, fabricante, ID_animal, ID_historico], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results); 
        });
    }, 
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM vacinas';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    },
    findById: (ID_vacina: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT FROM vacinas WHERE ID_vacina = ?';
        connection.query(query, [ID_vacina], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    },
    update: (ID_vacina: any, nome_vacina: string, dose: string, fabricante: string, callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { nome_vacina, dose, fabricante, ID_vacina });

        const query = 'UPDATE vacinas SET  =?, dose = ?, fabricante: ? WHERE ID_vacina = ?';
        connection.query(query, [nome_vacina, dose, fabricante, ID_vacina], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_vacina: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM vacinas WHERE ID_vacina = ?';
        connection.query(query, [ID_vacina], (err: Error | null, results?: any) => {
            if (err) return callback (err);
            callback (null, results);
        });
    }
};

export default VacinaRepositorie;