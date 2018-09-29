import express from 'express';
import bodyParser from 'body-parser';
import recipeRouter from './routes/recipeRouter';

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Recipes
app.use('/api/v1/', recipeRouter);

// Setup Server Port
app.listen(3000);

export default app;
