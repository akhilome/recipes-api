const router = require('express').Router();
const RecipeController = require('../controllers/Recipes');

router.get('/', RecipeController.getAllRecipes);
router.get('/:id', RecipeController.getSingleRecipe);
router.post('/add', RecipeController.addRecipe);
router.delete('/:id', RecipeController.deleteSingleRecipe);
router.put('/:id', RecipeController.updateRecipe);

module.exports = router;
