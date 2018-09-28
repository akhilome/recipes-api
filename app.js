const express = require('express');
const bodyParser = require('body-parser');
const recipeRouter = require('./routes/recipeRouter');

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Recipes
app.use('/api/v1/', recipeRouter);

// Setup Server Port
app.listen(3000);

module.exports = app;
