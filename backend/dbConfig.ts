import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  server: String(process.env.DB_SERVER),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: true, // true if using Azure SQL Database
    trustServerCertificate: true, // true if using Azure SQL Database
  },
};

export default dbConfig;
