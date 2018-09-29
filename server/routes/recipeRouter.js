const router = require('express').Router();
const RecipeController = require('../controllers/Recipes');

router.get('/recipes', RecipeController.getAllRecipes);
router.get('/recipes/:id', RecipeController.getSingleRecipe);
router.post('/recipes', RecipeController.addRecipe);
router.delete('/recipes/:id', RecipeController.deleteSingleRecipe);
router.put('/recipes/:id', RecipeController.updateRecipe);

module.exports = router;
