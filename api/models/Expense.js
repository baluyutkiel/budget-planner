const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    bankID: { type: String, required: true },
    bankName: { type: String, required: true },
    userId: { type: String, required: false },
    expenseType: {
        type: String,
        enum: ['Non-Variable Expense', 'Variable Expense'],
        required: true
    },
    cost: { type: Number, required: true },
    selected: { type: Boolean, required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;