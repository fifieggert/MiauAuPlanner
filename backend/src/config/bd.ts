import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "miauauplanner",
  debug: true
});

connection.connect((err: mysql.QueryError | null) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados MySQL!");
});

connection.on('error', (err: mysql.QueryError) => {
  console.error('Erro na conexão com o banco de dados:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Conexão com o banco de dados foi perdida. Tentando reconectar...');
  
    connection.connect();
  } else {
    throw err;
  }
});

export default connection;

/**
 * @swagger
 * /animal/{id}:
 *   get:
 *     summary: Busca um animal pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do animal
 */

/**
 * @swagger
 * /animal/{id}:
 *   put:
 *     summary: Atualiza um animal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 */
