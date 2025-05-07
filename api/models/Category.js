const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: false},
    name: { type: String, required: true }
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;