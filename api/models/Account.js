const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  logo: String || '',
  cardType: String,
  bankName: String,
  limit: Number,
  balance: Number,
  name: { type: String, required: true }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;