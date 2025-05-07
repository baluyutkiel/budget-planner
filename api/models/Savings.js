const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
    bankID: { type: String, required: false },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true }
}, {timestamps: true});

const Savings = mongoose.model('Savings', savingsSchema);

module.exports = Savings;