const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT Token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const user = await User.create({ name, email, password });
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.error('Error in registerUser:', err.message);
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        res.json({ token, name: user.name });
    } catch (err) {
        console.error('Error in loginUser:', err.message);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name } = ticket.getPayload();

        // Find or create a user
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, name, password: '' });
        }

        // Generate a token
        const token = generateToken(user._id);

        res.json({ token, name: user.name });
    } catch (err) {
        console.error('Error in Google Login:', err.message);
        res.status(500).json({ error: 'Google login failed. Check credentials or token.' });
    }
};

