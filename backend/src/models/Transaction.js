const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    platform: { type: String, required: true },
    points: { type: Number, required: true },
    type: { type: String, enum: ['add', 'transfer', 'redeem'], required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
