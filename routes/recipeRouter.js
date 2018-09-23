const router = require('express').Router();
const pool = require('../db/config');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json({ recipes: result.rows });
  } catch (err) {
    res.json({err});
  }
});

router.post('/add', async (req, res) => {
  const { name, ingredients, directions } = req.body;
  const text = 'INSERT INTO recipes(name, ingredients, directions) VALUES ($1, $2, $3) RETURNING *';

  try {
    const result = await pool.query(text, [name, ingredients, directions]);
    res.json({ recipe: result.rows });
  } catch (err) {
    res.status(400).json({err});
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const text = 'DELETE FROM recipes WHERE id=($1)';

  try {
    await pool.query(text, [id]);
    res.status(204).json();
  } catch (err) {
    res.status(400).json({err});
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, directions } = req.body;
  const text = 'UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4 RETURNING *';
  try {
    const existingRecipe = (await pool.query('SELECT * FROM recipes WHERE id=$1', [id])).rows[0];
    const updatedRecipe = (await pool.query(text, [name || existingRecipe.name, ingredients || existingRecipe.ingredients, directions || existingRecipe.directions, id])).rows[0];
    res.json({ updatedRecipe });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
