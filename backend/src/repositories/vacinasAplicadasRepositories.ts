import { VacinasAplicadas } from "../models/vacinasAplicadas";
import connection from "../config/bd";

const vacinasAplicadasRepositorie = {
    create: (ID_catalogo: number, dose: string, ID_animal: number, data_aplicacao: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO vacinas_aplicadas (ID_catalogo, dose, ID_animal, data_aplicacao) values (?, ?, ?, ?)';
        connection.query(query, [ID_catalogo, dose, ID_animal, data_aplicacao], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM vacinas_aplicadas';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID_vacina: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM vacinas_aplicadas WHERE ID_vacina = ?';
        connection.query(query, [ID_vacina], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (ID_vacina: number, dose: string, data_aplicacao: any, callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { ID_vacina, dose, data_aplicacao });

        const query = 'UPDATE vacinas_aplicadas SET  dose = ?, data_aplicacao = ? WHERE ID_vacina = ?';
        connection.query(query, [dose, data_aplicacao, ID_vacina], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_vacina: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM vacinas_aplicadas WHERE ID_vacina = ?';
        connection.query(query, [ID_vacina], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

export default vacinasAplicadasRepositorie;