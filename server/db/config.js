const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
let pool;

if (env === 'test') {
  pool = new Pool({ connectionString: process.env.TESTDB_URL });
} else {
  pool = new Pool({ connectionString: process.env.DB_URL });
}

module.exports = pool;
