const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) return res.status(401).json({ error: 'User not found' });
            next();
        } catch (err) {
            console.error('Error in protect middleware:', err.message);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = { protect };
