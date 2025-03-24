import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import verifyToken from '../middlewares/verifyToken.middleware.js';

const authRouter = Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.post('/logout', logout);

authRouter.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Valid Token',
    });
})

export default authRouter;