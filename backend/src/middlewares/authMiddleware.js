const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = '81ff521e0899ba370ac3c1ae63555de14f25a409bce524d1679699857fad2d13c5553266678d618a1cfb8091f8f98086fd5697b20efaa466d8f99081746c9313';

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
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
