const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const pgPassword = require('./secrets');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipebookdb',
  password: pgPassword
});

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/recipes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json({ recipes: result.rows });
  } catch (err) {
    res.json({err});
  }
});

// Setup Server Port
app.listen(3000, () => console.log('app running on 3000'));
