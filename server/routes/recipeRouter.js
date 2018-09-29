import { Router } from 'express';
import RecipeController from '../controllers/Recipes';

const router = new Router();

router.get('/recipes', RecipeController.getAllRecipes);
router.get('/recipes/:id', RecipeController.getSingleRecipe);
router.post('/recipes', RecipeController.addRecipe);
router.delete('/recipes/:id', RecipeController.deleteSingleRecipe);
router.put('/recipes/:id', RecipeController.updateRecipe);

export default router;
