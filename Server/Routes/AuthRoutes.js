import express from 'express';
import { registerUser } from '../Controllers/AuthController.js';
import { loginUser } from '../Controllers/LoginController.js';


const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);


export default router;