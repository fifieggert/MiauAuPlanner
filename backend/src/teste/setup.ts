import connection from '../config/bd';
import { QueryError } from 'mysql2';

// Increase timeout for all tests to 30 seconds
jest.setTimeout(30000);

beforeAll(async () => {
  try {
    // Ensure all tests have access to the database connection
    await new Promise((resolve, reject) => {
      connection.connect((err: QueryError | null) => {
        if (err) {
          console.error('Error connecting to database:', err);
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Close the database connection after all tests
    await new Promise((resolve, reject) => {
      connection.end((err: QueryError | null) => {
        if (err) {
          console.error('Error closing database connection:', err);
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  } catch (error) {
    console.error('Failed to close database connection:', error);
    throw error;
  }
}); 