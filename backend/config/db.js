const { Pool } = require("pg");
require("dotenv").config();

console.log("DATABASE_URL =", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

pool.connect()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("Database Error:", err));

module.exports = pool;