import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

const authorize = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Authorization',
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            success: false,
            message: 'Invalid Authorization',
        });
    }
}

export default authorize;