import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

/* eslint-disable */
let pool;

if (env === 'test') {
  pool = new Pool({ connectionString: process.env.TESTDB_URL });
} else {
  pool = new Pool({ connectionString: process.env.DB_URL });
}

export default pool;
