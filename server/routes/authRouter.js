import { Router } from 'express';
import AuthController from '../controllers/Auth';
import Sanitize from '../middleware/Sanitizer';
import AuthHandler from '../middleware/AuthHandler';

const router = new Router();

router.post('/signup', Sanitize.signup, AuthController.signup);
router.post('/login', Sanitize.signin, AuthController.signin, AuthHandler.generateAuthToken);

export default router;
