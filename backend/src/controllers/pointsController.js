const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getPoints = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const transactions = await Transaction.find({ fromUser: req.user.id })
            .sort({ createdAt: -1 })
            .select('platform type points createdAt');

        res.json({ points: user.points, transactions });
    } catch (err) {
        console.error('Error in getPoints:', err.message);
        res.status(500).json({ error: 'Failed to fetch points' });
    }
};

exports.addPoints = async (req, res) => {
    const { platform, points } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.points[platform] = (user.points[platform] || 0) + points;
        await user.save();

        await Transaction.create({
            fromUser: req.user.id,
            platform,
            points,
            type: 'add',
        });

        res.json({ success: true, message: `${points} points added to ${platform}` });
    } catch (err) {
        console.error('Error in addPoints:', err.message);
        res.status(500).json({ error: 'Failed to add points' });
    }
};

exports.transferPoints = async (req, res) => {
    const { recipientEmail, platform, points } = req.body;

    try {
        const fromUser = await User.findById(req.user.id);
        const toUser = await User.findOne({ email: recipientEmail });

        if (!fromUser || !toUser) return res.status(404).json({ error: 'User not found' });
        if (fromUser.points[platform] < points) return res.status(400).json({ error: 'Insufficient points' });

        fromUser.points[platform] -= points;
        toUser.points[platform] = (toUser.points[platform] || 0) + points;

        await fromUser.save();
        await toUser.save();

        await Transaction.create({
            fromUser: req.user.id,
            toUser: toUser._id,
            platform,
            points,
            type: 'transfer',
        });

        res.json({ success: true, message: 'Points transferred successfully' });
    } catch (err) {
        console.error('Error in transferPoints:', err.message);
        res.status(500).json({ error: 'Transfer failed. Please try again later.' });
    }
};

exports.redeemPoints = async (req, res) => {
    const { platform, points } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user || user.points[platform] < points) {
            return res.status(400).json({ error: 'Insufficient points' });
        }

        user.points[platform] -= points;
        await user.save();

        res.json({ success: true, message: 'Points redeemed successfully' });
    } catch (err) {
        console.error('Error in redeemPoints:', err.message);
        res.status(500).json({ error: 'Failed to redeem points' });
    }
};
