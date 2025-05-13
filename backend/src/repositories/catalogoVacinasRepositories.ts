import { CatalogoVacinas } from "../models/catalogoVacinas";
import connection from "../config/bd";

const catalogoVacinasRepositorie = {
    create: (nome_vacina: string, fabricante: string, callback: (err: Error | null, results?: any) => void) => {
        const query = 'INSERT INTO catalogo_vacinas (nome_vacina, fabricante) VALUES (?, ?)';
        connection.query(query, [nome_vacina, fabricante], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findAll: (callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM catalogo_vacinas';
        connection.query(query, (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    findById: (ID_catalogo: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'SELECT * FROM catalogo_vacinas WHERE ID_catalogo = ?';
        connection.query(query, [ID_catalogo], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    update: (ID_catalogo: any, nome_vacina: string, fabricante: string, callback: (err: Error | null, results?: any) => void) => {
        console.log("Valores recebidos no update:", { ID_catalogo, nome_vacina, fabricante });

        const query = 'UPDATE catalogo_vacinas SET nome_vacina = ?, fabricante = ? WHERE ID_catalogo = ?';
        connection.query(query, [nome_vacina, fabricante, ID_catalogo], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },
    delete: (ID_catalogo: any, callback: (err: Error | null, results?: any) => void) => {
        const query = 'DELETE FROM catalogo_vacinas WHERE ID_catalogo = ?';
        connection.query(query, [ID_catalogo], (err: Error | null, results?: any) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

export default catalogoVacinasRepositorie;