import { Router } from 'express';
import AuthController from '../controllers/Auth';
import Sanitize from '../middleware/Sanitizer';

const router = new Router();

router.post('/signup', Sanitize.signup, AuthController.signup);

export default router;
