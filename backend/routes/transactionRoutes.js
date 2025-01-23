const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');

// Transfer Money
router.post('/transfer', async (req, res) => {
    const { senderId, receiverId, amount } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (sender.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct and add amounts
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        // Create transaction
        const transaction = new Transaction({ sender: senderId, receiver: receiverId, amount });
        await transaction.save();

        res.status(200).json({ message: 'Transaction successful', transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error processing transaction', error });
    }
});

module.exports = router;
