const pool = require('../../db/config');

const seedData = {
  recipes: [
    {
      name: 'Egg and Bread',
      ingredients: 'Egg, Bread',
      directions: 'Fry the egg, layer the fried egg on the bread, enjoy!',
    },
    {
      name: 'Garri and Groundnut',
      ingredients: 'Garri, Groundnut, Sugar, COLD purewater, Satchet milk (preferably Peak)',
      directions: 'Pour the Garri, sugar, and satchet milk into a bowl. Pour in the cold purewater and mix to taste. Pour the groundnut. Enjoy!',
    },
  ],
};

const populateTables = async () => {
  const dropTableQuery = 'DROP TABLE IF EXISTS recipes';
  const createTableQuery = 'CREATE TABLE recipes(id SERIAL PRIMARY KEY, name VARCHAR(255),ingredients TEXT,directions TEXT)';
  const insertRecipeQuery = 'INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)';
  await pool.query(dropTableQuery);
  await pool.query(createTableQuery);
  await pool.query(
    insertRecipeQuery,
    [seedData.recipes[0].name, seedData.recipes[0].ingredients, seedData.recipes[0].directions],
  );
  await pool.query(
    insertRecipeQuery,
    [seedData.recipes[1].name, seedData.recipes[1].ingredients, seedData.recipes[1].directions],
  );
};

module.exports = { seedData, populateTables };
