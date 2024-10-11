// config/db.js

import mysql from "mysql2/promise";

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

async function query(sql, params) {
  const connection = await mysql.createConnection(config);
  const [results] = await connection.execute(sql, params);
  await connection.end();
  return results;
}

export default query;
