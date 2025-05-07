const express = require('express');
const Account = require('../models/Account');

const router = express.Router();

// CREATE a new account - tested
router.post('/', async (req, res) => {
  const { logo, name, cardType, bankName, limit, balance } = req.body;
  try {
    const newAccount = new Account({ logo, name, cardType, bankName, limit, balance });
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(400).json({ message: 'Failed to create account', error });
  }
});

// GET all accounts - tested
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch accounts', error });
  }
});

// GET a specific account by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const account = await Account.findById(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch account', error });
  }
});

// Update accounts - tested
router.put('/updateAccounts', async (req, res) => {
  const updates = req.body;

  if (!Array.isArray(updates)) {
    return res.status(400).json({ message: 'Expected an array of updates' });
  }

  const operations = updates.map(acc => ({
    updateOne: {
      filter: { _id: acc._id },
      update: { $set: acc },
    }
  }));

  try {
    const result = await Account.bulkWrite(operations, { ordered: false });
    res.status(200).json({ message: 'Accounts updated successful', result });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(400).json({ message: 'Accounts update failed', error: error.message });
  }
});

// DELETE an account - tested
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ message: 'Account deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete account', error });
  }
});

module.exports = router;