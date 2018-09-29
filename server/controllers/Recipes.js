const pool = require('../db/config');

class RecipeController {
  static async getAllRecipes(req, res) {
    try {
      const result = await pool.query('SELECT * FROM recipes');
      res.json({ recipes: result.rows });
    } catch (err) {
      res.json({ err });
    }
  }

  static async getSingleRecipe(req, res) {
    const { id } = req.params;
    try {
      const text = 'SELECT * FROM recipes WHERE id=$1';
      const recipe = await pool.query(text, [id]);

      if (!recipe.rowCount) {
        res.status(404).json({
          status: 'error',
          message: 'No recipe with that id exists',
        });
      }

      res.json({
        status: 'success',
        recipe: recipe.rows[0],
      });
    } catch (err) {
      res.status(400).json();
    }
  }

  static async addRecipe(req, res) {
    const { name, ingredients, directions } = req.body;
    const text = 'INSERT INTO recipes(name, ingredients, directions) VALUES ($1, $2, $3) RETURNING *';

    try {
      const result = await pool.query(text, [name, ingredients, directions]);
      res.status(201).json({
        message: 'recipe added successfully',
        recipe: result.rows,
      });
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  static async deleteSingleRecipe(req, res) {
    const { id } = req.params;
    const text = 'DELETE FROM recipes WHERE id=($1)';

    try {
      await pool.query(text, [id]);
      res.status(204).json();
    } catch (err) {
      res.status(400).json({ err });
    }
  }

  static async updateRecipe(req, res) {
    const { id } = req.params;
    const { name, ingredients, directions } = req.body;
    const text = 'UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4 RETURNING *';
    try {
      const existingRecipe = (await pool.query('SELECT * FROM recipes WHERE id=$1', [id])).rows[0];
      const values = [
        name || existingRecipe.name,
        ingredients || existingRecipe.ingredients,
        directions || existingRecipe.directions,
        id,
      ];
      const updatedRecipe = (await pool.query(text, values)).rows[0];
      res.json({ updatedRecipe });
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = RecipeController;
