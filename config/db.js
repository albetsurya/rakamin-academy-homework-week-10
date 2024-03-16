const { Pool } = require("pg");

const pool = new Pool({
  user: env.process.DB_USER,
  host: env.process.DB_HOST,
  database: env.process.DB_DATABASE,
  password: env.process.DB_PASSWORD,
  port: env.process.DB_PORT,
});

module.exports = pool;
