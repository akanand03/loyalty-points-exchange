const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const JWT_SECRET = '81ff521e0899ba370ac3c1ae63555de14f25a409bce524d1679699857fad2d13c5553266678d618a1cfb8091f8f98086fd5697b20efaa466d8f99081746c9313';
const GOOGLE_CLIENT_ID = '1021986147883-l5m87q49h95fmh2ir9kd1kcgaj2dq9gd.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });

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

exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: GOOGLE_CLIENT_ID,
        });

        const { email, name } = ticket.getPayload();

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email, name, password: '' });
        }

        const token = generateToken(user._id);
        res.json({ token, name: user.name });
    } catch (err) {
        console.error('Error in Google Login:', err.message);
        res.status(500).json({ error: 'Google login failed. Check credentials or token.' });
    }
};
