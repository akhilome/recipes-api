const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({ connectionString: process.env.DB_URL });

module.exports = pool;
