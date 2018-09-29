DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL, 
  ingredients TEXT NOT NULL, 
  directions TEXT NOT NULL
);
