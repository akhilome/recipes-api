import express from 'express';
import bodyParser from 'body-parser';
import recipeRouter from './routes/recipeRouter';
import authRouter from './routes/authRouter';

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Recipes
app.use('/api/v1/', recipeRouter);
// Auth
app.use('/api/v1/auth/', authRouter);

// Setup Server Port
app.listen(3000);

export default app;
