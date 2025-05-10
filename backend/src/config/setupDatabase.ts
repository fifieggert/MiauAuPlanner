import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true // This allows multiple SQL statements
});

// Read the SQL file
const sqlScript = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');

// Execute the SQL script
connection.query(sqlScript, (err, results) => {
  if (err) {
    console.error('Error executing SQL script:', err);
    return;
  }
  console.log('Database and tables created successfully!');
  connection.end();
}); 