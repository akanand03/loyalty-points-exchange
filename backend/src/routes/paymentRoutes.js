const express = require('express');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');

const router = express.Router();

router.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    try {
        if (!amount) return res.status(400).json({ error: 'Amount is required' });

        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(201).json(order);
    } catch (err) {
        console.error('Error creating Razorpay order:', err.message);
        res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
});

router.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const hash = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (hash === razorpay_signature) {
            res.json({ success: true });
        } else {
            res.status(400).json({ error: 'Invalid payment signature' });
        }
    } catch (err) {
        console.error('Error verifying payment:', err.message);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
});

module.exports = router;
