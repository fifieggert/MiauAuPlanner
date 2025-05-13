import { User } from "../models/user";
import connection from "../config/bd";


const UserRepositorie = {
  create: (nome: string, telefone: string, cpf: string, email: string, callback: (err: Error | null, results?: any) => void) => {
    const query = 'INSERT INTO usuario (nome, telefone, cpf, email) VALUES (?, ?, ?, ?)';
    connection.query(query, [nome, telefone, cpf, email], (err: Error | null, results?: any) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  findAll: (callback: (err: Error | null, results?: any) => void) => {
    const query = 'SELECT * FROM usuario';
    connection.query(query, (err: Error | null, results?: any) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  findById: (ID_usuario: any, callback: (err: Error | null, results?: any) => void) => {
    const query = 'SELECT * FROM usuario WHERE ID_usuario = ?';
    connection.query(query, [ID_usuario], (err: Error | null, results?: any) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  update: (ID_usuario: number, nome: string, telefone: string, email: string, callback: (err: Error | null, results?: any) => void) => {
    console.log("Valores recebidos no update:", { ID_usuario, nome, telefone, email });

    const query = 'UPDATE usuario SET nome = ?, telefone = ?, email = ? WHERE ID_usuario = ?';
    connection.query(query, [nome, telefone, email, ID_usuario], (err: Error | null, results?: any) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },

  delete: (ID_usuario: any, callback: (err: Error | null, results?: any) => void) => {
    const query = 'DELETE FROM usuario WHERE ID_usuario = ? ';
    connection.query(query, [ID_usuario], (err: Error | null, results?: any) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};

export default UserRepositorie;