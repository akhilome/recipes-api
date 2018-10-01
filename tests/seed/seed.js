import bcrypt from 'bcryptjs';
import pool from '../../server/db/config';

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
  users: {
    admin: {
      name: 'Kizito',
      email: 'hovkard@gmail.com',
      password: 'suppersecurepassword',
      confirmPassword: 'suppersecurepassword',
    },
    validUser: {
      name: 'James',
      email: 'daniel@james.com',
      password: 'pixel2user',
      confirmPassword: 'pixel2user',
    },
    invalidUser: {
      name: 'four-O-four',
      email: 'no@email.address',
      password: 'invalid',
    },
    invalidUserNoData: {},
    invalidUserNoName: {
      email: 'unserious@lad.com',
      password: 'insecure',
      confirmPassword: 'insecure',
    },
    invalidUserNoEmail: {
      name: 'Name?',
      password: 'pass',
      confirmPassword: 'pass',
    },
    invalidUserNoPass: {
      name: 'Magician',
      email: 'an@email.address',
    },
    invalidUserPassMissMatch: {
      name: 'Olodo',
      email: 'another@sweet.email',
      password: 'oneThing',
      confirmPassword: 'anEntirelyDifferentThing',
    },
  },
};

const populateTables = async () => {
  const dropRecipesTableQuery = 'DROP TABLE IF EXISTS recipes';
  const dropUsersTableQuery = 'DROP TABLE IF EXISTS users';

  const createRecipesTableQuery = `CREATE TABLE recipes (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    ingredients TEXT NOT NULL, 
    directions TEXT NOT NULL
  );`;
  const createUsersTableQuery = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL
  )`;

  const insertRecipeQuery = 'INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)';

  await pool.query(dropRecipesTableQuery);
  await pool.query(dropUsersTableQuery);
  await pool.query(createRecipesTableQuery);
  await pool.query(createUsersTableQuery);

  await pool.query(
    insertRecipeQuery,
    [seedData.recipes[0].name, seedData.recipes[0].ingredients, seedData.recipes[0].directions],
  );
  await pool.query(
    insertRecipeQuery,
    [seedData.recipes[1].name, seedData.recipes[1].ingredients, seedData.recipes[1].directions],
  );
};

const populateUsersTable = async () => {
  // hash passwords
  const adminHashedPassword = await bcrypt.hash(seedData.users.admin.password, 10);
  const userHashedPassword = await bcrypt.hash(seedData.users.validUser.password, 10);

  const insertQuery = 'INSERT INTO users(name, email, password, is_admin) VALUES($1, $2, $3, $4)';

  // Admin user
  await pool.query(
    insertQuery,
    [seedData.users.admin.name, seedData.users.admin.email, adminHashedPassword, 't'],
  );
  // Customer
  await pool.query(
    insertQuery,
    [seedData.users.validUser.name, seedData.users.validUser.email, userHashedPassword, 'f'],
  );
};

export { seedData, populateTables, populateUsersTable };
