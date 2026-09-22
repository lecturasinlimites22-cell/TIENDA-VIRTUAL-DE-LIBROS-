import 'dotenv/config';
import mysql from 'mysql2/promise';

// Se crea una función para aceptar conexiones simultáneas.
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'libreria',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;