const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, default: 1000 },
});

module.exports = mongoose.model('User', userSchema);
