const mysql = require('mysql2/promise');

module.exports = async (sql, args) => {
  const  connect = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      connectionLimit : process.env.DB_CONNECTIONLIMIT
  };
  const pool = mysql.createPool(connect);
  const conn = await pool.getConnection(connect);
  try {
    const result = await conn.query(sql, args);
    return result[0];
  } catch (err) {
    throw err;
  }
}