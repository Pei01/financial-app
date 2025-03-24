import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

const verifyToken = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access Denied',
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error(error);
        res.status(403).json({
            success: false,
            message: 'Invalid or Expired Token',
        });
    }
}

export default verifyToken;